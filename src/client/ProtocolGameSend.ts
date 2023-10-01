import { IProtocolGameSend } from "~/@types/ProtocolGameSend";
import { OutputMessage } from "~/net";
import {
  ChaseMode,
  ClientOPCode,
  Direction,
  FightMode,
  GameFeature,
  MessageMode,
  PVPMode,
  StoreProductType,
} from "~/constants";
import createLogger from "~/utils/logger";
import type ProtocolGame from "./ProtocolGame";
import Position from "./Position";
import { g_feature, g_messageMode } from "./globals";

const logger = createLogger("ProtocolGameSend");

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

function addPosition(msg: OutputMessage, position: Position) {
  msg.addU16(position.x);
  msg.addU16(position.y);
  msg.addU8(position.z);
}

export default class ProtocolGameSend implements IProtocolGameSend {
  private protocol: ProtocolGame;

  constructor(protocol: ProtocolGame) {
    this.protocol = protocol;
  }

  private send(OutputMessage: OutputMessage) {
    this.protocol.send(OutputMessage);
  }

  login(
    accountName: string,
    accountPassword: string,
    host: string,
    port: number,
    characterName: string,
    authenticatorToken: string,
    sessionKey: string
  ): void {
    throw new Error("Method not implemented.");
  }

  sendLoginPacket(challengeTimestamp: number, challengeRandom: number): void {
    throw new Error("Method not implemented.");
  }

  sendInspectNpcTrade(itemId: number, count: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.InspectNpcTrade);
    msg.addU16(itemId);
    msg.addU8(count);
    this.send(msg);
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
    addPosition(msg, fromPos);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    addPosition(msg, toPos);
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

    if (g_feature.getFeature(GameFeature.GameDoubleShopSellAmount)) {
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

  sendRequestTrade(pos: Position, thingId: number, stackPos: number, creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestTrade);
    addPosition(msg, pos);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendInspectTrade(counterOffer: boolean, index: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.InspectTrade);
    msg.addU8(counterOffer ? 0x01 : 0x00);
    msg.addU8(index);
    this.send(msg);
  }

  sendAcceptTrade(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.AcceptTrade);
    this.send(msg);
  }

  sendRejectTrade(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RejectTrade);
    this.send(msg);
  }

  sendUseItem(position: Position, itemId: number, stackPos: number, index: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.UseItem);
    addPosition(msg, position);
    msg.addU16(itemId);
    msg.addU8(stackPos);
    msg.addU8(index);
    this.send(msg);
  }

  sendUseItemWith(
    fromPos: Position,
    itemId: number,
    fromStackPos: number,
    toPos: Position,
    toThingId: number,
    toStackPos: number
  ): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.UseItemWith);
    addPosition(msg, fromPos);
    msg.addU16(itemId);
    msg.addU8(fromStackPos);
    addPosition(msg, toPos);
    msg.addU16(toThingId);
    msg.addU8(toStackPos);
    this.send(msg);
  }

  sendUseOnCreature(pos: Position, thingId: number, stackPos: number, creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.UseOnCreature);
    addPosition(msg, pos);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendRotateItem(pos: Position, thingId: number, stackPos: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RotateItem);
    addPosition(msg, pos);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    this.send(msg);
  }

  sendCloseContainer(containerId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CloseContainer);
    msg.addU8(containerId);
    this.send(msg);
  }

  sendUpContainer(containerId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.UpContainer);
    msg.addU8(containerId);
    this.send(msg);
  }

  sendEditText(id: number, text: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.EditText);
    msg.addU32(id);
    msg.addString(text);
    this.send(msg);
  }

  sendEditList(id: number, doorId: number, text: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.EditList);
    msg.addU8(doorId);
    msg.addU32(id);
    msg.addString(text);
    this.send(msg);
  }

  sendLook(position: Position, thingId: number, stackPos: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Look);
    addPosition(msg, position);
    msg.addU16(thingId);
    msg.addU8(stackPos);
    this.send(msg);
  }

  sendLookCreature(creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.LookCreature);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendTalk(mode: MessageMode, channelId: number, receiver: string, message: string): void {
    if (message.length === 0) {
      return;
    }

    if (message.length > 255) {
      console.error("message too large");
      return;
    }

    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Talk);
    msg.addU8(g_messageMode.translateMessageModeToServer(mode));

    switch (mode) {
      case MessageMode.PrivateTo:
      case MessageMode.GamemasterPrivateTo:
      case MessageMode.RVRAnswer:
        msg.addString(receiver);
        break;
      case MessageMode.Channel:
      case MessageMode.ChannelHighlight:
      case MessageMode.ChannelManagement:
      case MessageMode.GamemasterChannel:
        msg.addU16(channelId);
        break;
      default:
        break;
    }

    msg.addString(message);
    this.send(msg);
  }

  sendJoinChannel(channelId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.JoinChannel);
    msg.addU16(channelId);
    this.send(msg);
  }

  sendLeaveChannel(channelId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.LeaveChannel);
    msg.addU16(channelId);
    this.send(msg);
  }

  sendOpenPrivateChannel(receiver: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.OpenPrivateChannel);
    msg.addString(receiver);
    this.send(msg);
  }

  sendOpenRuleViolation(reporter: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.OpenRuleViolation);
    msg.addString(reporter);
    this.send(msg);
  }

  sendCloseRuleViolation(reporter: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CloseRuleViolation);
    msg.addString(reporter);
    this.send(msg);
  }

  sendCancelRuleViolation(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CancelRuleViolation);
    this.send(msg);
  }

  sendCloseNpcChannel(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CloseNpcChannel);
    this.send(msg);
  }

  sendChangeFightModes(
    fightMode: FightMode,
    chaseMode: ChaseMode,
    safeFight: boolean,
    pvpMode: PVPMode
  ): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.ChangeFightModes);
    msg.addU8(fightMode);
    msg.addU8(chaseMode);
    msg.addU8(safeFight ? 0x01 : 0x00);
    if (g_feature.getFeature(GameFeature.GamePVPMode)) {
      msg.addU8(pvpMode);
    }
    this.send(msg);
  }

  sendAttack(creatureId: number, seq?: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Attack);
    msg.addU32(creatureId);
    if (g_feature.getFeature(GameFeature.GameAttackSeq)) {
      // @ts-expect-error
      msg.addU32(seq);
    }
    this.send(msg);
  }

  sendFollow(creatureId: number, seq?: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.Follow);
    msg.addU32(creatureId);
    if (g_feature.getFeature(GameFeature.GameAttackSeq)) {
      // @ts-expect-error
      msg.addU32(seq);
    }
    this.send(msg);
  }

  sendInviteToParty(creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.InviteToParty);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendJoinParty(creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.JoinParty);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendRevokeInvitation(creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RevokeInvitation);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendPassLeadership(creatureId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.PassLeadership);
    msg.addU32(creatureId);
    this.send(msg);
  }

  sendLeaveParty(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.LeaveParty);
    this.send(msg);
  }

  sendShareExperience(active: boolean): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.ShareExperience);
    msg.addU8(active ? 0x01 : 0x00);
    if (g_feature.clientVersion < 910) {
      msg.addU8(0);
    }
    this.send(msg);
  }

  sendOpenOwnChannel(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.OpenOwnChannel);
    this.send(msg);
  }

  sendInviteToOwnChannel(name: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.InviteToOwnChannel);
    msg.addString(name);
    this.send(msg);
  }

  sendExcludeFromOwnChannel(name: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.ExcludeFromOwnChannel);
    msg.addString(name);
    this.send(msg);
  }

  sendCancelAttackAndFollow(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.CancelAttackAndFollow);
    this.send(msg);
  }

  sendRefreshContainer(containerId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RefreshContainer);
    msg.addU8(containerId);
    this.send(msg);
  }

  sendRequestOutfit(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestOutfit);
    this.send(msg);
  }

  // TODO
  // sendChangeOutfit(outfit: Outfit): void {
  //   const msg = new OutputMessage();
  //   msg.addU8(ClientOPCode.ChangeOutfit);
  //   if (g_feature.getFeature(GameFeature.GameLooktypeU16)) {
  //     msg.addU16(outfit.getId());
  //   } else {
  //     msg.addU8(outfit.getId());
  //   }
  //   msg.addU8(outfit.getHead());
  //   msg.addU8(outfit.getBody());
  //   msg.addU8(outfit.getLegs());
  //   msg.addU8(outfit.getFeet());
  //   if (g_feature.getFeature(GameFeature.GamePlayerAddons)) {
  //     msg.addU8(outfit.getAddons());
  //   }
  //   if (g_feature.getFeature(GameFeature.GamePlayerMounts)) {
  //     msg.addU16(outfit.getMount());
  //   }
  //   this.send(msg);
  // }

  sendMountStatus(mount: boolean): void {
    if (g_feature.getFeature(GameFeature.GamePlayerMounts)) {
      const msg = new OutputMessage();
      msg.addU8(ClientOPCode.Mount);
      msg.addU8(Number(mount));
      this.send(msg);
    } else {
      logger.error("ProtocolGame::sendMountStatus does not support the current protocol.");
    }
  }

  sendAddVip(name: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.AddVip);
    msg.addString(name);
    this.send(msg);
  }

  sendRemoveVip(playerId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RemoveVip);
    msg.addU32(playerId);
    this.send(msg);
  }

  sendEditVip(playerId: number, description: string, iconId: number, notifyLogin: boolean): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.EditVip);
    msg.addU32(playerId);
    msg.addString(description);
    msg.addU32(iconId);
    msg.addU8(Number(notifyLogin));
    this.send(msg);
  }

  sendBugReport(comment: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.BugReport);
    msg.addString(comment);
    this.send(msg);
  }

  sendRuleViolation(
    target: string,
    reason: number,
    action: number,
    comment: string,
    statement: string,
    statementId: number,
    ipBanishment: boolean
  ): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RuleViolation);
    msg.addString(target);
    msg.addU8(reason);
    msg.addU8(action);
    msg.addString(comment);
    msg.addString(statement);
    msg.addU16(statementId);
    msg.addU8(Number(ipBanishment));
    this.send(msg);
  }

  sendDebugReport(a: string, b: string, c: string, d: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.DebugReport);
    msg.addString(a);
    msg.addString(b);
    msg.addString(c);
    msg.addString(d);
    this.send(msg);
  }

  sendRequestQuestLog(): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestQuestLog);
    this.send(msg);
  }

  sendRequestQuestLine(questId: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestQuestLine);
    msg.addU16(questId);
    this.send(msg);
  }

  sendNewNewRuleViolation(
    reason: number,
    action: number,
    characterName: string,
    comment: string,
    translation: string
  ): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.NewRuleViolation);
    msg.addU8(reason);
    msg.addU8(action);
    msg.addString(characterName);
    msg.addString(comment);
    msg.addString(translation);
    this.send(msg);
  }

  sendRequestItemInfo(itemId: number, subType: number, index: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestItemInfo);
    msg.addU8(subType);
    msg.addU16(itemId);
    msg.addU8(index);
    this.send(msg);
  }

  sendAnswerModalDialog(dialog: number, button: number, choice: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.AnswerModalDialog);
    msg.addU32(dialog);
    msg.addU8(button);
    msg.addU8(choice);
    this.send(msg);
  }

  sendBrowseField(position: Position): void {
    if (!g_feature.getFeature(GameFeature.GameBrowseField)) {
      return;
    }

    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.BrowseField);
    addPosition(msg, position);
    this.send(msg);
  }

  sendSeekInContainer(cid: number, index: number): void {
    if (!g_feature.getFeature(GameFeature.GameContainerPagination)) {
      return;
    }

    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.SeekInContainer);
    msg.addU8(cid);
    msg.addU16(index);
    this.send(msg);
  }

  sendBuyStoreOffer(offerId: number, productType: number, name?: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.BuyStoreOffer);
    msg.addU32(offerId);
    msg.addU8(productType);

    if (productType === StoreProductType.ProductTypeNameChange) {
      // @ts-expect-error
      msg.addString(name);
    }

    this.send(msg);
  }

  sendRequestTransactionHistory(page: number, entriesPerPage: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestTransactionHistory);
    if (g_feature.clientVersion <= 1096) {
      msg.addU16(page);
      msg.addU32(entriesPerPage);
    } else {
      msg.addU32(page);
      msg.addU8(entriesPerPage);
    }
    this.send(msg);
  }

  sendRequestStoreOffers(categoryName: string, serviceType: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.RequestStoreOffers);
    if (g_feature.getFeature(GameFeature.GameInGameStoreServiceType)) {
      msg.addU8(serviceType);
    }
    msg.addString(categoryName);
    this.send(msg);
  }

  sendOpenStore(serviceType: number, category: string): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.OpenStore);
    if (g_feature.getFeature(GameFeature.GameInGameStoreServiceType)) {
      msg.addU8(serviceType);
      msg.addString(category);
    }
    this.send(msg);
  }

  sendTransferCoins(recipient: string, amount: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.TransferCoins);
    msg.addString(recipient);
    msg.addU16(amount);
    this.send(msg);
  }

  sendOpenTransactionHistory(entriesPerPage: number): void {
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.OpenTransactionHistory);
    msg.addU8(entriesPerPage);
    this.send(msg);
  }

  sendChangeMapAwareRange(xRange: number, yRange: number): void {
    if (!g_feature.getFeature(GameFeature.GameChangeMapAwareRange)) {
      return;
    }
    const msg = new OutputMessage();
    msg.addU8(ClientOPCode.ChangeMapAwareRange);
    msg.addU8(xRange);
    msg.addU8(yRange);
    this.send(msg);
  }
}
