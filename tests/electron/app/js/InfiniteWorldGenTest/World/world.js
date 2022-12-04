import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { GetAnalyzerCubeWorld } from "../../Shared/Debug/Anaylzer/Cube.js";
import { IWG } from "../../../out/Plugins/IWG/World/IWG.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
let position = new Float32Array(3);
const runIWG = () => {
    const generator = new IWG({
        generate: (dimension, x, y, z) => {
            WorldGen.generate(x, z);
            return true;
        },
        positionWatch: position,
        renderDistance: 200,
    });
    setInterval(() => {
        generator.update();
    }, 100);
};
DVEW.parentComm.listenForMessage("set-position", (data) => {
    position = new Float32Array(data[1]);
    runIWG();
});
DVEW.parentComm.sendMessage("get-position");
GetAnalyzerCubeWorld(DVEW);
self.DVEW = DVEW;
