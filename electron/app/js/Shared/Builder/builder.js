import { DVEB } from "../../../out/index.js";
(async () => {
    await DVEB.$INIT({ onReady: () => { } });
    await DVEB.matrixHub.requestChunkSync(0, 0, 0);
    const chunk = DVEB.worldMatrix.getChunk(0, 0, 0);
    console.log(chunk);
})();
//DVEB.worldMatrix.
