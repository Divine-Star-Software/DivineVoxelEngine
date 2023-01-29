import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types";
import { VoxelTemplater } from "../../../Tools/VoxelTemplater.js";
export declare class PanelVoxelConstructor implements VoxelConstructor {
    id: string;
    texture: number;
    constructor(id: string, textures: ConstructorTextureData);
    process(templater: typeof VoxelTemplater): void;
}
