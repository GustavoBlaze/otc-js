/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum FrameGroupType {
  FrameGroupDefault = 0,
  FrameGroupIdle = FrameGroupDefault,
  FrameGroupMoving,
}

enum ThingCategory {
  ThingCategoryItem = 0,
  ThingCategoryCreature,
  ThingCategoryEffect,
  ThingCategoryMissile,
  ThingInvalidCategory,
  ThingLastCategory = ThingInvalidCategory,
}

enum ThingAttr {
  ThingAttrGround = 0,
  ThingAttrGroundBorder = 1,
  ThingAttrOnBottom = 2,
  ThingAttrOnTop = 3,
  ThingAttrContainer = 4,
  ThingAttrStackable = 5,
  ThingAttrForceUse = 6,
  ThingAttrMultiUse = 7,
  ThingAttrWritable = 8,
  ThingAttrWritableOnce = 9,
  ThingAttrFluidContainer = 10,
  ThingAttrSplash = 11,
  ThingAttrNotWalkable = 12,
  ThingAttrNotMoveable = 13,
  ThingAttrBlockProjectile = 14,
  ThingAttrNotPathable = 15,
  ThingAttrPickupable = 16,
  ThingAttrHangable = 17,
  ThingAttrHookSouth = 18,
  ThingAttrHookEast = 19,
  ThingAttrRotateable = 20,
  ThingAttrLight = 21,
  ThingAttrDontHide = 22,
  ThingAttrTranslucent = 23,
  ThingAttrDisplacement = 24,
  ThingAttrElevation = 25,
  ThingAttrLyingCorpse = 26,
  ThingAttrAnimateAlways = 27,
  ThingAttrMinimapColor = 28,
  ThingAttrLensHelp = 29,
  ThingAttrFullGround = 30,
  ThingAttrLook = 31,
  ThingAttrCloth = 32,
  ThingAttrMarket = 33,
  ThingAttrUsable = 34,
  ThingAttrWrapable = 35,
  ThingAttrUnwrapable = 36,
  ThingAttrTopEffect = 37,

  // additional
  ThingAttrOpacity = 100,
  ThingAttrNotPreWalkable = 101,

  ThingAttrFloorChange = 252,
  ThingAttrNoMoveAnimation = 253, // 10.10: real value is 16, but we need to do this for backwards compatibility
  ThingAttrChargeable = 254, // deprecated
  ThingLastAttr = 255,
}

export default class ThingType {
  private _id = 0;

  private _animationPhases = 0;

  private _exactSize = 0;

  private _realSize = 0;

  private _numPatternX = 0;

  private _numPatternY = 0;

  private _numPatternZ = 0;

  private _layers = 0;

  private _elevation = 0;

  private _opacity = 0;

  private _customImage = "";

  private _size: Size = { width: 0, height: 0 };

  private _displacement: Point = { x: 0, y: 0 };

  private _attributes = new Map<ThingAttr, Boolean | Number>();

  get size() {
    return this._size;
  }

  getWidth() {
    return this._size.width;
  }

  getHeight() {
    return this._size.height;
  }

  // getExactSize(
  //   layer = 0,
  //   xPattern = 0,
  //   yPattern = 0,
  //   zPattern = 0,
  //   animationPhase = 0
  // );

  getRealSize() {
    return this._realSize;
  }

  getLayers() {
    return this._layers;
  }

  getNumPatternX() {
    return this._numPatternX;
  }

  getNumPatternY() {
    return this._numPatternY;
  }

  getNumPatternZ() {
    return this._numPatternZ;
  }

  getDisplacement() {
    return this._displacement;
  }

  getElevation() {
    return this._elevation;
  }

  getGroundSpeed() {
    return this._attributes.get(ThingAttr.ThingAttrGround);
  }

  getMaxTextLength() {
    return this._attributes.has(ThingAttr.ThingAttrWritableOnce)
      ? this._attributes.get(ThingAttr.ThingAttrWritableOnce)
      : this._attributes.get(ThingAttr.ThingAttrWritable);
  }

  getLight() {
    return this._attributes.get(ThingAttr.ThingAttrLight);
  }

  getMinimapColor() {
    return this._attributes.get(ThingAttr.ThingAttrMinimapColor);
  }

  getLensHelp() {
    return this._attributes.get(ThingAttr.ThingAttrLensHelp);
  }

  getClothSlot() {
    return this._attributes.get(ThingAttr.ThingAttrCloth);
  }

  isGround() {
    return !!this._attributes.get(ThingAttr.ThingAttrGround);
  }

  isGroundBorder() {
    return !!this._attributes.get(ThingAttr.ThingAttrGroundBorder);
  }

  isOnBottom() {
    return !!this._attributes.get(ThingAttr.ThingAttrOnBottom);
  }

  isOnTop() {
    return !!this._attributes.get(ThingAttr.ThingAttrOnTop);
  }

  isContainer() {
    return !!this._attributes.get(ThingAttr.ThingAttrContainer);
  }

  isStackable() {
    return !!this._attributes.get(ThingAttr.ThingAttrStackable);
  }

  isForceUse() {
    return !!this._attributes.get(ThingAttr.ThingAttrForceUse);
  }

  isMultiUse() {
    return !!this._attributes.get(ThingAttr.ThingAttrMultiUse);
  }

  isWritable() {
    return !!this._attributes.get(ThingAttr.ThingAttrWritable);
  }

  isChargeable() {
    return !!this._attributes.get(ThingAttr.ThingAttrChargeable);
  }

  isWritableOnce() {
    return !!this._attributes.get(ThingAttr.ThingAttrWritableOnce);
  }

  isFluidContainer() {
    return !!this._attributes.get(ThingAttr.ThingAttrFluidContainer);
  }

  isSplash() {
    return !!this._attributes.get(ThingAttr.ThingAttrSplash);
  }

  isNotWalkable() {
    return !!this._attributes.get(ThingAttr.ThingAttrNotWalkable);
  }

  isNotMoveable() {
    return !!this._attributes.get(ThingAttr.ThingAttrNotMoveable);
  }

  blockProjectile() {
    return !!this._attributes.get(ThingAttr.ThingAttrBlockProjectile);
  }

  isNotPathable() {
    return !!this._attributes.get(ThingAttr.ThingAttrNotPathable);
  }

  isPickupable() {
    return !!this._attributes.get(ThingAttr.ThingAttrPickupable);
  }

  isHangable() {
    return !!this._attributes.get(ThingAttr.ThingAttrHangable);
  }

  isHookSouth() {
    return !!this._attributes.get(ThingAttr.ThingAttrHookSouth);
  }

  isHookEast() {
    return !!this._attributes.get(ThingAttr.ThingAttrHookEast);
  }

  isRotateable() {
    return !!this._attributes.get(ThingAttr.ThingAttrRotateable);
  }

  hasLight() {
    return !!this._attributes.get(ThingAttr.ThingAttrLight);
  }

  isDontHide() {
    return !!this._attributes.get(ThingAttr.ThingAttrDontHide);
  }

  isTranslucent() {
    return !!this._attributes.get(ThingAttr.ThingAttrTranslucent);
  }

  hasDisplacement() {
    return !!this._attributes.get(ThingAttr.ThingAttrDisplacement);
  }

  hasElevation() {
    return !!this._attributes.get(ThingAttr.ThingAttrElevation);
  }

  isLyingCorpse() {
    return !!this._attributes.get(ThingAttr.ThingAttrLyingCorpse);
  }

  isAnimateAlways() {
    return !!this._attributes.get(ThingAttr.ThingAttrAnimateAlways);
  }

  hasMiniMapColor() {
    return !!this._attributes.get(ThingAttr.ThingAttrMinimapColor);
  }

  hasLensHelp() {
    return !!this._attributes.get(ThingAttr.ThingAttrLensHelp);
  }

  isFullGround() {
    return !!this._attributes.get(ThingAttr.ThingAttrFullGround);
  }

  isIgnoreLook() {
    return !!this._attributes.get(ThingAttr.ThingAttrLook);
  }

  isCloth() {
    return !!this._attributes.get(ThingAttr.ThingAttrCloth);
  }

  isMarketable() {
    return !!this._attributes.get(ThingAttr.ThingAttrMarket);
  }

  isUsable() {
    return !!this._attributes.get(ThingAttr.ThingAttrUsable);
  }

  isWrapable() {
    return !!this._attributes.get(ThingAttr.ThingAttrWrapable);
  }

  isUnwrapable() {
    return !!this._attributes.get(ThingAttr.ThingAttrUnwrapable);
  }

  isTopEffect() {
    return !!this._attributes.get(ThingAttr.ThingAttrTopEffect);
  }
}
