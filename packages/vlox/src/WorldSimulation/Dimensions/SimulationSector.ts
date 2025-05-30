import { Vec3Array, Vector3Like } from "@amodx/math";
import { SectorState } from "./SectorState";
import { Sector } from "../../World/Sector";
import { WorldSpaces } from "../../World/WorldSpaces";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldSimulationTasks } from "../Internal/WorldSimulationTasks";
import { TickQueue } from "../Tick/TickQueue";
import { DimensionSegment } from "./DimensionSegment";
import { VoxelBehaviorsRegister } from "../Voxels/Behaviors";
import { MooreNeighborhood2D } from "../../Math/CardinalNeighbors";
import { Thread } from "@amodx/threads";
import { WorldDataSyncIds } from "../../World/Types/WorldDataSyncIds";
import { EngineSettings } from "../../Settings/EngineSettings";
const tempPosition = Vector3Like.Create();
export class SimulationSector {
  position: Vec3Array = [0, 0, 0];

  renderering = false;
  generating = false;
  ticking = false;
  state = new SectorState(this);
  sector: Sector | null = null;

  _rendered = false;
  _genAllDone = false;

  /**An array of the last tick each section was built at */
  _displayTicks = new Uint32Array(WorldSpaces.sector.sectionVolumne);

  tickQueue: TickQueue;

  neighbors: SimulationSector[] = [];
  fullNeighbors = false;
  readonly maxNeighbors: number = MooreNeighborhood2D.length - 1;

  constructor(public dimension: DimensionSegment) {
    this.tickQueue = new TickQueue(dimension);
  }

  updateNeighbors() {
    this.neighbors.length = 0;
    const [cx, cy, cz] = this.position;
    this.fullNeighbors = true;

    for (let i = 0; i < MooreNeighborhood2D.length; i++) {
      const [nx, nz] = MooreNeighborhood2D[i];
      if (nx === 0 && nz === 0) continue;
      const sectorPOS = WorldSpaces.sector.getPosition(
        cx + nx * WorldSpaces.sector.bounds.x,
        cy,
        cz + nz * WorldSpaces.sector.bounds.z,
        tempPosition
      );

      const sector = this.dimension.activeSectors.get(
        sectorPOS.x,
        cy,
        sectorPOS.z
      );

      if (!sector) {
        this.fullNeighbors = false;
        continue;
      }
      this.neighbors.push(sector);
    }
  }

  canCheckOut() {
    if (EngineSettings.settings.memoryAndCPU.useSharedMemory) return true;
    if (!this.fullNeighbors) return false;
    if (!this.sector || this.sector.isCheckedOut() || this.sector.isLocked())
      return false;
    for (const simSector of this.neighbors) {
      if (!simSector.sector) return false;
      if (simSector.sector.isCheckedOut() || simSector.sector.isLocked())
        return false;
    }
    return true;
  }

  checkOut(thread: Thread) {
    if (EngineSettings.settings.memoryAndCPU.useSharedMemory) return;
    if (!this.sector) return;
    for (const simSector of this.neighbors) {
      const sector = simSector?.sector!;
      sector.setCheckedOut(true);
      thread.runTask(
        WorldDataSyncIds.CheckInSector,
        [[this.dimension.id, ...simSector.position], sector.buffer],
        [sector.buffer]
      );
    }
    this.sector.setCheckedOut(true);
    thread.runTask(
      WorldDataSyncIds.CheckInSector,
      [[this.dimension.id, ...this.position], this.sector.buffer],
      [this.sector.buffer]
    );
  }

  checkIn(thread: Thread) {
    if (EngineSettings.settings.memoryAndCPU.useSharedMemory) return;
    if (!this.sector) return;
    for (const simSector of this.neighbors) {
      thread.runTask(WorldDataSyncIds.CheckOutSector, [
        this.dimension.id,
        ...simSector.position,
      ]);
    }
    thread.runTask(WorldDataSyncIds.CheckOutSector, [
      this.dimension.id,
      ...this.position,
    ]);
  }

  tickUpdate() {
    if (!this.fullNeighbors) return false;
    if (this.sector?.isCheckedOut()) {
      return false;
    }
    if ((!this.renderering && !this.ticking) || !this.sector) return false;
    if (!this._genAllDone) return false;

    let renderedSection = false;
    const sector = this.sector;
    if (this.renderering) {
      for (const section of sector.sections) {
        if (
          !this._rendered ||
          this._displayTicks[section.index] !==
            section.getTick(section._Ticks.displayDirty)
        ) {
          this._displayTicks[section.index] = section.getTick(
            section._Ticks.displayDirty
          );
          WorldSimulationTasks.buildTasks.add(
            this.dimension.id,
            ...section.position
          );
          renderedSection = true;
        }
      }
      this._rendered = true;
    }

    /*   if (this.ticking) {
      this.dimension.simulation.setOrigin(...this.position);
      this.dimension.simulation.bounds.start();
      this.tickQueue.run();

      const [min, max] = sector.getMinMax();
      if (min == Math.abs(Infinity) || max == Math.abs(Infinity)) return true;

      const height = max - min + 1;
      let attempts = 100;
      let ticks = 20;
      while (attempts) {
        const randomX =
          Math.floor(WorldSpaces.section.bounds.x * Math.random()) +
          this.sector.position[0];
        const randomY =
          Math.floor(height * Math.random()) + min + this.sector.position[1];
        const randomZ =
          Math.floor(WorldSpaces.section.bounds.z * Math.random()) +
          this.sector.position[2];
        const voxel = this.dimension.simulation.nDataCursor.getVoxel(
          randomX,
          randomY,
          randomZ
        );
        if (!voxel || voxel.isAir()) {
          attempts--;
          continue;
        }

        const behavior = VoxelBehaviorsRegister.get(
          voxel.tags["dve_simulation_behavior"]
        );
        behavior.onTick(this.dimension.simulation, randomX, randomY, randomZ);

        ticks--;

        if (!ticks) break;
      }

      this.dimension.simulation.bounds.markDisplayDirty();
    } */

    return true;
  }

  generateUpdate() {
    if (!this.fullNeighbors) return false;
    if (this.sector?.isCheckedOut()) return;
    if (this._genAllDone) return true;
    if (!this.generating) return false;

    if (!this.sector) {
      const sector = WorldRegister.sectors.get(
        this.dimension.id,
        ...this.position
      );

      if (!sector) {
        WorldSimulationTasks.worldLoadTasks.add(
          this.dimension.id,
          ...this.position
        );
        return;
      }
      this.sector = sector;
    }

    const sector = this.sector;
    const state = this.state.update();

    /*     if (sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
      console.log(
        "world gen set true",
        state.nWorldGenAllDone,
        state.allLoaded
      );
    } */

    if (state.allLoaded && !sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
      // console.log("add to world gen", ...this.position);
      WorldSimulationTasks.worldGenTasks.add(
        this.dimension.id,
        ...this.position
      );
      return true;
    }

    if (
      state.nWorldGenAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)
    ) {
      //  console.log("add to world decor");
      WorldSimulationTasks.worldDecorateTasks.add(
        this.dimension.id,
        ...this.position
      );
      return true;
    }

    if (
      state.nDecorAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)
    ) {
      WorldSimulationTasks.worldPropagationTasks.add(
        this.dimension.id,
        ...this.position
      );
      return true;
    }

    if (
      state.nPropagtionAllDone &&
      !sector.getBitFlag(Sector.FlagIds.isWorldSunDone)
    ) {
      WorldSimulationTasks.worldSunTasks.add(
        this.dimension.id,
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
