import { DimensionSyncData } from "../Types/WorldData.types";
import { Sector } from "../Sector";

export interface DimensionData {
  id: string;
  index: number;
  sectors: Map<string, Sector>;
}
export interface Dimension extends DimensionData {}

export class Dimension {
  static CreateNew(index: number, id = "") {
    return new Dimension({
      id,
      index,
      sectors: new Map<string, Sector>(),
    });
  }
  constructor(data: DimensionData) {
    return Object.assign(this, data);
  }

  set(sectorId: string, region: Sector) {
    this.sectors.set(sectorId, region);
  }
  delete(sectorId: string) {
    this.sectors.delete(sectorId);
  }
  get(sectorId: string) {
    return this.sectors.get(sectorId);
  }

  getData(): DimensionSyncData {
    return {
      id: this.id,
      index: this.index,
    };
  }
}
