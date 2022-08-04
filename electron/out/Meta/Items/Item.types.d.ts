import type { DivineVoxelEngineBuilder } from "Constructor/Builder/DivineVoxelEngineBuilder";
export declare type ItemData = {
    id: string;
    shapeId: string;
    data: any;
};
export declare type ItemProcessData = {
    uvs: number[];
};
export declare type ItemConstructorObject = {
    data: ItemData;
    process(data: ItemProcessData, DVEB: DivineVoxelEngineBuilder): void;
};
