import Position from "./Position";
import ThingTypeManager from "./ThingTypeManager";

export default class Thing {
  protected _position = new Position();

  protected _datId = 0;

  isItem() {
    return false;
  }

  isEffect() {
    return false;
  }

  isMissile() {
    return false;
  }

  isCreature() {
    return false;
  }

  isNpc() {
    return false;
  }

  isMonster() {
    return false;
  }

  isPlayer() {
    return false;
  }

  isLocalPlayer() {
    return false;
  }

  isAnimatedText() {
    return false;
  }

  isStaticText() {
    return false;
  }

  getThingType() {
    return ThingTypeManager._nullThingType;
  }

  rawGetThingType() {
    return ThingTypeManager._nullThingType;
  }

  getSize() {
    return this.rawGetThingType().getSize();
  }

  getWidth() {
    return this.rawGetThingType().getWidth();
  }

  getHeight() {
    return this.rawGetThingType().getHeight();
  }

  getDisplacement() {
    return this.rawGetThingType().getDisplacement();
  }

  getDisplacementX() {
    return this.rawGetThingType().getDisplacementX();
  }

  getDisplacementY() {
    return this.rawGetThingType().getDisplacementY();
  }

  getLayers() {
    return this.rawGetThingType().getLayers();
  }

  getNumPatternX() {
    return this.rawGetThingType().getNumPatternX();
  }

  getNumPatternY() {
    return this.rawGetThingType().getNumPatternY();
  }

  getNumPatternZ() {
    return this.rawGetThingType().getNumPatternZ();
  }

  getAnimationPhases() {
    return this.rawGetThingType().getAnimationPhases();
  }

  getAnimator() {
    return this.rawGetThingType().getAnimator();
  }

  getGroundSpeed() {
    return this.rawGetThingType().getGroundSpeed();
  }

  getMaxTextLength() {
    return this.rawGetThingType().getMaxTextLength();
  }

  getLight() {
    return this.rawGetThingType().getLight();
  }

  getMinimapColor() {
    return this.rawGetThingType().getMinimapColor();
  }

  getLensHelp() {
    return this.rawGetThingType().getLensHelp();
  }

  getClothSlot() {
    return this.rawGetThingType().getClothSlot();
  }

  getElevation() {
    return this.rawGetThingType().getElevation();
  }

  isGround() {
    return this.rawGetThingType().isGround();
  }

  isGroundBorder() {
    return this.rawGetThingType().isGroundBorder();
  }

  isOnBottom() {
    return this.rawGetThingType().isOnBottom();
  }

  isOnTop() {
    return this.rawGetThingType().isOnTop();
  }

  isContainer() {
    return this.rawGetThingType().isContainer();
  }

  isStackable() {
    return this.rawGetThingType().isStackable();
  }

  isForceUse() {
    return this.rawGetThingType().isForceUse();
  }

  isMultiUse() {
    return this.rawGetThingType().isMultiUse();
  }

  isWritable() {
    return this.rawGetThingType().isWritable();
  }

  isChargeable() {
    return this.rawGetThingType().isChargeable();
  }

  isWritableOnce() {
    return this.rawGetThingType().isWritableOnce();
  }

  isFluidContainer() {
    return this.rawGetThingType().isFluidContainer();
  }

  isSplash() {
    return this.rawGetThingType().isSplash();
  }

  isNotWalkable() {
    return this.rawGetThingType().isNotWalkable();
  }

  isNotMoveable() {
    return this.rawGetThingType().isNotMoveable();
  }

  blockProjectile() {
    return this.rawGetThingType().blockProjectile();
  }

  isNotPathable() {
    return this.rawGetThingType().isNotPathable();
  }

  isPickupable() {
    return this.rawGetThingType().isPickupable();
  }

  isHangable() {
    return this.rawGetThingType().isHangable();
  }

  isHookSouth() {
    return this.rawGetThingType().isHookSouth();
  }

  isHookEast() {
    return this.rawGetThingType().isHookEast();
  }

  isRotateable() {
    return this.rawGetThingType().isRotateable();
  }

  hasLight() {
    return this.rawGetThingType().hasLight();
  }

  isDontHide() {
    return this.rawGetThingType().isDontHide();
  }

  isTranslucent() {
    return this.rawGetThingType().isTranslucent();
  }

  hasDisplacement() {
    return this.rawGetThingType().hasDisplacement();
  }

  hasElevation() {
    return this.rawGetThingType().hasElevation();
  }

  isLyingCorpse() {
    return this.rawGetThingType().isLyingCorpse();
  }

  isAnimateAlways() {
    return this.rawGetThingType().isAnimateAlways();
  }

  hasMiniMapColor() {
    return this.rawGetThingType().hasMiniMapColor();
  }

  hasLensHelp() {
    return this.rawGetThingType().hasLensHelp();
  }

  isFullGround() {
    return this.rawGetThingType().isFullGround();
  }

  isIgnoreLook() {
    return this.rawGetThingType().isIgnoreLook();
  }

  isCloth() {
    return this.rawGetThingType().isCloth();
  }

  isMarketable() {
    return this.rawGetThingType().isMarketable();
  }

  isUsable() {
    return this.rawGetThingType().isUsable();
  }

  isWrapable() {
    return this.rawGetThingType().isWrapable();
  }

  isUnwrapable() {
    return this.rawGetThingType().isUnwrapable();
  }

  isTopEffect() {
    return this.rawGetThingType().isTopEffect();
  }

  getMarketData() {
    return this.rawGetThingType().getMarketData();
  }

  onPositionChange(newPos: Position, oldPos: Position) {}

  onAppear() {}

  onDisappear() {}
}
