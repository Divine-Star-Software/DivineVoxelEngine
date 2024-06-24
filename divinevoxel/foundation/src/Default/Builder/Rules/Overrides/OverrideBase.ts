import { FaceDataOverride } from "Default/Builder/Types";
type Run = (data: FaceDataOverride) => boolean;
export class OverrideBase {
  voxels = new Map<number, Map<number, Run>>();

  register(voxel: number, override: number, run: Run) {
    let voxelRules = this.voxels.get(voxel);
    if (!voxelRules) {
      voxelRules = new Map();
      this.voxels.set(voxel,voxelRules)
    }
    voxelRules.set(override, run);
  }

  run(voxel: number, override: number, data: FaceDataOverride) {
    const voxelRules = this.voxels.get(voxel);
    if (!voxelRules) return data.default;
    const secondRule = voxelRules.get(override);
    if (!secondRule) return data.default;
    return secondRule(data);
  }
}
