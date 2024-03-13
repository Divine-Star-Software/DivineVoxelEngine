import type { Vec3Array } from "../Math";
import { DataMatrix } from "./DataMatrix.js";
import { Flat3DIndex } from "../Math/Flat3DIndex";
import { DataTool } from "../Tools/Data/DataTool";

export class VoxelIDMatrix extends DataMatrix<string | number> {
  static dataTool = new DataTool();
  index = Flat3DIndex.GetXYZOrder();

  constructor(public size: Vec3Array) {
    super(size, 0);
    this.setBounds(size);
  }

  setBounds(size: Vec3Array) {
    this.index.setBounds(size[0], size[1], size[2]);
  }

  toFlatArray() {
    const voxels: number[] = [];
    for (const [location, vox] of this.getAll()) {
      const i = this.index.getIndex(location);
      if (typeof vox !== "string") {
        voxels[i] = 0;
        continue;
      }
      voxels[i] = VoxelIDMatrix.dataTool.setStringId(vox).getId();
    }
    return voxels;
  }
  toTypedArray() {
    const length = this.sizeX * this.sizeY * this.sizeZ;
    const voxels = new Uint16Array(length);
    for (const [location, vox] of this.getAll()) {
      const i = this.index.getIndex(location);
      if (typeof vox !== "string") {
        voxels[i] = 0;
        continue;
      }
      voxels[i] = VoxelIDMatrix.dataTool.setStringId(vox).getId();
    }
    return voxels;
  }
  fromFlatArray(voxels: ArrayLike<number>) {
    for (const [location, nodeId] of this.getAll()) {
      const rawValue = voxels[this.index.getIndex(location)];
      if (!rawValue) {
        this.setVec3(location, 0);
        continue;
      }
      this.setVec3(
        location,
        VoxelIDMatrix.dataTool.setId(rawValue).getStringId()
      );
    }
  }

  copy(matrix: VoxelIDMatrix) {
    this.setBounds(matrix.size);
    this.setMatrix(matrix.cloneMatrix());
  }
}
