import { LocationData } from "Math";

export abstract class DVEBuilder {
  abstract init(): void;
  abstract buildChunk(location: LocationData, LOD: number): void;
}
