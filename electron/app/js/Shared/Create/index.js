export const RunInit = (init) => {
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete" && typeof BABYLON !== undefined) {
            clearInterval(readyStateCheckInterval);
            init();
        }
    }, 10);
};
export const SetUpWorkers = (basePath, worldPath, constructorPath, nexusPath) => {
    const wPath = new URL(worldPath, basePath);
    const worldWorker = new Worker(wPath, {
        type: "module",
    });
    const constructorWorkers = [];
    const cPath = new URL(constructorPath, basePath);
    for (let i = 0; i < 12; i++) {
        constructorWorkers.push(new Worker(cPath, {
            type: "module",
        }));
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
