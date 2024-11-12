import { DivineVoxelEngineRichWorld } from "@divinevoxel/vlox/Contexts/RichWorld/DivineVoxelEngineRichWorld";
import { DVEDataCore } from "@divinevoxel/vlox/Data/DVEDataCore";
const data = new DVEDataCore();
const DVERW = new DivineVoxelEngineRichWorld({
  data,
});
await DVERW.init();
console.log("DVE Rich World Loaded");
