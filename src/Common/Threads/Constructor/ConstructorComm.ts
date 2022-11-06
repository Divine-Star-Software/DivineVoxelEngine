import { ConstructorTasks } from "../Contracts/ConstructorTasks.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { ConstructorRemoteThreadTasks } from "../Contracts/WorldTasks.js";
import { BuildTasks } from "Meta/Tasks/Tasks.types.js";
import { ConstructorQueues } from "../../Queues/ConstructorQueues.js";

const ccm = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});

export const CCM = Object.assign(ccm, {
 tasks: {
  build: {
   chunk: (data: BuildTasks) => {
    return CCM.runTask(ConstructorTasks.buildChunk, data);
   },
   entity: (
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    height: number,
    composed: number,
    voxelData: Uint32Array[],
    voxelStateData: Uint32Array[]
   ) => {
    const transferArray: any[] = [];
    const dataArray: any[] = [];
    for (let i = 0; i < voxelData.length; i++) {
     dataArray.push(voxelData[i], voxelStateData[i]);
     transferArray.push(voxelData[i].buffer, voxelStateData[i].buffer);
    }
    return ccm.runTask(
     ConstructorTasks.constructEntity,
     [x, y, z, width, depth, height, composed, ...transferArray],
     transferArray
    );
   },
   item: (data: any) => {
    return CCM.runTask(ConstructorTasks.constructItem, data);
   },
  },
 },
});
