import { ItemCategory } from "~/constants";
import { ItemTypeAttr } from "~/constants/ItemTypeAttr";

export default class ItemType {
  private _category: ItemCategory = ItemCategory.Last;

  private _null = true;

  private _attributes = new Map<ItemTypeAttr, number | string | boolean>();

  setServerId(serverId: number) {
    this._attributes.set(ItemTypeAttr.ServerId, serverId);
  }

  getServerId(): number {
    return this._attributes.get(ItemTypeAttr.ServerId) as number;
  }

  setClientId(clientId: number) {
    this._attributes.set(ItemTypeAttr.ClientId, clientId);
  }

  getClientId(): number {
    return this._attributes.get(ItemTypeAttr.ClientId) as number;
  }

  setCategory(category: ItemCategory) {
    this._category = category;
  }

  getCategory(): ItemCategory {
    return this._category;
  }

  setName(name: string) {
    this._attributes.set(ItemTypeAttr.Name, name);
  }

  getName(): string {
    return this._attributes.get(ItemTypeAttr.Name) as string;
  }

  setDesc(desc: string) {
    this._attributes.set(ItemTypeAttr.Desc, desc);
  }

  getDesc(): string {
    return this._attributes.get(ItemTypeAttr.Desc) as string;
  }

  isNull(): boolean {
    return this._null;
  }

  isWritable(): boolean {
    return this._attributes.get(ItemTypeAttr.Writable) as boolean;
  }
}
