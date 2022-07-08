import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("constructor-render", renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {
 "connect-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEC.worldComm.setPort(port);
 },
 "sync-settings": (data, event) => {
  const settings = data[1];
  DVEC.syncSettings(settings);
 },
 "re-start": (data, event) => {
  DVEC.reStart();
  renderComm.onRestart();
 },
 "sync-uv-texuture-data": (data, event) => {
  const uvTextureMap = data[1];
  const overlayUVTextureMap = data[2];
  DVEC.DVEB.textureManager.setUVTextureMap(uvTextureMap);
  DVEC.DVEB.textureManager.setOverlayUVTextureMap(overlayUVTextureMap);
  DVEC.voxelManager.runVoxelHookForAll("texturesRegistered");
 },
};
