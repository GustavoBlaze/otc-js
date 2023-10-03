import { FileStream } from "~/core";
import { ThingAttr, ThingCategory } from "~/constants";
import createLogger from "~/utils/logger";
import ThingType from "./ThingType";

const logger = createLogger("ThingTypeManager");
export default class ThingTypeManager {
  private _thingTypes = new Array<ThingType[]>(ThingCategory.ThingLastCategory);

  private _datLoaded = false;

  private _datSignature = 0;

  private _contentRevision = 0;

  private _clientVersion: number;

  static _nullThingType = new ThingType();

  constructor(clientVersion: number) {
    this._clientVersion = clientVersion;
  }

  getThingType(id: number, category: ThingCategory) {
    if (category >= ThingCategory.ThingLastCategory || id >= this._thingTypes[category]?.length) {
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
    logger.info(`Loading dat file: ${file}`);
    this._datLoaded = false;
    this._datSignature = 0;
    this._contentRevision = 0;
    const fileStream = new FileStream();

    try {
      fileStream.open(file, "r");

      this._datSignature = fileStream.getU32();

      // this._contentRevision = cast 16 bits from datSignature
      this._contentRevision = this._datSignature & 0xffff;

      for (let i = 0; i < this._thingTypes.length; i++) {
        const count = fileStream.getU16() + 1;
        this._thingTypes[i] = new Array<ThingType>(count);
      }

      for (let category = 0; category < ThingCategory.ThingLastCategory; category++) {
        let firstId = 1;

        if (category === ThingCategory.ThingCategoryItem) {
          firstId = 100;
        }

        for (let id = firstId; id < this._thingTypes[category].length; id++) {
          const type = new ThingType();

          type.unserialize(id, category as ThingCategory, fileStream, this._clientVersion);
          this._thingTypes[category][id] = type;
        }
      }
      this._datLoaded = true;
      logger.info(`Dat file loaded successfully`);
      // Dispatch event to notify that dat has been loaded
      return true;
    } catch (e) {
      logger.error("Failed to read dat: ", e);
      logger.log(`Bytes read: ${fileStream.bytesRead}`);

      return false;
    }
  }
}
