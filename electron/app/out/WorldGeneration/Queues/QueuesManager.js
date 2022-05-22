export const QueuesManager = {
    states: new Int32Array(),
    setQueueStates(states) {
        this.states = states;
    },
    startRGBLightUpdate() {
        this.states[0]++;
    },
    finishRGBLightUpdate() {
        Atomics.sub(this.states, 0, 1);
    },
};
