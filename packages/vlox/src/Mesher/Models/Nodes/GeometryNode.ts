import { VoxelMesherDataTool } from "../../../Mesher/Tools/VoxelMesherDataTool";
import { Vector3Like } from "@amodx/math";
import { VoxelGeometryConstructor } from "./VoxelGeometryConstructor";
import { VoxelGeometryTransform } from "../../../Voxels/Types/VoxelModelCompiledData.types";
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
   builder: VoxelMesherDataTool;
  constructor(
    public geometryPaletteId: number,
    public geomtry: VoxelGeometryConstructor,
    public data: Data,
    public transform: VoxelGeometryTransform
  ) {}

  abstract init(): void;

  abstract add(args: Args): boolean;
}
