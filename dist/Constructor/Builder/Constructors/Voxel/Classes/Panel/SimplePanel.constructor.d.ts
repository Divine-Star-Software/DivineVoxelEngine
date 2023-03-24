import type { ConstructorTextureData } from "Meta";
import { VoxelMesherDataTool } from "../../../../Tools/VoxelMesherDataTool.js";
import { VoxelConstructor } from "../VoxelConstructor.js";
import { TextureManager } from "../../../../Textures/TextureManager.js";
export declare class SimplePanelVoxelConstructor extends VoxelConstructor {
    id: string;
    textuerData: ConstructorTextureData;
    texture: number;
    constructor(id: string, textuerData: ConstructorTextureData);
    process(tool: VoxelMesherDataTool): void;
    onTexturesRegistered(textureManager: typeof TextureManager): void;
}
