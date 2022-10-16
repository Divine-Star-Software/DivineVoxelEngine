import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { WorldToRichWorldMessages } from "../../../Constants/InterComms/WorldToRichWorld.js";
import { DVERW } from "../../DivineStarVoxelEngineRichWorld.js";

const worldComm = ThreadComm.createComm("world");
export const WorldComm = worldComm;

worldComm.listenForMessage(WorldToRichWorldMessages.setInitalData, (data) => {
 const voxelId = data[1];
 const x = data[2];
 const y = data[3];
 const z = data[4];
 if (DVERW.richData.hasInitalData(voxelId)) {
  DVERW.richData.setInitalData(voxelId, x, y, z);
 }
});

worldComm.listenForMessage(WorldToRichWorldMessages.removeRichData, (data) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVERW.richData.removeData(x, y, z);
});
