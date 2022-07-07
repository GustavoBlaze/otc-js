import { Protocol } from "~/net";

export default class ProtocolGame extends Protocol {
  private _accountName?: string;
  private _accountPassword?: string;
  private _authenticatorToken?: string;
  private _sessionKey?: string;
  private _characterName?: string;
}
