import {
  FrameGroupType,
  GameFeature,
  ThingAttr,
  ThingCategory,
} from "~/constants";
import { FileStream } from "~/core";
import GameFeatureManager from "./GameFeatureManager";
import Animator from "./Animator";

type ThingTypeAttribute = Boolean | Number | Light | MarketData;
export default class ThingType {
  private _null = true;

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

  private _animator?: Animator;

  private _attributes = new Map<ThingAttr, ThingTypeAttribute>();

  private _category: ThingCategory = 0;

  private _spritesIndex?: Array<Number>;

  private _textures = [];

  private _texturesFramesRects = [];

  private _texturesFramesOriginRects = [];

  private _texturesFramesOffsets = [];

  getSize() {
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
  // ): number {
  //   if (this._null) return 0;

  // }

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

  getDisplacementX() {
    return this.getDisplacement().x;
  }

  getDisplacementY() {
    return this.getDisplacement().y;
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

  hasAttr(attr: ThingAttr) {
    return this._attributes.has(attr);
  }

  getMarketData() {
    return this._attributes.get(ThingAttr.ThingAttrMarket) as MarketData;
  }

  getAnimationPhases() {
    return this._animationPhases;
  }

  getAnimator() {
    return this._animator;
  }

  async unserialize(
    clientId: number,
    category: ThingCategory,
    fileStream: FileStream,
    featureManager: GameFeatureManager,
    clientVersion: number
  ) {
    this._null = false;
    this._id = clientId;
    this._category = category;

    let count = 0;
    let attr = -1;
    let done = false;

    for (let i = 0; i < ThingAttr.ThingLastAttr; i++) {
      count++;
      attr = await fileStream.getU8();

      if (attr === ThingAttr.ThingLastAttr) {
        done = true;
        break;
      }

      if (clientVersion >= 1000) {
        attr = attr === 16 ? ThingAttr.ThingAttrNoMoveAnimation : attr - 1;
      } else if (clientVersion >= 860) {
        // no changes here
      } else if (clientVersion >= 780) {
        if (attr == 8) {
          this._attributes.set(ThingAttr.ThingAttrChargeable, true);
          continue;
        } else if (attr > 8) {
          attr -= 1;
        }
      } else if (clientVersion >= 755) {
        if (attr == 23) {
          attr = ThingAttr.ThingAttrFloorChange;
        }
      } else if (clientVersion >= 740) {
        if (attr > 0 && attr <= 15) attr += 1;
        else if (attr == 16) attr = ThingAttr.ThingAttrLight;
        else if (attr == 17) attr = ThingAttr.ThingAttrFloorChange;
        else if (attr == 18) attr = ThingAttr.ThingAttrFullGround;
        else if (attr == 19) attr = ThingAttr.ThingAttrElevation;
        else if (attr == 20) attr = ThingAttr.ThingAttrDisplacement;
        else if (attr == 22) attr = ThingAttr.ThingAttrMinimapColor;
        else if (attr == 23) attr = ThingAttr.ThingAttrRotateable;
        else if (attr == 24) attr = ThingAttr.ThingAttrLyingCorpse;
        else if (attr == 25) attr = ThingAttr.ThingAttrHangable;
        else if (attr == 26) attr = ThingAttr.ThingAttrHookSouth;
        else if (attr == 27) attr = ThingAttr.ThingAttrHookEast;
        else if (attr == 28) attr = ThingAttr.ThingAttrAnimateAlways;

        /* "Multi Use" and "Force Use" are swapped */
        if (attr == ThingAttr.ThingAttrMultiUse)
          attr = ThingAttr.ThingAttrForceUse;
        else if (attr == ThingAttr.ThingAttrForceUse)
          attr = ThingAttr.ThingAttrMultiUse;
      }

      switch (attr) {
        case ThingAttr.ThingAttrDisplacement: {
          if (clientVersion >= 755) {
            this._displacement.x = await fileStream.getU16();
            this._displacement.y = await fileStream.getU16();
          } else {
            this._displacement.x = 8;
            this._displacement.y = 8;
          }

          this._attributes.set(attr, true);
          break;
        }
        case ThingAttr.ThingAttrLight: {
          const light: Light = {
            intensity: await fileStream.getU16(),
            color: await fileStream.getU16(),
          };

          this._attributes.set(attr, light);
          break;
        }

        case ThingAttr.ThingAttrMarket: {
          const market: MarketData = {
            category: await fileStream.getU16(),
            tradeAs: await fileStream.getU16(),
            showAs: await fileStream.getU16(),
            name: await fileStream.getString(),
            requiredLevel: await fileStream.getU16(),
            restrictVocation: await fileStream.getU16(),
          };

          this._attributes.set(attr, market);
          break;
        }
        case ThingAttr.ThingAttrElevation: {
          this._elevation = await fileStream.getU16();
          this._attributes.set(attr, this._elevation);
          break;
        }
        case ThingAttr.ThingAttrUsable:
        case ThingAttr.ThingAttrGround:
        case ThingAttr.ThingAttrWritable:
        case ThingAttr.ThingAttrWritableOnce:
        case ThingAttr.ThingAttrMinimapColor:
        case ThingAttr.ThingAttrCloth:
        case ThingAttr.ThingAttrLensHelp: {
          this._attributes.set(attr, await fileStream.getU16());
          break;
        }
        default:
          this._attributes.set(attr, true);
          break;
      }
    }

    if (!done) {
      throw new Error(
        `[ThingType]: corrupt data (id: ${this._id}, category: ${this._category}, count: ${count}, lastAttr: ${attr})`
      );
    }

    const hasFrameGroup =
      category === ThingCategory.ThingCategoryCreature &&
      featureManager.getFeature(GameFeature.GameIdleAnimations);

    const groupCount = hasFrameGroup ? await fileStream.getU8() : 1;
    this._animationPhases = 0;
    let totalSpritesCount = 0;

    for (let i = 0; i < groupCount; i++) {
      let frameGroupType = FrameGroupType.FrameGroupDefault;
      if (hasFrameGroup) frameGroupType = await fileStream.getU8();

      const width = await fileStream.getU8();
      const height = await fileStream.getU8();

      this._size = {
        width,
        height,
      };

      if (width > 1 || height > 1) {
        this._realSize = await fileStream.getU8();
        this._exactSize = Math.min(
          this._realSize,
          Math.max(width * 32, height * 32)
        );
      } else {
        this._exactSize = 32;
      }

      this._layers = await fileStream.getU8();
      this._numPatternX = await fileStream.getU8();
      this._numPatternY = await fileStream.getU8();

      if (clientVersion >= 755) {
        this._numPatternZ = await fileStream.getU8();
      } else {
        this._numPatternZ = 1;
      }

      const groupAnimationPhases = await fileStream.getU8();
      this._animationPhases += groupAnimationPhases;

      if (
        groupAnimationPhases > 1 &&
        featureManager.getFeature(GameFeature.GameEnhancedAnimations)
      ) {
        this._animator = new Animator();
        this._animator.unserialize(groupAnimationPhases, fileStream);
      }

      const area = this._size.width * this._size.height;

      const totalSprites =
        area *
        this._layers *
        this._numPatternX *
        this._numPatternY *
        this._numPatternZ;

      if (totalSpritesCount + totalSprites > 4096) {
        throw new Error("A thing type has more than 4096 sprites");
      }

      this._spritesIndex = new Array(totalSpritesCount + totalSprites);
      for (
        let j = totalSpritesCount;
        j < totalSpritesCount + totalSprites;
        j++
      ) {
        this._spritesIndex[j] = featureManager.getFeature(
          GameFeature.GameSpritesU32
        )
          ? await fileStream.getU32()
          : await fileStream.getU16();
      }

      totalSpritesCount += totalSprites;
    }

    this._textures.length = this._animationPhases;
    this._texturesFramesRects.length = this._animationPhases;
    this._texturesFramesOriginRects.length = this._animationPhases;
    this._texturesFramesOffsets.length = this._animationPhases;
  }
}
