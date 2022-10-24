interface AnyData {
    [key: string]: any;
}
export interface DataHandler extends AnyData {
    getRegion(x: number, y: number, z: number): Promise<Uint32Array>;
    saveRegion(x: number, y: number, z: number, regionArray: Uint32Array): Promise<void>;
    getChunk(x: number, y: number, z: number): Promise<Uint32Array>;
    saveChunk(x: number, y: number, z: number, chunkArray: Uint32Array): Promise<void>;
}
export {};
