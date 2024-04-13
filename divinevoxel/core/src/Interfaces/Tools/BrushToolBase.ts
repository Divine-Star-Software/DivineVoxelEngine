import { LocationBoundToolBase } from "../Data/LocationBoundToolBase";

export abstract class BrushToolBase extends LocationBoundToolBase {
  abstract setId(...args: any): void;
  abstract paint(): void;
  abstract erase(): void;
}
