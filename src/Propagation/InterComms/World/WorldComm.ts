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
 0: (data, event) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runRGBFloodFill(x, y, z);
 },
 1: (data, event) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEP.runRGBFloodRemove(x, y, z);
 },
};
worldComm.messageFunctions[-1] = (data, event) => {
    const queueStates = new Int32Array(data[1]);
    DVEP.queues.setQueueStates(queueStates);
    DVEP.__queueStatesSet = true;
};
