export declare const QueuesManager: {
    states: Int32Array;
    setQueueStates(states: Int32Array): void;
    startRGBLightUpdate(): void;
    finishRGBLightUpdate(): void;
    finishRGBLightRemove(): void;
    finishWorldColumnSunLightProp(): void;
    finishSunLightUpdateAtMaxY(): void;
    finishSunLightUpdate(): void;
};
