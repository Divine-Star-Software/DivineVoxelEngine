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
    let startX = -64;
    let startZ = -64;
    let endX = 64;
    let endZ = 64;
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
    setInterval(() => {
        for (let x = startX; x < endX; x += 16) {
            for (let z = startZ; z < endZ; z += 16) {
                DVEW.worldData.setData(x + 7 + 16, 7, z + 7, DVEW.worldGeneration.paintVoxel(1));
                DVEW.worldGeneration.illumantionManager.runRGBFloodRemoveAt(true, x + 7, 0 + 7, z + 7);
                DVEW.worldGeneration.illumantionManager.runRGBFloodFillAt(x + 7 + 16, 0 + 7, z + 7);
                rebuild(x, z);
            }
        }
    }, 500);
    const rebuild = (x, z) => {
        DVEW.buildChunkAsync(x, 0, z);
        DVEW.buildChunkAsync(x - 16, 0, z);
        DVEW.buildChunkAsync(x + 16, 0, z);
        DVEW.buildChunkAsync(x + 32, 0, z);
        DVEW.buildChunkAsync(x, 0, z + 16);
        DVEW.buildChunkAsync(x, 0, z - 16);
    };
    /*
    setInterval(() => {
     for (let x = startX; x < endX; x += 16) {
      for (let z = startZ; z < endZ; z += 16) {
       DVEW.worldGeneration.illumantionManager.RGBFloodRemove(x, 0, z, 7, 7, 7);
       rebuild(x, z);
      }
     }
    }, 1000); */
    /*for (let x = startX; x < endX; x += 16) {
     for (let z = startZ; z < endZ; z += 16) {
      worldGen.lightTest(x, 0, z, 7, 7, 5, 8);
      worldGen.lightTest(x, 0, z, 7, 7, 45, 8);
      worldGen.lightTest(x, 0, z, 7, 7, 55, 8);
      worldGen.lightTest(x, 0, z, 7, 7, 25, 8);
     }
    }
   
    for (let x = startX; x < endX; x += 16) {
     for (let z = startZ; z < endZ; z += 16) {
      DVEW.buildChunkAsync(x, 0, z);
     }
    }*/
    DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        voxelPaletteMode: "global",
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
