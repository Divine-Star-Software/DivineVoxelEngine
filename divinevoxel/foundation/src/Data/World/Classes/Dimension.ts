import { Region } from "./Region";

export interface DimensionData {
  id: string;
  regions: Map<string, Region>;
}
export interface Dimension extends DimensionData {}

export class Dimension {
  static CreateNew(id: string) {
    return new Dimension({
      id,
      regions: new Map<string, Region>(),
    });
  }
  constructor(data: DimensionData) {
    return Object.assign(this, data);
  }

  set(regionId: string, region: Region) {
    this.regions.set(regionId, region);
  }
  delete(regionId: string) {
    this.regions.delete(regionId);
  }
  get(regionId: string) {
    return this.regions.get(regionId);
  }
}
