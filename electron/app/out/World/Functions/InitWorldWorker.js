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
            "connect-builder": (data, event) => {
                const port = event.ports[0];
                DVEW.builderComm.addBuilder(port);
                port.onmessage = (event) => {
                    if (DVEW.voxelManager.shapMapIsSet())
                        return;
                    if (event.data[0] == "connect-shape-map") {
                        DVEW.voxelManager.setShapeMap(event.data[1]);
                    }
                };
            },
            "connect-fluid-builder": (data, event) => {
                const port = event.ports[0];
                DVEW.builderComm.addFluidBuilder(port);
                port.onmessage = (event) => {
                    if (DVEW.voxelManager.fluidShapMapIsSet())
                        return;
                    if (event.data[0] == "connect-fluid-shape-map") {
                        DVEW.voxelManager.setFluidShapeMap(event.data[1]);
                    }
                };
            },
        };
        addEventListener("message", (event) => {
            const eventData = event.data;
            const message = eventData[0];
            /*
               if (message == "get-world-data") {
                const textures = DVEW.textureManager.generateTexturesData();
                DVEW.worker.postMessage(["set-world-data", textures]);
                DVEW.voxelManager.runVoxelHookForAll("texturesRegistered");
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
                DVEW.builderComm.addBuilder(port);
            
                port.onmessage = (event: MessageEvent) => {
                 if (DVEW.voxelManager.shapMapIsSet()) return;
                 if (event.data[0] == "connect-shape-map") {
                  DVEW.voxelManager.setShapeMap(event.data[1]);
                 }
                };
                return;
               }
            
               if (message == "connect-fluid-builder") {
                const port = event.ports[0];
                DVEW.builderComm.addFluidBuilder(port);
            
                port.onmessage = (event: MessageEvent) => {
                 if (DVEW.voxelManager.fluidShapMapIsSet()) return;
                 if (event.data[0] == "connect-fluid-shape-map") {
                  DVEW.voxelManager.setFluidShapeMap(event.data[1]);
                 }
                };
                return;
               }   */
            if (messageFunctions[message]) {
                console.log(message);
                messageFunctions[message](eventData, event);
                return;
            }
            else {
                console.log(message);
            }
            onMessage(message, eventData);
        });
    });
    return prom;
}
