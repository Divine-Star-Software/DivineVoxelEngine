export const RunInit = (init: Function) => {
 const readyStateCheckInterval = setInterval(function () {
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
 nexusPath?: string
): {
 worldWorker: Worker;
 constructorWorkers: Worker[];
 nexusWorker?: Worker | null;
} => {
 const wPath = new URL(worldPath, basePath);

 const worldWorker = new Worker(wPath, {
  type: "module",
 });

 const constructorWorkers: Worker[] = [];
 const cPath = new URL(constructorPath, basePath);
 for (let i = 0; i < 12; i++) {
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

 return {
  worldWorker: worldWorker,
  constructorWorkers: constructorWorkers,
  nexusWorker: nexusWorker,
 };
};
