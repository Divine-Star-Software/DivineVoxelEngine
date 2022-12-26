import { LocationData } from "Meta/Data/CommonTypes";

interface AnyData {
 [key: string]: any;
}
export interface DataHandler extends AnyData {
 getRegion(location: LocationData): Promise<ArrayBuffer | SharedArrayBuffer>;
 saveRegion(
  location: LocationData,
  regionBuffer: ArrayBuffer | SharedArrayBuffer
 ): Promise<void>;
}
