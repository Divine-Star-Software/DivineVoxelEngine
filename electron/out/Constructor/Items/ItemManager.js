export const ItemManager = {
    itemObjects: {},
    itemShapes: {},
    getItem(id) {
        return this.itemObjects[id];
    },
    getItemData(id) {
        return this.itemObjects[id].data;
    },
    registerItem(item) {
        this.itemObjects[item.data.id] = item;
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
};
