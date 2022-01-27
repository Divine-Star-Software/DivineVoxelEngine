import { VoxelPalette } from "Meta/WorldData/World.types";
import { VoxelHelperInterface } from "./VoxelHelper.interface";
/**# Voxel Substance Type
 * ---
 * All solid and transparent voxels are grouped together in the same mesh per chunk.
 * While the the fluid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export declare type VoxelSubstanceType = "solid" | "transparent" | "flora" | "fluid" | "magma";
export declare type VoxelProcessData = {
    exposedFaces: number[];
    voxelPalettee: VoxelPalette;
    voxelData: any[];
    aoTemplate: number[];
    RGBLightTemplate: number[];
    sunLightTemplate: number[];
    uvTemplate: number[];
    shapeTemplate: number[];
    chunkX: number;
    chunkY: number;
    chunkZ: number;
    x: number;
    y: number;
    z: number;
};
/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export declare type VoxelData = {
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
    voxelHelper: VoxelHelperInterface;
    hooks: {
        beforeAdd?: Function;
        afterAdd?: Function;
        beforeRemove?: Function;
        afterAfter?: Function;
    };
    process(data: VoxelProcessData): void;
}
