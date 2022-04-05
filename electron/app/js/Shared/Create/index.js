export const RunInit = (init) => {
    const readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            init();
        }
    }, 10);
};
export const SetUpWorkers = (basePath, worldPath, builderPath, fluidBuilderPath, nexusPath) => {
    const wPath = new URL(worldPath, basePath);
    const worldWorker = new Worker(wPath, {
        type: "module",
    });
    const bPath = new URL(builderPath, basePath);
    const builderWorkers = [];
    for (let i = 0; i < 4; i++) {
        builderWorkers.push(new Worker(bPath, {
            type: "module",
        }));
    }
    const fPath = new URL(fluidBuilderPath, basePath);
    const fluidBuilderWorker = new Worker(fPath, {
        type: "module",
    });
    let nexusWorker = null;
    if (nexusPath) {
        nexusWorker = new Worker(new URL(nexusPath, basePath), {
            type: "module",
        });
    }
    return {
        worldWorker: worldWorker,
        builderWorkers: builderWorkers,
        fluidBuilderWorker: fluidBuilderWorker,
        nexusWorker: nexusWorker,
    };
};
