import { WorldDataBase } from "./WorldDataBase";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces";
import { LocationData } from "@divinevoxel/core/Math";
import { DataLoaderSegments } from "Interfaces/DataLoader/DVEDataHandler";
import { Compressor } from "@divinestar/utils/Compression/Compression";
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

    console.log("LOADING COLUMN EXISTS BATCH")
    await this.worldDataBase.setDimension(locations[0][0]);

    console.log("1")
    const existsRecord: Record<string, boolean> = {};

    const transication = await this.worldDataBase.database.getTransaction(
      "readonly",
      this.worldDataBase.typeStores["world-data"].id
    );
    console.log("2")
    const proms: Promise<number>[] = [];
    const keys: string[] = [];
    for (const location of locations) {
      const key = location.toString();
      keys.push(key);
      proms.push(
        transication.get(
          this.worldDataBase.columnTimestamp.getKey(
            WorldSpaces.column.getKeyLocation(location),
            this.dataType
          )
        )
      );
    }
    console.log("3")
    const resolved = await Promise.all(proms);

    for (let i = 0; i < keys.length; i++) {

      existsRecord[keys[i]] = resolved[i] !== undefined
    }
    console.log("4")
    return existsRecord;
  }

  async columnTimestamp(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const stamp = await this.worldDataBase.columnTimestamp.get(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType
    );

    if (!stamp) return 0;
    return stamp;
  }

  async loadRegionHeader(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const buffer = await this.worldDataBase.regionHeader.get(
      WorldSpaces.region.getKeyLocation(location),
      this.dataType
    );
    if (!buffer) return new ArrayBuffer(0);
    return buffer;
  }

  async loadColumn(location: LocationData) {
    await this.worldDataBase.setDimension(location[0]);
    const buffer = await this.worldDataBase.column.get(
      WorldSpaces.column.getKeyLocation(location),
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
      WorldSpaces.column.getKeyLocation(location),
      this.dataType,
      compressed.buffer
    );
    await this.worldDataBase.columnTimestamp.set(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType,
      Date.now()
    );
    return true;
  }
}
