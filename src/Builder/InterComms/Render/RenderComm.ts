import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEB } from "../../DivineVoxelEngineBuilder.js";
const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("builder-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
 "connect-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEB.worldComm.setPort(port);
 },
 "sync-settings": (data, event) => {
  const settings = data[1];
  DVEB.syncSettings(settings);
 },
 "re-start": (data, event) => {
  DVEB.reStart();
  renderComm.onRestart();
 },

 "sync-uv-texuture-data": (data, event) => {
  const uvTextureMap = data[1];
  DVEB.textureManager.setUVTextureMap(uvTextureMap);
 },
};
