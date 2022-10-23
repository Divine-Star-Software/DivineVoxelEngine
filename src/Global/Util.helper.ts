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
};
