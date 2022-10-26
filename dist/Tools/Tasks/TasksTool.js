import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../World/DivineVoxelEngineWorld.js";
class TasksBase {
    _data = {
        dimension: "main",
    };
    _thread = "";
    constructor() {
        this._thread = ThreadComm.threadName;
        this.build.chunk.__this = this;
        this.light.rgb.update.__this = this;
        this.light.rgb.remove.__this = this;
        this.light.sun.update.__this = this;
        this.light.sun.remove.__this = this;
        this.flow.update.__this = this;
        this.flow.remove.__this = this;
    }
    setDimension(dimensionId) {
        this._data.dimension = dimensionId;
        return this;
    }
    build = {
        chunk: {
            __this: {},
            __queueId: "main",
            add(x, y, z) {
                DVEW.cQueues.build.chunk.add([0, x, y, z, 1]);
            },
            run(onDone) {
                DVEW.cQueues.build.chunk.run();
                DVEW.cQueues.build.chunk.onDone(this.__queueId, onDone);
            },
            async runAndAwait() {
                await DVEW.cQueues.build.chunk.runAndAwait();
            },
        },
    };
    flow = {
        update: {
            __this: {},
            __queueId: "main",
            add(x, y, z) {
                DVEW.cQueues.flow.update.add([
                    this.__this._data.dimension,
                    x,
                    y,
                    z,
                    this.__this._thread,
                    this.__this._data.dimension,
                ]);
            },
            run(onDone) {
                DVEW.cQueues.flow.update.run();
                DVEW.cQueues.flow.update.onDone(this.__queueId, onDone);
            },
            async runAndAwait() {
                await DVEW.cQueues.flow.update.runAndAwait();
            },
        },
        remove: {
            __this: {},
            __queueId: "main",
            add(x, y, z) {
                DVEW.cQueues.flow.remove.add([
                    this.__this._data.dimension,
                    x,
                    y,
                    z,
                    this.__this._thread,
                    this.__this._data.dimension,
                ]);
            },
            run(onDone) {
                DVEW.cQueues.flow.remove.run();
                DVEW.cQueues.flow.remove.onDone(this.__queueId, onDone);
            },
            async runAndAwait() {
                await DVEW.cQueues.flow.remove.runAndAwait();
            },
        },
    };
    light = {
        rgb: {
            update: {
                __this: {},
                __queueId: "main",
                add(x, y, z) {
                    DVEW.cQueues.rgb.update.add([
                        this.__this._data.dimension,
                        x,
                        y,
                        z,
                        this.__this._thread,
                        this.__this._data.dimension,
                    ]);
                },
                run(onDone) {
                    DVEW.cQueues.rgb.update.run();
                    DVEW.cQueues.rgb.update.onDone(this.__queueId, onDone);
                },
                async runAndAwait() {
                    await DVEW.cQueues.rgb.update.runAndAwait();
                },
            },
            remove: {
                __this: {},
                __queueId: "main",
                add(x, y, z) {
                    DVEW.cQueues.rgb.remove.add([
                        this.__this._data.dimension,
                        x,
                        y,
                        z,
                        this.__this._thread,
                        this.__this._data.dimension,
                    ]);
                },
                run(onDone) {
                    DVEW.cQueues.rgb.remove.run();
                    DVEW.cQueues.rgb.remove.onDone(this.__queueId, onDone);
                },
                async runAndAwait() {
                    await DVEW.cQueues.rgb.remove.runAndAwait();
                },
            },
        },
        sun: {
            update: {
                __this: {},
                __queueId: "main",
                add(x, y, z) {
                    DVEW.cQueues.sun.update.add([
                        this.__this._data.dimension,
                        x,
                        y,
                        z,
                        this.__this._thread,
                        this.__this._data.dimension,
                    ]);
                },
                run(onDone) {
                    DVEW.cQueues.sun.update.run();
                    DVEW.cQueues.sun.update.onDone(this.__queueId, onDone);
                },
                async runAndAwait() {
                    await DVEW.cQueues.sun.update.runAndAwait();
                },
            },
            remove: {
                __this: {},
                __queueId: "main",
                add(x, y, z) {
                    DVEW.cQueues.sun.remove.add([
                        this.__this._data.dimension,
                        x,
                        y,
                        z,
                        this.__this._thread,
                        this.__this._data.dimension,
                    ]);
                },
                run(onDone) {
                    DVEW.cQueues.sun.remove.run();
                    DVEW.cQueues.sun.remove.onDone(this.__queueId, onDone);
                },
                async runAndAwait() {
                    await DVEW.cQueues.sun.remove.runAndAwait();
                },
            },
        },
        worldSun: {
            __this: {},
            __queueId: "main",
            add(x, z, y = 0) {
                DVEW.cQueues.worldSun.add(x, z);
            },
            async runAndAwait() {
                await DVEW.cQueues.worldSun.run();
            },
        },
    };
}
export const TasksTool = function () {
    return new TasksBase();
};
