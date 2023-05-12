import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
export type PillarBoxVoxelConstructorData = {
    top: ConstructorTextureData;
    bottom: ConstructorTextureData;
    sideMiddle: ConstructorTextureData;
    sideBottom: ConstructorTextureData;
    sideTop: ConstructorTextureData;
    sideFloat: ConstructorTextureData;
};
export declare class PillarBoxVoxelConstructor extends VoxelConstructor {
    id: string;
    textureData: PillarBoxVoxelConstructorData;
    textures: [
        top: number,
        bottom: number,
        sideMiddle: number,
        sideBottom: number,
        sideTop: number,
        sideFloat: number
    ];
    constructor(id: string, textureData: PillarBoxVoxelConstructorData);
    process(tool: VoxelMesherDataTool): void;
    onTexturesRegistered(textureManager: typeof TextureManager): void;
}
