import { MessageMode } from "~/constants";

export default class MessageModeManager {
  private _modes = new Map<MessageMode, number>();

  translateMessageModeFromServer(mode: number) {
    let result = MessageMode.MessageInvalid;

    for (const [key, value] of this._modes) {
      if (value === mode) {
        result = key;
        break;
      }
    }

    return result;
  }

  translateMessageModeToServer(mode: MessageMode) {
    if (mode < 0 || mode >= MessageMode.LastMessage) {
      return MessageMode.MessageInvalid;
    }

    const value = this._modes.get(mode);

    return value || MessageMode.MessageInvalid;
  }

  buildMessageMode(version: number) {
    this._modes.clear();

    if (version >= 1094) {
      this._modes.set(MessageMode.MessageMana, 43);
    }

    if (version >= 1055) {
      // might be 1054
      this._modes.set(MessageMode.MessageNone, 0);
      this._modes.set(MessageMode.MessageSay, 1);
      this._modes.set(MessageMode.MessageWhisper, 2);
      this._modes.set(MessageMode.MessageYell, 3);
      this._modes.set(MessageMode.MessagePrivateFrom, 4);
      this._modes.set(MessageMode.MessagePrivateTo, 5);
      this._modes.set(MessageMode.MessageChannelManagement, 6);
      this._modes.set(MessageMode.MessageChannel, 7);
      this._modes.set(MessageMode.MessageChannelHighlight, 8);
      this._modes.set(MessageMode.MessageSpell, 9);
      this._modes.set(MessageMode.MessageNpcFromStartBlock, 10);
      this._modes.set(MessageMode.MessageNpcFrom, 11);
      this._modes.set(MessageMode.MessageNpcTo, 12);
      this._modes.set(MessageMode.MessageGamemasterBroadcast, 13);
      this._modes.set(MessageMode.MessageGamemasterChannel, 14);
      this._modes.set(MessageMode.MessageGamemasterPrivateFrom, 15);
      this._modes.set(MessageMode.MessageGamemasterPrivateTo, 16);
      this._modes.set(MessageMode.MessageLogin, 17);
      this._modes.set(MessageMode.MessageWarning, 18); // Admin
      this._modes.set(MessageMode.MessageGame, 19);
      this._modes.set(MessageMode.MessageGameHighlight, 20);
      this._modes.set(MessageMode.MessageFailure, 21);
      this._modes.set(MessageMode.MessageLook, 22);
      this._modes.set(MessageMode.MessageDamageDealed, 23);
      this._modes.set(MessageMode.MessageDamageReceived, 24);
      this._modes.set(MessageMode.MessageHeal, 25);
      this._modes.set(MessageMode.MessageExp, 26);
      this._modes.set(MessageMode.MessageDamageOthers, 27);
      this._modes.set(MessageMode.MessageHealOthers, 28);
      this._modes.set(MessageMode.MessageExpOthers, 29);
      this._modes.set(MessageMode.MessageStatus, 30);
      this._modes.set(MessageMode.MessageLoot, 31);
      this._modes.set(MessageMode.MessageTradeNpc, 32);
      this._modes.set(MessageMode.MessageGuild, 33);
      this._modes.set(MessageMode.MessagePartyManagement, 34);
      this._modes.set(MessageMode.MessageParty, 35);
      this._modes.set(MessageMode.MessageBarkLow, 36);
      this._modes.set(MessageMode.MessageBarkLoud, 37);
      this._modes.set(MessageMode.MessageReport, 38);
      this._modes.set(MessageMode.MessageHotkeyUse, 39);
      this._modes.set(MessageMode.MessageTutorialHint, 40);
      this._modes.set(MessageMode.MessageThankyou, 41);
      this._modes.set(MessageMode.MessageMarket, 42);
    } else if (version >= 1041) {
      this._modes.set(MessageMode.MessageNone, 0);
      this._modes.set(MessageMode.MessageSay, 1);
      this._modes.set(MessageMode.MessageWhisper, 2);
      this._modes.set(MessageMode.MessageYell, 3);
      this._modes.set(MessageMode.MessagePrivateFrom, 4);
      this._modes.set(MessageMode.MessagePrivateTo, 5);
      this._modes.set(MessageMode.MessageChannelManagement, 6);
      this._modes.set(MessageMode.MessageChannel, 7);
      this._modes.set(MessageMode.MessageChannelHighlight, 8);
      this._modes.set(MessageMode.MessageSpell, 9);
      this._modes.set(MessageMode.MessageNpcFromStartBlock, 10);
      this._modes.set(MessageMode.MessageNpcFrom, 11);
      this._modes.set(MessageMode.MessageNpcTo, 12);
      this._modes.set(MessageMode.MessageGamemasterBroadcast, 13);
      this._modes.set(MessageMode.MessageGamemasterChannel, 14);
      this._modes.set(MessageMode.MessageGamemasterPrivateFrom, 15);
      this._modes.set(MessageMode.MessageGamemasterPrivateTo, 16);
      this._modes.set(MessageMode.MessageLogin, 17);
      this._modes.set(MessageMode.MessageWarning, 18); // Admin
      this._modes.set(MessageMode.MessageGame, 19);
      this._modes.set(MessageMode.MessageFailure, 20);
      this._modes.set(MessageMode.MessageLook, 21);
      this._modes.set(MessageMode.MessageDamageDealed, 22);
      this._modes.set(MessageMode.MessageDamageReceived, 23);
      this._modes.set(MessageMode.MessageHeal, 24);
      this._modes.set(MessageMode.MessageExp, 25);
      this._modes.set(MessageMode.MessageDamageOthers, 26);
      this._modes.set(MessageMode.MessageHealOthers, 27);
      this._modes.set(MessageMode.MessageExpOthers, 28);
      this._modes.set(MessageMode.MessageStatus, 29);
      this._modes.set(MessageMode.MessageLoot, 30);
      this._modes.set(MessageMode.MessageTradeNpc, 31);
      this._modes.set(MessageMode.MessageGuild, 32);
      this._modes.set(MessageMode.MessagePartyManagement, 33);
      this._modes.set(MessageMode.MessageParty, 34);
      this._modes.set(MessageMode.MessageBarkLow, 35);
      this._modes.set(MessageMode.MessageBarkLoud, 36);
      this._modes.set(MessageMode.MessageReport, 37);
      this._modes.set(MessageMode.MessageHotkeyUse, 38);
      this._modes.set(MessageMode.MessageTutorialHint, 49);
      this._modes.set(MessageMode.MessageThankyou, 40);
      this._modes.set(MessageMode.MessageMarket, 41);
    } else if (version >= 1036) {
      for (
        let i = MessageMode.MessageNone;
        i <= MessageMode.MessageBeyondLast;
        ++i
      ) {
        this._modes.set(i, i >= MessageMode.MessageNpcTo ? i + 1 : i);
      }
    } else if (version >= 900) {
      for (
        let i = MessageMode.MessageNone;
        i <= MessageMode.MessageBeyondLast;
        ++i
      ) {
        this._modes.set(i, i);
      }
    } else if (version >= 861) {
      this._modes.set(MessageMode.MessageNone, 0);
      this._modes.set(MessageMode.MessageSay, 1);
      this._modes.set(MessageMode.MessageWhisper, 2);
      this._modes.set(MessageMode.MessageYell, 3);
      this._modes.set(MessageMode.MessageNpcTo, 4);
      this._modes.set(MessageMode.MessageNpcFrom, 5);
      this._modes.set(MessageMode.MessagePrivateFrom, 6);
      this._modes.set(MessageMode.MessagePrivateTo, 6);
      this._modes.set(MessageMode.MessageChannel, 7);
      this._modes.set(MessageMode.MessageChannelManagement, 8);
      this._modes.set(MessageMode.MessageGamemasterBroadcast, 9);
      this._modes.set(MessageMode.MessageGamemasterChannel, 10);
      this._modes.set(MessageMode.MessageGamemasterPrivateFrom, 11);
      this._modes.set(MessageMode.MessageGamemasterPrivateTo, 11);
      this._modes.set(MessageMode.MessageChannelHighlight, 12);
      this._modes.set(MessageMode.MessageMonsterSay, 13);
      this._modes.set(MessageMode.MessageMonsterYell, 14);
      this._modes.set(MessageMode.MessageWarning, 15);
      this._modes.set(MessageMode.MessageGame, 16);
      this._modes.set(MessageMode.MessageLogin, 17);
      this._modes.set(MessageMode.MessageStatus, 18);
      this._modes.set(MessageMode.MessageLook, 19);
      this._modes.set(MessageMode.MessageFailure, 20);
      this._modes.set(MessageMode.MessageBlue, 21);
      this._modes.set(MessageMode.MessageRed, 22);
    } else if (version >= 840) {
      this._modes.set(MessageMode.MessageNone, 0);
      this._modes.set(MessageMode.MessageSay, 1);
      this._modes.set(MessageMode.MessageWhisper, 2);
      this._modes.set(MessageMode.MessageYell, 3);
      this._modes.set(MessageMode.MessageNpcTo, 4);
      this._modes.set(MessageMode.MessageNpcFromStartBlock, 5);
      this._modes.set(MessageMode.MessagePrivateFrom, 6);
      this._modes.set(MessageMode.MessagePrivateTo, 6);
      this._modes.set(MessageMode.MessageChannel, 7);
      this._modes.set(MessageMode.MessageChannelManagement, 8);
      this._modes.set(MessageMode.MessageRVRChannel, 9);
      this._modes.set(MessageMode.MessageRVRAnswer, 10);
      this._modes.set(MessageMode.MessageRVRContinue, 11);
      this._modes.set(MessageMode.MessageGamemasterBroadcast, 12);
      this._modes.set(MessageMode.MessageGamemasterChannel, 13);
      this._modes.set(MessageMode.MessageGamemasterPrivateFrom, 14);
      this._modes.set(MessageMode.MessageGamemasterPrivateTo, 14);
      this._modes.set(MessageMode.MessageChannelHighlight, 15);
      // 16, 17 ??
      this._modes.set(MessageMode.MessageRed, 18);
      this._modes.set(MessageMode.MessageMonsterSay, 19);
      this._modes.set(MessageMode.MessageMonsterYell, 20);
      this._modes.set(MessageMode.MessageWarning, 21);
      this._modes.set(MessageMode.MessageGame, 22);
      this._modes.set(MessageMode.MessageLogin, 23);
      this._modes.set(MessageMode.MessageStatus, 24);
      this._modes.set(MessageMode.MessageLook, 25);
      this._modes.set(MessageMode.MessageFailure, 26);
      this._modes.set(MessageMode.MessageBlue, 27);
    } else if (version >= 760) {
      this._modes.set(MessageMode.MessageNone, 0);
      this._modes.set(MessageMode.MessageSay, 1);
      this._modes.set(MessageMode.MessageWhisper, 2);
      this._modes.set(MessageMode.MessageYell, 3);
      this._modes.set(MessageMode.MessagePrivateFrom, 4);
      this._modes.set(MessageMode.MessagePrivateTo, 4);
      this._modes.set(MessageMode.MessageChannel, 5);
      this._modes.set(MessageMode.MessageRVRChannel, 6);
      this._modes.set(MessageMode.MessageRVRAnswer, 7);
      this._modes.set(MessageMode.MessageRVRContinue, 8);
      this._modes.set(MessageMode.MessageGamemasterBroadcast, 9);
      this._modes.set(MessageMode.MessageGamemasterChannel, 10);
      this._modes.set(MessageMode.MessageGamemasterPrivateFrom, 11);
      this._modes.set(MessageMode.MessageGamemasterPrivateTo, 11);
      this._modes.set(MessageMode.MessageChannelHighlight, 12);
      // 13, 14, 15 ??
      this._modes.set(MessageMode.MessageMonsterSay, 16);
      this._modes.set(MessageMode.MessageMonsterYell, 17);
      this._modes.set(MessageMode.MessageWarning, 18);
      this._modes.set(MessageMode.MessageGame, 19);
      this._modes.set(MessageMode.MessageLogin, 20);
      this._modes.set(MessageMode.MessageStatus, 21);
      this._modes.set(MessageMode.MessageLook, 22);
      this._modes.set(MessageMode.MessageFailure, 23);
      this._modes.set(MessageMode.MessageBlue, 24);
      this._modes.set(MessageMode.MessageRed, 25);
    }
  }
}
