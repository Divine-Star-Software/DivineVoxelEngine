import { ChunkTemplate, FullChunkTemplate } from "Meta/index.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const fluidBuilderCommBase = CreateInterComm("world-fluid-builder", {
 fluidMeshHasBeenUpdated: false,
 ready: false,
});

const fluidBuilderCommFunctions = {
 fluidMeshHasBeenUpdated: false,
 setChunkTemplateForFluidMesh: function (
  this: typeof fluidBuilderCommBase,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  template: ChunkTemplate
 ) {
  this.fluidMeshHasBeenUpdated = true;
  const positions = new Uint16Array(template.positionTemplate);
  const faces = new Uint8Array(template.faceTemplate);
  const shapes = new Uint16Array(template.shapeTemplate);
  const uvs = new Uint16Array(template.uvTemplate);
  const colors = new Float32Array(template.colorTemplate);
  const light = new Float32Array(template.lightTemplate);
  this.sendMessage(
   0,
   [
    chunkX,
    chunkY,
    chunkZ,
    positions.buffer,
    faces.buffer,
    shapes.buffer,
    uvs.buffer,
    colors.buffer,
    light.buffer,
   ],
   [
    positions.buffer,
    faces.buffer,
    shapes.buffer,
    uvs.buffer,
    colors.buffer,
    light.buffer,
   ]
  );
 },
 requestFluidMeshBeReBuilt: function (this: typeof fluidBuilderCommBase) {
  this.sendMessage(1, []);
 },
 requestFullChunkBeRemoved: function (
  this: typeof fluidBuilderCommBase,
  chunkX: number,
  chunkZ: number
 ) {
  if (this.fluidMeshHasBeenUpdated) {
   this.fluidMeshHasBeenUpdated = false;
   this.sendMessage(2, [chunkX, chunkZ]);
  }
 },
};

const fluidBuilderComm = Object.assign(
 fluidBuilderCommBase,
 fluidBuilderCommFunctions
);

fluidBuilderComm.listenForMessage("ready", (data, event) => {
 fluidBuilderComm.ready = true;
});

export const FluidBuilderComm = fluidBuilderComm;
