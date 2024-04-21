import { WorldDataBase } from "./DataBase/WorldDataBase";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces";
import { LocationData } from "@divinevoxel/core/Math";
import { DataLoaderSegments } from "Contexts/DataLoader/DataHandler/DataHandlerBase";
import { Compressor } from "@divinestar/utils/Compression/Compression";
export const WorldData = {
  async setPath(id: string) {
    return true;
  },

  dataType: <DataLoaderSegments>"world-data",

  setType(data: DataLoaderSegments) {
    this.dataType = data;
  },
  async columnExists(location: LocationData) {
    await WorldDataBase.setDimension(location[0]);
    return (await this.columnTimestamp(location)) > 0;
  },

  async columnTimestamp(location: LocationData) {
    await WorldDataBase.setDimension(location[0]);
    const stamp = await WorldDataBase.columnTimestamp.get(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType
    );

    if (!stamp) return 0;
    return stamp;
  },

  async loadRegionHeader(location: LocationData) {
    await WorldDataBase.setDimension(location[0]);
    const buffer = await WorldDataBase.regionHeader.get(
      WorldSpaces.region.getKeyLocation(location),
      this.dataType
    );
    if (!buffer) return new ArrayBuffer(0);
    return buffer;
  },

  async loadColumn(location: LocationData) {
    await WorldDataBase.setDimension(location[0]);
    const buffer = await WorldDataBase.column.get(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType
    );
    if (!buffer) return new ArrayBuffer(0);
    return await (
      await Compressor.decompressArray(buffer, "Uint8")
    ).buffer;
  },

  async saveColumn(location: LocationData, buffer: ArrayBuffer) {
    const compressed = await Compressor.compressArray(new Uint8Array(buffer));
    await WorldDataBase.setDimension(location[0]);
    await WorldDataBase.column.set(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType,
      compressed.buffer
    );
    await WorldDataBase.columnTimestamp.set(
      WorldSpaces.column.getKeyLocation(location),
      this.dataType,
      Date.now()
    );
    return true;
  },
};
