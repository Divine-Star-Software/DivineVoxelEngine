import { VoxelMesherDataTool } from "../../../Mesher/Tools/VoxelMesherDataTool";
import { BoxVoxelGometryArgs } from "../../Input/BoxVoxelGometryInputs";
import { Vector3Like } from "@amodx/math";
import { VoxelGeometryConstructor } from "../Register/VoxelGeometryConstructor";

export abstract class GeoemtryNode<Args> {
  faceIndex = -1;
  vertexIndex = -1;

  faceCount = -1;
  vertexCount = -1;

  tool: VoxelMesherDataTool;
  origin: Vector3Like;

  constructor(
    public geometryPaletteId: number,
    public geomtry: VoxelGeometryConstructor
  ) {}

  abstract add(
    tool: VoxelMesherDataTool,
    originHash: number,
    origin: Vector3Like,
    args: Args
  ): void;
}
