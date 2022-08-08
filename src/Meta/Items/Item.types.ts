import type { DivineVoxelEngineBuilder } from "Constructor/Builder/DivineVoxelEngineBuilder";

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
 hooks: Record<
  ItemConstructorThreadHooks,
  (DVEB: DivineVoxelEngineBuilder) => any
 >;
 process(data: ItemProcessData, DVEB: DivineVoxelEngineBuilder): void;
};
