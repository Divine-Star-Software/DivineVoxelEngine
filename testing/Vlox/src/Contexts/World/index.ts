import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { FlatTest } from "./FlatTest";
import { SimulationTest } from "./SimulationTest";
import InitDebugMapWorld from "@divinevoxel/vlox-babylon/Debug/GenMap/InitDebugMapWorld"
InitDebugMapWorld();
const DVEW = await StartWorld();

SimulationTest(DVEW);

/* DVEW.TC.registerTask("start-world", async () => {
  await FlatTest(DVEW);
});
 */