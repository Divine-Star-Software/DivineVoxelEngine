export const GetWorkerPort = async (environment) => {
    if (environment == "browser") {
        return self;
    }
    if (environment == "node") {
        //@ts-ignore
        if (require) {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            return parentPort;
        }
        else {
            //@ts-ignore
            const { parentPort } = await import("worker_threads").parentPort;
            return parentPort;
        }
    }
};
