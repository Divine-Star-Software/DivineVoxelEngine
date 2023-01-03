import { CreatePromiseCheck } from "./Util/CreatePromiseCheck.js";
import { Queue } from "./Util/Queue.js";
export const Util = {
    createPromiseCheck: CreatePromiseCheck,
    getEnviorment() {
        let environment = "browser";
        //@ts-ignore
        if (typeof process !== "undefined" && typeof Worker === "undefined") {
            environment = "node";
        }
        return environment;
    },
    getAQueue() {
        return new Queue();
    },
    merge(target, newObject) {
        return Object.assign(target, newObject);
    },
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },
    convertBufferToSAB(buffer) {
        const sab = new SharedArrayBuffer(buffer.byteLength);
        const temp = new Uint8Array(buffer);
        const temp2 = new Uint8Array(sab);
        temp2.set(temp, 0);
        return sab;
    },
    converSABToBuffer(buffer) {
        const newBuffer = new ArrayBuffer(buffer.byteLength);
        const temp = new Uint8Array(buffer);
        const temp2 = new Uint8Array(newBuffer);
        temp2.set(temp, 0);
        return newBuffer;
    },
};
