import { Vector3Like } from "@amodx/math";
import type { Chunk } from "../Chunk/index";

export interface WorldSectionCursorInterface {
  _chunk: Chunk | null;
  _voxelIndex: number;
  _voxelPosition: Vector3Like;
}
