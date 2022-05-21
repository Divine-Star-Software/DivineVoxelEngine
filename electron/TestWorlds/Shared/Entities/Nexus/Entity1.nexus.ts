import { DivineVoxelEngineNexus } from "../../../../out/Nexus/DivineVoxelEngineNexus.js";
import {
 NexusEntityData,
 NexusEntityInterface,
} from "../../../../out/Meta/index";

export const Entity1NexusData: NexusEntityData = {
 type: "item",
 boundingBox: { width: 1, height: 1, depth: 1 },
 numStates: 4,
};

export class Entity1Nexus implements NexusEntityInterface {
 position: Float32Array;
 states: Float32Array;
 active: boolean;
 $INIT(DVEN: DivineVoxelEngineNexus, data: NexusEntityData, otherData?: any) {
  console.log(data);

  setTimeout(() => {
   setInterval(() => {
    const voxel = DVEN.worldMatrix.getVoxel(
     this.position[0] >> 0,
     (this.position[1] - 1) >> 0,
     this.position[2] >> 0
    );


    if (voxel && voxel[0] == "dve:air") {
     this.position[1] -= 0.1;
    }
   }, 20);
  }, 2000);
 }
 onSpawn() {}
 onDeSpawn() {}
 update() {}
}
