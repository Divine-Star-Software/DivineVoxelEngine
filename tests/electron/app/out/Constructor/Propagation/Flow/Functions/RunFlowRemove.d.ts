import type { FlowManager } from "../FlowManager";
export declare function RunFlowRemove(this: typeof FlowManager, x: number, y: number, z: number): Promise<void>;
export declare function RunRemovePropagation(this: typeof FlowManager): void;
export declare function RunFlowReduce(this: typeof FlowManager): void;
