import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { VoxelBoxGeometryNode } from "../../../VoxelModel.types";

import { Quad } from "@amodx/meshing/Primitives/Quad";

import { addQuadWeights, QuadVertexWeights } from "./Calc/CalcConstants";

import { VoxelGeometryTransform } from "../../../../VoxelData/VoxelSyncData";
import { TransformBox } from "../../../Shared/Transform";
import { GetBounds } from "./BoundsFunctions";

export function GetBoxGeometryNodeData(
  points: [Vec3Array,Vec3Array],
  transform: VoxelGeometryTransform
):{
  quads: Record<VoxelFaces,Quad>,
  vertexWeights: Record<VoxelFaces,QuadVertexWeights>,
  quadBounds: [Vec3Array,Vec3Array][]
} {
  const quads: Quad[] = [];
  const vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array][] = [];
  const [start, end] = points.map((_) => Vector3Like.Create(..._));
  const quadPoints: [Vec3Array, Vec3Array, Vec3Array, Vec3Array][] = [
    //top
    [
      [end.x, end.y, end.z],
      [start.x, end.y, end.z],
      [start.x, end.y, start.z],
      [end.x, end.y, start.z],
    ],
    //bottom
    [
      [start.x, start.y, end.z],
      [end.x, start.y, end.z],
      [end.x, start.y, start.z],
      [start.x, start.y, start.z],
    ],
    //north
    [
      [start.x, end.y, end.z],
      [end.x, end.y, end.z],
      [end.x, start.y, end.z],
      [start.x, start.y, end.z],
    ],
    //south
    [
      [end.x, end.y, start.z],
      [start.x, end.y, start.z],
      [start.x, start.y, start.z],
      [end.x, start.y, start.z],
    ],
    //east
    [
      [end.x, end.y, end.z],
      [end.x, end.y, start.z],
      [end.x, start.y, start.z],
      [end.x, start.y, end.z],
    ],
    //west
    [
      [start.x, end.y, start.z],
      [start.x, end.y, end.z],
      [start.x, start.y, end.z],
      [start.x, start.y, start.z],
    ],
  ];

  const tranformed = TransformBox(
    quadPoints.map((_) => Quad.Create(_)) as any,
    transform
  );
  const quadBounds = tranformed.map((_) =>
    GetBounds(_.positions.getAsArray().map((_) => Vector3Like.ToArray(_)))
  );

  quads[VoxelFaces.Up] = tranformed[VoxelFaces.Up];
  vertexWeights[VoxelFaces.Up] = addQuadWeights(
    quads[VoxelFaces.Up],
    VoxelFaces.Up
  );

  quads[VoxelFaces.Down] = tranformed[VoxelFaces.Down];
  vertexWeights[VoxelFaces.Down] = addQuadWeights(
    quads[VoxelFaces.Down],
    VoxelFaces.Down
  );

  quads[VoxelFaces.North] = tranformed[VoxelFaces.North];
  vertexWeights[VoxelFaces.North] = addQuadWeights(
    quads[VoxelFaces.North],
    VoxelFaces.North
  );

  quads[VoxelFaces.South] = tranformed[VoxelFaces.South];
  vertexWeights[VoxelFaces.South] = addQuadWeights(
    quads[VoxelFaces.South],
    VoxelFaces.South
  );

  quads[VoxelFaces.East] = tranformed[VoxelFaces.East];
  vertexWeights[VoxelFaces.East] = addQuadWeights(
    quads[VoxelFaces.East],
    VoxelFaces.East
  );

  quads[VoxelFaces.West] = tranformed[VoxelFaces.West];
  vertexWeights[VoxelFaces.West] = addQuadWeights(
    quads[VoxelFaces.West],
    VoxelFaces.West
  );

  
  return {
    quads,
    vertexWeights,
    quadBounds,
  } as any;
}
