//objects
import { CCM } from "../Threads/Constructor/ConstructorComm.js";
import { ConstructorTasks } from "../Threads/Contracts/ConstructorTasks.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
const QMBase = {
    $INIT() {
        this.addQueue("main");
    },
    _queueMap: new Map(),
    addQueue(queueKey) {
        if (this._queueMap.has(queueKey))
            return false;
        this.rgb.update.addQueue(queueKey);
        this.rgb.remove.addQueue(queueKey);
        this.sun.update.addQueue(queueKey);
        this.sun.remove.addQueue(queueKey);
        this.worldSun.__steps.step1.addQueue(queueKey);
        this.worldSun.__steps.step2.addQueue(queueKey);
        this.worldSun.__steps.step3.addQueue(queueKey);
        this.flow.update.addQueue(queueKey);
        this.flow.remove.addQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.chunk.addQueue(queueKey);
        this._queueMap.set(queueKey, true);
        return true;
    },
    removeQueue(queueKey) {
        if (!this._queueMap.has(queueKey))
            return false;
        this.rgb.update.removeQueue(queueKey);
        this.rgb.remove.removeQueue(queueKey);
        this.sun.update.removeQueue(queueKey);
        this.sun.remove.removeQueue(queueKey);
        this.worldSun.__steps.step1.removeQueue(queueKey);
        this.worldSun.__steps.step2.removeQueue(queueKey);
        this.worldSun.__steps.step3.removeQueue(queueKey);
        this.flow.update.removeQueue(queueKey);
        this.flow.remove.removeQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.chunk.removeQueue(queueKey);
        this._queueMap.delete(queueKey);
        return true;
    },
    /**# Filter Queues
     * ---
     * Go through each current queue. IF the passed fucntion returns false it will remove that queue.
     * @param filter
     */
    filterQueues(filter) {
        this._queueMap.forEach((v, key) => {
            if (!filter(key)) {
                this.removeQueue(key);
            }
        });
    },
    rgb: {
        update: CCM.addQueue("rgb-update", ConstructorTasks.RGBlightUpdate, null),
        remove: CCM.addQueue("rgb-remove", ConstructorTasks.RGBlightRemove),
    },
    worldSun: {
        add(x, z, queueId = "main") {
            QMBase.worldSun.__steps.step1.add([x, z, 0], queueId);
        },
        async run() {
            await QMBase.worldSun.__steps.step1.runAndAwait();
            await QMBase.worldSun.__steps.step2.runAndAwait();
            await QMBase.worldSun.__steps.step3.runAndAwait();
        },
        __steps: {
            step1: CCM.addQueue("sun-fill", ConstructorTasks.worldSunStep1, null, (data) => {
                const x = data[0];
                const z = data[1];
                WorldRegister.column.fill(0, x, z);
                const maxY = WorldRegister.column.height.getRelative("main", x, z);
                data[2] = maxY;
                QMBase.worldSun.__steps.step2.add([x, z, maxY, -1]);
                return data;
            }),
            step2: CCM.addQueue("sun-column-update", ConstructorTasks.worldSunStep2, null, (data) => {
                QMBase.worldSun.__steps.step3.add(data);
                return data;
            }, (data, thread) => {
                data[3] = thread;
            }),
            step3: CCM.addQueue("sun-column-flood", ConstructorTasks.worldSunStep3, null, (d) => d, (d, t) => { }, (data) => {
                return data[3];
            }),
        },
    },
    sun: {
        update: CCM.addQueue("sun-update", ConstructorTasks.sunLightUpdate),
        remove: CCM.addQueue("sun-remove", ConstructorTasks.sunLightRemove),
    },
    flow: {
        update: CCM.addQueue("flow-update", ConstructorTasks.flowUpdate),
        remove: CCM.addQueue("flow-remove", ConstructorTasks.flowRemove),
    },
    build: {
        chunk: CCM.addQueue("build-chunk", ConstructorTasks.buildChunk),
    },
    generate: {
        chunk: CCM.addQueue("generate-chunk", ConstructorTasks.generate),
    },
};
export const ConstructorQueues = QMBase;
