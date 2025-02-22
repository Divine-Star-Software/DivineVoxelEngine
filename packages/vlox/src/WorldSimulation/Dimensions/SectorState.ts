import { Sector } from "../../World/Sector";
import { MooreNeighborhood2D } from "../../Math/CardinalNeighbors";
import { WorldSpaces } from "../../World/WorldSpaces";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { WorldRegister } from "../../World/WorldRegister";
import { SimulationSector } from "./SimulationSector";
const tempPosition = Vector3Like.Create();
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
    const sector = this.simSector.sector;
    if (!sector) throw new Error(`Sector must be set`);
    const state = this;
    state.resset();

    const [cx, cy, cz] = sector.position;

    for (let i = 0; i < MooreNeighborhood2D.length; i++) {
      const sectorPOS = WorldSpaces.sector.getPosition(
        cx + MooreNeighborhood2D[i][0] * WorldSpaces.sector.bounds.x,
        cy,
        cz + MooreNeighborhood2D[i][1] * WorldSpaces.sector.bounds.z,
        tempPosition
      );
      const sector = WorldRegister.sectors.get(
        this.simSector.dimension.id,
        sectorPOS.x,
        cy,
        sectorPOS.z
      );
      if (!sector) {
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
