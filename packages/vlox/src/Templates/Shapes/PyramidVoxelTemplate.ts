import { RawVoxelData } from "../../Voxels";
import {
  IVoxelShapeTemplateData,
  VoxelShapeTemplateShapeDirections,
} from "./VoxelShapeTemplate.types";
import { BasicVoxelShapeTemplate } from "./BasicVoxelShapeTemplate";

export interface PyramidVoxelTemplateData
  extends IVoxelShapeTemplateData<"pyramid-shape"> {
  width: number;
  height: number;
  depth: number;
  direction: VoxelShapeTemplateShapeDirections;
  fallOff: number;
}

export class PyramidVoxelTemplate extends BasicVoxelShapeTemplate<
  "pyramid-shape",
  PyramidVoxelTemplateData
> {
  static CreateNew(
    data: Partial<PyramidVoxelTemplateData>
  ): PyramidVoxelTemplateData {
    return {
      ...BasicVoxelShapeTemplate.CreateBaseData("pyramid-shape", {
        bounds: { x: data.width || 1, y: data.height || 1, z: data.depth || 1 },
      }),
      width: data.width || 12,
      height: data.height || 12,
      depth: data.depth || 12,
      direction: data.direction || "+y",
      fallOff: data.fallOff || 1,
    };
  }
  private _fallOff = 0;
  get fallOff() {
    return this._fallOff;
  }
  set fallOff(fallOFf: number) {
    const oldDirection = this._fallOff;
    this._fallOff = fallOFf;
    if (oldDirection != fallOFf) {
      this.dispatch("updated", null);
    }
  }
  private _direction: VoxelShapeTemplateShapeDirections = "+y";
  get direction() {
    return this._direction;
  }
  set direction(direction: VoxelShapeTemplateShapeDirections) {
    const oldDirection = this._direction;
    this._direction = direction;
    if (oldDirection != direction) {
      this.dispatch("updated", null);
    }
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

  constructor(data: PyramidVoxelTemplateData) {
    super(data);
    this._fallOff = data.fallOff;
    this._direction = data.direction;
    this._width = data.width;
    this._height = data.height;
    this._depth = data.depth;
  }

  isIncluded(index: number): boolean {
    const [x, y, z] = this.index.getXYZ(index);
    switch (this.direction) {
      case "+y": // Pyramid pointing up
        {
          const normalizedFallOff = y * this.fallOff;
          const minX = normalizedFallOff;
          const minZ = normalizedFallOff;
          const maxX = this.width - normalizedFallOff;
          const maxZ = this.depth - normalizedFallOff;
          if (x >= minX && z >= minZ && x < maxX && z < maxZ) return true;
          return false;
        }
        break;

      case "-y": {
        // Pyramid pointing down
        const normalizedFallOff = (this.height - 1 - y) * this.fallOff;
        const minX = normalizedFallOff;
        const minZ = normalizedFallOff;
        const maxX = this.width - normalizedFallOff;
        const maxZ = this.depth - normalizedFallOff;
        if (x >= minX && z >= minZ && x < maxX && z < maxZ) return true;
        return false;
      }

      case "+x": {
        // Pyramid pointing right
        return true;
      }

      case "-x": {
        // Pyramid pointing left
        return true;
      }

      case "+z": {
        // Pyramid pointing forward
        return true;
      }

      case "-z": {
        // Pyramid pointing backward
        return true;
      }

      default:
        return false;
    }
  }

  toJSON(): PyramidVoxelTemplateData {
    return {
      width: this.width,
      height: this.height,
      depth: this.depth,
      direction: this.direction,
      fallOff: this.fallOff,
      ...this.getBaseJSON(),
    };
  }
}
