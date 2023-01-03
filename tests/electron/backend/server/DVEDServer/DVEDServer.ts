import { DVEDMessages } from "server/Types/DVEDServer.types";
import * as fs from "fs";

import { DVED } from "../libs/dved/Node/DivineVoxelEngineData.js";
import { DVEDSystem } from "../libs/dved/Node/DVEDSystem.js";

DVED.$INIT({
 fs: fs,
 sectorSize: 4096,
 spaceBounds: {
  regions: { x: 9, y: 8, z: 9 },
  columns: { x: 4, y: 8, z: 4 },
  chunks: { x: 4, y: 4, z: 4 },
 },
});

const regionTool = DVED.getRegionTool();
const dataPath = "D:/DSSoftware/APPS/divinevoxelengine/tests/electron/data";
const setPath = (id: string) => {
 const path = `${dataPath}/${id}`;
 DVEDSystem.mkdirs([path]);
 regionTool.setPath(path);
};

export const DVEDServer = {
 parseDVEDMessasge(message: string) {
  let jsonString = "";
  let pipeCount = 0;
  let finalCount = 0;
  for (let i = 0; i < message.length; i++) {
   let char = message[i];
   finalCount++;
   if (char == "|") {
    pipeCount++;
    if (pipeCount == 2) break;
    continue;
   }
   jsonString += char;
  }
  return {
   message: <DVEDMessages>JSON.parse(jsonString),
   data: message.substring(finalCount),
  };
 },

 hanldeMessage(body: string) {
  const { message, data } = this.parseDVEDMessasge(body);
  console.log(message);
  if (message.type == "set-path") {
   setPath(message.id);
  }

  if (message.type == "save-column") {
   regionTool.setLocation(message.location).saveColumn(data);
   console.log("saving column at ", message.location, "size: ", data.length);
   return new Uint8Array([1]);
  }
  if (message.type == "load-region-header") {
   const exists = regionTool.setLocation(message.location).regionExists();
   if (!exists) {
    regionTool.createRegion();
   }
   const header = regionTool.getHeader();
   if (!header) return new Uint8Array([0]);
   return new Uint8Array(header);
  }
  if (message.type == "load-column") {
   const column = regionTool.setLocation(message.location).loadColumn();
   console.log(column);
   console.log(
    "loading column at ",
    message.location,
    "size: ",
    column ? column.byteLength : 0
   );
   return column ? new Uint8Array(column) : new Uint8Array([0]);
  }
  if (message.type == "column-exists") {
   const exists = regionTool.setLocation(message.location).regionHasColumn();
   return new Uint8Array([Number(exists ? 1 : 0)]);
  }
  if (message.type == "column-timestamp") {
   const timeStamp = regionTool
    .setLocation(message.location)
    .getColumnTimestamp();
   console.log("Get timestamp");
   console.log(timeStamp);
   return new Uint8Array(new Uint32Array([timeStamp ? timeStamp : 0]).buffer);
  }
  return new Uint8Array([1]);
 },
};
