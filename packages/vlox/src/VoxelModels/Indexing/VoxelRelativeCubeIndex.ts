import { Flat3DIndex, Vec3Array } from "@amodx/math";

export class VoxelRelativeCubeIndex {
  static flatIndex = Flat3DIndex.GetXYZOrder();
  static getIndex(x: number, y: number, z: number) {
    return this.flatIndex.getIndexXYZ(x + 1, y + 1, z + 1);
  }
}
VoxelRelativeCubeIndex.flatIndex.setBounds(3, 3, 3);

export const VoxelRelativeCubeIndexPositionMap: Record<number, Vec3Array> =
  [] as any;

for (let i = 0; i < VoxelRelativeCubeIndex.flatIndex.size; i++) {
  VoxelRelativeCubeIndexPositionMap[i] = VoxelRelativeCubeIndex.flatIndex
    .getXYZ(i)
    .map((_) => _ - 1) as Vec3Array;
}
