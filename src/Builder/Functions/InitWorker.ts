import type { MeshData } from "Meta/Util.types";
import type { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
import { RegisterDefaultShapes } from "../Shapes/Functions/RegisterDefaultShapes.js";

export function InitWorker(DVEB: DivineVoxelEngineBuilder) {
 RegisterDefaultShapes(DVEB.shapeManager, DVEB.shapeHelper);

 addEventListener("message", (event: MessageEvent) => {
  const data = event.data;
  const message = data[0];



  if (message == "connect-world") {
   const port = event.ports[0];

   port.onmessage = (event: MessageEvent) => {
    messageFromWorld(event);
   };

   port.postMessage(["connect-shape-map", DVEB.shapeManager.shapeMap]);
  }
 });

 const messageFromWorld = (event: MessageEvent) => {
  const data = event.data;

  const chunkType = data[0];
  const chunkX = data[1];
  const chunkZ = data[2];
  const positions = new Uint16Array(data[3]);
  const faces = new Uint8Array(data[4]);
  const shapes = new Uint16Array(data[5]);
  const uvs = new Uint16Array(data[6]);
  const lights = new Float32Array(data[7]);
  const ao = new Float32Array(data[8]);

  const meshData = DVEB.builder.buildChunkMesh(
    chunkX,
    chunkZ,
   positions,
   faces,
   shapes,
   uvs,
   lights,
   ao
  );

  const positionArray = new Float32Array(meshData.positions);
  const indiciesArray = new Int32Array(meshData.indices);
  const linearColorsArray = new Float32Array(meshData.colors);
  const fullColorsArray = new Float32Array(meshData.colors);
  const uvArray = new Float32Array(meshData.uvs);

  //@ts-ignore
  DVEB.worker.postMessage(
   [
    chunkType,
    chunkX,
    chunkZ,
    positionArray.buffer,
    indiciesArray.buffer,
    linearColorsArray.buffer,
    fullColorsArray.buffer,
    uvArray.buffer,
   ],
   //@ts-ignore
   [
    positionArray.buffer,
    indiciesArray.buffer,
    linearColorsArray.buffer,
    fullColorsArray.buffer,
    uvArray.buffer,
   ]
  );
 };
}
