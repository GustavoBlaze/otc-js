import { Protocol, OutputMessage } from "~/net";
import createLogger from "~/utils/logger";
import { IProtocolGameSend } from "~/@types/ProtocolGameSend";
import { ClientOPCode, Direction, GameFeature } from "~/constants";
import { IProtocolGameParse } from "../@types/ProtocolGameParse.d";
import GameFeatureManager from "./GameFeatureManager";
import Position from "./Position";

const logger = createLogger("ProtocolGame");

type ProtocolGameParseAndSend = IProtocolGameSend & IProtocolGameParse;

const DIRECTION_MAP: Record<Direction, number> = {
  [Direction.East]: 1,
  [Direction.NorthEast]: 2,
  [Direction.North]: 3,
  [Direction.NorthWest]: 4,
  [Direction.West]: 5,
  [Direction.SouthWest]: 6,
  [Direction.South]: 7,
  [Direction.SouthEast]: 8,
  [Direction.InvalidDirection]: 0,
};

// @ts-expect-error
export default class ProtocolGame extends Protocol implements ProtocolGameParseAndSend {
  private _accountName?: string;

  private _accountPassword?: string;

  private _authenticatorToken?: string;

  private _sessionKey?: string;

  private _characterName?: string;

  private _firstReceive?: boolean;

  private _featureManager?: GameFeatureManager;

  static addPosition(msg: OutputMessage, position: Position) {
    msg.addU16(position.x);
    msg.addU16(position.y);
    msg.addU8(position.z);
  }

  sendEnterGame() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.EnterGame);
    this.send(msg);
  }

  sendLogout() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.LeaveGame);
    this.send(msg);
  }

  sendPing() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Ping);
    this.send(msg);
  }

  sendPingBack() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.PingBack);
    this.send(msg);
  }

  sendAutoWalk(path: Direction[]) {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.AutoWalk);
    msg.addU8(path.length);
    path.forEach((direction) => msg.addU8(DIRECTION_MAP[direction] ?? 0));
    this.send(msg);
  }

  sendWalkNorth() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkNorth);
    this.send(msg);
  }

  sendWalkEast() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkEast);
    this.send(msg);
  }

  sendWalkSouth() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkSouth);
    this.send(msg);
  }

  sendWalkWest() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkWest);
    this.send(msg);
  }

  sendStop() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Stop);
    this.send(msg);
  }

  sendWalkNorthEast() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkNorthEast);
    this.send(msg);
  }

  sendWalkSouthEast() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkSouthEast);
    this.send(msg);
  }

  sendWalkSouthWest() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkSouthWest);
    this.send(msg);
  }

  sendWalkNorthWest() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.WalkNorthWest);
    this.send(msg);
  }

  sendTurnNorth() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.TurnNorth);
    this.send(msg);
  }

  sendTurnEast() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.TurnEast);
    this.send(msg);
  }

  sendTurnSouth() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.TurnSouth);
    this.send(msg);
  }

  sendTurnWest() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.TurnWest);
    this.send(msg);
  }

  sendEquipItem(itemId: number, countOrSubType: number) {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.EquipItem);
    msg.addU16(itemId);
    msg.addU8(countOrSubType);
    this.send(msg);
  }

  sendMove(fromPos: Position, thingId: number, stackPos: number, toPos: Position, count: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Move);
    ProtocolGame.addPosition(msg, fromPos);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    ProtocolGame.addPosition(msg, toPos);
    msg.addU8(count);
    this.send(msg);
  }

  endInspectNpcTrade(itemId: number, count: number) {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.InspectNpcTrade);
    msg.addU16(itemId);
    msg.addU8(count);
    this.send(msg);
  }

  sendBuyItem(
    itemId: number,
    subType: number,
    amount: number,
    ignoreCapacity: boolean,
    buyWithBackpack: boolean
  ) {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.BuyItem);
    msg.addU16(itemId);
    msg.addU8(subType);
    msg.addU8(amount);
    msg.addU8(ignoreCapacity ? 0x01 : 0x00);
    msg.addU8(buyWithBackpack ? 0x01 : 0x00);
    this.send(msg);
  }

  sendSellItem(itemId: number, subType: number, amount: number, ignoreEquipped: boolean) {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.SellItem);
    msg.addU16(itemId);
    msg.addU8(subType);

    if (this._featureManager?.getFeature(GameFeature.GameDoubleShopSellAmount)) {
      msg.addU16(amount);
    } else {
      msg.addU8(amount);
    }

    msg.addU8(ignoreEquipped ? 0x01 : 0x00);
    this.send(msg);
  }

  sendCloseNpcTrade() {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CloseNpcTrade);
    this.send(msg);
  }
}
