import { TemplateVoxelCursor } from "./TemplateVoxelCursor";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import { TemplateProxy } from "./TemplateProxy";

export class TemplateCursor implements DataCursorInterface {
  _voxelIndex = 0;
  _proxy: TemplateProxy | null = null;
  private voxel = new TemplateVoxelCursor(this);

  inBounds(x: number, y: number, z: number): boolean {
    return true;
  }
  setTemplate(template: IVoxelTemplate) {
    this._proxy = new TemplateProxy(template);
  }

  getVoxel(x: number, y: number, z: number) {
    if (!this._proxy) return null;
    this._voxelIndex = this._proxy.template.index.getIndexXYZ(x, y, z);
    this.voxel.loadIn();
    return this.voxel;
  }

  clone(): DataCursorInterface {
    return new TemplateCursor();
  }
}
