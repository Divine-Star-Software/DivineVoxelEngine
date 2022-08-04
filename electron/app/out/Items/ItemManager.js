export const ItemManager = {
    itemData: {},
    _onRegister: (data) => { },
    getItemData(id) {
        const itemData = this.itemData[id];
        if (!itemData) {
            throw new Error(`Item with ${id} does not exists.`);
        }
        return itemData;
    },
    registerItemData(data) {
        this.itemData[data.id] = data;
        this._onRegister(data);
    },
    onRegister(func) {
        this._onRegister = func;
    },
};
