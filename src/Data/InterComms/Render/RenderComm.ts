 import { DVED } from "../../DivineVoxelEngineData.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("data-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
 "connect-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVED.worldComm.setPort(port);
 },
 "sync-settings": (data, event) => {
  const settings = data[1];
  DVED.syncSettings(settings);
 },
 "re-start": (data, event) => {
  DVED.reStart();
  renderComm.onRestart();
 },
};

