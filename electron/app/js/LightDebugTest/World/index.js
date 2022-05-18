import { DVEW } from "../../../out/index.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW, "global");
const worldGen = new WorldGen(DVEW);
const start = () => {
    let startX = -64;
    let startZ = -64;
    let endX = 64;
    let endZ = 64;
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            worldGen.generateChunk(x, 0, z);
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
    const x = 0;
    const z = 0;
    DVEW.worldData.setData(x, 6, z, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z);
    DVEW.runChunkRebuildQue();
};
(async () => {
    await DVEW.$INIT({
        onReady: start,
    });
})();
