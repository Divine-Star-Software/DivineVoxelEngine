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
 builderPath: string,
 nexusPath?: string
): {
 worldWorker: Worker;
 builderWorkers: Worker[];
 nexusWorker?: Worker | null;
} => {
 const wPath = new URL(worldPath, basePath);

 const worldWorker = new Worker(wPath, {
  type: "module",
 });

 const bPath = new URL(builderPath, basePath);

 const builderWorkers: Worker[] = [];
 for (let i = 0; i < 12; i++) {
  builderWorkers.push(
   new Worker(bPath, {
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
  builderWorkers: builderWorkers,
  nexusWorker: nexusWorker,
 };
};
