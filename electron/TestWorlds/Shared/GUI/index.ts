import type { DivineVoxelEngineRender } from "../../../out/index";

export const CreateGUI = (DVER?: DivineVoxelEngineRender) => {
 let divFps = document.getElementById("fps");
 let position = document.getElementById("position");
 let chunkPosition = document.getElementById("chunk-position");

 return (
  engine: BABYLON.Engine,
  positionWatch: BABYLON.FreeCamera | BABYLON.Mesh
 ) => {
  //@ts-ignore
  divFps.innerHTML = engine.getFps().toFixed() + " fps";
  //@ts-ignore
  position.innerHTML = `${positionWatch.position.x.toFixed(
   2
  )} ${positionWatch.position.y.toFixed(2)} ${positionWatch.position.z.toFixed(
   2
  )}`;
  if (DVER) {
   //@ts-ignore
   chunkPosition.innerHTML = DVER?.util
    .getWorldBounds()
    .getChunkKeyFromPosition(
     positionWatch.position.x,
     positionWatch.position.y,
     positionWatch.position.z
    );
  }
 };
};
