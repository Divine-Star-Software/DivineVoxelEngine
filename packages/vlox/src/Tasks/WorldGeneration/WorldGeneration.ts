//types
//objects
import { WorldBounds } from "../../World/WorldBounds.js";
import { WorldGenRegister } from "./WorldGenRegister.js";
//tools
import { WorldGenBrush } from "./WorldGenBrush.js";
import { SafeInterval } from "@amodx/core/Intervals/SafeInterval.js";
import { WorldGenInterface } from "./WorldGen.types.js";
import { GenerateTasks } from "../Tasks.types.js";

export class WorldGeneration {
  static worldGen: WorldGenInterface | null = null;

  static register = WorldGenRegister;
  static worldBounds = WorldBounds;

  static _brushes: any[] = [];

  static setWorldGen(worldGen: WorldGenInterface) {
    this.worldGen = worldGen;
  }

  static async generate(
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

    if (!WorldGenRegister.attemptRequestFullFill(requestsId)) {
      const inte = new SafeInterval().setInterval(100).setOnRun(() => {
   //     console.warn("do the check",data,mode)
        if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
          onDone();
          inte.stop();
        }
      });
      inte.start();
    } else {
      onDone();
    }


  }

  static getBrush() {
    return new WorldGenBrush();
  }
}
