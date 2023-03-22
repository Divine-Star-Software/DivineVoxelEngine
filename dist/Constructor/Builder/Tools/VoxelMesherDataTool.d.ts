import type { FaceDataOverride } from "../Types/Override.types";
import type { DirectionNames } from "Meta/Util.types.js";
import type { CustomVertexData } from "../Types/Geometry.types.js";
import { BuilderDataTool } from "./BuilderDataTool.js";
import { MesherDataTool } from "./MesherDataTools.js";
export declare class VoxelMesherDataTool extends MesherDataTool {
    relativePosition: {
        x: number;
        y: number;
        z: number;
    };
    voxel: BuilderDataTool;
    nVoxel: BuilderDataTool;
    faceDataOverride: FaceDataOverride;
    constructor();
    calculateLight(direction: DirectionNames, ignoreAO?: boolean): void;
    calculateFlow(): void;
    setLight(...light: number[]): this;
    getLight(): CustomVertexData;
    setAO(...ao: number[]): this;
    getAO(): CustomVertexData;
    setLevel(...levels: number[]): this;
    getLevel(): CustomVertexData;
    setUV(...uvs: number[]): this;
    getUV(): [number];
    setOverlayUV(...overlayUVs: number[]): this;
    getOverlayUV(): CustomVertexData;
    setFaceFlipped(value: boolean): this;
    isFaceFlipped(): boolean;
    isFaceExposed(face: DirectionNames): boolean;
}
