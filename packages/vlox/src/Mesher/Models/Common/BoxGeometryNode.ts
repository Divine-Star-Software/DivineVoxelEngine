import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../Math";

import { Quad } from "@amodx/meshing/Primitives/Quad";

import { addQuadWeights, QuadVertexWeights } from "./Calc/CalcConstants";

import { VoxelGeometryTransform } from "../../../Voxels/Types/VoxelModelCompiledData.types";
import { TransformBox } from "../../../Models/Shared/Transform";
import { GetBounds } from "./BoundsFunctions";

export function GetBoxGeometryNodeData(
  points: [Vec3Array, Vec3Array],
  transform: VoxelGeometryTransform
): {
  quads: Record<VoxelFaces, Quad>;
  vertexWeights: Record<VoxelFaces, QuadVertexWeights>;
  quadBounds: [Vec3Array, Vec3Array][];
} {
  // const quads: Quad[] = [];
  const vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array][] = [];
  const start = Vector3Like.Create(...points[0]);
  const end = Vector3Like.Create(...points[1]);

  const quads: Quad[] = [];
  //top
  quads[VoxelFaces.Up] = Quad.Create([
    [end.x, end.y, end.z],
    [start.x, end.y, end.z],
    [start.x, end.y, start.z],
    [end.x, end.y, start.z],
  ]);
  //bottom
  quads[VoxelFaces.Down] = Quad.Create([
    [start.x, start.y, end.z],
    [end.x, start.y, end.z],
    [end.x, start.y, start.z],
    [start.x, start.y, start.z],
  ]);
  //north
  quads[VoxelFaces.North] = Quad.Create([
    [start.x, end.y, end.z],
    [end.x, end.y, end.z],
    [end.x, start.y, end.z],
    [start.x, start.y, end.z],
  ]);
  //south
  quads[VoxelFaces.South] = Quad.Create([
    [end.x, end.y, start.z],
    [start.x, end.y, start.z],
    [start.x, start.y, start.z],
    [end.x, start.y, start.z],
  ]);
  //east
  quads[VoxelFaces.East] = Quad.Create([
    [end.x, end.y, end.z],
    [end.x, end.y, start.z],
    [end.x, start.y, start.z],
    [end.x, start.y, end.z],
  ]);
  //west
  quads[VoxelFaces.West] = Quad.Create([
    [start.x, end.y, start.z],
    [start.x, end.y, end.z],
    [start.x, start.y, end.z],
    [start.x, start.y, start.z],
  ]);

 // TransformBox(quads as any, transform);
  const quadBounds: [Vec3Array, Vec3Array][] = new Array(quads.length);
  for (let i = 0; i < quads.length; i++) {
    const positions: Vec3Array[] = [];
    const quadPositions = quads[i].positions.getAsArray();
    for (let i = 0; i < 4; i++) {
      positions.push([
        quadPositions[i].x,
        quadPositions[i].y,
        quadPositions[i].z,
      ]);
    }
    quadBounds[i] = GetBounds(positions);
  }

  vertexWeights[VoxelFaces.Up] = addQuadWeights(
    quads[VoxelFaces.Up],
    VoxelFaces.Up
  );

  vertexWeights[VoxelFaces.Down] = addQuadWeights(
    quads[VoxelFaces.Down],
    VoxelFaces.Down
  );

  vertexWeights[VoxelFaces.North] = addQuadWeights(
    quads[VoxelFaces.North],
    VoxelFaces.North
  );

  vertexWeights[VoxelFaces.South] = addQuadWeights(
    quads[VoxelFaces.South],
    VoxelFaces.South
  );

  vertexWeights[VoxelFaces.East] = addQuadWeights(
    quads[VoxelFaces.East],
    VoxelFaces.East
  );

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
