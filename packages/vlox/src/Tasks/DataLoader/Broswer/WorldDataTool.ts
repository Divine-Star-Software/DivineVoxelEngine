import { WorldDataBase } from "./WorldDataBase";
import { WorldSpaces } from "../../../Data/World/WorldSpaces";
import { LocationData } from "../../../Math";
import { DataLoaderSegments } from "Tasks/DataLoader/Types/DVEDataHandler";
import { Compressor } from "@amodx/core/Compression/Compression";
export class WorldDataTool {
  async setPath(id: string) {
    return true;
  }

  constructor(public worldDataBase: WorldDataBase) {}

  dataType: DataLoaderSegments = "world-data";

  setType(data: DataLoaderSegments) {
    this.dataType = data;
  }
  async columnExists(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    return (await this.columnTimestamp(location)) > 0;
  }

  async columnExistsBatch(locations: LocationData[]) {


    await this.worldDataBase.setDimension(locations[0][0]);

  
    const existsRecord: Record<string, boolean> = {};

    const transication = await this.worldDataBase.database.getTransaction(
      "readonly",
      this.worldDataBase.typeStores["world-data"].id
    );
   
    const proms: Promise<number>[] = [];
    const keys: string[] = [];
    for (const location of locations) {
      const key = location.toString();
      keys.push(key);
      proms.push(
        transication.get(
          this.worldDataBase.columnTimestamp.getKey(
            WorldSpaces.column.getKeyXYZ(location[1],location[2],location[3]),
            this.dataType
          )
        )
      );
    }

    const resolved = await Promise.all(proms);

    for (let i = 0; i < keys.length; i++) {

      existsRecord[keys[i]] = resolved[i] !== undefined
    }

    return existsRecord;
  }

  async columnTimestamp(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const stamp = await this.worldDataBase.columnTimestamp.get(
      WorldSpaces.column.getKeyXYZ(location[1],location[2],location[3]),
      this.dataType
    );

    if (!stamp) return 0;
    return stamp;
  }

  async loadRegionHeader(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const buffer = await this.worldDataBase.regionHeader.get(
      WorldSpaces.region.getKeyXYZ(location[1],location[2],location[3]),
      this.dataType
    );
    if (!buffer) return new ArrayBuffer(0);
    return buffer;
  }

  async loadColumn(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const buffer = await this.worldDataBase.column.get(
      WorldSpaces.column.getKeyXYZ(location[1],location[2],location[3]),
      this.dataType
    );
    if (!buffer) return new ArrayBuffer(0);
    return await (
      await Compressor.decompressArray(buffer, "Uint8")
    ).buffer;
  }

  async saveColumn(location: LocationData, buffer: ArrayBuffer) {
    const compressed = await Compressor.compressArray(new Uint8Array(buffer));
    await this.worldDataBase.setDimension(location[0]);
    await this.worldDataBase.column.set(
      WorldSpaces.column.getKeyXYZ(location[1],location[2],location[3]),
      this.dataType,
      compressed.buffer
    );
    await this.worldDataBase.columnTimestamp.set(
      WorldSpaces.column.getKeyXYZ(location[1],location[2],location[3]),
      this.dataType,
      Date.now()
    );
    return true;
  }
}
