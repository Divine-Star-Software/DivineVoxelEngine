import { DivineVoxelEngineDataLoader } from "@divinevoxel/foundation/Contexts/DataLoader/DivineVoxelEngineDataLoader";
import { DVEFDataCore } from "@divinevoxel/foundation/Data/DVEFDataCore";
import { DefaultDataHandler } from "@divinevoxel/foundation/Default/DataLoader/Broswer/DataHandler";
const data = new DVEFDataCore();
const handler = new DefaultDataHandler();
const DVEDL = new DivineVoxelEngineDataLoader({
  data,
  dataHanlder: handler,
});
await DVEDL.init();
console.log("DVE Data Loader Loaded");
