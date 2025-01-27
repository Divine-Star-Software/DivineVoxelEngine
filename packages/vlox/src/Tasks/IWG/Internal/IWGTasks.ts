import { WorldRegister } from "../../../World/WorldRegister";
import { Column } from "../../../World/index";
import { ColumnStructIds } from "../../../World/Column/ColumnStructIds";
import { IWGTools } from "./IWGTools";
import { TaskRegister } from "./TaskRegister";

export class IWGTasks {
  /**# Load Columns
   * ---
   */
  static readonly worldLoadTasks = TaskRegister.addTasks({
    id: "load",
    propagationBlocking: true,
    async run(location, onDone) {
      const [dimension, x, y, z] = location;
      WorldRegister.setDimension(location[0]);
      const column = WorldRegister.column.get(x, y, z);
      if (column) return onDone();
      if (!IWGTools.worldStorage) {
        WorldRegister.column.fill(x, y, z);
        return onDone();
      }
      const loaded = await IWGTools.worldStorage.loadColumn([
        dimension,
        x,
        y,
        z,
      ]);
      if (!loaded) {
        WorldRegister.setDimension(location[0]);
        WorldRegister.column.fill(x, y, z);
      }
      onDone();
    },
  });
  /**# Generate Columns
   * ---
   */
  static readonly worldGenTasks = TaskRegister.addTasks({
    id: "generate",
    propagationBlocking: true,
    async run(location, onDone) {
      WorldRegister.setDimension(location[0]);
      const column = WorldRegister.column.get(
        location[1],
        location[2],
        location[3]
      );
      if (!column)
        throw new Error(
          `Column at ${location.toString()} does not exist when attempting generation.`
        );

      Column.StateStruct.setBuffer(column.stateBuffer);
      if (Column.StateStruct.getProperty(ColumnStructIds.isWorldGenDone))
        return onDone();

      IWGTools.taskTool.generate.run([location, []], null, () => {
        Column.StateStruct.setBuffer(column.stateBuffer);
        Column.StateStruct.setProperty(ColumnStructIds.isWorldGenDone, 1);
        onDone();
      });
    },
  });
  /**# Decorate Columns
   * ---
   */
  static readonly worldDecorateTasks = TaskRegister.addTasks({
    id: "decorate",
    propagationBlocking: true,
    async run(location, onDone) {
      WorldRegister.setDimension(location[0]);
      const column = WorldRegister.column.get(
        location[1],
        location[2],
        location[3]
      );
      if (!column)
        throw new Error(
          `Column at ${location.toString()} does not exist when attempting decoration.`
        );

      Column.StateStruct.setBuffer(column.stateBuffer);
      if (Column.StateStruct.getProperty(ColumnStructIds.isWorldDecorDone))
        return onDone();

      IWGTools.taskTool.decorate.run([location, []], null, () => {
        Column.StateStruct.setBuffer(column.stateBuffer);
        Column.StateStruct.setProperty(ColumnStructIds.isWorldDecorDone, 1);
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
      WorldRegister.setDimension(location[0]);
      const column = WorldRegister.column.get(
        location[1],
        location[2],
        location[3]
      );
      if (!column)
        throw new Error(
          `Column at ${location.toString()} does not exist when attempting world sun.`
        );

      Column.StateStruct.setBuffer(column.stateBuffer);
      if (Column.StateStruct.getProperty(ColumnStructIds.isWorldSunDone))
        return onDone();

      IWGTools.taskTool.worldSun.run(location, null, () => {
        Column.StateStruct.setBuffer(column.stateBuffer);
        Column.StateStruct.setProperty(ColumnStructIds.isWorldSunDone, 1);
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
      WorldRegister.setDimension(location[0]);
      const column = WorldRegister.column.get(
        location[1],
        location[2],
        location[3]
      );
      if (!column)
        throw new Error(
          `Column at ${location.toString()} does not exist when attempting propagation.`
        );

      Column.StateStruct.setBuffer(column.stateBuffer);
      if (
        Column.StateStruct.getProperty(ColumnStructIds.isWorldPropagationDone)
      )
        return onDone();

      IWGTools.taskTool.propagation.run(location, null, () => {
        Column.StateStruct.setBuffer(column.stateBuffer);
        Column.StateStruct.setProperty(
          ColumnStructIds.isWorldPropagationDone,
          1
        );
        onDone();
      });
    },
  });
  /**# Save Column
   * ---
   */
  static readonly saveTasks = TaskRegister.addTasks({
    id: "save",
    async run(location, onDone) {
      if (!IWGTools.worldStorage) return onDone();
      await IWGTools.worldStorage.saveColumn(location);
      onDone();
    },
  });
  /**# Save & Unload Column
   * ---
   */
  static readonly saveAndUnloadTasks = TaskRegister.addTasks({
    id: "save_and_unload",
    async run(location, onDone) {
      if (!IWGTools.worldStorage) return onDone();
      await IWGTools.worldStorage.unloadColumn(location);
      onDone();
    },
  });
  /**# Build Task
   * ---
   */
  static readonly buildTasks = TaskRegister.addTasks({
    id: "build_tasks",
    async run(location, onDone, dimenion) {
      dimenion.rendered.add(location[1], location[2], location[3]);
      IWGTools.taskTool.build.column.run(location, null, onDone);
    },
  });
}
