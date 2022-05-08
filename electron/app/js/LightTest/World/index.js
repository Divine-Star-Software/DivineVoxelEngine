import { DVEW } from "../../../out/index.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures-o.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
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
            DVEW.buildChunk(x, 0, z);
        }
    }
    const y = 60;
    setInterval(() => {
        for (let x = startX; x < endX; x += 16) {
            for (let z = startZ; z < endZ; z += 16) {
                DVEW.worldData.requestVoxelBeRemoved(x + 7 - 16, y + 7, z + 7);
                DVEW.worldData.requestVoxelAdd("dve:debugbox", "default", x + 7, y + 7, z + 7);
            }
        }
    }, 10);
    DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        onReady: start,
    });
})();
