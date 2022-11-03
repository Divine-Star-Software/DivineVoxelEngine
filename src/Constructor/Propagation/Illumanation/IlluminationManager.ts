//objects
import type { Queue } from "Global/Util/Queue.js";
//functions
import {
 runRGBFloodFillAt,
 runRGBFloodRemove,
 runRGBFloodRemoveAt,
 runRGBFloodFill,
} from "./Functions/RGBFloodLight.js";
import {
 runSunLightRemove,
 runSunLightRemoveAt,
 runSunLightUpdate,
 runSunLightUpdateAt,
} from "./Functions/SunLight.js";
import {
 PopulateWorldColumnWithSunLight,
 RunSunLightFloodDown,
 RunSunLightFloodOut,
 RunSunLightUpdateAtMaxY,
 SunLightAboveCheck,
} from "./Functions/WorldSun.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { Util } from "../../../Global/Util.helper.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { DVEP } from "../DivineVoxelEnginePropagation.js";
export const IlluminationManager = {
 lightData: LightData,
 air: [-1, 0],

 dimension: 0,
 //sun
 runSunLightUpdateAt: runSunLightUpdateAt,
 runSunLightUpdate: runSunLightUpdate,
 runSunLightRemove: runSunLightRemove,
 runSunLightRemoveAt: runSunLightRemoveAt,

 populateWorldColumnWithSunLight: PopulateWorldColumnWithSunLight,
 runSunLightUpdateAtMaxY: RunSunLightUpdateAtMaxY,
 runSunLightFloodDown: RunSunLightFloodDown,
 runSunLightFloodOut: RunSunLightFloodOut,
 sunLightAboveCheck: SunLightAboveCheck,
 _sunLightUpdateQue: <Queue<number[]>>Util.getAQueue<number[]>(),
 _sunLightFloodDownQue: <Queue<number[]>>Util.getAQueue<number[]>(),
 _sunLightFloodOutQue: <Record<string, Queue<number[]>>>{},
 _sunLightRemoveQue: <number[][]>[],
 //rgb
 runRGBFloodFillAt: runRGBFloodFillAt,
 runRGBFloodFill: runRGBFloodFill,
 runRGBFloodRemoveAt: runRGBFloodRemoveAt,
 runRGBFloodRemove: runRGBFloodRemove,
 _RGBlightUpdateQue: <number[][]>[],
 _RGBlightRemovalQue: <number[][]>[],

 _sDataTool: new DataTool(),
 _nDataTool: new DataTool(),

 addToRebuildQue(x: number, y: number, z: number) {
  for (const n of $3dCardinalNeighbors) {
   DVEP.addToRebuildQue(n[0] + x, n[1] + y, n[2] + z, "all");
  }
 },
};
