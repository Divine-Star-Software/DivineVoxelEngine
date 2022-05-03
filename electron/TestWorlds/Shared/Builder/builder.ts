import { RegisterVoxelsForBuilderThread } from "../../Shared/Functions/RegisterVoxelsBuilderThread.js";
import { DVEB } from "../../../out/index.js";

(async () => {
 RegisterVoxelsForBuilderThread(DVEB);
 await DVEB.$INIT({ onReady: () => {} });

 setTimeout(async ()=>{
    await DVEB.matrixHub.requestChunkSync(0, 0, 0);
    DVEB.buildChunk(0,0,0);
 },4000)

})();

//DVEB.worldMatrix.
