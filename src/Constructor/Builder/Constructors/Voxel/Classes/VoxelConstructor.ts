import { VoxelMesherDataTool } from "../../../Tools/VoxelMesherDataTool.js";
import { TextureManager } from "../../../Textures/TextureManager.js";

export abstract class VoxelConstructor {
 id: string;
 abstract process(tool: VoxelMesherDataTool) : void;
 abstract onTexturesRegistered(textures: typeof TextureManager): void;
}
