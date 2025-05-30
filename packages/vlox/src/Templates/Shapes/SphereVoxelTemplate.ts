import { BoundingBox } from "@amodx/math/Geomtry/Bounds/BoundingBox";
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
        bounds: {
          x: (data.radiusX || 1) * 2 + 1,
          y: (data.radiusY || 1) * 2 + 1,
          z: (data.radiusZ || 1) * 2 + 1,
        },
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
    this.bounds.size.x = radius * 2 + 1;
    this.bounds.size.y = radius * 2 + 1;
    this.bounds.size.z = radius * 2 + 1;

    if (oldRadius != radius) {
      this._updateBounds();
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
      this.bounds.size.x = radius * 2 + 1;
      this._updateBounds();
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
      this.bounds.size.y = radius * 2 + 1;
      this._updateBounds();
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
      this.bounds.size.z = radius * 2 + 1;
      this._updateBounds();
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
    const cx = Math.floor(this.bounds.size.x / 2);
    const cy = Math.floor(this.bounds.size.y / 2);
    const cz = Math.floor(this.bounds.size.z / 2);

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
