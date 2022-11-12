//types
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
export const ItemManager = {
    itemObjects: {},
    itemShapes: {},
    getItem(id) {
        return this.itemObjects[id];
    },
    registerItem(item) {
        this.itemObjects[item.id] = item;
    },
    registerItemShape(shapeData) {
        this.itemShapes[shapeData.id] = shapeData;
    },
    getItemShapeData(id) {
        const data = this.itemShapes[id];
        if (!data) {
            throw new Error(`Item Shape with ID ${id} does not exists`);
        }
        return data;
    },
    runItemHookForAll(hook) {
        for (const itemId of Object.keys(this.itemObjects)) {
            const item = this.itemObjects[itemId];
            if (!item.hooks[hook])
                continue;
            item.hooks[hook](DVEC.builder);
        }
    },
    removeItemHookForAll(hook) {
        for (const itemId of Object.keys(this.itemObjects)) {
            const item = this.itemObjects[itemId];
            if (!item.hooks[hook])
                continue;
            delete item.hooks[hook];
        }
    },
};
