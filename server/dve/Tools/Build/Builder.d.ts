export declare class BuilderTool {
    data: {
        dimesnion: number;
        x: number;
        y: number;
        z: number;
        LOD: number;
    };
    setDimension(dimensionId: string | number): this;
    setLOD(lod: number): this;
    setXZ(x: number, z: number): this;
    setXYZ(x: number, y: number, z: number): this;
    buildChunk(): this;
    buildColumn(): false | this;
    fillColumn(): this;
}
