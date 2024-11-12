import { WorldDataTool } from "./WorldDataTool";
import { LocationData } from "../../Math";
import { DVEDataHandler } from "../../Interfaces/DataLoader/DVEDataHandler";
import { WorldDataBaseManager } from "./WorldDataBaseManager";
import { WorldDataBase } from "./WorldDataBase";

export class DefaultDataHandler extends DVEDataHandler {
  static instance: DefaultDataHandler;
  worldDataTool: WorldDataTool;
  worldData: WorldDataBase;

  constructor() {
    super();
    if (DefaultDataHandler.instance) return DefaultDataHandler.instance;
    DefaultDataHandler.instance = this;
  }

  async init() {
    await WorldDataBaseManager.init();
  }

  async openWorldDataBae(id: string, dimension = "main") {
    const worldDataBase = await WorldDataBaseManager.getWorldDataBase(id);
    await worldDataBase.setDimension(dimension);
    this.worldData = worldDataBase;
    this.worldDataTool = worldDataBase.worldDataTool;
  }

  

  async getRegionHeader(location: LocationData) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.loadRegionHeader(location);
  }

  async getColumn(location: LocationData) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.loadColumn(location);
  }

  async saveColumn(location: LocationData, buffer: ArrayBuffer) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.saveColumn(location, buffer);
  }

  async setPath(id: string) {
    this.worldDataTool.setType(this.dataType);
    return this.worldDataTool.setPath(id);
  }

  async columnExists(location: LocationData) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.columnExists(location);
  }


  async columnExistsBatch(location: LocationData[]) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.columnExistsBatch(location);
  }

  async columnTimestamp(location: LocationData) {
    this.worldDataTool.setType(this.dataType);
    return await this.worldDataTool.columnTimestamp(location);
  }

  async columnHasSegment(
    location: LocationData,
    segment: "rich-data" | "dbo" | "entities"
  ): Promise<boolean> {
    this.worldDataTool.setType(segment);
    return await this.worldDataTool.columnExists(location);
  }
}
