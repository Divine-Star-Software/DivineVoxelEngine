import { DVED } from "../../../out/Data/DivineStarVoxelEngineData.js";
import { DataHanlder } from "./DataHandler.js";
import { DataServer } from "./DataServer.js";
await DVED.$INIT({});
DVED.dataManager.setDataHandler(DataHanlder);
/* DVED.worldComm.listenForMessage("load", () => {
 runTest();
}); */
await DataServer.$INIT();
console.log("load");
await DVED.dataManager.loadRegion(0, 0, 0);
console.log("done loading");
DVED.worldComm.sendMessage("load", []);
const runTest = async () => {
    console.log("start");
    await DVED.dataManager.saveRegion(0, 0, 0);
    console.log("end");
};
