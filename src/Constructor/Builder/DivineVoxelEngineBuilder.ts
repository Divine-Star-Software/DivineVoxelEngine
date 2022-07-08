import { type EngineSettingsData } from "Meta/index.js";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { ShapeBuilder } from "./Shapes/ShapeBuilder.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { Processor } from "./Processor/Processor.js";
import { ChunkMesher } from "./Mesher/ChunMesher.js";
import { VoxelHelper } from "./Processor/VoxelHelper.js";
//functions
import { InitBuilder } from "./Init/InitBuilder.js";

export const DVEB = {
 textureManager: TextureManager,
 shapeManager: ShapeManager,
 shapeHelper: ShapeHelper,
 shapeBuilder: ShapeBuilder,
 chunkMesher: ChunkMesher,
 processor: Processor,
 voxelHelper: VoxelHelper,

 async $INIT() {
  InitBuilder(this);
 },

 syncSettings(settings: EngineSettingsData) {
  this.processor.syncSettings(settings);
 },

 async buildChunk(chunkX: number, chunkY: number, chunkZ: number) {
  let chunk = DVEC.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
  if (!chunk) {
   await DVEC.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
   chunk = DVEC.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
   if (!chunk) {
    console.warn(`${chunkX} ${chunkY} ${chunkZ} could not be loaded`);
    return;
   }
  }
  const template = this.processor.makeAllChunkTemplates(
   chunk,
   chunkX,
   chunkY,
   chunkZ
  );
  this.chunkMesher.buildChunkMesh(chunkX, chunkY, chunkZ, template);
  return true;
 },
};

export type DivineVoxelEngineBuilder = typeof DVEB;
