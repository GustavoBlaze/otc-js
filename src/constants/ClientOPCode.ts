export enum ClientOPCode {
  ClientEnterAccount = 1,
  ClientPendingGame = 10,
  ClientEnterGame = 15,
  ClientLeaveGame = 20,
  ClientPing = 29,
  ClientPingBack = 30,

  // all in game opcodes must be equal or greater than 50
  ClientFirstGameOpcode = 50,

  // otclient ONLY
  ClientExtendedOpcode = 50,
  ClientChangeMapAwareRange = 51,

  // NOTE: add any custom opcodes in this range
  // 51 - 99

  // original tibia ONLY
  ClientAutoWalk = 100,
  ClientWalkNorth = 101,
  ClientWalkEast = 102,
  ClientWalkSouth = 103,
  ClientWalkWest = 104,
  ClientStop = 105,
  ClientWalkNorthEast = 106,
  ClientWalkSouthEast = 107,
  ClientWalkSouthWest = 108,
  ClientWalkNorthWest = 109,
  ClientTurnNorth = 111,
  ClientTurnEast = 112,
  ClientTurnSouth = 113,
  ClientTurnWest = 114,
  ClientEquipItem = 119, // 910
  ClientMove = 120,
  ClientInspectNpcTrade = 121,
  ClientBuyItem = 122,
  ClientSellItem = 123,
  ClientCloseNpcTrade = 124,
  ClientRequestTrade = 125,
  ClientInspectTrade = 126,
  ClientAcceptTrade = 127,
  ClientRejectTrade = 128,
  ClientUseItem = 130,
  ClientUseItemWith = 131,
  ClientUseOnCreature = 132,
  ClientRotateItem = 133,
  ClientCloseContainer = 135,
  ClientUpContainer = 136,
  ClientEditText = 137,
  ClientEditList = 138,
  ClientLook = 140,
  ClientLookCreature = 141,
  ClientTalk = 150,
  ClientRequestChannels = 151,
  ClientJoinChannel = 152,
  ClientLeaveChannel = 153,
  ClientOpenPrivateChannel = 154,
  ClientOpenRuleViolation = 155,
  ClientCloseRuleViolation = 156,
  ClientCancelRuleViolation = 157,
  ClientCloseNpcChannel = 158,
  ClientChangeFightModes = 160,
  ClientAttack = 161,
  ClientFollow = 162,
  ClientInviteToParty = 163,
  ClientJoinParty = 164,
  ClientRevokeInvitation = 165,
  ClientPassLeadership = 166,
  ClientLeaveParty = 167,
  ClientShareExperience = 168,
  ClientDisbandParty = 169,
  ClientOpenOwnChannel = 170,
  ClientInviteToOwnChannel = 171,
  ClientExcludeFromOwnChannel = 172,
  ClientCancelAttackAndFollow = 190,
  ClientUpdateTile = 201,
  ClientRefreshContainer = 202,
  ClientBrowseField = 203,
  ClientSeekInContainer = 204,
  ClientRequestOutfit = 210,
  ClientChangeOutfit = 211,
  ClientMount = 212, // 870
  ClientAddVip = 220,
  ClientRemoveVip = 221,
  ClientEditVip = 222,
  ClientBugReport = 230,
  ClientRuleViolation = 231,
  ClientDebugReport = 232,
  ClientTransferCoins = 239, // 1080
  ClientRequestQuestLog = 240,
  ClientRequestQuestLine = 241,
  ClientNewRuleViolation = 242, // 910
  ClientRequestItemInfo = 243, // 910
  ClientMarketLeave = 244, // 944
  ClientMarketBrowse = 245, // 944
  ClientMarketCreate = 246, // 944
  ClientMarketCancel = 247, // 944
  ClientMarketAccept = 248, // 944
  ClientAnswerModalDialog = 249, // 960
  ClientOpenStore = 250, // 1080
  ClientRequestStoreOffers = 251, // 1080
  ClientBuyStoreOffer = 252, // 1080
  ClientOpenTransactionHistory = 253, // 1080
  ClientRequestTransactionHistory = 254, // 1080
}
