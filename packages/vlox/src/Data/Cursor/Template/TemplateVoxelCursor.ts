import { VoxelCursorInterface } from "../Interfaces/VoxelCursor.interface";
import { TemplateCursor } from "./TemplateCursor";
import { FullVoxelTemplate } from "Templates/FullVoxelTemplate";
export class TemplateVoxelCursor extends VoxelCursorInterface {
  private _template: FullVoxelTemplate;

  get ids() {
    return this._template.ids
  }
  get light() {
    return this._template.light 
  }
  get state() {
    return this._template.state 
  }
  get secondary() {
    return this._template.secondary;
  }
  get mod() {
    return this._template.mod;
  }

  constructor(public dataCursor: TemplateCursor) {
    super();
  }

  loadIn() {
    if (!this.dataCursor._template) return;
    this._template = this.dataCursor._template;
    this._index = this.dataCursor._voxelIndex;
    this.process();
  }

}
