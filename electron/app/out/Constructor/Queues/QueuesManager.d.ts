export declare const QueuesManager: {
    states: Uint32Array;
    setQueueStates(states: Uint32Array): void;
    finishRGBLightUpdate(): void;
    finishRGBLightRemove(): void;
    finishWorldColumnSunLightProp(): void;
    finishSunLightUpdateAtMaxY(): void;
    finishSunLightUpdateMaxYFlood(): void;
    finishSunLightUpdate(): void;
    finishSunLightRemove(): void;
    finishBuildingChunk(): void;
    finishGenerating(): void;
};
