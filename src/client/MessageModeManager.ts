/* eslint-disable no-restricted-syntax */
import { MessageMode } from "~/constants";

export default class MessageModeManager {
  private _modes = new Map<MessageMode, number>();

  translateMessageModeFromServer(mode: number) {
    let result = MessageMode.Invalid;

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
      return MessageMode.Invalid;
    }

    const value = this._modes.get(mode);

    return value || MessageMode.Invalid;
  }

  buildMessageMode(version: number) {
    this._modes.clear();

    if (version >= 1094) {
      this._modes.set(MessageMode.Mana, 43);
    }

    if (version >= 1055) {
      // might be 1054
      this._modes.set(MessageMode.None, 0);
      this._modes.set(MessageMode.Say, 1);
      this._modes.set(MessageMode.Whisper, 2);
      this._modes.set(MessageMode.Yell, 3);
      this._modes.set(MessageMode.PrivateFrom, 4);
      this._modes.set(MessageMode.PrivateTo, 5);
      this._modes.set(MessageMode.ChannelManagement, 6);
      this._modes.set(MessageMode.Channel, 7);
      this._modes.set(MessageMode.ChannelHighlight, 8);
      this._modes.set(MessageMode.Spell, 9);
      this._modes.set(MessageMode.NpcFromStartBlock, 10);
      this._modes.set(MessageMode.NpcFrom, 11);
      this._modes.set(MessageMode.NpcTo, 12);
      this._modes.set(MessageMode.GamemasterBroadcast, 13);
      this._modes.set(MessageMode.GamemasterChannel, 14);
      this._modes.set(MessageMode.GamemasterPrivateFrom, 15);
      this._modes.set(MessageMode.GamemasterPrivateTo, 16);
      this._modes.set(MessageMode.Login, 17);
      this._modes.set(MessageMode.Warning, 18); // Admin
      this._modes.set(MessageMode.Game, 19);
      this._modes.set(MessageMode.GameHighlight, 20);
      this._modes.set(MessageMode.Failure, 21);
      this._modes.set(MessageMode.Look, 22);
      this._modes.set(MessageMode.DamageDealed, 23);
      this._modes.set(MessageMode.DamageReceived, 24);
      this._modes.set(MessageMode.Heal, 25);
      this._modes.set(MessageMode.Exp, 26);
      this._modes.set(MessageMode.DamageOthers, 27);
      this._modes.set(MessageMode.HealOthers, 28);
      this._modes.set(MessageMode.ExpOthers, 29);
      this._modes.set(MessageMode.Status, 30);
      this._modes.set(MessageMode.Loot, 31);
      this._modes.set(MessageMode.TradeNpc, 32);
      this._modes.set(MessageMode.Guild, 33);
      this._modes.set(MessageMode.PartyManagement, 34);
      this._modes.set(MessageMode.Party, 35);
      this._modes.set(MessageMode.BarkLow, 36);
      this._modes.set(MessageMode.BarkLoud, 37);
      this._modes.set(MessageMode.Report, 38);
      this._modes.set(MessageMode.HotkeyUse, 39);
      this._modes.set(MessageMode.TutorialHint, 40);
      this._modes.set(MessageMode.Thankyou, 41);
      this._modes.set(MessageMode.Market, 42);
    } else if (version >= 1041) {
      this._modes.set(MessageMode.None, 0);
      this._modes.set(MessageMode.Say, 1);
      this._modes.set(MessageMode.Whisper, 2);
      this._modes.set(MessageMode.Yell, 3);
      this._modes.set(MessageMode.PrivateFrom, 4);
      this._modes.set(MessageMode.PrivateTo, 5);
      this._modes.set(MessageMode.ChannelManagement, 6);
      this._modes.set(MessageMode.Channel, 7);
      this._modes.set(MessageMode.ChannelHighlight, 8);
      this._modes.set(MessageMode.Spell, 9);
      this._modes.set(MessageMode.NpcFromStartBlock, 10);
      this._modes.set(MessageMode.NpcFrom, 11);
      this._modes.set(MessageMode.NpcTo, 12);
      this._modes.set(MessageMode.GamemasterBroadcast, 13);
      this._modes.set(MessageMode.GamemasterChannel, 14);
      this._modes.set(MessageMode.GamemasterPrivateFrom, 15);
      this._modes.set(MessageMode.GamemasterPrivateTo, 16);
      this._modes.set(MessageMode.Login, 17);
      this._modes.set(MessageMode.Warning, 18); // Admin
      this._modes.set(MessageMode.Game, 19);
      this._modes.set(MessageMode.Failure, 20);
      this._modes.set(MessageMode.Look, 21);
      this._modes.set(MessageMode.DamageDealed, 22);
      this._modes.set(MessageMode.DamageReceived, 23);
      this._modes.set(MessageMode.Heal, 24);
      this._modes.set(MessageMode.Exp, 25);
      this._modes.set(MessageMode.DamageOthers, 26);
      this._modes.set(MessageMode.HealOthers, 27);
      this._modes.set(MessageMode.ExpOthers, 28);
      this._modes.set(MessageMode.Status, 29);
      this._modes.set(MessageMode.Loot, 30);
      this._modes.set(MessageMode.TradeNpc, 31);
      this._modes.set(MessageMode.Guild, 32);
      this._modes.set(MessageMode.PartyManagement, 33);
      this._modes.set(MessageMode.Party, 34);
      this._modes.set(MessageMode.BarkLow, 35);
      this._modes.set(MessageMode.BarkLoud, 36);
      this._modes.set(MessageMode.Report, 37);
      this._modes.set(MessageMode.HotkeyUse, 38);
      this._modes.set(MessageMode.TutorialHint, 49);
      this._modes.set(MessageMode.Thankyou, 40);
      this._modes.set(MessageMode.Market, 41);
    } else if (version >= 1036) {
      for (let i = MessageMode.None; i <= MessageMode.BeyondLast; ++i) {
        this._modes.set(i, i >= MessageMode.NpcTo ? i + 1 : i);
      }
    } else if (version >= 900) {
      for (let i = MessageMode.None; i <= MessageMode.BeyondLast; ++i) {
        this._modes.set(i, i);
      }
    } else if (version >= 861) {
      this._modes.set(MessageMode.None, 0);
      this._modes.set(MessageMode.Say, 1);
      this._modes.set(MessageMode.Whisper, 2);
      this._modes.set(MessageMode.Yell, 3);
      this._modes.set(MessageMode.NpcTo, 4);
      this._modes.set(MessageMode.NpcFrom, 5);
      this._modes.set(MessageMode.PrivateFrom, 6);
      this._modes.set(MessageMode.PrivateTo, 6);
      this._modes.set(MessageMode.Channel, 7);
      this._modes.set(MessageMode.ChannelManagement, 8);
      this._modes.set(MessageMode.GamemasterBroadcast, 9);
      this._modes.set(MessageMode.GamemasterChannel, 10);
      this._modes.set(MessageMode.GamemasterPrivateFrom, 11);
      this._modes.set(MessageMode.GamemasterPrivateTo, 11);
      this._modes.set(MessageMode.ChannelHighlight, 12);
      this._modes.set(MessageMode.MonsterSay, 13);
      this._modes.set(MessageMode.MonsterYell, 14);
      this._modes.set(MessageMode.Warning, 15);
      this._modes.set(MessageMode.Game, 16);
      this._modes.set(MessageMode.Login, 17);
      this._modes.set(MessageMode.Status, 18);
      this._modes.set(MessageMode.Look, 19);
      this._modes.set(MessageMode.Failure, 20);
      this._modes.set(MessageMode.Blue, 21);
      this._modes.set(MessageMode.Red, 22);
    } else if (version >= 840) {
      this._modes.set(MessageMode.None, 0);
      this._modes.set(MessageMode.Say, 1);
      this._modes.set(MessageMode.Whisper, 2);
      this._modes.set(MessageMode.Yell, 3);
      this._modes.set(MessageMode.NpcTo, 4);
      this._modes.set(MessageMode.NpcFromStartBlock, 5);
      this._modes.set(MessageMode.PrivateFrom, 6);
      this._modes.set(MessageMode.PrivateTo, 6);
      this._modes.set(MessageMode.Channel, 7);
      this._modes.set(MessageMode.ChannelManagement, 8);
      this._modes.set(MessageMode.RVRChannel, 9);
      this._modes.set(MessageMode.RVRAnswer, 10);
      this._modes.set(MessageMode.RVRContinue, 11);
      this._modes.set(MessageMode.GamemasterBroadcast, 12);
      this._modes.set(MessageMode.GamemasterChannel, 13);
      this._modes.set(MessageMode.GamemasterPrivateFrom, 14);
      this._modes.set(MessageMode.GamemasterPrivateTo, 14);
      this._modes.set(MessageMode.ChannelHighlight, 15);
      // 16, 17 ??
      this._modes.set(MessageMode.Red, 18);
      this._modes.set(MessageMode.MonsterSay, 19);
      this._modes.set(MessageMode.MonsterYell, 20);
      this._modes.set(MessageMode.Warning, 21);
      this._modes.set(MessageMode.Game, 22);
      this._modes.set(MessageMode.Login, 23);
      this._modes.set(MessageMode.Status, 24);
      this._modes.set(MessageMode.Look, 25);
      this._modes.set(MessageMode.Failure, 26);
      this._modes.set(MessageMode.Blue, 27);
    } else if (version >= 760) {
      this._modes.set(MessageMode.None, 0);
      this._modes.set(MessageMode.Say, 1);
      this._modes.set(MessageMode.Whisper, 2);
      this._modes.set(MessageMode.Yell, 3);
      this._modes.set(MessageMode.PrivateFrom, 4);
      this._modes.set(MessageMode.PrivateTo, 4);
      this._modes.set(MessageMode.Channel, 5);
      this._modes.set(MessageMode.RVRChannel, 6);
      this._modes.set(MessageMode.RVRAnswer, 7);
      this._modes.set(MessageMode.RVRContinue, 8);
      this._modes.set(MessageMode.GamemasterBroadcast, 9);
      this._modes.set(MessageMode.GamemasterChannel, 10);
      this._modes.set(MessageMode.GamemasterPrivateFrom, 11);
      this._modes.set(MessageMode.GamemasterPrivateTo, 11);
      this._modes.set(MessageMode.ChannelHighlight, 12);
      // 13, 14, 15 ??
      this._modes.set(MessageMode.MonsterSay, 16);
      this._modes.set(MessageMode.MonsterYell, 17);
      this._modes.set(MessageMode.Warning, 18);
      this._modes.set(MessageMode.Game, 19);
      this._modes.set(MessageMode.Login, 20);
      this._modes.set(MessageMode.Status, 21);
      this._modes.set(MessageMode.Look, 22);
      this._modes.set(MessageMode.Failure, 23);
      this._modes.set(MessageMode.Blue, 24);
      this._modes.set(MessageMode.Red, 25);
    }
  }
}
