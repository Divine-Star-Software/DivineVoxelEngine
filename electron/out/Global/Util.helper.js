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
};
