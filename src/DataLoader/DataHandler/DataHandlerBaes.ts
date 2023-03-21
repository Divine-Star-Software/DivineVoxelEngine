import { LocationData } from "voxelspaces";
import { DataHanlderWrapper } from "./DataHandlerWrapper.js";
export type DataLoaderModes =  "server" | "indexdb" | "both" ;
export type DataLoaderSegments = "world-data" | "rich-data" | "dbo" | "entities";
export abstract class DataHandler {
 mode: "server" | "indexdb" | "both" = "indexdb";
 constructor() {
  this.mode = DataHanlderWrapper.mode
 }
 setMode(mode: "server" | "indexdb" | "both") {
  this.mode = mode;
 }
 dataType: DataLoaderSegments = "world-data";
 setDataType(type: DataLoaderSegments) {
  this.dataType = type;
 }

 abstract getRegionHeader(location: LocationData): Promise<ArrayBuffer>;
 abstract setPath(id: string): Promise<boolean>;
 abstract getColumn(
  location: LocationData
 ): Promise<ArrayBuffer | SharedArrayBuffer>;
 abstract saveColumn(
  location: LocationData,
  columnBuffer: ArrayBuffer | SharedArrayBuffer
 ): Promise<boolean>;
 abstract columnExists(location: LocationData): Promise<boolean>;
 abstract columnTimestamp(location: LocationData): Promise<number>;
}
