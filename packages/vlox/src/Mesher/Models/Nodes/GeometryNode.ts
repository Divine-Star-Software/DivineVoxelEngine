import { VoxelModelBuilder } from "../VoxelModelBuilder";
import { Vector3Like } from "@amodx/math";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
import { VoxelGeometryTransform } from "../../../Voxels/Models/CompiledVoxelModel.types"
export interface GeoemtryNodeConstructor<Data = any, Args = any> {
  new (
    geometryPaletteId: number,
    geomtry: VoxelGeometryConstructor,
    data: Data,
    transform: VoxelGeometryTransform
  ): GeoemtryNode<Data, Args>;
}

export abstract class GeoemtryNode<Data = any, Args = any> {
  faceIndex = -1;
  vertexIndex = -1;

  faceCount = -1;
  vertexCount = -1;
   builder: VoxelModelBuilder;
  constructor(
    public geometryPaletteId: number,
    public geomtry: VoxelGeometryConstructor,
    public data: Data,
    public transform: VoxelGeometryTransform
  ) {}

  abstract init(): void;

  abstract add(args: Args): boolean;
}
