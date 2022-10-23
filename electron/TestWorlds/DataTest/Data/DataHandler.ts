import type { DataHandler } from "../../../out/Meta/DataLoader/DataHandler.type";

import { DataServer } from "./DataServer.js";

export const DataHanlder: DataHandler = {
 async getRegion(x, y, z) {
  const region = await DataServer.awaitRegionLoad(x, y, z);
  DataServer.flush();
  return region;
 },
 async saveRegion(x, y, z, regionArray) {

  DataServer.sendMessage(regionArray);
 },
 async getChunk(x, y, z) {

  return new Uint32Array();
 },
 async saveChunk(x, y, z, chunkArray) {
  DataServer.sendMessage(chunkArray);
 },
};
