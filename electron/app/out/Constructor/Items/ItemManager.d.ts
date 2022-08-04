import { ItemShapeData } from "Meta/Constructor/ItemShape.type";
import type { ItemConstructorObject, ItemData } from "Meta/Items/Item.types.js";
export declare const ItemManager: {
    itemObjects: Record<string, ItemConstructorObject>;
    itemShapes: Record<string, ItemShapeData>;
    getItem(id: string): ItemConstructorObject;
    getItemData(id: string): ItemData;
    registerItem(item: ItemConstructorObject): void;
    registerItemShape(shapeData: ItemShapeData): void;
    getItemShapeData(id: string): ItemShapeData;
};
