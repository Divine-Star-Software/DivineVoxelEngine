import { WorldRegister } from "../../../World/WorldRegister";
import { Sector } from "../../../World/index";
import { IWGTools } from "./IWGTools";
import { TaskRegister } from "./TaskRegister";

export class IWGTasks {
  /**# Load Sectors
   * ---
   */
  static readonly worldLoadTasks = TaskRegister.addTasks({
    id: "load",
    propagationBlocking: true,
    async run(location, onDone) {
      const [dimension, x, y, z] = location;
      const sector = WorldRegister.sectors.get(location[0], x, y, z);
      if (sector) return onDone();
      if (!IWGTools.worldStorage) {
        WorldRegister.sectors.new(location[0], x, y, z);
        return onDone();
      }
      const loaded = await IWGTools.worldStorage.loadSector([
        dimension,
        x,
        y,
        z,
      ]);
      if (!loaded) {
        WorldRegister.sectors.new(location[0], x, y, z);
      }
      onDone();
    },
  });
  /**# Generate Sectors
   * ---
   */
  static readonly worldGenTasks = TaskRegister.addTasks({
    id: "generate",
    propagationBlocking: true,
    async run(location, onDone) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting generation.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) return onDone();
      IWGTools.taskTool.generate.run([location, []], null, () => {
        sector.setBitFlag(Sector.FlagIds.isWorldGenDone, true);
        onDone();
      });
    },
  });
  /**# Decorate Sectors
   * ---
   */
  static readonly worldDecorateTasks = TaskRegister.addTasks({
    id: "decorate",
    propagationBlocking: true,
    async run(location, onDone) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting decoration.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)) return onDone();
      IWGTools.taskTool.decorate.run([location, []], null, () => {
        sector.setBitFlag(Sector.FlagIds.isWorldDecorDone, true);
        onDone();
      });
    },
  });
  /**# World Sun
   * ---
   */
  static readonly worldSunTasks = TaskRegister.addTasks({
    id: "wolrd_sun",
    propagationBlocking: true,
    async run(location, onDone) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting world sun.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldSunDone)) return onDone();
      IWGTools.taskTool.worldSun.run(location, null, () => {
        sector.setBitFlag(Sector.FlagIds.isWorldSunDone, true);
        onDone();
      });
    },
  });
  /**# World Propagation
   * ---
   */
  static readonly worldPropagationTasks = TaskRegister.addTasks({
    id: "propagation",
    propagationBlocking: true,
    async run(location, onDone) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting propagation.`
        );

      if (sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone))
        return onDone();
      IWGTools.taskTool.propagation.run(location, null, () => {
        sector.setBitFlag(Sector.FlagIds.isWorldPropagationDone, true);
        onDone();
      });
    },
  });
  /**# Save Sector
   * ---
   */
  static readonly saveTasks = TaskRegister.addTasks({
    id: "save",
    async run(location, onDone) {
      if (!IWGTools.worldStorage) return onDone();
      await IWGTools.worldStorage.saveSector(location);
      onDone();
    },
  });
  /**# Save & Unload Sector
   * ---
   */
  static readonly saveAndUnloadTasks = TaskRegister.addTasks({
    id: "save_and_unload",
    async run(location, onDone) {
      if (!IWGTools.worldStorage) return onDone();
      await IWGTools.worldStorage.unloadSector(location);
      onDone();
    },
  });
  /**# Build Task
   * ---
   */
/*   static readonly buildTasks = TaskRegister.addTasks({
    id: "build_tasks",
    async run(location, onDone, dimenion) {
      const sector = WorldRegister.sectors.get(...location);
      if (!sector)
        throw new Error(
          `Sector at ${location.toString()} does not exist when attempting building.`
        );
      let rendered = true;
      if (!dimenion.rendered.has(location[1], location[2], location[3])) {
        rendered = false;
        dimenion.rendered.add(location[1], location[2], location[3]);
      }

      for (const section of sector.getRenerableSections()) {
        if (section.isInProgress() || (!section.isDirty() && !rendered)) continue;
        section.setInProgress(true);
        IWGTools.parent.runTask("add-to-build-queue", [
          location[0],
          ...section.getPosition(),
        ]);
      }

      onDone();
      //  IWGTools.taskTool.build.sector.run(location, null, onDone);
    },
  }); */
}
