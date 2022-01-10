import { MeshData } from "Meta/Util.types.js";
import { Util } from "../../../Global/Util.helper.js";
import { MeshBuilder } from "./Meshes/MeshBuilder.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { RegisterDefaultShapes } from "./Shapes/Functions/RegisterDefaultShapes.js";
const UTIL = new Util();
const meshBuilder = new MeshBuilder();

const worker = self;

const shapeManager = new ShapeManager();
const shapeHelper = new ShapeHelper(UTIL);
RegisterDefaultShapes(shapeManager, shapeHelper);

const builder = new ChunkMeshBuilder(meshBuilder, shapeManager, UTIL);

function sendChunkData(chunkX: number, chunkZ: number, data: MeshData) {
 const positionArray = new Float32Array(data.positions);
 const indiciesArray = new Int32Array(data.indices);
 const colorsArray = new Float32Array(data.colors);
 const uvArray = new Float32Array(data.uvs);

 //@ts-ignore
 worker.postMessage(
  [
   chunkX,
   chunkZ,
   positionArray.buffer,
   indiciesArray.buffer,
   colorsArray.buffer,
   uvArray.buffer,
  ],
  //@ts-ignore
  [
   positionArray.buffer,
   indiciesArray.buffer,
   colorsArray.buffer,
   uvArray.buffer,
  ]
 );
}

const messageFromWorld = (event: MessageEvent) => {
 const data = event.data;

 const chunkX = data[0];
 const chunkZ = data[1];
 const positions = new Uint16Array(data[2]);
 const faces = new Uint8Array(data[3]);
 const shapes = new Uint16Array(data[4]);
 const uvs = new Uint16Array(data[5]);
 const lights = new Float32Array(data[6]);
 const ao = new Float32Array(data[7]);

 const meshData = builder.buildChunkMesh(
  chunkX,
  chunkZ,
  positions,
  faces,
  shapes,
  uvs,
  lights,
  ao
 );

 sendChunkData(chunkX, chunkZ, meshData);
};

addEventListener("message", (event: MessageEvent) => {
 const data = event.data;
 const message = data[0];

 if (message == "connect-world") {
  const port = event.ports[0];

  port.onmessage = (event: MessageEvent) => {
   messageFromWorld(event);
  };
 }
});
