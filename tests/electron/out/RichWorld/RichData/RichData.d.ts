import { RichChunk, RichRegion, RichWorldDimensions } from "Meta/Data/RichWorldData.types.js";
export declare const RichData: {
    _dimensions: RichWorldDimensions;
    initalData: Record<string, any>;
    getRegion(x: number, y: number, z: number): false | RichRegion;
    getDimension(dimension: string): Record<string, RichRegion>;
    getChunk(x: number, y: number, z: number): false | RichChunk;
    addRegion(x: number, y: number, z: number): false | RichRegion;
    addChunk(x: number, y: number, z: number): RichChunk;
    setData(x: number, y: number, z: number, data: any): void;
    getData<T>(x: number, y: number, z: number): false | T;
    removeData(x: number, y: number, z: number): void;
    registerInitalDataForVoxel(voxelId: string, data: any): void;
    hasInitalData(voxelId: string): boolean;
    setInitalData(voxelId: string, x: number, y: number, z: number): void;
};
