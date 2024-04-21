import { WorldData } from "./WorldData";



import { LocationData } from "@divinevoxel/core/Math";
import { DataHandler } from "../../../Contexts/DataLoader/DataHandler/DataHandlerBase";

export class DefaultDataHandler extends DataHandler {
  async getRegionHeader(location: LocationData) {
    WorldData.setType(this.dataType);

    return await WorldData.loadRegionHeader(location);
  }
  async getColumn(location: LocationData) {
    WorldData.setType(this.dataType);

    return await WorldData.loadColumn(location);
  }
  async saveColumn(location: LocationData, buffer: ArrayBuffer) {
    WorldData.setType(this.dataType);

    return await WorldData.saveColumn(location, buffer);
  }
  async setPath(id: string) {
    WorldData.setType(this.dataType);

    return WorldData.setPath(id);
  }

  async columnExists(location: LocationData) {
    WorldData.setType(this.dataType);


    return await WorldData.columnExists(location);
  }

  async columnTimestamp(location: LocationData) {
    WorldData.setType(this.dataType);

    return await WorldData.columnTimestamp(location);
  }
  async columnHasSegment(location : LocationData,segment: "rich-data" | "dbo" | "entities"): Promise<boolean> {

    WorldData.setType(segment);
    return await WorldData.columnExists(location);
  }
}
