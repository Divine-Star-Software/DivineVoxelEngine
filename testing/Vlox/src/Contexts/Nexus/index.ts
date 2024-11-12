import { DivineVoxelEngineNexus } from "@divinevoxel/vlox/Contexts/Nexus/DivineVoxelEngineNexus";
import { DVEDataCore } from "@divinevoxel/vlox/Data/DVEDataCore";
const data = new DVEDataCore();

const DVEN = new DivineVoxelEngineNexus({
  data,
});
await DVEN.init();

(self as any).DVEN = DVEN;