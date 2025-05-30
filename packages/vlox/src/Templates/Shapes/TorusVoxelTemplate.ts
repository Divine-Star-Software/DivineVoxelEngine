import { IVoxelShapeTemplateData } from "./VoxelShapeTemplate.types";
import { BasicVoxelShapeTemplate } from "./BasicVoxelShapeTemplate";

export interface TorusVoxelTemplateData
  extends IVoxelShapeTemplateData<"torus-shape"> {
  width: number;
  height: number;
  depth: number;
}

export class TorusVoxelTemplate extends BasicVoxelShapeTemplate<
  "torus-shape",
  TorusVoxelTemplateData
> {
  static CreateNew(
    data: Partial<TorusVoxelTemplateData>
  ): TorusVoxelTemplateData {
    return {
      ...BasicVoxelShapeTemplate.CreateBaseData("torus-shape", {
        bounds: { x: data.width || 1, y: data.height || 1, z: data.depth || 1 },
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

  constructor(data: TorusVoxelTemplateData) {
    super(data);
    this._width = data.width;
    this._height = data.height;
    this._depth = data.depth;
  }

  isIncluded(index: number) {
    return true;
  }

  toJSON(): TorusVoxelTemplateData {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth,
      ...this.getBaseJSON(),
    };
  }
}
