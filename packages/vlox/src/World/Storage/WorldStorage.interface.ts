import { LocationData } from "Math";

export interface WorldStorageInterface {
  saveSector(location: LocationData): Promise<void>;
  loadSector(location: LocationData): Promise<boolean>;
  unloadSector(location: LocationData): Promise<void>;
}
