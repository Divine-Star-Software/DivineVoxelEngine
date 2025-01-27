import { LocationData } from "Math";

export interface WorldStorageInterface {
  saveColumn(location: LocationData): Promise<void>;
  loadColumn(location: LocationData): Promise<boolean>;
  unloadColumn(location: LocationData): Promise<void>;
}
