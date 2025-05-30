import { PaintVoxelData, RawVoxelData } from "../../Voxels";
import { IVoxelShapeTemplateData } from "./VoxelShapeTemplate.types";
import { BasicVoxelShapeTemplate } from "./BasicVoxelShapeTemplate";

export interface BoxVoxelTemplateData
  extends IVoxelShapeTemplateData<"box-shape"> {
  width: number;
  height: number;
  depth: number;
}

export class BoxVoxelTemplate extends BasicVoxelShapeTemplate<
  "box-shape",
  BoxVoxelTemplateData
> {
  static CreateNew(data: Partial<BoxVoxelTemplateData>): BoxVoxelTemplateData {
    return {
      ...BasicVoxelShapeTemplate.CreateBaseData("box-shape", {
        bounds: { x: data.width || 1, y: data.height || 1, z: data.depth || 1 },
        fillVoxel: data.fillVoxel || PaintVoxelData.Create(),
        pointVoxel: data.pointVoxel || PaintVoxelData.Create(),
        faceVoxel: data.faceVoxel || PaintVoxelData.Create(),
        edgeVoxel: data.edgeVoxel || PaintVoxelData.Create(),
        fillMode: data.fillMode || "full",
      }),
      width: data.width || 1,
      height: data.height || 1,
      depth: data.depth || 1,
    };
  }

  private _width = 0;
  get width() {
    return this._width;
  }
  set width(width: number) {
    const oldWidth = this._width;

    this._width = width;
    if (oldWidth != width) {
      this.bounds.size.x = width;
      this._updateBounds();
      this.dispatch("updated", null);
    }
  }

  private _height = 0;
  get height() {
    return this._height;
  }
  set height(height: number) {
    const oldWidth = this._height;

    this._height = height;
    if (oldWidth != height) {
      this.bounds.size.y = height;
      this._updateBounds();
      this.dispatch("updated", null);
    }
  }

  private _depth = 0;
  get depth() {
    return this._depth;
  }
  set depth(depth: number) {
    const oldWidth = this._depth;

    this._depth = depth;
    if (oldWidth != depth) {
      this.bounds.size.z = depth;
      this._updateBounds();
      this.dispatch("updated", null);
    }
  }

  constructor(data: BoxVoxelTemplateData) {
    super(data);
    this._width = data.width;
    this._height = data.height;
    this._depth = data.depth;
  }

  isIncluded(index: number) {
    return true;
  }

  toJSON(): BoxVoxelTemplateData {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth,
      ...this.getBaseJSON(),
    };
  }
}
