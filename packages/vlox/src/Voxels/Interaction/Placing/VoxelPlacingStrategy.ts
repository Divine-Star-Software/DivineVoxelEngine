import { Vec3Array } from "@amodx/math";
import { VoxelFaceNameArray, VoxelFaceNames, VoxelFaces } from "../../../Math";
import { VoxelPlacingStrategyData } from "./VoxelPlacingStrategy.types";
import { VoxelPickResult } from "../VoxelPickResult";

export class VoxelModelPlacingStrategy {
  _faceMap = new Map<VoxelFaceNames, VoxelPlacingStrategyData[]>();
  _defaultState: string;
  constructor(data: VoxelPlacingStrategyData[] | string) {
    if (typeof data == "string") {
      this._defaultState = data;
    } else {
      for (const stragety of data) {
        let faceArray = this._faceMap.get(stragety.face);
        if (!faceArray) {
          faceArray = [];
          this._faceMap.set(stragety.face, faceArray);
        }
        faceArray.push(stragety);
      }
    }
  }

  getState(picked: VoxelPickResult, alt: number | null = null): string | null {
    if (this._defaultState) return this._defaultState;
    const face = picked.unitNormalFace;
    const delta = picked.delta;
    const direction = picked.unitRayDirection;
    const stragetegies = this._faceMap.get(
      typeof face == "number" ? VoxelFaceNameArray[face] : face
    );
    if (!stragetegies) return null;
    let match = true;
    for (const strat of stragetegies) {
      if (alt !== null) {
        if (strat.alt == undefined) {
          match = false;
        }
        if (strat.alt !== alt) {
          match = false;
        }
      }
      if (strat.delta) {
        if (!delta) {
          match = false;
        } else if (!(delta >= strat.delta[0] && delta <= strat.delta[1])) {
          match = false;
        }
      }
      if (strat.direction[0] !== direction.x) match = false;
      if (strat.direction[1] !== direction.y) match = false;
      if (strat.direction[2] !== direction.z) match = false;
      if (match) return strat.state;
    }

    return null;
  }
}
