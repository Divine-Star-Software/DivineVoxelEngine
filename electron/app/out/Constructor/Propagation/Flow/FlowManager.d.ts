import { RunFlow } from "./Functions/RunFlow.js";
export declare const FlowManager: {
    _visitedMap: Record<string, boolean>;
    _flowQue: number[][];
    runFlow: typeof RunFlow;
};
