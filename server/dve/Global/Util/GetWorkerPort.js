export const GetWorkerPort = async (environment) => {
    if (environment == "browser") {
        return self;
    }
    if (environment == "node") {
        try {
            //@ts-ignore
            const { parentPort } = require("worker_threads");
            return parentPort;
        }
        catch (error) {
            //@ts-ignore
            const { parentPort } = await import("worker_threads");
            return parentPort;
        }
    }
};
