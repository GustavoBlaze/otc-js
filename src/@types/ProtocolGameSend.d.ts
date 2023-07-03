import { OutputMessage, Protocol } from "~/net";
import { Direction } from "~/constants";
import type Position from "~/client/Position";

export interface IProtocolGameSend {
  login(
    accountName: string,
    accountPassword: string,
    host: string,
    port: number,
    characterName: string,
    authenticatorToken: string,
    sessionKey: string
  ): void;
  sendLoginPacket(challengeTimestamp: number, challengeRandom: number): void;
  sendEnterGame(): void;
  sendLogout(): void;
  sendPing(): void;
  sendPingBack(): void;
  sendAutoWalk(path: Direction[]): void;
  sendWalkNorth(): void;
  sendWalkEast(): void;
  sendWalkSouth(): void;
  sendWalkWest(): void;
  sendStop(): void;
  sendWalkNorthEast(): void;
  sendWalkSouthEast(): void;
  sendWalkSouthWest(): void;
  sendWalkNorthWest(): void;
  sendTurnNorth(): void;
  sendTurnEast(): void;
  sendTurnSouth(): void;
  sendTurnWest(): void;
  sendEquipItem(itemId: number, countOrSubType: number): void;
  sendMove(fromPos: Position, thingId: number, stackpos: number, toPos: Position, count: number): void;
  sendInspectNpcTrade(itemId: number, count: number): void;
  sendBuyItem(
    itemId: number,
    subType: number,
    amount: number,
    ignoreCapacity: boolean,
    buyWithBackpack: boolean
  ): void;
  sendSellItem(itemId: number, subType: number, amount: number, ignoreEquipped: boolean): void;
  sendCloseNpcTrade(): void;
  sendRequestTrade(pos: Position, thingId: number, stackpos: number, creatureId: number): void;
  sendInspectTrade(counterOffer: boolean, index: number): void;
  sendAcceptTrade(): void;
  sendRejectTrade(): void;
  sendUseItem(position: Position, itemId: number, stackpos: number, index: number): void;
  sendUseItemWith(
    fromPos: Position,
    itemId: number,
    fromStackPos: number,
    toPos: Position,
    toThingId: number,
    toStackPos: number
  ): void;
  sendUseOnCreature(pos: Position, thingId: number, stackpos: number, creatureId: number): void;
  sendRotateItem(pos: Position, thingId: number, stackpos: number): void;
  sendCloseContainer(containerId: number): void;
  sendUpContainer(containerId: number): void;
  sendEditText(id: number, text: string): void;
}
