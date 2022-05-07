import { CreateInterComm } from "../../../Comms/InterComm.js";
import { DVEB } from "../../DivineVoxelEngineBuilder.js";

const worldComm = CreateInterComm("builder-world", {});
export const WorldComm = worldComm;

worldComm.onSetPort((port) => {
 worldComm.sendMessage("connect-shape-map", [DVEB.shapeManager.shapeMap]);
});

const buildMesh = (data: any[]) => {
 DVEB.chunkMesher.buildChunkMeshO(
  data[0],
  data[1],
  data[2],
  data[3],
  new Uint16Array(data[4]),
  new Uint8Array(data[5]),
  new Uint16Array(data[6]),
  new Uint16Array(data[7]),
  new Float32Array(data[8]),
  new Float32Array(data[9]),
  new Float32Array(data[10])
 );
};


worldComm.onMessage = (event) => {
 DVEB.matrixHub.onMessage(event, (messageEvent) => {
 });
 if (event.data[0] == "set-world-port") {

    DVEB.__connectedToWorld = true;
 }
};

worldComm.messageFunctions = {
   7: (data, event) => {

      DVEB.buildChunk(data[1],data[2],data[3]);
   },
 0: (data, event) => {
  buildMesh(data);
 },
 1: (data, event) => {
  buildMesh(data);
 },
 2: (data, event) => {
  buildMesh(data);
 },
 3: (data, event) => {
  buildMesh(data);
 },
};
