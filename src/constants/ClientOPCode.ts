export enum ClientOPCode {
  EnterAccount = 1,
  PendingGame = 10,
  EnterGame = 15,
  LeaveGame = 20,
  Ping = 29,
  PingBack = 30,

  // all in game opcodes must be equal or greater than 50
  FirstGameOpcode = 50,

  // otclient ONLY
  ExtendedOpcode = 50,
  ChangeMapAwareRange = 51,

  // NOTE: add any custom opcodes in this range
  // 51 - 99

  // original tibia ONLY
  AutoWalk = 100,
  WalkNorth = 101,
  WalkEast = 102,
  WalkSouth = 103,
  WalkWest = 104,
  Stop = 105,
  WalkNorthEast = 106,
  WalkSouthEast = 107,
  WalkSouthWest = 108,
  WalkNorthWest = 109,
  TurnNorth = 111,
  TurnEast = 112,
  TurnSouth = 113,
  TurnWest = 114,
  EquipItem = 119, // 910
  Move = 120,
  InspectNpcTrade = 121,
  BuyItem = 122,
  SellItem = 123,
  CloseNpcTrade = 124,
  RequestTrade = 125,
  InspectTrade = 126,
  AcceptTrade = 127,
  RejectTrade = 128,
  UseItem = 130,
  UseItemWith = 131,
  UseOnCreature = 132,
  RotateItem = 133,
  CloseContainer = 135,
  UpContainer = 136,
  EditText = 137,
  EditList = 138,
  Look = 140,
  LookCreature = 141,
  Talk = 150,
  RequestChannels = 151,
  JoinChannel = 152,
  LeaveChannel = 153,
  OpenPrivateChannel = 154,
  OpenRuleViolation = 155,
  CloseRuleViolation = 156,
  CancelRuleViolation = 157,
  CloseNpcChannel = 158,
  ChangeFightModes = 160,
  Attack = 161,
  Follow = 162,
  InviteToParty = 163,
  JoinParty = 164,
  RevokeInvitation = 165,
  PassLeadership = 166,
  LeaveParty = 167,
  ShareExperience = 168,
  DisbandParty = 169,
  OpenOwnChannel = 170,
  InviteToOwnChannel = 171,
  ExcludeFromOwnChannel = 172,
  CancelAttackAndFollow = 190,
  UpdateTile = 201,
  RefreshContainer = 202,
  BrowseField = 203,
  SeekInContainer = 204,
  RequestOutfit = 210,
  ChangeOutfit = 211,
  Mount = 212, // 870
  AddVip = 220,
  RemoveVip = 221,
  EditVip = 222,
  BugReport = 230,
  RuleViolation = 231,
  DebugReport = 232,
  TransferCoins = 239, // 1080
  RequestQuestLog = 240,
  RequestQuestLine = 241,
  NewRuleViolation = 242, // 910
  RequestItemInfo = 243, // 910
  MarketLeave = 244, // 944
  MarketBrowse = 245, // 944
  MarketCreate = 246, // 944
  MarketCancel = 247, // 944
  MarketAccept = 248, // 944
  AnswerModalDialog = 249, // 960
  OpenStore = 250, // 1080
  RequestStoreOffers = 251, // 1080
  BuyStoreOffer = 252, // 1080
  OpenTransactionHistory = 253, // 1080
  RequestTransactionHistory = 254, // 1080
}
