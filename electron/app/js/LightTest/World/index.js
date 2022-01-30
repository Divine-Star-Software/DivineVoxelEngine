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
            worldGen.generateChunk(x, 0, z);
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
                DVEW.worldData.requestVoxelBeRemoved(x + 7 - 16, 7, z + 7);
                DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x + 7, 7, z + 7);
            }
        }
    }, 10);
    DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        voxelPaletteMode: "global",
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
