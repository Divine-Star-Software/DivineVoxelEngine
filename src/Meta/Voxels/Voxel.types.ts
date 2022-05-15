import type { DivineVoxelEngineBuilder } from "../../Builder/DivineVoxelEngineBuilder";
import { VoxelPalette } from "Meta/World/WorldData/World.types";
import { VoxelHelperInterface } from "./VoxelHelper.interface";
/**# Voxel Substance Type
 * ---
 * All solid and transparent voxels are grouped together in the same mesh per chunk.
 * While the the fluid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export type VoxelSubstanceType =
 | "solid"
 | "transparent"
 | "flora"
 | "fluid"
 | "magma";

export type VoxelProcessData = {
 exposedFaces: number[];
 voxelData: number;
 voxelState: string;
 uvTemplate: number[];
 shapeTemplate: number[];
 shapeStateTemplate: number[];
 colorTemplate: number[];
 lightTemplate: number[];
 aoTemplate: number[];
 chunkX: number;
 chunkY: number;
 chunkZ: number;
 x: number;
 y: number;
 z: number;
};

export type VoxelHooks =
 | "texturesRegistered"
 | "beforeAdd"
 | "afterAdd"
 | "beforeRemove"
 | "afterAfter"
 | any;

export type VoxelBuilderThreadHooks = "texturesRegistered" | any;

export type VoxelWorldThreadHooks =
 | "beforeAdd"
 | "afterAdd"
 | "beforeRemove"
 | "afterAfter"
 | any;

/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export type VoxelData = {
 name: string;
 shapeId: string;
 id: string;
 substance: VoxelSubstanceType;
 defaultState: any[];
 states?: any[];
 lightSource?: boolean;
 lightValue?: number;
};

export interface VoxelInteface {
 data: VoxelData;
 trueShapeId: number;
 voxelHelper: any;
 hooks: Record<VoxelHooks, Function>;
 process(data: VoxelProcessData): void;
}

export type VoxelBuilderThreadObject = {
 data: VoxelData;
 trueShapeId: number;
 hooks: Record<VoxelBuilderThreadHooks, (DVEB:DivineVoxelEngineBuilder)=>any>;
 process(data: VoxelProcessData, DVEB: DivineVoxelEngineBuilder): void;
};

export type VoxelWorldThreadObject = {
 data: VoxelData;
 hooks: Record<VoxelWorldThreadHooks, Function>;
}
