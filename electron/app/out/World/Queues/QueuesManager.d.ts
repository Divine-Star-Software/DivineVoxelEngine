import { VoxelSubstanceType } from "Meta/index";
import { LightUpdateTask } from "Meta/Tasks/Tasks.types.js";
export declare type QueueFilter = (x: number, y: number, z: number) => 0 | 1 | 2;
export declare const QueuesManager: {
    _RGBLightRemoveQue: number[][];
    _RGBLightUpdateQue: number[][];
    _SunLightRemoveQue: number[][];
    _SunLightUpdateQue: number[][];
    _runFlowQue: number[][];
    _removeFlowQue: number[][];
    _worldColumnSunLightPropMap: Record<string, {
        max: number;
        thread: number;
    }>;
    _worldColumnSunLightPropQue: number[][];
    _chunkRebuildQueMap: Record<string, Record<VoxelSubstanceType | "all", boolean>>;
    _chunkRebuildQue: number[][];
    __statesSAB: SharedArrayBuffer;
    __states: Uint32Array;
    $INIT(): void;
    _syncQueue(queueId: string, buffer: SharedArrayBuffer): void;
    _unSyncQueue(queueId: string): void;
    addWorldColumnToSunLightQue(x: number, z: number): void;
    runWorldColumnSunLightAndUpateQue(): Promise<void>;
    awaitAllWorldColumnSunLightProp(): Promise<boolean>;
    areWorldColumnSunLightUpdatsDone(): boolean;
    awaitAllSunLightUpdatesAtMaxY(): Promise<boolean>;
    areAllSunLightUpdatesAtMaxYDone(): boolean;
    awaitAllSunLightUpdatesMaxYFlood(): Promise<boolean>;
    areAllSunLightUpdatesMaxYFloodDone(): boolean;
    /**
     * Sun Light
     */
    addToSunLightUpdateQue(x: number, y: number, z: number): void;
    addToSunLightRemoveQue(x: number, y: number, z: number): void;
    runSunLightUpdateQue(): void;
    runSunLightRemoveQue(): void;
    awaitAllSunLightUpdates(): Promise<boolean>;
    awaitAllSunLightRemove(): Promise<boolean>;
    areSunLightUpdatesAllDone(): boolean;
    areSunLightRemovesAllDone(): boolean;
    /**
     * RGB Light
     */
    addToRGBUpdateQue(x: number, y: number, z: number): void;
    addToRGBRemoveQue(x: number, y: number, z: number): void;
    runRGBUpdateQue(filter?: QueueFilter): void;
    runRGBRemoveQue(): void;
    awaitAllRGBLightUpdates(): Promise<boolean>;
    awaitAllRGBLightRemove(): Promise<boolean>;
    areRGBLightUpdatesAllDone(): boolean;
    areRGBLightRemovesAllDone(): boolean;
    /**
     * Flow
     */
    addToFlowRunQue(x: number, y: number, z: number): void;
    addToFlowRemoveQue(x: number, y: number, z: number): void;
    runFlowRuneQue(filter?: QueueFilter): void;
    runFlowRemoveQue(): void;
    awaitAllFlowRuns(): Promise<boolean>;
    awaitAllFlowRemoves(): Promise<boolean>;
    areFlowRunsAllDone(): boolean;
    areFlowRemovesAllDone(): boolean;
    /**
     *
     * Chunks
     */
    addToRebuildQue(x: number, y: number, z: number, substance: VoxelSubstanceType | "all"): void;
    runRebuildQue(filter?: QueueFilter): void;
    addToRebuildQueTotal(): void;
    awaitAllChunksToBeBuilt(): Promise<boolean>;
    areAllChunksDoneBuilding(): boolean;
    addToGenerationTotal(): void;
    areAllGenerationsDone(): boolean;
    awaitAllGenerationsToBeDone(): Promise<boolean>;
    rgb: {
        update: {
            __queueData: Record<string, {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            }>;
            onRun: (data: LightUpdateTask) => void;
            __getQueueKey(data: any): string;
            __getQueueData(id: string): {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            };
            addQueue(queueId: string): void;
            removeQueue(queueId: string): void;
            add(data: LightUpdateTask, queueId?: string): void;
            run(queueId?: string, filter?: ((data: LightUpdateTask) => 0 | 1 | 2) | undefined): void;
            awaitAll(queueId?: string): Promise<boolean>;
            isDone(queueId?: string): boolean;
        };
        remove: {
            __queueData: Record<string, {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            }>;
            onRun: (data: LightUpdateTask) => void;
            __getQueueKey(data: any): string;
            __getQueueData(id: string): {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            };
            addQueue(queueId: string): void;
            removeQueue(queueId: string): void;
            add(data: LightUpdateTask, queueId?: string): void;
            run(queueId?: string, filter?: ((data: LightUpdateTask) => 0 | 1 | 2) | undefined): void;
            awaitAll(queueId?: string): Promise<boolean>;
            isDone(queueId?: string): boolean;
        };
    };
    sun: {
        update: {
            __queueData: Record<string, {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            }>;
            onRun: (data: LightUpdateTask) => void;
            __getQueueKey(data: any): string;
            __getQueueData(id: string): {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            };
            addQueue(queueId: string): void;
            removeQueue(queueId: string): void;
            add(data: LightUpdateTask, queueId?: string): void;
            run(queueId?: string, filter?: ((data: LightUpdateTask) => 0 | 1 | 2) | undefined): void;
            awaitAll(queueId?: string): Promise<boolean>;
            isDone(queueId?: string): boolean;
        };
        remove: {
            __queueData: Record<string, {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            }>;
            onRun: (data: LightUpdateTask) => void;
            __getQueueKey(data: any): string;
            __getQueueData(id: string): {
                queue: import("../../Global/Util/Queue.js").Queue<LightUpdateTask>;
                map: Record<string, boolean>;
                stateSAB: SharedArrayBuffer;
                state: Uint32Array;
            };
            addQueue(queueId: string): void;
            removeQueue(queueId: string): void;
            add(data: LightUpdateTask, queueId?: string): void;
            run(queueId?: string, filter?: ((data: LightUpdateTask) => 0 | 1 | 2) | undefined): void;
            awaitAll(queueId?: string): Promise<boolean>;
            isDone(queueId?: string): boolean;
        };
    };
};
