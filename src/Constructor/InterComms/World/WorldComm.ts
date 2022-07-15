import { WorldToConstructorMessages } from "../../../Constants/InterComms/WorldToConstructor.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";

const worldComm = CreateInterComm("constructor-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
 DVEC.matrixHub.onMessage(event, (messageEvent) => {});
 if (event.data[0] == "set-world-port") {
  DVEC.__connectedToWorld = true;
 }
};

worldComm.messageFunctions[WorldToConstructorMessages.setQueueStates] = (
 data
) => {
 const queueStates = new Uint32Array(data[1]);
 DVEC.queues.setQueueStates(queueStates);
 DVEC.__queueStatesSet = true;
};

worldComm.messageFunctions[WorldToConstructorMessages.buildChunk] = (data) => {
 DVEC.DVEB.buildChunk(data[1], data[2], data[3]);
};

worldComm.messageFunctions[WorldToConstructorMessages.RGBlightUpdate] = (
 data
) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVEC.DVEP.runRGBFloodFill(x, y, z);
};

worldComm.messageFunctions[WorldToConstructorMessages.RGBlightRemove] = (
 data
) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVEC.DVEP.runRGBFloodRemove(x, y, z);
};

worldComm.messageFunctions[
 WorldToConstructorMessages.fillWorldColumnWithSunLight
] = (data) => {
 //run sun light propagation for world column
 const x = data[1];
 const z = data[2];
 const maxY = data[3];
 DVEC.DVEP.runSunLightForWorldColumn(x, z, maxY);
};

worldComm.messageFunctions[WorldToConstructorMessages.runSunLightUpdateAtMaxY] =
 (data) => {
  const x = data[1];
  const z = data[2];
  const maxY = data[3];
  DVEC.DVEP.runSunFloodFillAtMaxY(x, z, maxY);
 };

worldComm.messageFunctions[
 WorldToConstructorMessages.runSunLightUpdateMaxYFlood
] = (data) => {
 const x = data[1];
 const z = data[2];
 const maxY = data[3];
 DVEC.DVEP.runSunFloodFillMaxYFlood(x, z, maxY);
};

worldComm.messageFunctions[WorldToConstructorMessages.sunLightUpdate] = (
 data
) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];

 DVEC.DVEP.runSunLightUpdate(x, y, z);
};

worldComm.messageFunctions[WorldToConstructorMessages.sunLightRemove] = (
 data
) => {
 const x = data[1];
 const y = data[2];
 const z = data[3];
 DVEC.DVEP.runSunLightRemove(x, y, z);
};

worldComm.messageFunctions[WorldToConstructorMessages.generate] = async (
 data
) => {
 const x = data[1];
 const z = data[2];
 const genData = data[3];
 await DVEC.DVEWG.generate(x, z, genData);
};
