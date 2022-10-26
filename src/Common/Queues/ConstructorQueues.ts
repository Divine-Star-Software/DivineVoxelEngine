//types
import type { BuildTasks, LightUpdateTask, UpdateTasks } from "Meta/Tasks/Tasks.types.js";
//objects
import { CCM } from "../Threads/Constructor/ConstructorComm.js";
import { ConstructorTasks } from "../../Data/Constants/Contracts/ConstructorTasks.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";

const QMBase = {
 $INIT() {
  this.addQueuesForDimension("main");
 },
 addQueuesForDimension(dimensionId: string) {
  this.rgb.update.addQueue(dimensionId);
  this.rgb.remove.addQueue(dimensionId);
  this.sun.update.addQueue(dimensionId);
  this.sun.remove.addQueue(dimensionId);
  this.worldSun.__steps.step1.addQueue(dimensionId);
  this.worldSun.__steps.step2.addQueue(dimensionId);
  this.worldSun.__steps.step3.addQueue(dimensionId);
  this.flow.update.addQueue(dimensionId);
  this.flow.remove.addQueue(dimensionId);
  this.build.chunk.addQueue(dimensionId);
  this.generate.chunk.addQueue(dimensionId);
 },
 rgb: {
  update: CCM.addQueue<UpdateTasks>(
   "rgb-update",
   ConstructorTasks.RGBlightUpdate,
   null
  ),
  remove: CCM.addQueue<UpdateTasks>(
   "rgb-remove",
   ConstructorTasks.RGBlightRemove
  ),
 },
 worldSun: {
  add(x: number, z: number, queueId: string = "main") {
   QMBase.worldSun.__steps.step1.add([x, z, 0], queueId);
  },
  async run() {
   await QMBase.worldSun.__steps.step1.runAndAwait();
   await QMBase.worldSun.__steps.step2.runAndAwait();
   await QMBase.worldSun.__steps.step3.runAndAwait();
  },
  __steps: {
   step1: CCM.addQueue<[number, number, number]>(
    "sun-fill",
    ConstructorTasks.worldSunStep1,
    null,
    (data) => {
     const x = data[0];
     const z = data[1];
     WorldRegister.column.fill(0, x, z);
     const maxY = WorldRegister.column.height.getRelative(0, x, z);
     data[2] = maxY;
     QMBase.worldSun.__steps.step2.add([x, z, maxY, -1]);
     return data;
    }
   ),
   step2: CCM.addQueue<[number, number, number, number]>(
    "sun-column-update",
    ConstructorTasks.worldSunStep2,
    null,
    (data) => {
     QMBase.worldSun.__steps.step3.add(data);
     return data;
    },
    (data, thread) => {
     data[3] = thread;
    }
   ),
   step3: CCM.addQueue<[number, number, number, number]>(
    "sun-column-flood",
    ConstructorTasks.worldSunStep3,
    null,
    (d) => d,
    (d, t) => {},
    (data) => {
     return data[3];
    }
   ),
  },
 },
 sun: {
  update: CCM.addQueue<UpdateTasks>(
   "sun-update",
   ConstructorTasks.sunLightUpdate
  ),
  remove: CCM.addQueue<UpdateTasks>(
   "sun-remove",
   ConstructorTasks.sunLightRemove
  ),
 },
 flow: {
  update: CCM.addQueue<UpdateTasks>(
   "flow-update",
   ConstructorTasks.flowUpdate
  ),
  remove: CCM.addQueue<UpdateTasks>(
   "flow-remove",
   ConstructorTasks.flowRemove
  ),
 },
 build: {
  chunk: CCM.addQueue<BuildTasks>("build-chunk", ConstructorTasks.buildChunk),
 },
 generate: {
  chunk: CCM.addQueue<LightUpdateTask>(
   "generate-chunk",
   ConstructorTasks.generate
  ),
 },
};

export const ConstructorQueues = QMBase;
