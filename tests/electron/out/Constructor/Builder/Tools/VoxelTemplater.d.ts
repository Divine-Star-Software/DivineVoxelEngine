import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types";
import type { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types";
import type { DirectionNames } from "Meta/Util.types";
import type { DataTool } from "Tools/Data/DataTool";
declare class VoxelTemplaterBase {
    _template: VoxelTemplate;
    _faces: number;
    currentVoxel: DataTool;
    utilDataTool: DataTool;
    addUV(index: number, forNumFaces?: number): this;
    addOverlayUVs(index: [number] | [number, number, number, number], forNumFaces?: number): this;
    addAOValue(value: number, forNumFaces?: number): this;
    addLightValue(value: number, forNumFaces?: number): this;
    addCurrentLightValue(forNumFaces?: number): this;
    setTextureRotation(face: DirectionNames, rotation: TextureRotations): this;
    isFaceExpposed(face: DirectionNames): boolean;
    processVoxelLight(ignoreAO?: boolean): this;
}
export declare const VoxelTemplater: VoxelTemplaterBase;
export {};
