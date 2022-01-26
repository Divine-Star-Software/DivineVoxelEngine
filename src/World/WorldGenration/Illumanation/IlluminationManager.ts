import type { LightByte } from "Global/Util/LightByte";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld";
import {
 RGBFloodFillCheckNeighbors,
 RGBFloodFill,
 RGBFloodFillSetAirLightVoxels,
 RGBFloodFillUpdateAirLightVoxel,
} from "./Functions/RGBFloodFill.js";
import { RGBFloodFill2, RunRGBLightUpdate } from "./Functions/RGBFloodFill2.js";
import {
 RGBFloodRemove,
 RGBFloodRemoveCheckNeighors,
 RGBFloodRemoveSetAirLightVoxel,
 RGBFloodRemoveUpdateAirLightVoxel,
} from "./Functions/RGBFloodRemove.js";

export class IlluminationManager {
 lightByte: LightByte;
 air = [-1, 0, 0];
 airSeed = [-1, 0, 0];
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this.lightByte = this.DVEW.UTIL.getLightByte();
 }

 RGBFloodFillCheckNeighbors = RGBFloodFillCheckNeighbors;
 RGBFloodFillSetAirLightVoxel = RGBFloodFillSetAirLightVoxels;
 RGBFloodFillUpdateAirLightVoxel = RGBFloodFillUpdateAirLightVoxel;
 RGBFloodFill = RGBFloodFill;
 RGBFloodFill2 = RGBFloodFill2;

 runRGBLightUpdate = RunRGBLightUpdate;


 lightUpdateQue : number[][] = [];
 lightRemovalQue : number[][] = [];

 RGBFloodRemoveCheckNeighbors = RGBFloodRemoveCheckNeighors;
 RGBFloodRemoveSetAirVoxel = RGBFloodRemoveSetAirLightVoxel;
 RGBFloodRemoveUpdateAirVoxel = RGBFloodRemoveUpdateAirLightVoxel;
 RGBFloodRemove = RGBFloodRemove;
}
