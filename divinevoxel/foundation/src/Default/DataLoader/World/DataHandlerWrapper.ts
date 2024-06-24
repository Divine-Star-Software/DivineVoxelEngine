import type { LocationData } from "@divinevoxel/core/Math";;
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import {
  DVEDataHandler,
  DataLoaderModes,
} from "../../../Interfaces/DataLoader/DVEDataHandler.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
import { ColumnDataTool } from "../../Tools/Data/WorldData/ColumnDataTool.js";
import { arrayBufferToSharedArrayBuffer } from "@amodx/core/Buffers/arrayBufferToSharedArrayBuffer.js";
import { DataSerializerTool } from "./Tools/DataSerializerTool.js";
import { DVEFWorldCore } from "../../../Contexts/World/DVEFWorldCore.js";

export class DataHanlderWrapper {
  static instance: DataHanlderWrapper;
  columnDatatool = new ColumnDataTool();
  static mode: DataLoaderModes = "indexdb";
  handler: DVEDataHandler;
  richData: RichDataTool;
  seralizer = new DataSerializerTool();

  constructor() {
    if (DataHanlderWrapper.instance) return DataHanlderWrapper.instance;
    DataHanlderWrapper.instance = this;
  }

  init(handler: DVEDataHandler) {
    this.handler = handler;
    this.richData = new RichDataTool();
  }

  async loadRegionHeader(location: LocationData) {
    this.handler.setDataType("world-data");
    try {
      const headerBuffer = await this.handler.getRegionHeader(location);
      if (!headerBuffer) return false;
      const sab = arrayBufferToSharedArrayBuffer(headerBuffer);
      DVEFWorldCore.instance.tasks.loadRegionHeader(location, sab);
      this.handler.setDataType("world-data");
      return true;
    } catch (error: any) {
      console.error(`Problem getting region header at ${location.toString()}`);
      console.error(error);
      return false;
    }
  }
  async saveColumn(location: LocationData) {
    this.handler.setDataType("world-data");
    if (this.columnDatatool.setLocation(location).loadIn()) {
      try {
        if (this.columnDatatool.isStored()) return true;
        this.columnDatatool.markAsStored();
        const column = await this.seralizer.serializeColumnAsync(location);
        if (!column) return false;
        this.handler.setDataType("world-data");
        const success = await this.handler.saveColumn(location, column);
        if (!success) {
          this.columnDatatool.markAsNotStored();
          throw new Error(`Could not store column at ${location.toString()}`);
        }

        if (this.richData._enabled) {
          const column = await this.richData
            .setLocation(location)
            .getColumnAsync();

          if (column) {
            this.handler.setDataType("rich-data");
            const success = await this.handler.saveColumn(location, column);
            if (!success) {
              this.columnDatatool.markAsNotStored();
              throw new Error(
                `Rich data could not store column at ${location.toString()}`
              );
            }
          }
        }

        this.handler.setDataType("world-data");
      } catch (error: any) {
        console.error(`Problem storing column at ${location.toString()}`);
        console.error(error);
      }
    }
  }

  async loadColumn(location: LocationData) {
    this.handler.setDataType("world-data");
    try {
      if (WorldRegister.instance.column.get(location)) return true;
      this.handler.setDataType("world-data");
      const column = await this.handler.getColumn(location);
      const data = await this.seralizer.deSerializeColumnAsync(column);

      DVEFWorldCore.instance.tasks.loadColumn(location, data);

      if (this.richData._enabled && this.columnDatatool.hasRichData()) {
        this.handler.setDataType("rich-data");
        const richColumn = await this.handler.getColumn(location);
        if (!richColumn) return false;
        await this.richData.setLocation(location).setColumnAsync(richColumn);
      }

      this.handler.setDataType("world-data");
      return true;
    } catch (error: any) {
      console.error(`Problem loading column at ${location.toString()}`);
      console.error(error);
      return false;
    }
  }

  async unLoadColumn(location: LocationData) {
    this.handler.setDataType("world-data");
    if (this.columnDatatool.setLocation(location).loadIn()) {
      try {
        if (!this.columnDatatool.isStored()) {
          await this.saveColumn(location);
        }

        if (
          this.richData._enabled &&
          (await this.richData.setLocation(location).columnHasDataAsync())
        ) {
          await this.richData.removeColumnAsync();
        }

        this.handler.setDataType("world-data");

        DVEFWorldCore.instance.tasks.unLoadColumn(location);
      } catch (error: any) {
        console.error(`Problem storing column at ${location.toString()}`);
        console.error(error);
      }
    } else {
      return true;
    }
  }

  async setPath(id: string) {
    this.handler.setDataType("world-data");
    try {
      await this.handler.setPath(id);
      return true;
    } catch (error: any) {
      console.error(`Problem setting path to ${id}`);
      console.error(error);
      return false;
    }
  }

  async columnExists(location: LocationData) {
    this.handler.setDataType("world-data");
    try {
      if (WorldRegister.instance.column.get(location)) return true;
      return await this.handler.columnExists(location);
    } catch (error: any) {
      console.error(
        `Problem checking if column exists at ${location.toString()}`
      );
      console.error(error);
      return false;
    }
  }

  async columnExistsBatch(location: LocationData[]) {
    this.handler.setDataType("world-data");
    try {
      return await this.handler.columnExistsBatch(location);
    } catch (error: any) {
      console.error(
        `Problem checking if column batch exists at ${location.toString()}`
      );
      console.error(error);
      return false;
    }
  }

  async columnTimestamp(location: LocationData) {
    this.handler.setDataType("world-data");
    try {
      return await this.handler.columnTimestamp(location);
    } catch (error: any) {
      console.error(
        `Problem getting column timestamp at ${location.toString()}`
      );
      console.error(error);
      return 0;
    }
  }
}

DataHooks.settingsSynced.subscribe("data-handler-wrapper", (data) => {
  DataHanlderWrapper.mode = data.data.mode as any;
});
