import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { QueuesIndexes } from "../../Constants/Queues.js";

export const QueuesManager = {
 __states: <Uint32Array>new Uint32Array(),
 setQueueStates(states: Uint32Array) {
  this.__states = states;
 },
 finishRGBLightUpdate() {
  Atomics.sub(this.__states, QueuesIndexes.RGBLightUpdate, 1);
 },
 finishRGBLightRemove() {
  Atomics.sub(this.__states, QueuesIndexes.RGBLightRemove, 1);
 },
 finishWorldColumnSunLightProp() {
  Atomics.sub(this.__states, QueuesIndexes.worldColumnSunLightProp, 1);
 },
 finishSunLightUpdateAtMaxY() {
  Atomics.sub(this.__states, QueuesIndexes.sunLgithUpdateMaxY, 1);
 },
 finishSunLightUpdateMaxYFlood() {
  Atomics.sub(this.__states, QueuesIndexes.sunLightMaxYFlood, 1);
 },
 finishSunLightUpdate() {
  Atomics.sub(this.__states, QueuesIndexes.sunLightUpdate, 1);
 },
 finishSunLightRemove() {
  Atomics.sub(this.__states, QueuesIndexes.sunLightRemove, 1);
 },
 finishBuildingChunk() {
  Atomics.sub(this.__states, QueuesIndexes.chunksBuilding, 1);
 },
 finishFlowRun() {
  Atomics.sub(this.__states, QueuesIndexes.flowsRunning, 1);
 },
 finishFlowRemove() {
  Atomics.sub(this.__states, QueuesIndexes.flowsRemoving, 1);
 },
 finishGenerating() {
  Atomics.sub(this.__states, QueuesIndexes.generating, 1);
 },

 awaitAllChunksToBeBuilt() {
  return DVEC.UTIL.createPromiseCheck({
   check: () => {
    return QueuesManager.areAllChunksDoneBuilding();
   },
   checkInterval: 1,
  });
 },

 areAllChunksDoneBuilding() {
  return Atomics.load(this.__states, QueuesIndexes.chunksBuilding) == 0;
 },
};
