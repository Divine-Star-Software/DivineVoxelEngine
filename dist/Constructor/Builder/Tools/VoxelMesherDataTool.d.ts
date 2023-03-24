import type { FaceDataOverride } from "../Types/Override.types";
import type { DirectionNames } from "Meta/Util.types.js";
import { BuilderDataTool } from "./BuilderDataTool.js";
import { MesherDataTool } from "./MesherDataTools.js";
import { QuadVertexData } from "../Classes/VertexData.js";
export declare class VoxelMesherDataTool extends MesherDataTool {
    voxel: BuilderDataTool;
    nVoxel: BuilderDataTool;
    faceDataOverride: FaceDataOverride;
    constructor();
    calculateLight(direction: DirectionNames, ignoreAO?: boolean): void;
    calculateFlow(): void;
    getWorldLight(): QuadVertexData;
    getWorldAO(): QuadVertexData;
    getWorldLevel(): QuadVertexData;
    getOverlayTextures(): QuadVertexData;
    setTexture(uv: number): this;
    getUV(): number;
    setFaceFlipped(value: boolean): this;
    isFaceFlipped(): boolean;
    isFaceExposed(face: DirectionNames): boolean;
}
