import type { DivineVoxelEngineFluidBuilder } from "../DivineVoxelEngineFluidBuilder";
import { RegisterDefaultFluidShapes } from "../Shapes/Functions/RegisterDefaultFluidShapes.js";

export function InitWorker(DVEFB: DivineVoxelEngineFluidBuilder) {
 RegisterDefaultFluidShapes(DVEFB);

 addEventListener("message", (event: MessageEvent) => {
  const data = event.data;
  const message = data[0];

  if (message == "connect-world") {
   const port = event.ports[0];

   port.onmessage = (event: MessageEvent) => {
    messageFromWorld(event);
   };

   port.postMessage(["connect-fluid-shape-map", DVEFB.shapeManager.shapeMap]);
  }
  if (message == "re-start") {
   DVEFB.reStart();
  }
  if (message == "sync-settings") {
   const settings = data[1];
   DVEFB.syncSettings(settings);
   return;
  }
 });

 const messageFromWorld = (event: MessageEvent) => {
  const data = event.data;

  const eventType = data[0];

  if (eventType == 0) {
   const chunkX = data[1];
   const chunkY = data[2];
   const chunkZ = data[3];
   const positions = new Uint16Array(data[4]);
   const faces = new Uint8Array(data[5]);
   const shapes = new Uint16Array(data[6]);
   const uvs = new Uint16Array(data[7]);
   const colors = new Float32Array(data[8]);
   const light = new Float32Array(data[9]);
//console.log(light);
   DVEFB.fluidMeshBuilder.addTemplate(
    chunkX,
    chunkY,
    chunkZ,
    positions,
    faces,
    shapes,
    uvs,
    colors,
    light
   );
  }

  if (eventType == 1) {
   const meshData = DVEFB.fluidMeshBuilder.generateMesh();

   const positionArray = new Float32Array(meshData[0]);
   const indiciesArray = new Int32Array(meshData[1]);
   const RGBLightColorsArray = new Float32Array(meshData[2]);
   const sunLightColorsArray = new Float32Array(meshData[3]);
   const colorsArray = new Float32Array(meshData[4]);
   const uvArray = new Float32Array(meshData[5]);

   //@ts-ignore
   DVEFB.worker.postMessage(
    [
     0,
     0,
     0,
     0,
     positionArray.buffer,
     indiciesArray.buffer,
     RGBLightColorsArray.buffer,
     sunLightColorsArray.buffer,
     colorsArray.buffer,
     uvArray.buffer,
    ],
    //@ts-ignore
    [
     positionArray.buffer,
     indiciesArray.buffer,
     RGBLightColorsArray.buffer,
     sunLightColorsArray.buffer,
     colorsArray.buffer,
     uvArray.buffer,
    ]
   );
  }
 };
}
