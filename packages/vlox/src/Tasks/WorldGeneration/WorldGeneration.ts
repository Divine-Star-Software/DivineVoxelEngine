//types
//objects
import { WorldGenRegister } from "./WorldGenRegister.js";
//tools
import { WorldGenBrush } from "./WorldGenBrush.js";
import { WorldGenInterface } from "./WorldGen.types.js";
import { GenerateTasks } from "../Tasks.types.js";

export class WorldGeneration {
  static worldGen: WorldGenInterface | null = null;

  static register = WorldGenRegister;

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
      const readyCheck = () => {
        if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
          onDone();
          return;
        }
        setTimeout(readyCheck, 10);
      };
      readyCheck();
    } else {
      onDone();
    }
  }

  static getBrush() {
    return new WorldGenBrush();
  }
}
