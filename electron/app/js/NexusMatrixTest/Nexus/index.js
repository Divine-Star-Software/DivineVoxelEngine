import { DVEN } from "../../../out/index.js";
console.log("HELLO FROM NEXUS");
const start = () => { };
await DVEN.$INIT({
    onReady: start,
    onMessage: (message, data) => { },
});
DVEN.onMessageFromWorld("done", async (data, event) => {
    await DVEN.loadChunkIntoNexus(0, 0, 0);
    const voxel = DVEN.worldMatrix.getData(0, 0, 0);
    console.log(voxel);
});
