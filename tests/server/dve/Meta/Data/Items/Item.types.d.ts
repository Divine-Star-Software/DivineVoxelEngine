import type { DivineVoxelEngineBuilder } from "Constructor/Builder/DivineVoxelEngineBuilder";
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
    hooks: Record<ItemConstructorThreadHooks, (DVEB: DivineVoxelEngineBuilder) => any>;
    process(data: ItemProcessData, DVEB: DivineVoxelEngineBuilder): void;
};
