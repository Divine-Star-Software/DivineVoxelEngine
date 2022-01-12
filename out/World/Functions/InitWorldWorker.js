export function InitWorldWorker(DVEW, onReady, onMessage) {
    addEventListener("message", (event) => {
        const eventData = event.data;
        const message = eventData[0];
        if (message == "get-world-data") {
            const textures = DVEW.textureManager.generateTexturesData();
            DVEW.worker.postMessage(["set-world-data", { texturePaths: textures }]);
        }
        if (message == "block-add") {
            const chunkXZ = DVEW.UTIL.calculateGameZone(eventData[1], eventData[3]);
            DVEW.worldData.requestBlockAdd(chunkXZ[0], chunkXZ[1], eventData[1], eventData[2], eventData[3]);
        }
        if (message == "block-remove") {
            const chunkXZ = DVEW.UTIL.calculateGameZone(eventData[1], eventData[3]);
            DVEW.worldData.requestBlockRemove(chunkXZ[0], chunkXZ[1], eventData[1], eventData[2], eventData[3]);
        }
        if (eventData == "start") {
            onReady();
            return;
        }
        if (message == "block-data-recieve") {
            const blockData = eventData[1];
            console.log(blockData);
        }
        if (message == "connect-builder") {
            const port = event.ports[0];
            DVEW.builderManager.addBuilder(port);
        }
        onMessage(message, eventData);
    });
}
