import { DVEW } from "../../../out/index.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
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
            DVEW.worldData.setChunk(x, 0, z, worldGen.generateChunk(x, z));
        }
    }
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunk(x, 0, z);
        }
    }
    DVEW.buildFluidMesh();
};
(async () => {
    await DVEW.$INIT({
        onReady: start,
        onMessage: (message, data) => { },
    });
})();
