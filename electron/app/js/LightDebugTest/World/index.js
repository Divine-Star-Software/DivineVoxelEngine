import { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
const DVEW = new DivineVoxelEngineWorld(self);
self.DVEW = DVEW;
RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");
const worldGen = new WorldGen(DVEW);
const start = () => {
    let startX = -16;
    let startZ = -16;
    let endX = 16;
    let endZ = 16;
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            const chunk = DVEW.worldGeneration.getBlankChunk(false);
            DVEW.worldGeneration.chunkDataHelper.fillWithAir(chunk);
            worldGen.generateChunk(chunk, x, 0, z);
            DVEW.worldData.setChunk(x, 0, z, chunk);
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunkAsync(x, 0, z);
        }
    }
    DVEW.buildFluidMesh();
    const x = 0;
    const z = 0;
    DVEW.worldData.setData(x, 7, z, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 7, z);
    DVEW.runChunkRebuildQue();
    DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
