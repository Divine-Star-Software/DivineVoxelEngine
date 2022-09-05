import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

const serverCommBase = {
 onReady: () => {},
 onRestart: () => {},
};
const serverComm = CreateInterComm("world-server", serverCommBase);
export const ServerComm = serverComm;
serverComm.messageFunctions = {
 start: function () {
  DVEW.__serverIsDone = true;
  serverComm.onReady();
 },
 "re-start": function () {
  serverComm.onRestart();
 },
 "sync-settings": (data, event) => {
  if (!event) return;
  const settings = data[1];
  DVEW.syncSettings(settings);
 },
 "connect-constructor": (data, event) => {
  if (DVEW.environment == "node") {
   const port = data[1];
   DVEW.constructorCommManager.addThread(port);
  } else {
   if (!event) return;
   const port = event.ports[0];
   DVEW.constructorCommManager.addThread(port);
  }
 },
 "connect-nexus": (data, event) => {
  if (DVEW.environment == "node") {
   const port = data[1];
   DVEW.nexusComm.setPort(port);
  } else {
   if (!event) return;
   const port = event.ports[0];
   DVEW.nexusComm.setPort(port);
  }
 },
 "connect-data": (data, event) => {
  if (DVEW.environment == "node") {
   const port = data[1];
   DVEW.dataComm.setPort(port);
  } else {
   if (!event) return;
   const port = event.ports[0];
   DVEW.dataComm.setPort(port);
  }
 },
 /* not sure if fx will be on the server  
 "connect-fx": (data, event) => {
  if (!event) return;
  const port = event.ports[0];
  DVEW.fxComm.setPort(port);
 },
  */
 "connect-rich-world": (data, event) => {
  if (DVEW.environment == "node") {
   const port = data[0];
   DVEW.richWorldComm.setPort(port);
  } else {
   if (!event) return;
   const port = event.ports[0];
   DVEW.richWorldComm.setPort(port);
  }
 },
};

//renderComm.onMessage = (event) => console.log(event.data,event.ports);
