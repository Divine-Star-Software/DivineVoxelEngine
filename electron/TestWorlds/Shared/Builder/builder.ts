import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/index.js";

(async () => {
 RegisterVoxelsForBuilderThread(DVEB);
 await DVEB.$INIT({ onReady: () => {} });

 DVEB.worldComm.listenForMessage("done", async () => {
  let startX = -16;
  let startZ = -16;
  let endX = 16;
  let endZ = 16;
  for (let x = startX; x <= endX; x += 16) {
   for (let z = startZ; z <= endZ; z += 16) {
    await DVEB.matrixHub.requestChunkSync(x, 0, z);
    DVEB.buildChunk(x, 0, z);
   }
  }
 });
})();

//DVEB.worldMatrix.
