import { DivineVoxelEngineRender } from "../../../out/Render/DivineVoxelEngineRender";

export const RunInit = (init: Function) => {
 const readyStateCheckInterval = setInterval(function () {
console.log("Sup")
  if (document.readyState === "complete" && typeof BABYLON !== undefined) {
   clearInterval(readyStateCheckInterval);
   init();
  }
 }, 10);
};

export const SetUpWorkers = (
 basePath: string,
 worldPath: string,
 constructorPath: string,
 nexusPath: string | false | null | undefined = null,
 dataPath: string | false | null | undefined = null,
 fxPath: string | false | null | undefined = null,
 richWorldPath: string | false | null | undefined = null
) => {
 const worldWorker = new Worker(new URL(worldPath, basePath), {
  type: "module",
 });

 const constructorWorkers: Worker[] = [];
 const cPath = new URL(constructorPath, basePath);
 for (let i = 0; i < navigator.hardwareConcurrency - 2; i++) {
  constructorWorkers.push(
   new Worker(cPath, {
    type: "module",
   })
  );
 }

 let nexusWorker = null;
 if (nexusPath) {
  nexusWorker = new Worker(new URL(nexusPath, basePath), {
   type: "module",
  });
 }

 let dataWorker = null;
 if (dataPath) {
  dataWorker = new Worker(new URL(dataPath, basePath), {
   type: "module",
  });
 }

 let fxWorker = null;
 if (fxPath) {
  fxWorker = new Worker(new URL(fxPath, basePath), {
   type: "module",
  });
 }

 let richWorldWorker = null;
 if (richWorldPath) {
  richWorldWorker = new Worker(new URL(richWorldPath, basePath), {
   type: "module",
  });
 }

 return {
  worldWorker: worldWorker,
  constructorWorkers: constructorWorkers,
  nexusWorker: nexusWorker,
  dataWorker: dataWorker,
  fxWorker: fxWorker,
  richWorldWorker: richWorldWorker,
 };
};

export const SyncWithGraphicsSettings = (DVER: DivineVoxelEngineRender) => {
 let grahpicsLevel = localStorage.getItem("graphics");
 if (!grahpicsLevel) grahpicsLevel = "medium";

 if (grahpicsLevel == "low") {
  DVER.render.updateFogOptions({
   mode: "exponential",
  });
  DVER.render.updateShaderEffectOptions({
   floraEffects: false,
   liquidEffects: false,
  });
 }
 if (grahpicsLevel == "medium") {
  DVER.render.updateFogOptions({
   mode: "volumetric",
  });
  DVER.render.updateShaderEffectOptions({
   floraEffects: false,
   liquidEffects: false,
  });
 }
 if (grahpicsLevel == "high") {
  DVER.render.updateFogOptions({
   mode: "volumetric",
  });
  DVER.render.updateShaderEffectOptions({
   floraEffects: true,
   liquidEffects: true,
  });
 }
 if (grahpicsLevel == "ultra") {
  DVER.render.updateFogOptions({
   mode: "animated-volumetric",
  });
  DVER.render.updateShaderEffectOptions({
   floraEffects: true,
   liquidEffects: true,
  });
 }
};
