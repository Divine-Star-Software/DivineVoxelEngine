export function InitWorldWorker(DVEW, onReady, onMessage, onRestart) {
    const prom = new Promise((resolve) => {
        const readyCheck = () => {
            if (DVEW.voxelManager.shapMapIsSet() &&
                DVEW.voxelManager.fluidShapMapIsSet()) {
                resolve(true);
            }
            else {
                setTimeout(() => {
                    readyCheck();
                }, 10);
            }
        };
        const messageFunctions = {
            "voxel-add": (data, event) => {
                DVEW.worldData.requestVoxelAdd("dve:dreamstone", "default", data[1], data[2], data[3]);
                DVEW.runChunkRebuildQueAsync();
            },
            "voxel-remove": (data, event) => {
                DVEW.worldData.requestVoxelBeRemoved(data[1], data[2], data[3]);
                DVEW.runChunkRebuildQueAsync();
            },
            "get-world-data": (data, event) => {
                const textures = DVEW.textureManager.generateTexturesData();
                DVEW.worker.postMessage(["set-world-data", textures]);
                DVEW.voxelManager.runVoxelHookForAll("texturesRegistered");
            },
            start: (data, event) => {
                onReady();
            },
            "re-start": (data, event) => {
                if (onRestart) {
                    onRestart();
                }
            },
            "sync-settings": (data, event) => {
                const settings = event.data[1];
                DVEW.syncSettings(settings);
            },
            "connect-nexus": (data, event) => {
                const port = event.ports[0];
                DVEW.nexusComm.setNexusPort(port);
            },
            "connect-builder": (data, event) => {
                const port = event.ports[0];
                DVEW.builderComm.connectBuilder(port);
            },
            "connect-fluid-builder": (data, event) => {
                const port = event.ports[0];
                DVEW.builderComm.connectFluidBuilder(port);
            },
        };
        addEventListener("message", (event) => {
            const eventData = event.data;
            const message = eventData[0];
            if (messageFunctions[message]) {
                messageFunctions[message](eventData, event);
            }
            onMessage(message, eventData);
        });
    });
    return prom;
}
