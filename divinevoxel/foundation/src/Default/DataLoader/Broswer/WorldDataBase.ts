import type { DataBase, ObjectStore } from "@divinestar/indexdb/";
import type { DVEDDataTypes } from "../Types/DVED.types";
import { WorldDataTool } from "./WorldDataTool";

export class WorldDataBase {
  dimension = "";
  typeStores: Record<DVEDDataTypes, ObjectStore<any>>;

  worldDataTool: WorldDataTool;
  constructor(public database: DataBase) {
    this.worldDataTool = new WorldDataTool(this);
  }

  async setDimension(dimensionId: string) {
    if (this.dimension != dimensionId) {
      const worldDataId = `${dimensionId}-world-data`;
      const richDataId = `${dimensionId}-rich-data`;
      const entitiesId = `${dimensionId}-entities`;
      const dboId = `${dimensionId}-dbo`;
      this.database.close();
      await this.database.addObjectStore(
        {
          name: worldDataId,
          schema: [],
        },
        {
          name: richDataId,
          schema: [],
        },
        {
          name: entitiesId,
          schema: [],
        },
        {
          name: dboId,
          schema: [],
        }
      );
      this.typeStores = {} as any;
      this.typeStores["world-data"] = await this.database.getObjectStore(
        worldDataId
      );
      this.typeStores["rich-data"] = await this.database.getObjectStore(
        richDataId
      );
      this.typeStores["entities"] = await this.database.getObjectStore(
        entitiesId
      );
      this.typeStores["dbo"] = await this.database.getObjectStore(dboId);
    }
    this.dimension = dimensionId;
  }

  regionHeader = {
    set: async (key: string, type: DVEDDataTypes, data: ArrayBuffer) => {
      await this.typeStores[type].set(
        this.regionHeader.getKey(key, type),
        data
      );
    },
    get: async (
      key: string,
      type: DVEDDataTypes
    ): Promise<ArrayBuffer | false> => {
      const buffer = <ArrayBuffer>(
        await this.typeStores[type].get(this.regionHeader.getKey(key, type))
      );

      if (!buffer) return false;
      return buffer;
    },
    getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_region_header`;
    },
  };
  column = {
    set: async (key: string, type: DVEDDataTypes, data: ArrayBuffer) => {
      await this.typeStores[type].set(this.column.getKey(key, type), data);
    },
    get: async (key: string, type: DVEDDataTypes) => {
      const buffer = <ArrayBuffer>(
        await this.typeStores[type].get(this.column.getKey(key, type))
      );

      if (!buffer) return false;
      return await buffer;
    },
    getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_column`;
    },
  };
  columnTimestamp = {
    set: async (key: string, type: DVEDDataTypes, timeStamp: number) => {
      await this.typeStores[type].set(
        this.columnTimestamp.getKey(key, type),
        timeStamp
      );
    },
    get: async (key: string, type: DVEDDataTypes) => {
      const timeStamp = <number>(
        await this.typeStores[type].get(this.columnTimestamp.getKey(key, type))
      );

      if (!timeStamp) return false;
      return Number(timeStamp);
    },
    getKey: (key: string, type: DVEDDataTypes) => {
      return `${key}_${type}_column_timestamp`;
    },
  };
}
