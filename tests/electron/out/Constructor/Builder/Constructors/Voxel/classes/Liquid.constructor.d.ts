import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types";
import { VoxelTemplater } from "../../../Tools/VoxelTemplater.js";
export declare class LiquidVoxelConstructor implements VoxelConstructor {
    id: string;
    textures: [still: number, flowing: number];
    ignoreAO: boolean;
    constructor(id: string, textures: [ConstructorTextureData, ConstructorTextureData]);
    process(templater: typeof VoxelTemplater): void;
}
