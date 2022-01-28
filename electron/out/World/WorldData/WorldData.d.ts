import type { ChunkVoxels, ChunkData } from "Meta/Chunks/Chunk.types";
import { GetRelativeVoxelData, GetVoxelData } from "./Functions/GetVoxelData.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { InfoByte } from "Global/Util/InfoByte.js";
import { LightByte } from "Global/Util/LightByte.js";
import { VoxelSunLightMixCalc } from "./Functions/CalculateVoxelSunLight.js";
import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
export declare class WorldData {
    DVEW: DivineVoxelEngineWorld;
    renderDistance: number;
    chunkXPow2: number;
    chunkZPow2: number;
    chunkYPow2: number;
    chunks: Record<string, ChunkData>;
    getVoxelData: typeof GetVoxelData;
    getRelativeVoxelData: typeof GetRelativeVoxelData;
    calculdateVoxelLight: typeof CalculateVoxelLight;
    voxelRGBLightMixCalc: typeof VoxelLightMixCalc;
    voxelSunLightMixCalc: typeof VoxelSunLightMixCalc;
    infoByte: InfoByte;
    lightByte: LightByte;
    substanceRules: Record<string, boolean>;
    constructor(DVEW: DivineVoxelEngineWorld);
    getCurrentWorldDataSize(): number;
    getCurrentWorldDataString(): string;
    setLight(x: number, y: number, z: number, lightValue: number): boolean;
    getLight(x: number, y: number, z: number): number;
    /**# Is Exposed
     * ---
     * Will return true if any face of the voxel is exposed.
     * Must provide the voxel's x,y,z position.
     * @param voxel
     * @param voxelData
     * @param x
     * @param y
     * @param z
     * @returns
     */
    isVoxelExposed(voxel: VoxelInteface, voxelData: any[], x: number, y: number, z: number): boolean;
    /**# Voxel Face Check
     * ---
     * Determines if a face of a voxel is exposed.
     * You must provide the x,y,z position for the face that is being checked.
     * For instance if you want to check the top face it would be the voxels y plus 1.
     * @param voxel
     * @param voxelData
     * @param x
     * @param y
     * @param z
     * @returns
     */
    voxelFaceCheck(voxel: VoxelInteface, voxelData: any[], x: number, y: number, z: number): boolean;
    removeData(x: number, y: number, z: number): false | undefined;
    getVoxel(x: number, y: number, z: number): false | any[];
    getData(x: number, y: number, z: number): any;
    _copy(data: any): any[];
    /**# Set Data
     * ---
     * Sets the data for a specific point in the world data.
     * Will not make a new chunk if there is none and just return false.
     * @param x
     * @param y
     * @param z
     * @param data
     * @returns
     */
    setData(x: number, y: number, z: number, data: number[]): false | undefined;
    /**# Insert Data
     * ---
     * Acts like **setData** but will create a new chunk if it does not exist.
     * @param x
     * @param y
     * @param z
     * @param data
     */
    insertData(x: number, y: number, z: number, data: number[]): void;
    getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData): void;
    getChunkPosition(x: number, y: number, z: number): number[];
    requestVoxelAdd(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number, voxelPaletteId?: number): false | ChunkVoxels;
    _getRelativeChunkPosition(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): number[];
    requestVoxelBeRemove(chunkX: number, chunkY: number, chunkZ: number, x: number, y: number, z: number): false | ChunkVoxels;
}
