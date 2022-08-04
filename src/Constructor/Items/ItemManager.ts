//types
import { ItemShapeData } from "Meta/Constructor/ItemShape.type";
import type { ItemConstructorObject, ItemData } from "Meta/Items/Item.types.js";

export const ItemManager = {
 itemObjects: <Record<string, ItemConstructorObject>>{},
 itemShapes: <Record<string, ItemShapeData>>{},

 getItem(id: string): ItemConstructorObject {
  return this.itemObjects[id];
 },

 getItemData(id: string): ItemData {
  return this.itemObjects[id].data;
 },

 registerItem(item: ItemConstructorObject) {
  this.itemObjects[item.data.id] = item;
 },

 registerItemShape(shapeData: ItemShapeData) {
  this.itemShapes[shapeData.id] = shapeData;
 },

 getItemShapeData(id: string) {
  const data = this.itemShapes[id];
  if (!data) {
   throw new Error(`Item Shape with ID ${id} does not exists`);
  }
  return data;
 },
};
