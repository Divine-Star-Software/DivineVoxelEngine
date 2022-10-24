import { DVEDL } from "../../../out/DataLoader/DivineVoxelEngineDataLoader.js";
import { DataHanlder } from "./DataHandler.js";
import { DataServer } from "./DataServer.js";
await DVEDL.$INIT();
DVEDL.dataManager.setDataHandler(DataHanlder);
/* DVED.worldComm.listenForMessage("load", () => {
 runTest();
}); */
await DataServer.$INIT();
console.log("load");
await DVEDL.dataManager.loadRegion(0, 0, 0);
console.log("done loading");
DVEDL.worldComm.sendMessage("load", []);
const runTest = async () => {
    console.log("start");
    await DVEDL.dataManager.saveRegion(0, 0, 0);
    console.log("end");
};
