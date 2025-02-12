import { VoxelModelBuilder } from "../VoxelModelBuilder";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
export interface GeoemtryNodeConstructor<Data = any, Args = any> {
  new (
    geometryPaletteId: number,
    geomtry: VoxelGeometryConstructor,
    data: Data
  ): GeoemtryNode<Data, Args>;
}

export abstract class GeoemtryNode<Data = any, Args = any> {
  builder: VoxelModelBuilder;
  constructor(
    public geometryPaletteId: number,
    public geomtry: VoxelGeometryConstructor,
    public data: Data
  ) {}

  abstract init() : void;
  abstract add(args: Args): boolean;
}
