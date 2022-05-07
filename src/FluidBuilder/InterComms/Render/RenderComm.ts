import { DVEFB } from "../../DivineVoxelEngineFluidBuilder.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { GetNewBuilderComm } from "../Builder/BuilderComm.js";

let builderCount = 0;
const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("fluid-builder-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
 "connect-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEFB.worldComm.setPort(port);
 },
 "connect-builder": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  builderCount++;
  GetNewBuilderComm(builderCount, port);
 },
 "sync-settings": (data, event) => {
  const settings = data[1];
  DVEFB.syncSettings(settings);
 },
 "re-start": (data, event) => {
  DVEFB.reStart();
  renderComm.onRestart();
 },
};
