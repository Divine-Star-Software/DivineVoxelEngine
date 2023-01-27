import type { Builder as DVEBuilswe } from "Constructor/Builder/Builder";
import type { FaceDataOverride } from "Meta/Constructor/OverRide.types";
import type { VoxelProcessData } from "Meta/Constructor/Voxel.types";
/**# Voxel Substance Type
 * ---
 * All solid and transparent voxels are grouped together in the same mesh per chunk.
 * While the the liquid and magma will chunks will have their own seperate meshes per chunk.
 * Transparent voxels will not cause the faces of solid voxels next to them to be culled they also have double sided rendering.
 */
export declare type VoxelSubstanceType = "solid" | "transparent" | "flora" | "liquid" | "magma";
/**VoxelT emplateS ubstance Type
 * ---
 * Basically same as Voxel Substance Type but only has the substances which have their own generated mesh.
 */
export declare type VoxelTemplateSubstanceType = "solid" | "flora" | "liquid" | "magma";
export declare type VoxelHooks = "texturesRegistered" | "beforeAdd" | "afterAdd" | "beforeRemove" | "afterAfter" | any;
export declare type VoxelConstructorThreadHooks = "texturesRegistered" | any;
export declare type VoxelWorldThreadHooks = "beforeAdd" | "afterAdd" | "beforeRemove" | "afterAfter" | any;
/**# Voxel Data
 * ---
 * This the needed information for each voxel.
 */
export declare type VoxelData = {
    name: string;
    shapeId: string;
    id: string;
    substance: VoxelSubstanceType;
    material: string;
    hardnress: number;
    isRich?: boolean;
    physics?: {
        collider: string;
        checkCollisions: boolean;
    };
    states?: number;
    lightSource?: boolean;
    lightValue?: number;
};
export declare type RawVoxelData = [
    id: number,
    light: number,
    state: number,
    secondaryId: number
];
export declare type VoxelConstructorObject = {
    id: string;
    hooks: Record<VoxelConstructorThreadHooks, (DVEB: typeof DVEBuilswe) => any>;
    cullFace?: {
        (data: FaceDataOverride): boolean;
    };
    aoOverRide?: {
        (data: FaceDataOverride): boolean;
    };
    process(data: VoxelProcessData, builder: typeof DVEBuilswe): void;
};
