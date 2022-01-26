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
            DVEW.worldData.setChunk(x, 0, z, chunk);
            DVEW.worldGeneration.illumantionManager.populateChunkAirWithInitlSunLight(chunk, x, 0, z);
            //  console.log(chunk);
        }
    }
    DVEW.worldGeneration.illumantionManager.sunLightUpdate();
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunkAsync(x, 0, z);
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunkAsync(x, 0, z);
        }
    }
    //DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        voxelPaletteMode: "global",
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
