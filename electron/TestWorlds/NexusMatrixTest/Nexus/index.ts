import { DVEN, DVEW } from "../../../out/index.js";

console.log("HELLO FROM NEXUS");

const start = () => {};

await DVEN.$INIT({
 onReady: start,
 onMessage: (message: string, data: any[]) => {},
});

DVEN.onMessageFromWorld("done", (data, event) => {
 console.log("DONE!!!");
 DVEN.loadChunkIntoNexus(0, 0, 0);
 setTimeout(() => {
  const voxel = DVEN.worldMatrix.getData(0, 0, 0);
  console.log(voxel);
 }, 5000);
});
