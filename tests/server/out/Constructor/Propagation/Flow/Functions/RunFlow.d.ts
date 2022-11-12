import type { FlowManager } from "../FlowManager";
export declare function RunFlow(this: typeof FlowManager, x: number, y: number, z: number): Promise<void>;
export declare function RunFlowPropagation(this: typeof FlowManager): void;
export declare function RunFlowIncrease(this: typeof FlowManager): void;
