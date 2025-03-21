import { ArchivedVoxelTemplate } from "./Archive/ArchivedVoxelTemplate";
import { FullVoxelTemplate } from "./Full/FullVoxelTemplate";
import { BoxVoxelTemplate } from "./Shapes/BoxVoxelTemplate";
import { ConeVoxelTemplate } from "./Shapes/ConeVoxelTemplate";
import { CylinderVoxelTemplate } from "./Shapes/CylinderVoxelTemplate";
import { OctahedronVoxelTemplate } from "./Shapes/OctahedronVoxelTemplate";
import { PyramidVoxelTemplate } from "./Shapes/PyramidVoxelTemplate";
import { SphereVoxelTemplate } from "./Shapes/SphereVoxelTemplate";
import { TorusVoxelTemplate } from "./Shapes/TorusVoxelTemplate";
import {
  IVoxelTemplate,
  IVoxelTemplateConstructor,
  IVoxelTemplateData,
} from "./VoxelTemplates.types";

export class VoxelTemplateRegister {
  static _templates = new Map<string, IVoxelTemplateConstructor<any>>();

  static register(id: string, constructor: IVoxelTemplateConstructor<any>) {
    this._templates.set(id, constructor);
  }

  static create<Template extends IVoxelTemplate>(
    data: IVoxelTemplateData<any>
  ): Template {
    const TemplateClass = this._templates.get(data.type)!;
    if (!TemplateClass)
      throw new Error(
        `Voxel template with type id [${data.type}] does not exist`
      );
    return new TemplateClass(data) as Template;
  }
}
VoxelTemplateRegister.register("full", FullVoxelTemplate);
VoxelTemplateRegister.register("archived", ArchivedVoxelTemplate);
VoxelTemplateRegister.register("box-shape", BoxVoxelTemplate);
VoxelTemplateRegister.register("sphere-shape", SphereVoxelTemplate);
VoxelTemplateRegister.register("pyramid-shape", PyramidVoxelTemplate);
VoxelTemplateRegister.register("cylinder-shape", CylinderVoxelTemplate);
VoxelTemplateRegister.register("cone-shape", ConeVoxelTemplate);
VoxelTemplateRegister.register("octahedron-shape", OctahedronVoxelTemplate);
VoxelTemplateRegister.register("torus-shape", TorusVoxelTemplate);


