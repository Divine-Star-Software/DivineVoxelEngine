import { DivineVoxelEngineRichWorld } from "@divinevoxel/foundation/Contexts/RichWorld/DivineStarVoxelEngineRichWorld";
import { DVEFDataCore } from "@divinevoxel/foundation/Data/DVEFDataCore";
const data = new DVEFDataCore();
const DVERW = new DivineVoxelEngineRichWorld({
  data,
});
await DVERW.init();
console.log("DVE Rich World Loaded");
