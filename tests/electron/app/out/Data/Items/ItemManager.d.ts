import { ItemData } from "Meta/Data/Items/Item.types";
export declare const ItemManager: {
    itemData: Record<string, ItemData>;
    _onRegister: (data: ItemData) => void;
    getItemData(id: string): ItemData;
    registerItemData(data: ItemData): void;
    onRegister(func: (data: ItemData) => void): void;
};
