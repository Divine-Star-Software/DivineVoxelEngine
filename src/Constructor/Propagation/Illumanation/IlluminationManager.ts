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
 PopulateWorldColumnWithSunLight,
 RunSunLightFloodDown,
 RunSunLightFloodOut,
 runSunLightRemove,
 runSunLightRemoveAt,
 runSunLightUpdate,
 runSunLightUpdateAt,
 RunSunLightUpdateAtMaxY,
 SunLightAboveCheck,
} from "./Functions/SunLight.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { Util } from "../../../Global/Util.helper.js";
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
};
