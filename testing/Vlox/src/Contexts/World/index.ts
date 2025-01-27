import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { FlatTest } from "./FlatTest";
const DVEW = await StartWorld();
DVEW.TC.registerTask("start-world", async () => {
  await FlatTest(DVEW);
});
