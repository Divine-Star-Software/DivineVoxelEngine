import type { Builder as DVEBuilswe } from "Constructor/Builder/Builder";
export declare type ItemData = {
    id: string;
    data: any;
};
export declare type ItemProcessData = {
    uvs: number[];
};
export declare type ItemConstructorThreadHooks = "texturesRegistered" | any;
export declare type ItemConstructorObject = {
    id: string;
    shapeId: string;
    hooks: Record<ItemConstructorThreadHooks, (DVEB: typeof DVEBuilswe) => any>;
    process(data: ItemProcessData, DVEB: typeof DVEBuilswe): void;
};
