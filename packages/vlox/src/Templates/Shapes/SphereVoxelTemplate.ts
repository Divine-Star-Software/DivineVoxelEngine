import { Distance3D } from "@amodx/math";
import { RawVoxelData } from "../../Voxels";
import { IVoxelShapeTemplateData } from "./VoxelShapeTemplate.types";
import { BasicVoxelShapeTemplate } from "./BasicVoxelShapeTemplate";

export interface SphereVoxelTemplateData
  extends IVoxelShapeTemplateData<"sphere-shape"> {
  radiusX: number;
  radiusY: number;
  radiusZ: number;
}

export class SphereVoxelTemplate extends BasicVoxelShapeTemplate<
  "sphere-shape",
  SphereVoxelTemplateData
> {
  static CreateNew(
    data: Partial<SphereVoxelTemplateData>
  ): SphereVoxelTemplateData {
    return {
      ...BasicVoxelShapeTemplate.CreateBaseData("sphere-shape", {
        bounds: [
          (data.radiusX || 1) * 2 + 1,
          (data.radiusY || 1) * 2 + 1,
          (data.radiusZ || 1) * 2 + 1,
        ],
      }),
      radiusX: data.radiusX || 1,
      radiusY: data.radiusY || 1,
      radiusZ: data.radiusZ || 1,
    };
  }

  get radius() {
    return this._radiusX;
  }
  set radius(radius: number) {
    const oldRadius = this._radiusX;
    this._radiusX = radius;
    this._radiusY = radius;
    this._radiusY = radius;
    this.bounds[0] = radius * 2 + 1;
    this.bounds[1] = radius * 2 + 1;
    this.bounds[2] = radius * 2 + 1;
    if (oldRadius != radius) {
      this.index.setBounds(...this.bounds);
      this.dispatch("updated", null);
    }
  }
  private _radiusX = 0;
  get radiusX() {
    return this._radiusX;
  }
  set radiusX(radius: number) {
    const oldRadius = this._radiusX;

    this._radiusX = radius;
    if (oldRadius != radius) {
      this.bounds[0] = radius * 2 + 1;
      this.index.setBounds(...this.bounds);
      this.dispatch("updated", null);
    }
  }
  private _radiusY = 0;
  get radiusY() {
    return this._radiusY;
  }
  set radiusY(radius: number) {
    const oldRadius = this._radiusY;
    this._radiusY = radius;
    if (oldRadius != radius) {
      this.bounds[1] = radius * 2 + 1;
      this.index.setBounds(...this.bounds);
      this.dispatch("updated", null);
    }
  }

  private _radiusZ = 0;
  get radiusZ() {
    return this._radiusZ;
  }
  set radiusZ(radius: number) {
    const oldRadius = this._radiusZ;
    this._radiusZ = radius;
    if (oldRadius != radius) {
      this.bounds[2] = radius * 2 + 1;
      this.index.setBounds(...this.bounds);
      this.dispatch("updated", null);
    }
  }

  constructor(data: SphereVoxelTemplateData) {
    super(data);
    this._radiusX = data.radiusX;
    this._radiusY = data.radiusY;
    this._radiusZ = data.radiusZ;
  }

  isIncluded(index: number) {
    const [x, y, z] = this.index.getXYZ(index);
    const cx = Math.floor(this.bounds[0] / 2);
    const cy = Math.floor(this.bounds[1] / 2);
    const cz = Math.floor(this.bounds[2] / 2);

    const normX = (x - cx) / this.radiusX;
    const normY = (y - cy) / this.radiusY;
    const normZ = (z - cz) / this.radiusZ;
    const distance = Math.sqrt(normX * normX + normY * normY + normZ * normZ);

    return distance <= 1;
  }

  toJSON(): SphereVoxelTemplateData {
    return {
      ...this.getBaseJSON(),
      radiusX: this.radiusX,
      radiusY: this.radiusY,
      radiusZ: this.radiusZ,
    };
  }
}
