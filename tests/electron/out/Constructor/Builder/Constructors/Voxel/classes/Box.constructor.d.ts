import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types";
import { VoxelTemplater } from "../../../Tools/VoxelTemplater.js";
import type { DirectionNames } from "Meta/Util.types.js";
export declare class BoxVoxelConstructor implements VoxelConstructor {
    id: string;
    textures: number[];
    constructor(id: string, textures: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>);
    process(templater: typeof VoxelTemplater): void;
}
export declare type PillarBoxVoxelConstructorData = {
    top: ConstructorTextureData;
    bottom: ConstructorTextureData;
    sideMiddle: ConstructorTextureData;
    sideBottom: ConstructorTextureData;
    sideTop: ConstructorTextureData;
    sideFloat: ConstructorTextureData;
};
export declare class PillarBoxVoxelConstructor {
    id: string;
    textures: [
        top: number,
        bottom: number,
        sideMiddle: number,
        sideBottom: number,
        sideTop: number,
        sideFloat: number
    ];
    constructor(id: string, textures: PillarBoxVoxelConstructorData);
    process(templater: typeof VoxelTemplater): void;
}
