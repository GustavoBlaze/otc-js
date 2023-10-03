import { Protocol } from "~/net";
import createLogger from "~/utils/logger";
import { IProtocolGameSend } from "~/@types/ProtocolGameSend";
import { IProtocolGameParse } from "../@types/ProtocolGameParse.d";
import ProtocolGameSend from "./ProtocolGameSend";

const logger = createLogger("ProtocolGame");

type ProtocolGameParseAndSend = IProtocolGameSend & IProtocolGameParse;

// @ts-expect-error
export default class ProtocolGame extends Protocol implements ProtocolGameParseAndSend {
  private _accountName?: string;

  private _accountPassword?: string;

  private _authenticatorToken?: string;

  private _sessionKey?: string;

  private _characterName?: string;

  private _firstReceive?: boolean;

  private _sender = new ProtocolGameSend(this);
}
