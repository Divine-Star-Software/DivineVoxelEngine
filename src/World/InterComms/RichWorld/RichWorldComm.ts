import { WorldToRichWorldMessages } from "../../../Constants/InterComms/WorldToRichWorld.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";

const richWorldCommBase = ThreadComm.createComm("world-rich-world");
const richWorldComm = Object.assign(richWorldCommBase, {
 setInitalData(voxelId: string, x: number, y: number, z: number) {
  richWorldComm.sendMessage(WorldToRichWorldMessages.setInitalData, [
   voxelId,
   x,
   y,
   z,
  ]);
 },
 removeRichData(x: number, y: number, z: number) {
  richWorldComm.sendMessage(WorldToRichWorldMessages.removeRichData, [x, y, z]);
 },
});

richWorldComm.onSetPort((port) => {
 DVEW.matrixCentralHub.registerThread("rich-world", port);
});

export const RichWorldComm = richWorldComm;
