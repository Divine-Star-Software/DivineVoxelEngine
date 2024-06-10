import { LocationData } from "../../Math";
import { LocationBoundToolBase } from "../Data/LocationBoundToolBase";

export abstract class DataToolBase extends LocationBoundToolBase {
  abstract loadIn(): boolean;
  abstract loadInAt(location: LocationData): boolean;
  abstract clear(): void;
  abstract commit(...args: any): void;
}
