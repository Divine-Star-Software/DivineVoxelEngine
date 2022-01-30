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
            DVEW.worldGeneration.chunkDataHelper.createHeightMap(chunk, x, 0, z);
            DVEW.worldGeneration.illumantionManager.populateChunkAirWithInitlSunLight(chunk);
            DVEW.worldData.setChunk(x, 0, z, chunk);
            //  console.log(chunk);
        }
    }
    const chunk = DVEW.worldData.getChunk(0, 0, 0);
    if (chunk) {
        const voxels = chunk.voxels;
        if (voxels[7] && voxels[7][7] && voxels[7][7][126 / 2]) {
            voxels[7][7][126 / 2] = 0;
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            const chunk = DVEW.worldData.getChunk(x, 0, z);
            if (!chunk)
                continue;
            DVEW.worldGeneration.illumantionManager.addChunkToSunLightUpdate(chunk, x, 0, z);
            DVEW.worldGeneration.illumantionManager.runSunLightUpdate();
            DVEW.buildChunk(x, 0, z);
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
    setTimeout(() => {
        const chunk = DVEW.worldData.getChunk(0, 0, 0);
        if (!chunk)
            return;
        const voxels = chunk.voxels;
        DVEW.worldGeneration.illumantionManager.runSunLightRemoveAt(7, 126 / 2, 7);
        if (voxels[7] && voxels[7][7] && voxels[7][7][126 / 2] !== undefined) {
            voxels[7][7][126 / 2] = DVEW.worldGeneration.paintVoxel(2);
        }
        for (let x = startX; x < endX; x += 16) {
            for (let z = startZ; z < endZ; z += 16) {
                DVEW.buildChunk(x, 0, z);
            }
        }
    }, 2000);
    //DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        voxelPaletteMode: "global",
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
