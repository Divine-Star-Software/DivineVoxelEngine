import { LocationData } from "../../../out/Meta/Data/CommonTypes.js";
import { DataHandler } from "../../../out/Meta/Interfaces/DataLoader/DataHandler.type.js";
import { DataFileServer } from "./DataFileServer.js";

export const DataHanlder: DataHandler = {
 async getRegion(location) {
  return await DataFileServer.loadRegion(location);
 },
 async saveRegion(location, buffer) {
  await DataFileServer.saveRegion(location, buffer);
 },
};
