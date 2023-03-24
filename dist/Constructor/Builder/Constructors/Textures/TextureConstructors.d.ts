import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { DirectionNames } from "Meta/Util.types.js";
import { UtilMap } from "../../../../Global/Util/UtilMap.js";
import { VoxelConstructor } from "./Classes/VoxelConstructor.js";
export declare const VoxelConstructors: {
    constructors: UtilMap<string, VoxelConstructor>;
    get(id: string): VoxelConstructor;
    registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]): void;
    defaults: {
        simple(id: string, textures: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>): any;
        pillar(id: string, textures: PillarBoxVoxelConstructorData): any;
    };
};
