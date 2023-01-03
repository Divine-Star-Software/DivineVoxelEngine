import { Queue } from "./Util/Queue.js";
export declare const Util: {
    createPromiseCheck: (data: {
        check: () => boolean;
        onReady?: (() => any) | undefined;
        checkInterval: number;
        failTimeOut?: number | undefined;
        onFail?: (() => any) | undefined;
    }) => Promise<boolean>;
    getEnviorment(): "node" | "browser";
    getAQueue<T>(): Queue<T>;
    merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
    degtoRad(degrees: number): number;
    radToDeg(radians: number): number;
    convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
    converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
};
