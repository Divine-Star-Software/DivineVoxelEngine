import { CreatePromiseCheck } from "./Util/CreatePromiseCheck.js";
import { Queue } from "./Util/Queue.js";
export const Util = {
 createPromiseCheck: CreatePromiseCheck,
 getEnviorment(): "node" | "browser" {
  let environment: "node" | "browser" = "browser";
  //@ts-ignore
  if (typeof process !== "undefined" && typeof Worker === "undefined") {
   environment = "node";
  }
  return environment;
 },

 getAQueue<T>() {
  return new Queue<T>();
 },
 merge<T, K>(target: T, newObject: K): T & K {
  return <T & K>Object.assign(target as any, newObject);
 },

 degtoRad(degrees: number) {
  return degrees * (Math.PI / 180);
 },
 radToDeg(radians: number) {
  return radians * (180 / Math.PI);
 },

 convertBufferToSAB(buffer: ArrayBuffer) {
  const sab = new SharedArrayBuffer(buffer.byteLength);
  const temp = new Uint8Array(buffer);
  const temp2 = new Uint8Array(sab);
  temp2.set(temp, 0);
  return sab;
 },
 converSABToBuffer(buffer: SharedArrayBuffer) {
  const newBuffer = new ArrayBuffer(buffer.byteLength);
  const temp = new Uint8Array(buffer);
  const temp2 = new Uint8Array(newBuffer);
  temp2.set(temp, 0);
  return newBuffer;
 },
};
