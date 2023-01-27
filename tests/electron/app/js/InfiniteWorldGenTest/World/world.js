import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { IWG } from "../../../out/Plugins/IWG/World/IWG.js";
RegisterVoxels(DVEW);
await DVEW.$INIT();
let position = new Float64Array(3);
const runIWG = () => {
    const generator = new IWG({
        positionWatch: position,
        renderDistance: 200,
        generateDistance: 300,
    });
    setInterval(() => {
        generator.searchUpdate();
    }, 20);
    setInterval(() => {
        generator.tasksUpdate();
    }, 100);
    setInterval(() => {
        console.log(generator._logTasks());
    }, 1000);
    setInterval(() => {
        generator.saveUpdate();
    }, 10_0000);
    self.generator = generator;
};
DVEW.parentComm.listenForMessage("set-position", (data) => {
    position = new Float64Array(data[1]);
    runIWG();
});
DVEW.parentComm.sendMessage("get-position");
self.DVEW = DVEW;
