import { WorldRegister } from "../../World/WorldRegister";
import { Sector } from "../../World/index";
import { WorldSimulationTools } from "./WorldSimulationTools";
import { TaskRegister } from "../Tasks/TaskRegister";
import { Threads } from "@amodx/threads";
import { setLocationData } from "../../Util/LocationData";
import { EngineSettings } from "../../Settings/EngineSettings";
import { SnapShots } from "../../World/SnapShot/SnapShots";
import LockSectors from "../../World/Lock/Function/LockSectors";
import UnLockSectors from "../../World/Lock/Function/UnLockSectors";

export class WorldSimulationTasks {
  /**# Load Sectors
   * ---
   */
  static readonly worldLoadTasks = TaskRegister.addTasks({
    id: "load",
    generationTask: true,
    checkInRequired: false,
    async run(dimesnion, location, taskId, task) {
      const [dimension, x, y, z] = location;
      const sector = WorldRegister.sectors.get(location[0], x, y, z);
      if (sector) return task.completeTask(taskId);
      if (!WorldSimulationTools.worldStorage) {
        WorldRegister.sectors.new(location[0], x, y, z);
        return task.completeTask(taskId);
      }
      const loaded = await WorldSimulationTools.worldStorage.loadSector([
        dimension,
        x,
        y,
        z,
      ]);
      if (!loaded) {
        WorldRegister.sectors.new(location[0], x, y, z);
      }
      task.completeTask(taskId);
    },
  });
  /**# Generate Sectors
   * ---
   */
  static readonly worldGenTasks = TaskRegister.addTasks({
    id: "generate",
    generationTask: true,
    checkInRequired: true,
    log: true,
    checkDone(location) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector || sector.isCheckedOut()) return false;

      const worldGenDone = sector.getBitFlag(Sector.FlagIds.isWorldGenDone);
      return worldGenDone;
    },
    run(dimension, location, taskId, task, simSector) {
      if (simSector.sector!.getBitFlag(Sector.FlagIds.isWorldGenDone))
        return task.completeTask(taskId);
      const generator = WorldSimulationTools.taskTool.getGenerator();
      simSector.checkOut(generator);
      WorldSimulationTools.taskTool.generation.generate.run(
        location,
        null,
        () => {
          simSector.checkIn(generator);
        },
        generator
      );
    },
  });
  /**# Decorate Sectors
   * ---
   */
  static readonly worldDecorateTasks = TaskRegister.addTasks({
    id: "decorate",
    generationTask: true,
    checkInRequired: true,
    checkDone(location) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector || sector.isCheckedOut()) return false;
      return sector.getBitFlag(Sector.FlagIds.isWorldDecorDone);
    },
    run(dimension, location, taskId, task, simSector) {
      if (simSector.sector!.getBitFlag(Sector.FlagIds.isWorldDecorDone))
        return task.completeTask(taskId);
      const generator = WorldSimulationTools.taskTool.getGenerator();
      simSector.checkOut(generator);
      WorldSimulationTools.taskTool.generation.decorate.run(
        location,
        null,
        () => {
          simSector.checkIn(generator);
        },
        generator
      );
    },
  });

  /**# World Propagation
   * ---
   */
  static readonly worldPropagationTasks = TaskRegister.addTasks({
    id: "world_propagation",
    generationTask: true,
    checkInRequired: true,
    checkDone(location) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector || sector.isCheckedOut()) return false;
      return sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone);
    },
    run(dimension, location, taskId, task, simSector) {
      if (simSector.sector!.getBitFlag(Sector.FlagIds.isWorldPropagationDone))
        return task.completeTask(taskId);
      const generator = WorldSimulationTools.taskTool.getGenerator();
      simSector.checkOut(generator);
      WorldSimulationTools.taskTool.generation.propagation.run(
        location,
        null,
        () => {
          simSector.checkIn(generator);
        },
        generator
      );
    },
  });
  /**# World Sun
   * ---
   */
  static readonly worldSunTasks = TaskRegister.addTasks({
    id: "wolrd_sun",
    generationTask: true,
    checkInRequired: true,
    checkDone(location) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector || sector.isCheckedOut()) return false;
      return sector.getBitFlag(Sector.FlagIds.isWorldSunDone);
    },
    run(dimension, location, taskId, task, simSector) {
      if (simSector.sector!.getBitFlag(Sector.FlagIds.isWorldSunDone))
        return task.completeTask(taskId);
      const generator = WorldSimulationTools.taskTool.getGenerator();
      simSector.checkOut(generator);
      WorldSimulationTools.taskTool.generation.worldSun.run(
        location,
        null,
        () => {
          simSector.checkIn(generator);
        },
        generator
      );
    },
  });
  /**# Save Sector
   * ---
   */
  static readonly saveTasks = TaskRegister.addTasks({
    id: "save",
    checkInRequired: false,
    async run(dimension, location, taskId, task) {
      if (!WorldSimulationTools.worldStorage) return task.completeTask(taskId);
      await WorldSimulationTools.worldStorage.saveSector(location);
      task.completeTask(taskId);
    },
  });
  /**# Save & Unload Sector
   * ---
   */
  static readonly unloadTasks = TaskRegister.addTasks({
    id: "unload",
    checkInRequired: false,
    async run(dimension, location, taskId, task) {
      if (!WorldSimulationTools.worldStorage) {
        WorldRegister.sectors.removeAt(location);
        return task.completeTask(taskId);
      }
      await WorldSimulationTools.worldStorage.unloadSector(location);
      task.completeTask(taskId);
    },
  });
  /**# Build Task
   * ---
   */
  static readonly buildTasks = TaskRegister.addTasks({
    id: "build_tasks",
    sort: true,
    checkInRequired: false,
    run(dimension, location, taskId, task, simSector) {
      simSector
        .sector!?.getSection(location[1], location[2], location[3])
        ?.setInProgress(true);
      if (EngineSettings.settings.memoryAndCPU.useSharedMemory) {
        task.completeTask(taskId);
        WorldSimulationTools.taskTool.build.section.run(location);
        return;
      }
      const [dim, x, y, z] = location;

      LockSectors(dim, SnapShots.getSnapShotBounds(x, y, z)).then(() => {
        task.completeTask(taskId);
        const snapShot = SnapShots.createSnapShot(location);
        WorldSimulationTools.taskTool.build.sectionSnapShot.run(
          ...snapShot.transfer()
        );
        SnapShots.transferSnapShot(snapShot);
        UnLockSectors(dim, SnapShots.getSnapShotBounds(x, y, z));
      });
    },
  });
  static readonly unbuildTasks = TaskRegister.addTasks({
    id: "unbuild_tasks",
    sort: true,
    checkInRequired: false,
    run(dimension, location, taskId, task) {
      const view = Threads.createBinaryTask(16);
      setLocationData(view, location);
      WorldSimulationTools.parent.runBinaryTask("remove-sector", view);
      dimension.activeSectors.get(
        location[1],
        location[2],
        location[3]
      )!._rendered = false;
      task.completeTask(taskId);
    },
  });
}
