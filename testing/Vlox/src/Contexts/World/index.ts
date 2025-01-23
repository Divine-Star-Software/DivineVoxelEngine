import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { flatTest } from "./FlatTest";

console.log("starting world");
const DVEW = await StartWorld({
  nexusEnabled: false,
  richWorldEnabled: false,
});

console.log("world start");
DVEW.TC.registerTasks("start-world", async () => {
  console.log("cpu gen start");
  await flatTest();
  console.log("cpu gen end");
});
