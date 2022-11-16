export declare class BuilderTool {
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
    fillColumn(): this;
}
