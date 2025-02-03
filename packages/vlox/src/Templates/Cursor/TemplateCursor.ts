import { TemplateVoxelCursor } from "./TemplateVoxelCursor";
import { DataCursorInterface } from "../../Tools/DataCursor.interface";
import { FullVoxelTemplate } from "Templates/FullVoxelTemplate";

export class TemplateCursor extends DataCursorInterface {
  _voxelIndex = 0;
  _template: FullVoxelTemplate | null = null;
  private voxel = new TemplateVoxelCursor(this);

  inBounds(x: number, y: number, z: number): boolean {
      return true;
  }
  setTemplate(template: FullVoxelTemplate) {
    this._template = template;
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._template) return null;
    this._voxelIndex = this._template.index.getIndexXYZ(x, y, z);
    this.voxel.loadIn();
    return this.voxel;
  }
}
