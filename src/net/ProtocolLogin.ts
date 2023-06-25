import assert from "node:assert";
import { ClientOPCode, ClientVersion, GameFeature } from "~/constants";
import GameFeatureManager from "~/client/GameFeatureManager";
import { RSA } from "~/utils/crypt";
import createLogger from "~/utils/logger";
import ipToString from "~/utils/ip-to-string";
import Protocol from "./Protocol";
import OutputMessage from "./OutputMessage";
import InputMessage from "./InputMessage";

const logger = createLogger("ProtocolLogin");

const PROTOCOL_VERSION = 1097;
const CLIENT_VERSION = 1097;
const PIC_SIGNATURE = 0x56c5dde7;

type World = {
  name: string;
  ip: string;
  port: number; // uint16;
  previewState: number; // uint8;
};

type Character = {
  name: string;
  worldName: string;
  worldIp: string;
  worldPort: number; // uint16;
  previewState?: number; // uint8;
};

type Account = {
  status: number; // uint8;
  subStatus: number; // uint8;
  premiumDays: number; // uint32 | uint16;
};

enum LoginServerOPCode {
  Error = 10,
  ErrorNew = 11,
  TokenSuccess = 12,
  TokenError = 13,
  Update = 17,
  Motd = 20,
  UpdateNeeded = 30,
  SessionKey = 40,
  CharacterList = 100,
  ExtendedCharacterList = 101,
}

enum AccountStatus {
  Ok = 0,
  Frozen = 1,
  Suspended = 2,
}

enum SubscriptionStatus {
  Free = 0,
  Premium = 1,
}

interface ConstructorProps {
  featureManager: GameFeatureManager;
  rsa: RSA;
  onLoginError?: (error: string) => void;
  onCharacterList?: (characters: Character[], account: Account) => void;
  onMotd?: (motd: string) => void;
  onSessionKey?: (sessionKey: string) => void;
  onUpdateNeeded?: (signature: string) => void;
  datSignature: number;
  contentRevision: number;
}

interface Login {
  host: string;
  port: number;
  accountName: string;
  password: string;
  authenticatorToken?: string;
  stayLogged?: boolean;
}

export default class ProtocolLogin extends Protocol {
  // @ts-expect-error
  private _accountName: string;

  // @ts-expect-error
  private _password: string;

  private _authenticatorToken?: string;

  private _stayLogged?: boolean;

  private _featureManager: GameFeatureManager;

  private _rsa: RSA;

  private _contentRevision: number;

  private _datSignature: number;

  private _onLoginError?: (error: string) => void;

  private _onCharacterList?: (
    characters: Character[],
    account: Account
  ) => void;

  private _onMotd?: (motd: string) => void;

  private _onSessionKey?: (sessionKey: string) => void;

  private _onUpdateNeeded?: (signature: string) => void;

  constructor({
    featureManager,
    rsa,
    onLoginError,
    onCharacterList,
    contentRevision,
    datSignature,
    onMotd,
    onSessionKey,
    onUpdateNeeded,
  }: ConstructorProps) {
    super();

    this._featureManager = featureManager;
    this._rsa = rsa;
    this._onLoginError = onLoginError;
    this._onCharacterList = onCharacterList;
    this._contentRevision = contentRevision;
    this._datSignature = datSignature;
    this._onMotd = onMotd;
    this._onSessionKey = onSessionKey;
    this._onUpdateNeeded = onUpdateNeeded;
  }

  login(data: Login): void {
    assert(data.host, "No host defined");
    assert(data.port, "No port defined");
    assert(data?.port > 0, "Invalid port");

    this._accountName = data.accountName;
    this._password = data.password;
    this._authenticatorToken = data.authenticatorToken;
    this._stayLogged = data.stayLogged ?? false;

    this.connect(data.host, data.port);
  }

  override handleConnect() {
    super.handleConnect();

    this.sendLoginPacket();
  }

  private sendLoginPacket() {
    const msg = new OutputMessage(this._rsa);
    msg.addU8(ClientOPCode.ClientEnterAccount);
    msg.addU16(11); // Linux

    msg.addU16(PROTOCOL_VERSION);

    if (this._featureManager.getFeature(GameFeature.GameClientVersion)) {
      msg.addU32(CLIENT_VERSION);
    }

    if (this._featureManager.getFeature(GameFeature.GameContentRevision)) {
      msg.addU16(this._contentRevision ?? 0);
      msg.addU16(0);
    } else {
      msg.addU32(this._datSignature ?? 0);
    }

    msg.addU32(1508150786); // todo: g_sprites.getSprSignature()
    msg.addU32(PIC_SIGNATURE);

    if (this._featureManager.getFeature(GameFeature.GamePreviewState)) {
      msg.addU8(0);
    }

    let offset = msg.getMessageSize();

    if (
      this._featureManager.getFeature(GameFeature.GameLoginPacketEncryption)
    ) {
      msg.addU8(0);

      this.generateXTEAKey();
      const key = this.getXTEAKey();

      msg.addU32(key[0]);
      msg.addU32(key[1]);
      msg.addU32(key[2]);
      msg.addU32(key[3]);
    }

    if (this._featureManager.getFeature(GameFeature.GameAccountNames)) {
      msg.addString(this._accountName);
    } else {
      msg.addU32(Number(this._accountName));
    }

    msg.addString(this._password);

    // if (loginExtendedData) {
    //   msg.addString(loginExtendedData)
    // }

    let paddingBytes = this._rsa.getSize() - (msg.getMessageSize() - offset);

    assert(paddingBytes >= 0, "Invalid padding bytes");

    for (let i = 0; i < paddingBytes; i++) {
      msg.addU8(0);
    }

    if (
      this._featureManager.getFeature(GameFeature.GameLoginPacketEncryption)
    ) {
      msg.encryptRSA();
    }

    if (this._featureManager.getFeature(GameFeature.GameOGLInformation)) {
      msg.addU8(1); // unknown
      msg.addU8(1); // unknown

      if (CLIENT_VERSION >= 1072) {
        msg.addString("vendor renderer"); // todo: g_graphics.getVendor(), g_graphics.getRenderer()
      } else {
        msg.addString("renderer"); // todo: g_graphics.getRenderer()
      }

      msg.addString("version"); // todo: g_graphics.getVersion()
    }

    if (this._featureManager.getFeature(GameFeature.GameAuthenticator)) {
      offset = msg.getMessageSize();

      msg.addU8(0);
      msg.addString(this._authenticatorToken || "");

      if (this._featureManager.getFeature(GameFeature.GameSessionKey)) {
        msg.addU8(Number(this._stayLogged));
      }

      paddingBytes = this._rsa.getSize() - (msg.getMessageSize() - offset);
      assert(paddingBytes >= 0, "Invalid padding bytes");

      for (let i = 0; i < paddingBytes; i++) {
        msg.addU8(0);
      }

      msg.encryptRSA();
    }

    if (this._featureManager.getFeature(GameFeature.GameProtocolChecksum)) {
      this.enableChecksum();
    }

    this.send(msg);

    if (
      this._featureManager.getFeature(GameFeature.GameLoginPacketEncryption)
    ) {
      this.enableXTEAEncryption();
    }
  }

  protected override onReceive(message: InputMessage): void {
    while (!message.eof()) {
      const opcode = message.getU8();

      switch (opcode) {
        case LoginServerOPCode.ErrorNew:
          this.parseError(message);
          break;
        case LoginServerOPCode.Error:
          this.parseError(message);
          break;

        case LoginServerOPCode.Motd:
          this.parseMotd(message);
          break;
        case LoginServerOPCode.UpdateNeeded:
          this._onLoginError?.("Client needs update");
          break;
        case LoginServerOPCode.TokenSuccess:
          message.getU8(); // unknown value, todo
          logger.log("Token success");
          break;
        case LoginServerOPCode.TokenError:
          message.getU8(); // unknown value, todo
          this._onLoginError?.("Invalid authenticator token");
          break;
        case LoginServerOPCode.CharacterList:
          this.parseCharacterList(message);
          break;
        case LoginServerOPCode.ExtendedCharacterList:
          // TODO
          break;
        case LoginServerOPCode.Update: {
          this.parseUpdateNeeded(message);
          break;
        }
        case LoginServerOPCode.SessionKey:
          this.parseSessionKey(message);
          break;

        default: {
          logger.warn(`Invalid opcode ${opcode}`);
        }
      }
    }
  }

  private parseError(message: InputMessage) {
    const errorMessage = message.getString();
    logger.error(errorMessage);
    this._onLoginError?.(errorMessage);
  }

  private parseMotd(message: InputMessage) {
    const motd = message.getString();
    this._onMotd?.(motd);
  }

  private parseCharacterList(message: InputMessage) {
    const characters: Character[] = [];

    if (CLIENT_VERSION > 1010) {
      const worlds: Record<number, World> = {};

      const worldsCount = message.getU8();

      for (let i = 0; i < worldsCount; i++) {
        const id = message.getU8();
        worlds[id] = {
          name: message.getString(),
          ip: message.getString(),
          port: message.getU16(),
          previewState: message.getU8(),
        };
      }

      const charactersCount = message.getU8();

      for (let i = 0; i < charactersCount; i++) {
        const worldId = message.getU8();
        characters.push({
          name: message.getString(),
          worldName: worlds[worldId].name,
          worldIp: worlds[worldId].ip,
          worldPort: worlds[worldId].port,
          previewState: worlds[worldId].previewState,
        });
      }
    } else {
      const charactersCount = message.getU8();

      for (let i = 0; i < charactersCount; i++) {
        characters.push({
          name: message.getString(),
          worldName: message.getString(),
          worldIp: ipToString(message.getU32()),
          worldPort: message.getU16(),
          previewState: this._featureManager.getFeature(
            GameFeature.GamePreviewState
          )
            ? message.getU8()
            : undefined,
        });
      }
    }

    const account: Account = {} as Account;

    if (PROTOCOL_VERSION > 1077) {
      account.status = message.getU8();
      account.subStatus = message.getU8();
      account.premiumDays = message.getU32();

      if (account.premiumDays !== 0 && account.premiumDays !== 65535) {
        account.premiumDays = Math.floor(account.premiumDays / 86400);
      }
    } else {
      account.status = AccountStatus.Ok;
      account.premiumDays = message.getU16();
      account.status =
        account.premiumDays > 0
          ? SubscriptionStatus.Premium
          : SubscriptionStatus.Free;
    }

    this._onCharacterList?.(characters, account);
  }

  private parseSessionKey(message: InputMessage) {
    const sessionKey = message.getString();
    this._onSessionKey?.(sessionKey);
  }

  private parseUpdateNeeded(message: InputMessage) {
    const signature = message.getString();
    this._onUpdateNeeded?.(signature);
  }
}
