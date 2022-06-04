import { DVEP } from "../../DivineVoxelEngineWorldPropagation.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";

const worldComm = CreateInterComm("propagation-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
 DVEP.matrixHub.onMessage(event, (messageEvent) => {});
 if (event.data[0] == "set-world-port") {
  DVEP.__connectedToWorld = true;
 }
};
worldComm.messageFunctions = {
 0: (data) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runRGBFloodFill(x, y, z);
 },
 1: (data) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runRGBFloodRemove(x, y, z);
 },
 2: (data) => {
  //run sun light propagation for world column
  const x = data[1];
  const z = data[2];
  const maxY = data[3];
  DVEP.runSunLightForWorldColumn(x, z, maxY);
 },
 3: (data) => {
  const x = data[1];
  const z = data[2];
  const maxY = data[3];
  DVEP.runSunFloodFillAtMaxY(x, z, maxY);
 },
 4: (data) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runSunFloodFill(x, y, z);
 },
 5: (data) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runSunFloodRemove(x, y, z);
 },
};
worldComm.messageFunctions[-1] = (data, event) => {
 const queueStates = new Int32Array(data[1]);
 DVEP.queues.setQueueStates(queueStates);
 DVEP.__queueStatesSet = true;
};
