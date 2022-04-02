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
const playerWatcher = new PlayerWatcher(worldGen, DVEW);
const start = async () => {
    const numChunks = 5;
    let startX = -16 * numChunks;
    let startZ = -16 * numChunks;
    let endX = 16 * numChunks;
    let endZ = 16 * numChunks;
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            //  const chunk = worldGen.generateChunkStressTest(i, k);
            const chunks = worldGen.generateChunkNormal(x, z);
            for (let y = 0; y < chunks.length; y++) {
                DVEW.worldData.setChunk(x, 0 + 128 * y, z, chunks[y]);
            }
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            for (let y = 0; y < 2; y++) {
                DVEW.buildChunkAsync(x, 0 + 128 * y, z);
            }
        }
    }
    DVEW.buildFluidMesh();
};
DVEW.matrixCentralHub.registerThread("my-thread", new Worker("./path-to-worker.js"));
DVEW.matrixCentralHub.syncChunk(0, 0, 0);
DVEW.matrixCentralHub.releaseChunk(0, 0, 0);
DVEW.matrixCentralHub.releaseChunkInThread("my-thread", 0, 0, 0);
DVEW.matrixCentralHub.syncGlobalVoxelPalette();
DVEW.matrixCentralHub.syncGlobalVoxelPaletteInThread("my-thread");
DVEW.matrixCentralHub.syncRegionVoxelPalette(0, 0, 0);
DVEW.matrixCentralHub.syncRegionVoxelPaletteInThread("my-thread", 0, 0, 0);
DVEW.$INIT({
    onReady: start,
    onMessage: (message, data) => {
        if (message == "connect-player") {
            playerWatcher.setPlayerSharedArrays(data);
            playerWatcher.startWatchingPlayer();
        }
    },
});
