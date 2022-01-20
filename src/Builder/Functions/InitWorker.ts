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
  DVEB.builder.buildChunkMesh(
   data[0],
   data[1],
   data[2],
   data[3],
   new Uint16Array(data[4]),
   new Uint8Array(data[5]),
   new Uint16Array(data[6]),
   new Uint16Array(data[7]),
   new Float32Array(data[8]),
   new Float32Array(data[9])
  );
 };
}
