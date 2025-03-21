import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { TemplateCursor } from "./TemplateCursor";
import { TemplateProxy } from "./TemplateProxy";

export class TemplateVoxelCursor extends VoxelCursorInterface {
  private _proxy: TemplateProxy;

  get ids() {
    return this._proxy.ids;
  }
  get level() {
    return this._proxy.levels;
  }
  get light() {
    return this._proxy.light;
  }
  get secondary() {
    return this._proxy.secondary;
  }

  constructor(public dataCursor: TemplateCursor) {
    super();
  }

  loadIn() {
    if (!this.dataCursor._proxy) return;
    this._proxy = this.dataCursor._proxy;
    this._index = this.dataCursor._voxelIndex;

    this.process();
  }

  updateVoxel(mode: 0 | 1) {}
}
