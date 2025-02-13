//types
//objects
import { WorldGenRegister } from "./WorldGenRegister.js";
//tools
import { WorldGenBrush } from "./WorldGenBrush.js";
import { WorldGenInterface } from "./WorldGen.types.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { LocationData } from "../../Math/index.js";
import { Sector } from "../../World/index.js";

export class WorldGeneration {
  static worldGen: WorldGenInterface | null = null;

  static register = WorldGenRegister;

  static _brushes: any[] = [];

  static setWorldGen(worldGen: WorldGenInterface) {
    this.worldGen = worldGen;
  }

  static async generate(
    data: Readonly< LocationData>,
    mode: "generate" | "decorate",
    onDone: Function
  ) {
    if (!this.worldGen) {
      throw new Error(`A World Generator must be set.`);
    }

    const requestsId = WorldGenRegister.registerRequest(data);
    for (const brush of this._brushes) {
      brush.requestsId = requestsId;
    }
    const sector = WorldRegister.sectors.get(...data);
    if (!sector) {
      console.error(
        `Error when attempting wolrd gen at [${data.join(",")}] Sector does not exist`
      );
      return;
    }

    if (mode == "generate") {
      await this.worldGen.generate(...data);
    }
    if (mode == "decorate") {
      await this.worldGen.decorate(...data);
    }

    if (!WorldGenRegister.attemptRequestFullFill(requestsId)) {
      const readyCheck = () => {
        if (WorldGenRegister.attemptRequestFullFill(requestsId)) {
          if (mode == "generate") {
            sector.setBitFlag(Sector.FlagIds.isWorldGenDone, true);
          }
          if (mode == "decorate") {
            sector.setBitFlag(Sector.FlagIds.isWorldDecorDone, true);
          }
          onDone();
          return;
        }
        setTimeout(readyCheck, 10);
      };
      readyCheck();
    } else {
      if (mode == "generate") {
        sector.setBitFlag(Sector.FlagIds.isWorldGenDone, true);
      }
      if (mode == "decorate") {
        sector.setBitFlag(Sector.FlagIds.isWorldDecorDone, true);
      }
      onDone();
    }
  }

  static getBrush() {
    return new WorldGenBrush();
  }
}
