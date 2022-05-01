import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/index.js";

(async () => {
 RegisterVoxelsForBuilderThread(DVEB);
 await DVEB.$INIT({ onReady: () => {} });
 await DVEB.matrixHub.requestChunkSync(0, 0, 0);
 const chunk = DVEB.worldMatrix.getChunk(0, 0, 0);

 const voxelCheck = DVEB.worldMatrix.getVoxel(0, 0, 0);
 console.log(voxelCheck); 

 DVEB.buildChunk(0,0,0);
})();

//DVEB.worldMatrix.
