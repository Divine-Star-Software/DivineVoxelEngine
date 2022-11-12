import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { ConstructorQueues as CQ } from "../../Common/Queues/ConstructorQueues.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
class TasksBase {
    _data = {
        dimension: "main",
        queue: "main",
    };
    _thread = "";
    constructor() {
        this.build.chunk._s = this;
        this.light.rgb.update._s = this;
        this.light.rgb.remove._s = this;
        this.light.sun.update._s = this;
        this.light.sun.remove._s = this;
        this.flow.update._s = this;
        this.flow.remove._s = this;
        this.light.worldSun._s = this;
        this.explosion.run._s = this;
        this.voxelUpdate.erease._s = this;
        this.voxelUpdate.paint._s = this;
    }
    setFocalPoint(x, y, z, dimension = this._data.dimension) {
        const queueKey = `${dimension}-${WorldBounds.getRegionKeyFromPosition(x, y, z)}`;
        CQ.addQueue(queueKey);
        this._data.queue = queueKey;
        this._thread = ThreadComm.threadName;
    }
    voxelUpdate = {
        erease: {
            _s: {},
            add(x, y, z) {
                CQ.voxelUpdate.erease.add([this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread], this._s._data.queue);
            },
            run(onDone) {
                CQ.voxelUpdate.erease.run(this._s._data.queue);
                CQ.voxelUpdate.erease.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.voxelUpdate.erease.runAndAwait(this._s._data.queue);
            },
        },
        paint: {
            _s: {},
            add(x, y, z, raw) {
                CQ.voxelUpdate.paint.add([
                    this._s._data.dimension,
                    x,
                    y,
                    z,
                    raw,
                    this._s._data.queue,
                    this._s._thread,
                ], this._s._data.queue);
            },
            run(onDone) {
                CQ.voxelUpdate.paint.run(this._s._data.queue);
                CQ.voxelUpdate.paint.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.voxelUpdate.paint.runAndAwait(this._s._data.queue);
            },
        },
    };
    build = {
        chunk: {
            _s: {},
            add(x, y, z) {
                CQ.build.chunk.add([this._s._data.dimension, x, y, z, 1], this._s._data.queue);
            },
            run(onDone) {
                CQ.build.chunk.run(this._s._data.queue);
                CQ.build.chunk.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.build.chunk.runAndAwait(this._s._data.queue);
            },
        },
    };
    explosion = {
        run: {
            _s: {},
            add(x, y, z, radius) {
                CQ.explosion.run.add([
                    this._s._data.dimension,
                    x,
                    y,
                    z,
                    radius,
                    this._s._data.queue,
                    this._s._thread,
                ], this._s._data.queue);
            },
            run(onDone) {
                CQ.explosion.run.run(this._s._data.queue);
                CQ.explosion.run.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.explosion.run.runAndAwait(this._s._data.queue);
            },
        },
    };
    flow = {
        update: {
            _s: {},
            add(x, y, z) {
                CQ.flow.update.add([this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread], this._s._data.queue);
            },
            run(onDone) {
                CQ.flow.update.run(this._s._data.queue);
                CQ.flow.update.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.flow.update.runAndAwait(this._s._data.queue);
            },
        },
        remove: {
            _s: {},
            add(x, y, z) {
                CQ.flow.remove.add([this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread], this._s._data.queue);
            },
            run(onDone) {
                CQ.flow.remove.run(this._s._data.queue);
                CQ.flow.remove.onDone(this._s._data.queue, onDone);
            },
            async runAndAwait() {
                await CQ.flow.remove.runAndAwait(this._s._data.queue);
            },
        },
    };
    light = {
        rgb: {
            update: {
                _s: {},
                add(x, y, z, queue = null) {
                    queue = queue ? queue : this._s._data.queue;
                    CQ.rgb.update.add([this._s._data.dimension, x, y, z, queue, this._s._thread], queue);
                },
                run(onDone) {
                    CQ.rgb.update.run(this._s._data.queue);
                    CQ.rgb.update.onDone(this._s._data.queue, onDone);
                },
                async runAndAwait() {
                    await CQ.rgb.update.runAndAwait(this._s._data.queue);
                },
            },
            remove: {
                _s: {},
                add(x, y, z, queue = null) {
                    queue = queue ? queue : this._s._data.queue;
                    CQ.rgb.remove.add([this._s._data.dimension, x, y, z, queue, this._s._thread], queue);
                },
                run(onDone) {
                    CQ.rgb.remove.run(this._s._data.queue);
                    CQ.rgb.remove.onDone(this._s._data.queue, onDone);
                },
                async runAndAwait() {
                    await CQ.rgb.remove.runAndAwait(this._s._data.queue);
                },
            },
        },
        sun: {
            update: {
                _s: {},
                add(x, y, z) {
                    CQ.sun.update.add([this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread], this._s._data.queue);
                },
                run(onDone) {
                    CQ.sun.update.run(this._s._data.queue);
                    CQ.sun.update.onDone(this._s._data.queue, onDone);
                },
                async runAndAwait() {
                    await CQ.sun.update.runAndAwait(this._s._data.queue);
                },
            },
            remove: {
                _s: {},
                add(x, y, z) {
                    CQ.sun.remove.add([this._s._data.dimension, x, y, z, this._s._data.queue, this._s._thread], this._s._data.queue);
                },
                run(onDone) {
                    CQ.sun.remove.run(this._s._data.queue);
                    CQ.sun.remove.onDone(this._s._data.queue, onDone);
                },
                async runAndAwait() {
                    await CQ.sun.remove.runAndAwait(this._s._data.queue);
                },
            },
        },
        worldSun: {
            _s: {},
            add(x, z, y = 0) {
                CQ.worldSun.add([
                    this._s._data.dimension,
                    x,
                    z,
                    y,
                    this._s._data.queue,
                    this._s._thread,
                ]);
                WorldRegister.column.fill(this._s._data.dimension, x, z, y);
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
export const TasksTool = function () {
    return new TasksBase();
};
