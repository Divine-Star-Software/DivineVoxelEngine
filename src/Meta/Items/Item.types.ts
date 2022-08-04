import type { DivineVoxelEngineBuilder } from "Constructor/Builder/DivineVoxelEngineBuilder";

export type ItemData = {
 id: string;
 shapeId: string;
 data: any;
};

export type ItemProcessData = {
 uvs: number[];
};

export type ItemConstructorObject = {
 data: ItemData;
 process(data: ItemProcessData, DVEB: DivineVoxelEngineBuilder): void;
};
