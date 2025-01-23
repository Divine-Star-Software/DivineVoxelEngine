import { Vector3Like } from "@amodx/math";
import { Chunk } from "../../World/Classes";

export interface WorldSectionCursorInterface {
  _chunk: Chunk | null;
  _voxelIndex: number;
  _voxelPosition: Vector3Like;
}
