import type { LocationData } from "@divinevoxel/core/Math";

import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { Distance3D } from "@divinevoxel/core/Math/Functions/Distance3d.js";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
import { DataHooks } from "../../../../Data/DataHooks.js";
import { WorldLock } from "../../../../Contexts/World/Lock/WorldLock.js";
import { DataHanlderWrapper } from "../DataHandlerWrapper.js";

export class DataLoaderTool {
  static columnDataTool = new ColumnDataTool();

  dimension = "main";

  mode: "indexdb" | "server" | "both" = "server";
  _enabled = true;

  constructor() {
    this.mode = EngineSettings.settings.data.mode as any;

    DataHooks.settingsSynced.subscribe("data-loader", (data) => {
      this.mode = data.data.mode as any;
    });
  }

  setDimension(dimension: string) {
    this.dimension = dimension;
  }
  isEnabled() {
    return this._enabled;
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
    if (
      WorldLock.isLocked(location) ||
      !WorldRegister.instance.column.get(location)
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
    this.allColumns((column) => {
      const location = column.getLocationData();
      const distnace = Distance3D(location[1], 0, location[3], sx, 0, sz);
      if (distnace > radius) {
        if (!run(column)) return;
        proms.push(this.unLoadColumn([...column.getLocationData()]));
      }
    });
    await Promise.all(proms);
  }

  async unLoadAllColumns(onDone?: Function) {
    const proms: Promise<any>[] = [];
    this.allColumns((column) => {
      proms.push(this.unLoadColumn([...column.getLocationData()]));
    });
    await Promise.all(proms);
  }

  allColumns(run: (column: ColumnDataTool) => void) {
    const dim = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dim) return;
    for (const [key, region] of dim.regions) {
      for (const column of region.getColumns()) {
        DataLoaderTool.columnDataTool.setColumn(column);
        run(DataLoaderTool.columnDataTool);
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
    this.allColumns((column) => {
      if (!column.isStored()) {
        run(...column.getLocationData());
      }
    });
  }
}
