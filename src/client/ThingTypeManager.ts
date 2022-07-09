import { FileStream } from "~/core";
import { ThingCategory } from "~/constants";
import { ThingType } from "~/client";
import GameFeatureManager from "./GameFeatureManager";

export default class ThingTypeManager {
  private _thingTypes = new Array<ThingType[]>(ThingCategory.ThingLastCategory);

  private _datLoaded = false;

  private _datSignature = 0;

  private _contentRevision = 0;

  private _featureManager: GameFeatureManager;

  constructor(featureManager: GameFeatureManager) {
    this._featureManager = featureManager;
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

  async loadDat(file: string) {
    this._datLoaded = false;
    this._datSignature = 0;
    this._contentRevision = 0;

    try {
      const fileStream = new FileStream();
      await fileStream.open(file, "r");

      this._datSignature = await fileStream.getU32();
      // this._contentRevision = cast 16 bits from datSignature
      this._contentRevision = this._datSignature & 0xffff;

      for (let i = 0; i < this._thingTypes.length; i++) {
        const count = (await fileStream.getU16()) + 1;
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
          await type.unserialize(
            id,
            category as ThingCategory,
            fileStream,
            this._featureManager
          );
          this._thingTypes[category][id] = type;
        }
      }
    } catch (e) {
      console.error("Failed to read dat: ", e);
    }
  }
}
