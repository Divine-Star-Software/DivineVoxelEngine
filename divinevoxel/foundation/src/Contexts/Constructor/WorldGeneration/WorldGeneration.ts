//types
//objects
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
import { WorldGenRegister } from "./Register/WorldGenRegister.js";
//tools
import { WorldGenBrush } from "../Tools/WorldGenBrush.js";
import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { WorldGenInterface } from "../../../Interfaces/WorldGen/WorldGen.types.js";
import { GenerateTasks } from "../../../Types/Tasks.types.js";

export const WorldGeneration = {
  worldGen: <WorldGenInterface | null>null,

  register: WorldGenRegister,
  worldBounds: WorldBounds,

  _brushes: <any[]>[],

  setWorldGen(worldGen: WorldGenInterface) {
    this.worldGen = worldGen;
  },

  async generate(
    data: GenerateTasks,
    mode: "generate" | "decorate",
    onDone: Function
  ) {
    if (!this.worldGen) {
      throw new Error(`A World Generator must be set.`);
    }

    const requestsId = WorldGenRegister.registerRequest(data[0]);
    for (const brush of this._brushes) {
      brush.requestsId = requestsId;
    }

    if (mode == "generate") {
      await this.worldGen.generate(data);
    }
    if (mode == "decorate") {
      await this.worldGen.decorate(data);
    }

    const inte = new SafeInterval().setInterval(100).setOnRun(() => {
      if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
        onDone();
        inte.stop();
      }
    });
    inte.start();
  },

  getBrush() {
    const brush = new WorldGenBrush();
    this._brushes.push(brush);
    return brush;
  },
};
