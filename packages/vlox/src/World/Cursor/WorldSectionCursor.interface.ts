import { Vector3Like } from "@amodx/math";
import type { Section } from "../Section/index";

export interface WorldSectionCursorInterface {
  _section: Section | null;
  _voxelIndex: number;
  _voxelPosition: Vector3Like;
}
