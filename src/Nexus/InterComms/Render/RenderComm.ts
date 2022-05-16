import { CreateInterComm } from "../../../Comms/InterComm.js";
import {DVEN} from "../../DivineVoxelEngineNexus.js";
const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("nexus-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
 "connect-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEN.worldComm.setPort(port);
 },
 "sync-settings": (data, event) => {
  const settings = data[1];
  DVEN.syncSettings(settings);
 },

};
