import { DVEWG } from "../../DivineVoxelEngineWorldGeneration.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";

const worldComm = CreateInterComm("world-gen-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
 DVEWG.matrixHub.onMessage(event, (messageEvent) => {});
 if (event.data[0] == "set-world-port") {
  DVEWG.__connectedToWorld = true;
 }
};
worldComm.messageFunctions = {
 0: (data, event) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEWG.runRGBFloodFill(x, y, z);
 },
 1: (data, event) => {
  const x = data[1];
  const y = data[2];
  const z = data[3];
  DVEWG.runRGBFloodFill(x, y, z);
 },
};
worldComm.messageFunctions[-1] = (data, event) => {
    const queueStates = new Int32Array(data[1]);
    DVEWG.queues.setQueueStates(queueStates);
};
