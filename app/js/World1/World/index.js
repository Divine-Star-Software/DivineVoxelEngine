import { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";
import { PlayerWatcher } from "./PlayerWatcher/PlayerWatcher.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
const DVEW = new DivineVoxelEngineWorld(self);
self.DVEW = DVEW;
RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");
const worldGen = new WorldGen(DVEW);
const playerWatcher = new PlayerWatcher(worldGen);
const start = () => {
    let chunkNum = 20;
    let totalChunks = chunkNum * 16 - 144;
    for (let i = -144; i < totalChunks; i += 16) {
        for (let k = -144; k < totalChunks; k += 16) {
            //  const chunk = worldGen.generateChunkStressTest(i, k);
            const chunk = worldGen.generateChunkNormal(i, k);
            DVEW.worldData.setChunk(i, k, chunk);
        }
    }
    for (let i = -144; i < totalChunks; i += 16) {
        for (let k = -144; k < totalChunks; k += 16) {
            DVEW.buildChunk(i, k);
        }
    }
    DVEW.buildFluidMesh();
};
DVEW.$INIT({
    voxelPalletMode: "global",
    onReady: start,
    onMessage: (message, data) => {
        if (message == "connect-player") {
            playerWatcher.setPlayerSharedArrays(data[1], data[2], data[3]);
            playerWatcher.startWatchingPlayer();
        }
    },
});
