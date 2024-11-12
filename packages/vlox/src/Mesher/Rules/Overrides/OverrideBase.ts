import { FaceDataOverride } from "../../Types";
type Run = (data: FaceDataOverride) => boolean;
export class OverrideBase {
  voxels: Run[][] = [];

  register(voxel: number, override: number, run: Run) {
    let voxelRules = this.voxels[voxel];
    if (!voxelRules) {
      voxelRules = [];
      this.voxels[voxel] = voxelRules;
    }
    voxelRules[override] = run;
  }

  run(voxel: number, override: number, data: FaceDataOverride) {
    const voxelRules = this.voxels[voxel];
    if (!voxelRules) return data.default;
    const secondRule = voxelRules[override];
    if (!secondRule) return data.default;
    return secondRule(data);
  }
}
