import { ItemAttr } from "~/constants";
import Position from "./Position";
import Thing from "./Thing";

export default class Item extends Thing {
  private _clientId: uint16 = 0;

  private _serverId: uint16 = 0;

  private _countOrSubType: uint8 = 0;

  private _attributes = new Map<ItemAttr, uint8 | uint16 | string | Position>();

  private _async = false;

  private _phase: uint8 = 0;

  // private _lastPhase: number;

  isItem() {
    return true;
  }
}
