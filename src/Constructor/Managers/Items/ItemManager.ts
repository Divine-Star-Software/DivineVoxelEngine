//types
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { ItemShapeData } from "Meta/Constructor/ItemShape.type";
import type {
 ItemConstructorObject,
 ItemConstructorThreadHooks,
 ItemData,
} from "Meta/Data/Items/Item.types.js";

export const ItemManager = {
 itemObjects: <Record<string, ItemConstructorObject>>{},
 itemShapes: <Record<string, ItemShapeData>>{},

 getItem(id: string): ItemConstructorObject {
  return this.itemObjects[id];
 },

 registerItem(item: ItemConstructorObject) {
  this.itemObjects[item.id] = item;
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

 runItemHookForAll(hook: ItemConstructorThreadHooks) {
  for (const itemId of Object.keys(this.itemObjects)) {
   const item = this.itemObjects[itemId];
   if (!item.hooks[hook]) continue;
   item.hooks[hook](DVEC.builder as any);
  }
 },
 removeItemHookForAll(hook: ItemConstructorThreadHooks) {
  for (const itemId of Object.keys(this.itemObjects)) {
   const item = this.itemObjects[itemId];
   if (!item.hooks[hook]) continue;
   delete item.hooks[hook];
  }
 },
};
