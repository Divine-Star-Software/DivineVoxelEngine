import { ChunkData } from "Meta/Chunks/Chunk.types";
import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import type { VoxelPalette } from "Meta/WorldData/World.types";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import { ChunkDataHelper } from "./ChunkData/ChunkDataHelper.js";
import { IlluminationManager } from "./Illumanation/IlluminationManager.js";
import { VoxelPaletteHelper } from "./VoxelPalettes/VoxelPaletteHelper.js";

/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export class WorldGeneration {
 globalVoxelPaletteIndex = 1;
 perChunkVoxelRecord: Record<string, string[]> = {};
 globalVoxelPalette: VoxelPalette = {};
 globalVoxelPaletteMap: Record<string, number> = {};
 globalVoxelPaletteRecord: Record<string, string[]> = {};
 chunkDataHelper: ChunkDataHelper;
 illumantionManager: IlluminationManager;
 voxelPaletteHelper: VoxelPaletteHelper = new VoxelPaletteHelper(this);

 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.illumantionManager = new IlluminationManager(this.DVEW);
  this.chunkDataHelper = new ChunkDataHelper(this.DVEW);
 }
 /**# Get Vooxel Id From Global Palette
  * ---
  * Gets the number id for use of actual world generation.
  * This is what is actually stored in the chunk voxels.
  * @param voxelTrueId
  * @param voxelStateId
  * @returns
  */
 getVoxelIdFromGlobalPalette(
  voxelTrueId: string,
  voxelStateId: string
 ): number {
  return this.globalVoxelPaletteMap[`${voxelTrueId}:${voxelStateId}`];
 }
 /**# Get Voxel True Id From Global Palette
  * ---
  * Returns the string id and state from the global voxel palette.
  * @param voxelId
  * @param voxelStateId
  * @returns
  */
 getVoxelDataFromGlobalPalette(voxelId: number): string[] {
  const id = this.globalVoxelPalette[voxelId];
  return this.globalVoxelPaletteRecord[id];
 }

 registerVoxelForGlobalPalette(voxel: VoxelInteface) {
  const defaultId = `${voxel.data.id}:default`;
  this.globalVoxelPalette[this.globalVoxelPaletteIndex] = defaultId;
  this.globalVoxelPaletteMap[`${voxel.data.id}:default`] =
   this.globalVoxelPaletteIndex;
  this.globalVoxelPaletteIndex++;
  this.globalVoxelPaletteRecord[defaultId] = [voxel.data.id, "default"];
  if (voxel.data.states) {
   for (const state of voxel.data.states) {
    const stateID = `${voxel.data.id}:${state}`;
    this.globalVoxelPalette[this.globalVoxelPaletteIndex] = stateID;
    this.globalVoxelPaletteRecord[stateID] = [voxel.data.id, state];
    this.globalVoxelPaletteMap[`${voxel.data.id}:${state}`] =
     this.globalVoxelPaletteIndex;
    this.globalVoxelPaletteIndex++;
   }
  }
 }

 registerVoxelForPerChunkVoxelPalette(voxel: VoxelInteface) {
  const defaultId = `${voxel.data.id}:default`;
  this.perChunkVoxelRecord[defaultId] = [voxel.data.id, "default"];
  if (voxel.data.states) {
   for (const state of voxel.data.states) {
    const stateID = `${voxel.data.id}:${state}`;
    this.perChunkVoxelRecord[stateID] = [voxel.data.id, state];
   }
  }
 }

 getGlobalVoxelPalette() {
  return this.globalVoxelPalette;
 }

 getBlankChunk(
  empty: boolean = true,
  palette: boolean = false,
  voxels: number[][][] = []
 ): ChunkData {
  let paletteData = {};
  if (palette) {
   paletteData = {
    count: 0,
    map: {},
    record: {},
   };
  }
  return {
   ...{
    voxels: voxels,
    maxMinHeight: [],
    heightMap: [],
    isEmpty: empty,
    ...paletteData,
   },
  };
 }
}
