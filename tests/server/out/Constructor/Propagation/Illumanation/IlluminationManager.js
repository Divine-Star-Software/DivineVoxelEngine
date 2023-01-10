//functions
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
export const IlluminationManager = {
    lightData: LightData,
    //tools
    _sDataTool: new DataTool(),
    _nDataTool: new DataTool(),
};
