import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";

const fxCommBase = ThreadComm.createComm("render-fx", {});
const fxComm = Object.assign(fxCommBase, {
 $INIT() {
  const channel = new MessageChannel();
  DVER.worldComm.sendMessage("connect-fx", [], [channel.port1]);
  fxComm.sendMessage("connect-world", [], [channel.port2]);
 },
});

export const FXComm = fxComm;
