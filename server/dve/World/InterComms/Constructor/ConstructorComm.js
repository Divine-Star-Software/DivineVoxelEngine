"use strict";
/* import { WorldTasks } from "../../../Constants/InterComms/WorldTasks.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { CommPortTypes } from "Libs/ThreadComm/Meta/Comm/Comm.types.js";

export const GetNewConstructorComm = (count: number, port: CommPortTypes) => {
 const threadName = `constructor-${count}`;
 const newComm = ThreadComm.createComm(threadName, {
  ready: false,
 });
 newComm.onSetPort((port) => {
  newComm.name = threadName;
  DVEW.matrixCentralHub.registerThread(threadName, port);
  DVEW.matrixCentralHub.syncVoxelPaletteInThread(threadName);
 });
 newComm.setPort(port);
 DVEW.ccm.numConstructors++;
 newComm.messageFunctions = {
  ready: (data, event) => {
   DVEW.ccm.constructorsConnected++;
  },
 };

 newComm.messageFunctions[WorldTasks.addToRebuildQue] = (
  data
 ) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  const substance = data[4];

  DVEW.queues.addToRebuildQue(x, y, z, substance);
 };

 newComm.messageFunctions[WorldTasks.runRebuildQue] = () => {
  DVEW.queues.runRebuildQue();
 };

 newComm.messageFunctions[WorldTasks.syncShapeMap] = (data) => {
  DVEW.matrixMap.setShapeMap(data[1]);
 };

 newComm.messageFunctions[WorldTasks.addToRGBLightUpdateQue] = (
  data
 ) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEW.queues.addToRGBUpdateQue(x, y, z);
 };

 return newComm;
};
 */ 
