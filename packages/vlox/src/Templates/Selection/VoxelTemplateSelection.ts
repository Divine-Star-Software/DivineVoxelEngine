import { Vector3Like } from "@amodx/math";

import { IVoxelSelection } from "./VoxelSelecton";
import { IVoxelTemplate } from "../VoxelTemplates.types";

export class VoxelTemplateSelection implements IVoxelSelection {
  origin = Vector3Like.Create();
  size = Vector3Like.Create();

  template: IVoxelTemplate;

  isSelected(x: number, y: number, z: number): boolean {
    if (x < this.origin.x || x >= this.origin.x + this.size.x) return false;
    if (y < this.origin.y || y >= this.origin.y + this.size.y) return false;
    if (z < this.origin.z || z >= this.origin.z + this.size.z) return false;
    const rx = x - this.origin.x;
    const ry = y - this.origin.y;
    const rz = z - this.origin.z;
    if (!this.template.isIncluded(this.template.getIndex(rx, ry, rz)))
      return false;
    return true;
  }

  setTemplate(template: IVoxelTemplate) {
    this.template = template;
    this.size.x = template.bounds.size.x;
    this.size.y = template.bounds.size.y;
    this.size.z = template.bounds.size.z;
  }
}
