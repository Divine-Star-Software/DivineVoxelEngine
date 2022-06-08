//objects
import { Util } from "../../../Global/Util.helper.js";
//functions
import {
 runRGBFloodFillAt,
 runRGBFloodRemove,
 runRGBFloodRemoveAt,
 runRGBFloodFill,
} from "./Functions/RGBFloodLight.js";
import {
 PopulateWorldColumnWithSunLight,
 runSunLightRemove,
 runSunLightRemoveAt,
 runSunLightUpdate,
 runSunLightUpdateAt,
 RunSunLightUpdateAtMaxY,
 SunLightAboveCheck,
} from "./Functions/SunLight.js";
export const IlluminationManager = {
 lightByte: Util.getLightByte(),
 air: [-1, 0],
 //sun
 runSunLightUpdateAt: runSunLightUpdateAt,
 runSunLightUpdate:  runSunLightUpdate,
 runSunLightRemove: runSunLightRemove,
 runSunLightRemoveAt: runSunLightRemoveAt,
 populateWorldColumnWithSunLight: PopulateWorldColumnWithSunLight,
 runSunLightUpdateAtMaxY: RunSunLightUpdateAtMaxY,
 sunLightAboveCheck : SunLightAboveCheck,
 _sunLightUpdateQue: <number[][]>[],
 _sunLightRemoveQue: <number[][]>[],
 //rgb
 runRGBFloodFillAt: runRGBFloodFillAt,
 runRGBFloodFill: runRGBFloodFill,
 runRGBFloodRemoveAt: runRGBFloodRemoveAt,
 runRGBFloodRemove: runRGBFloodRemove,
 _RGBlightUpdateQue: <number[][]>[],
 _RGBlightRemovalQue: <number[][]>[],
 _visitSunMap: <Record<string, boolean>>{},
};
