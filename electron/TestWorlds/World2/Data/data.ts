import { DVED } from "../../../out/Data/DivineStarVoxelEngineData.js";
import { DataHanlder } from "./DataHandler.js";
import { DataServer } from "./DataServer.js";
await DVED.$INIT({ onReady: () => {} });
DVED.dataManager.setDataHandler(DataHanlder);
console.log("never finish");
await DataServer.$INIT();
DataServer.addToOnMessage((event: any) => {
 console.log(event);
});
console.log("never finish");
setTimeout(async () => {
 console.log("save");
 await DVED.dataManager.saveRegion(0, 0, 0);

 console.log("load");
 DVED.dataManager.loadRegion(0, 0, 0);
}, 2000);
