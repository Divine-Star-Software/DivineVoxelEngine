import type { DataHandler } from "../../../out/Meta/Data/DataHandler.type";

import { DataServer } from "./DataServer.js";

export const DataHanlder: DataHandler = {
 async getRegion(x, y, z) {
  const region = await DataServer.awaitRegionLoad(x,y,z);
  return region;
 },
 async saveRegion(x, y, z, dataString) {
  const dataSend = {
   action: "save-region",
   name: `region-${x}-${y}-${z}.dved`,
   region: dataString,
  };
  DataServer.sendMessage(JSON.stringify(dataSend));
 },
};
