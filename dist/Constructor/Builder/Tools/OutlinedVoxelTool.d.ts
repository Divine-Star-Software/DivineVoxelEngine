import type { ConstructorTextureData, DirectionNames } from "../../../Meta/";
import { VoxelMesherDataTool } from "./VoxelMesherDataTool.js";
export declare const OutlinedVoxelTool: {
    _currentTexts: number[];
    setCurrentTextures(textures: number[]): void;
    addTo: {
        top(tool: VoxelMesherDataTool): void;
        bottom(tool: VoxelMesherDataTool): void;
        north(tool: VoxelMesherDataTool): void;
        south(tool: VoxelMesherDataTool): void;
        east(tool: VoxelMesherDataTool): void;
        west(tool: VoxelMesherDataTool): void;
    };
    getOutlineUVs(texture: ConstructorTextureData, onRegister: (uvs: number[]) => void): void;
    getTexture(direction: DirectionNames | "left" | "right", face: DirectionNames, tool: VoxelMesherDataTool): number;
};
