import { Sector } from "../../World/Sector";
import { SimulationSector } from "./SimulationSector";
export class SectorState {
  isLoaded = true;
  isGenerated = true;
  genAlldone = true;
  allLoaded = true;
  nWorldGenAllDone = true;
  nDecorAllDone = true;
  nSunAllDone = true;
  nPropagtionAllDone = true;

  constructor(public simSector: SimulationSector) {}
  resset() {
    this.isLoaded = true;
    this.isGenerated = true;
    this.genAlldone = true;
    this.allLoaded = true;
    this.nWorldGenAllDone = true;
    this.nDecorAllDone = true;
    this.nSunAllDone = true;
    this.nPropagtionAllDone = true;
  }

  update() {
    if (!this.simSector.sector) throw new Error(`Sector must be set`);
    const state = this;
    state.resset();

    for (const simSector of this.simSector.neighbors) {
      const sector = simSector.sector;

      if (!sector || sector.isCheckedOut()) {
        state.genAlldone = false;
        state.nWorldGenAllDone = false;
        state.nPropagtionAllDone = false;
        state.nSunAllDone = false;
        state.nDecorAllDone = false;
        state.allLoaded = false;

        break;
      }

      if (!sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
        state.nWorldGenAllDone = false;
      }
      if (!sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)) {
        state.nDecorAllDone = false;
      }
      if (!sector.getBitFlag(Sector.FlagIds.isWorldSunDone)) {
        state.nSunAllDone = false;
      }
      if (!sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)) {
        state.nPropagtionAllDone = false;
      }
    }
    return this;
  }
}
