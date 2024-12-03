import type { LocationData } from "../../../Math";

import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { Distance3D } from "@amodx/math/Vectors/Functions/Distance3d";
import { EngineSettings } from "../../../Data/Settings/EngineSettings.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { WorldLock } from "../../../Contexts/World/Lock/WorldLock.js";
import { DataHanlderWrapper } from "../DataHandlerWrapper.js";

export class DataLoaderTool {
  static columnDataTool = new ColumnDataTool();

  dimension = "main";

  mode: "indexdb" | "server" | "both" = "server";
  _enabled = typeof DataHanlderWrapper.instance !== "undefined";

  constructor() {
    this.mode = EngineSettings.settings.dataLoader.mode as any;

    DataHooks.settingsSynced.subscribe("data-loader", (data) => {
      this.mode = data.dataLoader.mode as any;
    });
  }

  setDimension(dimension: string) {
    this.dimension = dimension;
  }
  isEnabled() {
    return !(typeof DataHanlderWrapper.instance?.columnExists === "undefined");
  }

  async saveColumnIfNotStored(location: LocationData) {
    if (!DataLoaderTool.columnDataTool.setLocation(location).loadIn())
      return false;
    if (DataLoaderTool.columnDataTool.isStored()) return false;
    await this.saveColumn(location);
    return true;
  }

  async loadIfExists(location: LocationData) {
    const exists = await this.columnExists(location);
    if (exists) {
      await this.loadColumn(location);
    }
    return false;
  }

  async saveColumn(location: LocationData) {
    await DataHanlderWrapper.instance.saveColumn(location);
  }

  async loadColumn(location: LocationData) {
    await DataHanlderWrapper.instance.loadColumn(location);
  }

  async unLoadColumn(location: LocationData) {
    WorldRegister.instance.setDimension(location[0]);

    if (
      WorldLock.isLocked(location) ||
      !WorldRegister.instance.column.get(location[1],location[2],location[3])
    )
      return false;
    await DataHanlderWrapper.instance.unLoadColumn(location);
  }

  async columnExists(location: LocationData) {
    return await DataHanlderWrapper.instance.columnExists(location);
  }

  async columnExistsBatch(location: LocationData[]) {
    return await DataHanlderWrapper.instance.columnExistsBatch(location);
  }

  async columnTimestamp(location: LocationData) {
    return await DataHanlderWrapper.instance.columnTimestamp(location);
  }

  async unLoadAllOutsideRadius(
    [, sx, , sz]: LocationData,
    radius: number,
    run: (column: ColumnDataTool) => boolean = (columntool) => true
  ) {
    const proms: Promise<any>[] = [];
    this.allColumns((column, location) => {
      const distnace = Distance3D(location[1], 0, location[3], sx, 0, sz);
      if (distnace > radius) {
        if (!run(column)) return;
        proms.push(this.unLoadColumn(location));
      }
    });
    await Promise.all(proms);
  }

  async unLoadAllColumns(onDone?: Function) {
    const proms: Promise<any>[] = [];
    this.allColumns((column, location) => {
      proms.push(this.unLoadColumn(location));
    });
    await Promise.all(proms);
  }

  allColumns(run: (column: ColumnDataTool, location: LocationData) => void) {
    const dim = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dim) return;
    for (const [key, region] of dim.regions) {
      for (const [index, column] of region.columns) {
        DataLoaderTool.columnDataTool.setColumn(column);
        run(DataLoaderTool.columnDataTool, [
          this.dimension,
          ...region.getColumnPosition(index)
        ]);
      }
    }
  }
  async allColumnsAsync(run: (column: ColumnDataTool) => Promise<void>) {
    const dim = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dim) return;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        DataLoaderTool.columnDataTool.setColumn(column);
        await run(DataLoaderTool.columnDataTool);
      }
    }
  }

  getAllUnStoredColumns(
    run: (dimension: string, x: number, y: number, z: number) => void
  ) {
    this.allColumns((column,location) => {
      if (!column.isStored()) {
        run(...location);
      }
    });
  }
}
