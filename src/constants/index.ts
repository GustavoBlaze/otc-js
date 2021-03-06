export { Direction } from "./Direction";
export { GameFeature } from "./GameFeature";
export { ServerOPCode } from "./ServerOPCode";
export { ClientOPCode } from "./ClientOPCode";
export { CreatureType } from "./CreatureType";
export { CreatureIDRange } from "./CreatureIDRange";
export { ItemOPCode } from "./ItemOPCode";
export { LoginServerOPTS } from "./LoginServerOPTS";
export { InventorySlot } from "./InventorySlot";
export { Statistic } from "./Statistic";
export { Skill } from "./Skill";
export { FluidColor } from "./FluidColor";
export { FluidType } from "./FluidType";
export { FightMode } from "./FightMode";
export { ChaseMode } from "./ChaseMode";
export { PVPMode } from "./PVPMode";
export { PlayerSkull } from "./PlayerSkull";
export { PlayerShield } from "./PlayerShield";
export { PlayerEmblem } from "./PlayerEmblem";
export { CreatureIcon } from "./CreatureIcon";
export { PlayerStateIcon } from "./PlayerStateIcon";
export { PathFindResult } from "./PathFindResult";
export { PathFindFlag } from "./PathFindFlag";
export { AutomapFlag } from "./AutomapFlag";
export { VipState } from "./VipState";
export { SpeedFormula } from "./SpeedFormula";
export { Blessing } from "./Blessing";
export { DeathType } from "./DeathType";
export { StoreProductType } from "./StoreProductType";
export { StoreErrorType } from "./StoreErrorType";
export { StoreState } from "./StoreState";
export { MessageMode } from "./MessageMode";
export { ThingCategory } from "./ThingCategory";
export { FrameGroupType } from "./FrameGroupType";
export { ThingAttr } from "./ThingAttr";
export { AnimationPhase } from "./AnimationPhase";
export { AnimationDirection } from "./AnimationDirection";
export { ItemCategory } from "./ItemCategory";
export { ClientVersion } from "./ClientVersion";
export { ItemAttr } from "./ItemAttr";

export const TILE_PIXELS = 32;
export const MAX_ELEVATION = 24;
export const SEA_FLOOR = 7;
export const MAX_Z = 15;
export const UNDERGROUND_FLOOR = SEA_FLOOR + 1;
export const AWARE_UNDEGROUND_FLOOR_RANGE = 2;
export const INVISIBLE_TICKS_PER_FRAME = 500;
export const ITEM_TICKS_PER_FRAME = 500;
export const ANIMATED_TEXT_DURATION = 1000;
export const STATIC_DURATION_PER_CHARACTER = 60;
export const MIN_STATIC_TEXT_DURATION = 3000;
export const MAX_STATIC_TEXT_WIDTH = 200;
export const MAX_AUTOWALK_STEPS_RETRY = 10;
export const MAX_AUTOWALK_DIST = 127;
