import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const renderCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const renderComm = CreateInterComm("world-render", renderCommBase);
export const RenderComm = renderComm;
const ports: any[] = [];
renderComm.messageFunctions = {
 start: function (data, event) {
  DVEW.__renderIsDone = true;
  renderComm.onReady();
 },
 "re-start": function (data, event) {
  renderComm.onRestart();
 },
 "sync-settings": (data, event) => {
  if (!event) return;
  const settings = event.data[1];
  DVEW.syncSettings(settings);
 },
 "connect-constructor": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.constructorCommManager.addThread(port);
 },
 "connect-nexus": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.nexusComm.setPort(port);
 },
 "connect-data": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.dataComm.setPort(port);
 },
 "connect-fx": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.fxComm.setPort(port);
 },
 "connect-rich-world": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.richWorldComm.setPort(port);
 },
};

//renderComm.onMessage = (event) => console.log(event.data,event.ports);
