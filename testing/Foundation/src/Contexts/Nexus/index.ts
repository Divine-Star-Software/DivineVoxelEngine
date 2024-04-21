import { DivineVoxelEngineNexus } from "@divinevoxel/foundation/Contexts/Nexus/DivineVoxelEngineNexus";
import { DVEFDataCore } from "@divinevoxel/foundation/Data/DVEFDataCore";
const data = new DVEFDataCore();

const DVEN = new DivineVoxelEngineNexus({
  data,
});
await DVEN.init();
console.log("DVE Nexus Loaded");

(self as any).DVEN = DVEN;