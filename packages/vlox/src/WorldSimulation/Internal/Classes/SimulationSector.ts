import { Vec3Array, Vector3Like } from "@amodx/math";
import { SectorState } from "./SectorState";
import { Sector } from "../../../World/Sector";
import { MooreNeighborhood2D } from "../../../Math/CardinalNeighbors";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { WorldRegister } from "../../../World/WorldRegister";
import { WorldSimulationTasks } from "../WorldSimulationTasks";
const tempPosition = Vector3Like.Create();
export class SimulationSector {
  position: Vec3Array = [0, 0, 0];

  renderering = false;
  generating = false;
  state = new SectorState(this);
  sector: Sector | null = null;

  _rendered = false;
  _genAllDone = false;

  _dirtyTicks = new Uint32Array(WorldSpaces.sector.sectionVolumne);

  constructor(public dimensionId: number) {}

  renderUpdate() {
    if (!this.renderering || !this.sector) return false;
    if (!this._genAllDone) return false;

    const sector = this.sector;
    for (const section of sector.sections) {
      if (
        this._rendered &&
        this._dirtyTicks[section.index] ==
          section.getTick(section._Ticks.displayDirty)
      )
        continue;

      this._dirtyTicks[section.index] = section.getTick(
        section._Ticks.displayDirty
      );
      WorldSimulationTasks.buildTasks.add(
        this.dimensionId,
        ...section.position
      );
    }
    this._rendered = true;
    return true;
  }

  generateUpdate() {
    if (this._genAllDone) return true;
    if (!this.generating) return false;

    if (!this.sector) {
      const sector = WorldRegister.sectors.get(
        this.dimensionId,
        ...this.position
      );

      if (!sector) {
        WorldSimulationTasks.worldLoadTasks.add(
          this.dimensionId,
          ...this.position
        );
        return;
      }
      this.sector = sector;
    }
  
    const sector = this.sector;
    const state = this.state.update();

    if (state.allLoaded && !sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
      WorldSimulationTasks.worldGenTasks.add(
        this.dimensionId,
        ...this.position
      );
      return true;
    }

    if (
      state.nWorldGenAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)
    ) {
      WorldSimulationTasks.worldDecorateTasks.add(
        this.dimensionId,
        ...this.position
      );
      return true;
    }

    if (
      state.nDecorAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)
    ) {
      WorldSimulationTasks.worldPropagationTasks.add(
        this.dimensionId,
        ...this.position
      );
      return true;
    }

    if (
      state.nPropagtionAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldSunDone)
    ) {
      WorldSimulationTasks.worldSunTasks.add(
        this.dimensionId,
        ...this.position
      );
      return true;
    }
    if (state.nSunAllDone && sector.getBitFlag(Sector.FlagIds.isWorldSunDone)) {
      this._genAllDone = true;
      return true;
    }

    return true;
  }
}
