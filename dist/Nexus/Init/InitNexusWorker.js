import { getNexusWorkerFunctions } from "./NexusMessageFunctions.js";
export function InitNexusWorker(DVEN, onReady, onMessage, onRestart) {
    return new Promise((resolve, reject) => {
        try {
            const messageFunctions = getNexusWorkerFunctions(resolve, DVEN, onReady);
            addEventListener("message", (event) => {
                const eventData = event.data;
                const message = eventData[0];
                if (messageFunctions[message]) {
                    messageFunctions[message](eventData, event);
                }
            });
        }
        catch (error) {
            reject(false);
        }
    });
}
