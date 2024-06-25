import { MappedDataRegister } from "@divinevoxel/core/Data/Register/MappedDataRegister";
import { VoxelShapeBase } from "./VoxelShapeBase";
import RegisterDefaultShapes from "./default/RegisterDefaultShapes";

export class VoxelShapeManager {
  static shapes = new Map<string, VoxelShapeBase>();
  static mappedShapes = new Map<number, VoxelShapeBase>();

  static init() {
    RegisterDefaultShapes();
  }

  static registerShape(...shapes: VoxelShapeBase[]) {
    shapes.forEach((_) => this.shapes.set(_.id, _));
  }

  static getMappedShape(id: number) {
    return this.mappedShapes.get(id)!;
  }

  static getMappedId(id: string) {
    return this.getShape(id).numberId;
  }

  static getShape(id: string) {
    const shape = this.shapes.get(id);
    if (!shape) throw new Error(`Shape with id ${id} does not exist`);
    return shape;
  }
}

const shapeIdSegment = "#dve_shape_id";
const segment = MappedDataRegister.stringMaps.addSegment("voxel");

segment.onEntryAdded(shapeIdSegment, (entry) => {
  VoxelShapeManager.init();
  for (let i = 0; i < entry.length; i++) {
    const shape = VoxelShapeManager.getShape(entry[i]);
    shape.numberId = i;
    VoxelShapeManager.mappedShapes.set(i, shape);
  }
  for (const [k, shape] of VoxelShapeManager.shapes) {
    shape.init();
  }
});
