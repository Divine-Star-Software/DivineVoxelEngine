import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
const start = async () => {
    let startX = -64;
    let startZ = -64;
    let endX = 64;
    let endZ = 64;
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            WorldGen.generateChunk(x, 0, z);
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
    DVEW.worldData.setData(x - 5, 6, z, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldData.setData(x + 5, 6, z, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldData.setData(x, 6, z + 5, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldData.setData(x, 6, z - 5, DVEW.worldGeneration.paintVoxel(1));
    DVEW.worldGenCommManager.runRGBFloodFillAt(x, 6, z);
    DVEW.worldGenCommManager.runRGBFloodFillAt(x + 5, 6, z);
    DVEW.worldGenCommManager.runRGBFloodFillAt(x - 5, 6, z);
    DVEW.worldGenCommManager.runRGBFloodFillAt(x, 6, z + 5);
    DVEW.worldGenCommManager.runRGBFloodFillAt(x, 6, z - 5);
    await DVEW.worldGenCommManager.awaitAllLightUpdates();
    DVEW.worldGenCommManager.runRebuildQue();
    /*  DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z);
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x + 5, 6, z);
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x - 5, 6, z);
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z + 5);
    DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x, 6, z - 5); */
    //DVEW.runChunkRebuildQue();
};
(async () => {
    await DVEW.$INIT({
        onReady: start,
    });
})();
