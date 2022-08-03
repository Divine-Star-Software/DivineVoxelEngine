import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";

const richWorldCommBase = CreateInterComm("render-rich-world", {});

const richWorldComm = Object.assign(richWorldCommBase, {
 $INIT() {
  const channel = new MessageChannel();
  DVER.worldComm.sendMessage("connect-rich-world", [], [channel.port1]);
  richWorldComm.sendMessage("connect-world", [], [channel.port2]);
 },
});

export const RichWorldComm = richWorldComm;
