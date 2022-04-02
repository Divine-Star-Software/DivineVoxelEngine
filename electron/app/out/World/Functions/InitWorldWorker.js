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
        addEventListener("message", (event) => {
            const eventData = event.data;
            const message = eventData[0];
            if (message == "get-world-data") {
                const textures = DVEW.textureManager.generateTexturesData();
                DVEW.worker.postMessage(["set-world-data", textures]);
                DVEW.voxelManager.runVoxelHookForAll("texturesRegistered");
            }
            if (message == "voxel-add") {
                DVEW.worldData.requestVoxelAdd("dve:dreamstone", "default", eventData[1], eventData[2], eventData[3]);
                DVEW.runChunkRebuildQueAsync();
            }
            if (message == "voxel-remove") {
                DVEW.worldData.requestVoxelBeRemoved(eventData[1], eventData[2], eventData[3]);
                DVEW.runChunkRebuildQueAsync();
            }
            if (eventData == "start") {
                onReady();
                return;
            }
            if (eventData == "re-start") {
                if (onRestart) {
                    onRestart();
                }
                return;
            }
            if (eventData == "sync-settings") {
                const settings = event.data[1];
                DVEW.syncSettings(settings);
                return;
            }
            if (message == "connect-builder") {
                const port = event.ports[0];
                DVEW.builderManager.addBuilder(port);
                port.onmessage = (event) => {
                    if (DVEW.voxelManager.shapMapIsSet())
                        return;
                    if (event.data[0] == "connect-shape-map") {
                        DVEW.voxelManager.setShapeMap(event.data[1]);
                    }
                };
            }
            if (message == "connect-fluid-builder") {
                const port = event.ports[0];
                DVEW.builderManager.addFluidBuilder(port);
                port.onmessage = (event) => {
                    if (DVEW.voxelManager.fluidShapMapIsSet())
                        return;
                    if (event.data[0] == "connect-fluid-shape-map") {
                        DVEW.voxelManager.setFluidShapeMap(event.data[1]);
                    }
                };
            }
            onMessage(message, eventData);
        });
    });
    return prom;
}
