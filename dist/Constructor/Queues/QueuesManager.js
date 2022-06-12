import { QueuesIndexes } from "../../Constants/Queues.js";
export const QueuesManager = {
    states: new Uint32Array(),
    setQueueStates(states) {
        this.states = states;
    },
    finishRGBLightUpdate() {
        Atomics.sub(this.states, QueuesIndexes.RGBLightUpdate, 1);
    },
    finishRGBLightRemove() {
        Atomics.sub(this.states, QueuesIndexes.RGBLightRemove, 1);
    },
    finishWorldColumnSunLightProp() {
        Atomics.sub(this.states, QueuesIndexes.worldColumnSunLightProp, 1);
    },
    finishSunLightUpdateAtMaxY() {
        Atomics.sub(this.states, QueuesIndexes.sunLgithUpdateMaxY, 1);
    },
    finishSunLightUpdateMaxYFlood() {
        Atomics.sub(this.states, QueuesIndexes.sunLightMaxYFlood, 1);
    },
    finishSunLightUpdate() {
        Atomics.sub(this.states, QueuesIndexes.sunLightUpdate, 1);
    },
    finishSunLightRemove() {
        Atomics.sub(this.states, QueuesIndexes.sunLightRemove, 1);
    },
};
