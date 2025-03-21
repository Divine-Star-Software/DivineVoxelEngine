import { Vec3Array } from "@amodx/math";
import { VoxelFaceNames } from "../../../Math";

/** Defines the state the model should be placed in given the parameters. */
export interface VoxelPlacingStrategyData {
  /** The closest voxel face of the intersected voxel model. */
  face: VoxelFaceNames;
  /** The direction of the ray that intersected the voxel that is being placed upon.  */
  direction: Vec3Array;
  /** The delta of the virtual voxel cube face intersected. If it was intersected halfway, it would be 0.5. */
  delta?: [min: number, max: number];
  /** Defines an alternative ID to override the same parameters. */
  alt?: number;
  /** The resulting state string of the model. */
  state: string;
}