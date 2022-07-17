import { Util } from "Global/Util.helper.js";
import { RunFlow } from "./Functions/RunFlow.js";


export const FlowManager = {
    //voxelByte : Util.

    _visitedMap : <Record<string,boolean>> {},
    _flowQue : <number[][]> [],


    runFlow : RunFlow,
}