export declare const QueuesManager: {
    __states: Uint32Array;
    setQueueStates(states: Uint32Array): void;
    finishRGBLightUpdate(): void;
    finishRGBLightRemove(): void;
    finishWorldColumnSunLightProp(): void;
    finishSunLightUpdateAtMaxY(): void;
    finishSunLightUpdateMaxYFlood(): void;
    finishSunLightUpdate(): void;
    finishSunLightRemove(): void;
    finishBuildingChunk(): void;
    finishFlowRun(): void;
    finishFlowRemove(): void;
    finishGenerating(): void;
    awaitAllChunksToBeBuilt(): Promise<boolean>;
    areAllChunksDoneBuilding(): boolean;
};
