import { DVEW } from "../../../out/index.js";
import { PlayerWatcher } from "../../Shared/Player/Type2/PlayerWatcher.js";
import { RegisterTexutres } from "../../Shared/Functions/RegisterTextures-o.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxels.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
const playerWatcher = new PlayerWatcher(DVEW);
const worldGen = new WorldGen(DVEW);
RegisterTexutres(DVEW);
RegisterVoxels(DVEW, "global");
const start = () => {
    let startX = -32;
    let startZ = -128;
    let endX = 48;
    let endZ = 256;
    let type = "track";
    for (let x = startX; x < endX; x += 16) {
        if (x == -32 || x == 32)
            type = "wall";
        if (x == -16 || x == 16)
            type = "trench";
        if (x == 0)
            type = "track";
        for (let z = startZ; z < endZ; z += 16) {
            worldGen.generateChunk(x, 0, z, type);
        }
    }
    DVEW.runRGBLightUpdateQue();
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            DVEW.buildChunkAsync(x, 0, z);
        }
    }
    DVEW.buildFluidMesh();
};
DVEW.renderComm.listenForMessage("connect-player", (data, event) => {
    playerWatcher.setPlayerSharedArrays(data);
    playerWatcher.startWatchingPlayer();
});
await DVEW.$INIT({
    onReady: start,
});
