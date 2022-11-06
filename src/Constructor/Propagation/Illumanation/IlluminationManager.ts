//objects
import type { Queue } from "Global/Util/Queue.js";
//functions
import {
 runRGBUpdateAt,
 runRGBRemove,
 runRGBRemoveAt,
 runRGBUpdate,
} from "./Functions/RGBLight.js";
import {
 runSunLightRemove,
 runSunLightRemoveAt,
 runSunLightUpdate,
 runSunLightUpdateAt,
} from "./Functions/SunLight.js";

import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { Util } from "../../../Global/Util.helper.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { Propagation } from "../Propagation.js";
import { RunWorldSun } from "./Functions/WorldSun.js";
export const IlluminationManager = {
 lightData: LightData,
 //sun
 runSunLightUpdateAt: runSunLightUpdateAt,
 runSunLightUpdate: runSunLightUpdate,
 runSunLightRemove: runSunLightRemove,
 runSunLightRemoveAt: runSunLightRemoveAt,
 _sunLightUpdate: <Queue<number[]>>Util.getAQueue<number[]>(),
 _sunLightRemove: <number[][]>[],
 runWorldSun : RunWorldSun,
 _worldSunQueue : <number[][]>[],
 //rgb
 runRGBUpdateAt: runRGBUpdateAt,
 runRGBUpdate: runRGBUpdate,
 runRGBRemoveAt: runRGBRemoveAt,
 runRGBRemove: runRGBRemove,
 _RGBlightUpdateQ: <number[][]>[],
 _RGBlightRemovalQ: <number[][]>[],
//tools
 _sDataTool: new DataTool(),
 _nDataTool: new DataTool(),

 addToRebuildQue(x: number, y: number, z: number) {
  for (const n of $3dCardinalNeighbors) {
   Propagation.addToRebuildQue(n[0] + x, n[1] + y, n[2] + z, "all");
  }
 },
};
IlluminationManager.runRGBRemove();