import type { ChunkData } from "Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { InfoByte } from "Global/Util/InfoByte.js";
import type { LightByte } from "Global/Util/LightByte.js";
import type { VoxelInteface, VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types.js";
import { CalculateVoxelLight, VoxelLightMixCalc } from "./Functions/CalculateVoxelLight.js";
import { VoxelByte } from "Global/Util/VoxelByte.js";
import { WorldRegion } from "Meta/WorldData/World.types.js";
/**# World Data
 * ---
 * Handles all the game worlds data.
 * Also handles getting and setting data.
 */
export declare class WorldData {
    DVEW: DivineVoxelEngineWorld;
    renderDistance: number;
    chunkXPow2: number;
    chunkZPow2: number;
    chunkYPow2: number;
    regionXPow2: number;
    regionZPow2: number;
    regionYPow2: number;
    voxelPaletteFunctions: Record<string, (voxelId: string, voxelStateId: string, chunk: ChunkData, region?: WorldRegion) => number>;
    regions: Record<string, WorldRegion>;
    chunks: Record<string, ChunkData>;
    _RGBLightRemoveQue: number[][];
    _RGBLightUpdateQue: number[][];
    _chunkRebuildQue: number[][];
    _chunkRebuildQueMap: Record<string, Record<VoxelSubstanceType | "all", boolean>>;
    calculdateVoxelLight: typeof CalculateVoxelLight;
    voxelRGBLightMixCalc: typeof VoxelLightMixCalc;
    infoByte: InfoByte;
    lightByte: LightByte;
    voxelByte: VoxelByte;
    substanceRules: Record<string, boolean>;
    constructor(DVEW: DivineVoxelEngineWorld);
    getRGBLightUpdateQue(): number[][];
    clearRGBLightUpdateQue(): void;
    getRGBLightRemoveQue(): number[][];
    clearRGBLightRemoveQue(): void;
    getChunkRebuildQue(): number[][];
    getSubstanceNeededToRebuild(chunkX: number, chunkY: number, chunkZ: number): Record<VoxelSubstanceType | "all", boolean>;
    clearChunkRebuildQue(): void;
    addToRebuildQue(x: number, y: number, z: number, substance: "all" | VoxelSubstanceType): void;
    getCurrentWorldDataSize(): number;
    getCurrentWorldDataString(): string;
    setAir(x: number, y: number, z: number, lightValue: number): void;
    setLight(x: number, y: number, z: number, lightValue: number): void;
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
    setData(x: number, y: number, z: number, data: number): false | undefined;
    addRegion(regionX: number, regionY: number, regionZ: number): WorldRegion;
    paintVoxel(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
    /**# Insert Data
     * ---
     * Acts like **setData** but will create a new chunk if it does not exist.
     * @param x
     * @param y
     * @param z
     * @param data
     */
    insertData(x: number, y: number, z: number, data: number): false | undefined;
    getChunk(chunkX: number, chunkY: number, chunkZ: number): ChunkData | false;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
    setChunk(chunkX: number, chunkY: number, chunkZ: number, chunk: ChunkData): void;
    getChunkPosition(x: number, y: number, z: number): number[];
    requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): WorldRegion | undefined;
    requestVoxelBeRemoved(x: number, y: number, z: number): void;
}
