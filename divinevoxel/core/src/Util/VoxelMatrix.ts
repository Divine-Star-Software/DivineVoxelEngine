import type { Vec3Array } from "../Math";
import { DataMatrix } from "./DataMatrix.js";
import { Flat3DIndex } from "../Math/Flat3DIndex";
import { DataTool } from "../Tools/Data/DataTool";

export class VoxelMatrix extends DataMatrix<string | number> {
  static dataTool = new DataTool();
  index =  Flat3DIndex.GetXYZOrder();
  
  constructor(public size: Vec3Array) {
    super(size, 0);
    this.index.setBounds(size[0], size[1], size[2]);
  }

  toFlatArray() {
    const voxels: number[] = [];
    for (const [location, vox] of this.getAll()) {
      if (typeof vox !== "string") {
        voxels[this.index.getIndex(location)] = 0;
        continue;
      }
      voxels[this.index.getIndex(location)] = VoxelMatrix.dataTool
        .setStringId(vox)
        .getId();
    }

    return voxels;
  }
  toTypedArray() {
    const length = this.sizeX * this.sizeY * this.sizeZ;
    const voxels = new Uint16Array(length);
    for (const [location, vox] of this.getAll()) {
      if (typeof vox !== "string") {
        voxels[this.index.getIndex(location)] = 0;
        continue;
      }
      voxels[this.index.getIndex(location)] = VoxelMatrix.dataTool
        .setStringId(vox)
        .getId();
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
        VoxelMatrix.dataTool.setId(rawValue).getStringId()
      );
    }
  }

  copy(matrix: VoxelMatrix) {
    this._matrix = structuredClone(matrix._matrix);
  }
}
