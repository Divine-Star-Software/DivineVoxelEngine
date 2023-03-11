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
        this.build.column.deferred._s = this;
        this.explosion._s = this;
        this.voxelUpdate.erase._s = this;
        this.voxelUpdate.paint._s = this;
        this.voxelUpdate.update._s = this;
        this.anaylzer.update._s = this;
        this.build.chunk.deferred._s = this;
        this.build.chunk.queued._s = this;
        this.worldSun.deferred._s = this;
        this.worldSun.queued._s = this;
        this.generate.deferred._s = this;
        this.generate.queued._s = this;
        this.propagation.deferred._s = this;
        this.propagation.queued._s = this;
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
            _s: {},
            run(location, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.voxelUpdate, [location, this._s._data.queue, this._s._thread], [], onDone);
            },
        },
        erase: {
            _s: {},
            run(location, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.voxelErease, [location, this._s._data.queue, this._s._thread], [], onDone);
            },
        },
        paint: {
            _s: {},
            run(location, raw, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.voxelPaint, [location, raw, this._s._data.queue, this._s._thread], [], onDone);
            },
        },
    };
    build = {
        chunk: {
            deferred: {
                _s: {},
                run(buildTasks, onDone) {
                    CCM.runPromiseTasks(ConstructorTasks.buildChunk, {
                        data: buildTasks,
                        priority: this._s._priority,
                    }, [], onDone);
                },
            },
            queued: {
                _s: {},
                add(location) {
                    CQ.build.chunk.add({
                        data: [location, 1],
                        priority: this._s._priority,
                    }, this._s._data.queue);
                },
                run(onDone) {
                    CQ.build.chunk.run(this._s._data.queue);
                    CQ.build.chunk.onDone(this._s._data.queue, onDone);
                },
                async runAndAwait() {
                    await CQ.build.chunk.runAndAwait(this._s._data.queue);
                },
            },
        },
        column: {
            queued: {},
            deferred: {
                _s: {},
                run(location, onDone) {
                    CCM.runPromiseTasks(ConstructorTasks.buildColumn, [location, 1], [], onDone);
                },
            },
        },
    };
    explosion = {
        _s: {},
        run(location, radius, onDone) {
            CCM.runPromiseTasks(ConstructorTasks.explosion, [location, radius, "", ""], [], onDone);
        },
    };
    anaylzer = {
        update: {
            _s: {},
            run(location, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.analyzerUpdate, [location, this._s._data.queue, this._s._thread], [], onDone);
            },
        },
    };
    propagation = {
        deferred: {
            _s: {},
            run(location, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.analyzerPropagation, [location, this._s._data.queue, this._s._thread], [], onDone);
            },
        },
        queued: {
            _s: {},
            add(location) {
                CQ.propagation.add([location, this._s._data.queue, this._s._thread]);
            },
            run(onDone) {
                CQ.propagation.run(this._s._data.queue);
                CQ.propagation.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.propagation.runAndAwait();
            },
        },
    };
    generate = {
        deferred: {
            _s: {},
            run(location, data, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.generate, [location, data], [], onDone);
            },
        },
        queued: {
            _s: {},
            add(data) {
                CQ.generate.add(data);
            },
            run(onDone) {
                CQ.generate.run(this._s._data.queue);
                CQ.generate.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.generate.runAndAwait();
            },
        },
    };
    worldSun = {
        deferred: {
            _s: {},
            run(location, onDone) {
                CCM.runPromiseTasks(ConstructorTasks.worldSun, [location, this._s._thread], [], onDone);
            },
        },
        queued: {
            _s: {},
            add(location) {
                CQ.worldSun.add([location, this._s._data.queue, this._s._thread]);
                WorldRegister.column.fill(location);
            },
            run(onDone) {
                CQ.worldSun.run(this._s._data.queue);
                CQ.worldSun.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.worldSun.runAndAwait();
            },
        },
    };
}
export const GetTasksTool = function () {
    return new TaskTool();
};
