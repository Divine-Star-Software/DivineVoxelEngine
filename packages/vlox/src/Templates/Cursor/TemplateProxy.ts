import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import { NumberArray } from "../../Util/Util.types";

export class TemplateProxy {
  ids: NumberArray;
  levels: NumberArray;
  secondary: NumberArray;
  light: NumberArray;
  constructor(public template: IVoxelTemplate) {
    this.ids = new Proxy([], {
      get: (_, index) => this.template.getId(Number(index)),
    });
    this.light = new Proxy([], {
      get: (_, index) => this.template.getLight(Number(index)),
    });
    this.levels = new Proxy([], {
      get: (_, index) => this.template.getLevel(Number(index)),
    });
    this.secondary = new Proxy([], {
      get: (_, index) => this.template.getSecondary(Number(index)),
    });
  }
}
