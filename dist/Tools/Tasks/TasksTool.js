import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "threadcomm";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../World/Threads/WorldThreads.js";
import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
export class TaskTool {
    _data = {
        dimension: "main",
        queue: "main",
    };
    _thread = "";
    _priority = 0;
    constructor() {
        this._thread = ThreadComm.threadName;
    }
    setPriority(priority) {
        this._priority = priority;
        return this;
    }
    setFocalPoint(location) {
        const [dimesnion, x, y, z] = location;
        const queueKey = `${dimesnion}-${WorldSpaces.region.getKeyXYZ(x, y, z)}`;
        CQ.addQueue(queueKey);
        this._data.queue = queueKey;
        this._thread = ThreadComm.threadName;
        return this;
    }
    voxelUpdate = {
        update: {
            run: (location, raw, onDone, mode = "sync") => {
                CCM.runPromiseTasks(ConstructorTasks.voxelUpdate, [location, raw, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
        erase: {
            run: (location, onDone, mode = "sync") => {
                CCM.runPromiseTasks(ConstructorTasks.voxelErease, [location, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
        paint: {
            run: (location, raw, onDone, mode = "sync") => {
                CCM.runPromiseTasks(ConstructorTasks.voxelPaint, [location, raw, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
    };
    build = {
        chunk: {
            deferred: {
                run: (buildTasks, onDone) => {
                    CCM.runPromiseTasks(ConstructorTasks.buildChunk, {
                        data: buildTasks,
                        priority: this._priority,
                    }, [], onDone, undefined, 0);
                },
            },
            queued: {
                add: (location) => {
                    CQ.build.chunk.add({
                        data: [location, 1],
                        priority: this._priority,
                    }, this._data.queue);
                },
                run: (onDone) => {
                    CQ.build.chunk.run(this._data.queue);
                    CQ.build.chunk.onDone(this._data.queue, onDone);
                },
                runAndAwait: async () => {
                    await CQ.build.chunk.runAndAwait(this._data.queue);
                },
            },
        },
        column: {
            queued: {},
            deferred: {
                run: (location, onDone) => {
                    CCM.runPromiseTasks(ConstructorTasks.buildColumn, [location, 1], [], onDone, undefined, 0);
                },
            },
        },
    };
    explosion = {
        run: (location, radius, onDone) => {
            CCM.runPromiseTasks(ConstructorTasks.explosion, [location, radius, "", ""], [], onDone, undefined, 0);
        },
    };
    anaylzer = {
        update: {
            run: (location, onDone) => {
                CCM.runPromiseTasks(ConstructorTasks.analyzerUpdate, [location, this._data.queue, this._thread], [], onDone, undefined, 0);
            },
        },
    };
    propagation = {
        deferred: {
            run: (location, onDone) => {
                CCM.runPromiseTasks(ConstructorTasks.analyzerPropagation, [location, this._data.queue, this._thread], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (location) => {
                CQ.propagation.add([location, this._data.queue, this._thread], this._data.queue);
            },
            run: (onDone) => {
                CQ.propagation.run(this._data.queue);
                CQ.propagation.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await CQ.propagation.runAndAwait(this._data.queue);
            },
        },
    };
    generate = {
        deferred: {
            run(location, data, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.generate, [location, data], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (data) => {
                CQ.generate.add(data, this._data.queue);
            },
            run: (onDone) => {
                CQ.generate.run(this._data.queue);
                CQ.generate.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await CQ.generate.runAndAwait(this._data.queue);
            },
        },
    };
    decorate = {
        deferred: {
            run: (location, data, onDone) => {
                CCM.runPromiseTasks(ConstructorTasks.decorate, [location, data], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: async (data) => {
                CQ.decorate.add(data, this._data.queue);
            },
            run: (onDone) => {
                CQ.decorate.run(this._data.queue);
                CQ.decorate.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await CQ.decorate.runAndAwait(this._data.queue);
            },
        },
    };
    worldSun = {
        deferred: {
            run: (location, onDone) => {
                CCM.runPromiseTasks(ConstructorTasks.worldSun, [location, this._thread], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (location) => {
                CQ.worldSun.add([location, this._data.queue, this._thread], this._data.queue);
                WorldRegister.column.fill(location);
            },
            run: (onDone) => {
                CQ.worldSun.run(this._data.queue);
                CQ.worldSun.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await CQ.worldSun.runAndAwait(this._data.queue);
            },
        },
    };
}
