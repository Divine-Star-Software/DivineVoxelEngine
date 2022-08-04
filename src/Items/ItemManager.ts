import { ItemData } from "Meta/Items/Item.types";

export const ItemManager = {
 itemData: <Record<string, ItemData>>{},
 _onRegister: (data: ItemData) => {},
 getItemData(id: string) {
  const itemData: ItemData = this.itemData[id];
  if (!itemData) {
   throw new Error(`Item with ${id} does not exists.`);
  }
  return itemData;
 },

 registerItemData(data: ItemData) {
  this.itemData[data.id] = data;
  this._onRegister(data);
 },

 onRegister(func: (data: ItemData) => void) {
  this._onRegister = func;
 },
};
