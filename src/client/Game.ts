import { ChaseMode, Direction, FightMode, PVPMode } from "~/constants";
import { g_feature, g_messageMode } from "./globals";

export default class Game {
  private _clientVersion = 0;

  private _protocolVersion = 0;

  private _online = false;

  private _dead = false;

  private _expertPVPMode = false;

  private _ping = 0;

  private _pingSent = 0;

  private _pingReceived = 0;

  // private _pingTimer: any = null;
  // private _dashTimer: any = null;
  // private _seq: any = null;
  // private _pingDelay = 0;
  private _fightMode?: FightMode;

  private _chaseMode?: ChaseMode;

  private _PVPMode?: PVPMode;

  private _lastWalkDir?: Direction;

  // private _unjustifiedPoints?: Object;
  // private _openPVPSituations?: number;
  private _safeFight: boolean = false;

  get features() {
    return g_feature;
  }

  get isOnline(): Boolean {
    return this._online;
  }

  get clientVersion() {
    return this._clientVersion;
  }

  get protocolVersion() {
    return this._protocolVersion;
  }

  setClientVersion(version: number) {
    if (this.clientVersion === version) return;

    if (this.isOnline) {
      throw new Error("[Game]: Cannot change client version while online.");
    }

    this.features.setupFeaturesBasedOnClientVersion(version);

    this._clientVersion = version;
  }

  setProtocolVersion(version: number) {
    if (this.protocolVersion === version) return;

    if (this.isOnline) {
      throw new Error("[Game]: Cannot change protocol version while online.");
    }

    this._protocolVersion = version;
    g_messageMode.buildMessageMode(version);
  }
}
