import { FileStream } from "~/core";
import { ThingAttr, ThingCategory } from "~/constants";
import ThingType from "./ThingType";
import GameFeatureManager from "./GameFeatureManager";

export default class ThingTypeManager {
  private _thingTypes = new Array<ThingType[]>(ThingCategory.ThingLastCategory);

  private _datLoaded = false;

  private _datSignature = 0;

  private _contentRevision = 0;

  private _featureManager: GameFeatureManager;

  private _clientVersion: number;

  static _nullThingType = new ThingType();

  constructor(featureManager: GameFeatureManager, clientVersion: number) {
    this._featureManager = featureManager;
    this._clientVersion = clientVersion;
  }

  getThingType(id: number, category: ThingCategory) {
    if (
      category >= ThingCategory.ThingLastCategory ||
      id >= this._thingTypes[category]?.length
    ) {
      console.error(
        `[ThingTypeManager]: getThingType: invalid id or category. Id:${id} Category:${category}`
      );
      return ThingTypeManager._nullThingType;
    }

    return this._thingTypes[category][id];
  }

  findThingTypeByAttr(attr: ThingAttr, category: ThingCategory) {
    const list: ThingType[] = [];

    for (let i = 0; i < this._thingTypes[category].length; i++) {
      const type = this._thingTypes[category][i];

      if (type.hasAttr(attr)) {
        list.push(type);
      }
    }

    return list;
  }

  isDatLoaded() {
    return this._datLoaded;
  }

  getDatSignature() {
    return this._datSignature;
  }

  getContentRevision() {
    return this._contentRevision;
  }

  loadDat(file: string) {
    this._datLoaded = false;
    this._datSignature = 0;
    this._contentRevision = 0;

    try {
      const fileStream = new FileStream();
      fileStream.open(file, "r");

      this._datSignature = fileStream.getU32();

      // this._contentRevision = cast 16 bits from datSignature
      this._contentRevision = this._datSignature & 0xffff;

      for (let i = 0; i < this._thingTypes.length; i++) {
        const count = fileStream.getU16() + 1;
        this._thingTypes[i] = new Array<ThingType>(count);
      }

      for (
        let category = 0;
        category < ThingCategory.ThingLastCategory;
        category++
      ) {
        let firstId = 1;

        if (category === ThingCategory.ThingCategoryItem) {
          firstId = 100;
        }

        for (let id = firstId; id < this._thingTypes[category].length; id++) {
          const type = new ThingType();

          type.unserialize(
            id,
            category as ThingCategory,
            fileStream,
            this._featureManager,
            this._clientVersion
          );
          this._thingTypes[category][id] = type;
        }
      }
      // Dispatch event to notify that dat has been loaded
      return true;
    } catch (e) {
      console.error("Failed to read dat: ", e);
      return false;
    }
  }
}
