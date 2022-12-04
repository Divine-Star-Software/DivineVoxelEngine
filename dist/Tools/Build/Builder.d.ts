import { ChunkDataTool } from "../Data/ChunkDataTool.js";
export declare class BuilderTool {
    static _chunkTool: ChunkDataTool;
    data: {
        dimesnion: string;
        x: number;
        y: number;
        z: number;
        LOD: number;
    };
    setDimension(dimensionId: string): this;
    setLOD(lod: number): this;
    setXZ(x: number, z: number): this;
    setXYZ(x: number, y: number, z: number): this;
    buildChunk(): this;
    buildColumn(): false | this;
    removeColumn(): false | this;
    fillColumn(): this;
}
