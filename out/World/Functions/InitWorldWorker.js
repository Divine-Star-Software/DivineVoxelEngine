export function InitWorldWorker(DVEW, onReady, onMessage) {
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
            }
            if (message == "block-add") {
                const chunkXZ = DVEW.worldData.getChunkPosition(event.data[1], event.data[2], event.data[3]);
                DVEW.worldData.requestVoxelAdd(chunkXZ[0], chunkXZ[1], chunkXZ[2], eventData[1], eventData[2], eventData[3]);
            }
            if (message == "block-remove") {
                const chunkXZ = DVEW.worldData.getChunkPosition(event.data[1], event.data[2], event.data[3]);
                DVEW.worldData.requestVoxelBeRemove(chunkXZ[0], chunkXZ[1], chunkXZ[2], eventData[1], eventData[2], eventData[3]);
            }
            if (eventData == "start") {
                onReady();
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
