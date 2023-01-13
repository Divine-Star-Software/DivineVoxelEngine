//functions
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
export const IlluminationManager = {
    lightData: LightData,
    //tools
    _sDataTool: new DataTool(),
    _nDataTool: new DataTool(),
    setDimension(dimension) {
        this._sDataTool.setDimension(dimension);
        this._nDataTool.setDimension(dimension);
    },
};
