import type { Builder as DVEBuilswe } from "Constructor/Builder/Builder";
export type ItemData = {
    id: string;
    data: any;
};
export type ItemProcessData = {
    uvs: number[];
};
export type ItemConstructorThreadHooks = "texturesRegistered" | any;
export type ItemConstructorObject = {
    id: string;
    shapeId: string;
    hooks: Record<ItemConstructorThreadHooks, (DVEB: typeof DVEBuilswe) => any>;
    process(data: ItemProcessData, DVEB: typeof DVEBuilswe): void;
};
