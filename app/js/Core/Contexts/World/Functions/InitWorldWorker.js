export function InitWorldWorker(DVEW) {
    const start = () => {
        let chunkNum = 20;
        let totalChunks = chunkNum * 16 - 144;
        for (let i = -144; i < totalChunks; i += 16) {
            for (let k = -144; k < totalChunks; k += 16) {
                DVEW.worldData.generateChunk(i, k);
            }
        }
        for (let i = -144; i < totalChunks; i += 16) {
            for (let k = -144; k < totalChunks; k += 16) {
                const chunk = DVEW.worldData.getChunk(i, k);
                if (!chunk)
                    continue;
                const template = DVEW.chunkProccesor.makeChunkTemplate(chunk, i, k);
                DVEW.builderManager.requestChunkBeBuilt(i, k, template);
            }
        }
        DVEW.playerWatcher.startWatchingPlayer();
    };
    addEventListener("message", (event) => {
        const eventData = event.data;
        const message = eventData[0];
        if (message == "get-world-data") {
            const textures = DVEW.textureManager.generateTexturesData();
            console.log(DVEW.textureManager.uvTextureMap);
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
            start();
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
        if (message == "connect-player") {
            DVEW.playerWatcher.setPlayerSharedArrays(event.data[1], event.data[2], event.data[3]);
        }
    });
}
