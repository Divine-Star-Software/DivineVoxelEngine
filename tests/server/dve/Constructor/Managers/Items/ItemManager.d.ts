import { ItemShapeData } from "Meta/Constructor/ItemShape.type";
import type { ItemConstructorObject, ItemConstructorThreadHooks } from "Meta/Data/Items/Item.types.js";
export declare const ItemManager: {
    itemObjects: Record<string, ItemConstructorObject>;
    itemShapes: Record<string, ItemShapeData>;
    getItem(id: string): ItemConstructorObject;
    registerItem(item: ItemConstructorObject): void;
    registerItemShape(shapeData: ItemShapeData): void;
    getItemShapeData(id: string): ItemShapeData;
    runItemHookForAll(hook: ItemConstructorThreadHooks): void;
    removeItemHookForAll(hook: ItemConstructorThreadHooks): void;
};
