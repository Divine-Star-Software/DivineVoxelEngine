//types
import type { WorldGenInterface } from "Meta/Interfaces/WorldGen/WorldGen.types";
import type { GenerateTasks } from "Meta/Tasks/Tasks.types.js";

//objects
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { GetConstructorBrush } from "../../Constructor/Tools/Brush/ConstructorBrush.js";
import { WorldGenRegister } from "./Register/WorldGenRegister.js";

export const WorldGeneration = {
 worldGen: <WorldGenInterface | null>null,

 register: WorldGenRegister,
 worldBounds: WorldBounds,

 _brushes: <any[]>[],

 setWorldGen(worldGen: WorldGenInterface) {
  this.worldGen = worldGen;
 },

 generate(data: GenerateTasks, onDone: Function) {
  if (!this.worldGen) {
   throw new Error(`A World Generator must be set.`);
  }
  const [dimension, x, y, z] = data[0];
  const genData = data[1];
  const requestsId = WorldGenRegister.registerRequest(dimension, x, y, z);
  for (const brush of this._brushes) {
   brush.requestsId = requestsId;
  }

  this.worldGen.generate(dimension, x, y, z, genData);

  const inte = setInterval(() => {
   if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
    onDone();
    clearInterval(inte);
   }
  }, 100);
 },

 getBrush() {
  const brush = GetConstructorBrush();
  this._brushes.push(brush);
  return brush;
 },
};


