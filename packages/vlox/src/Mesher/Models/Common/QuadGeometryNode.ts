import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../Math";
import { VoxelQuadGeometryNode } from "../../../Models/VoxelModel.types";

import { Quad } from "@amodx/meshing/Primitives/Quad";

import {
  addQuadWeights,
  closestUnitNormal,
} from "./Calc/CalcConstants";

import { VoxelGeometryTransform } from "../../../Voxels/VoxelSyncData";
import { TransformQuad } from "../../../Models/Shared/Transform";
import { GetBounds } from "./BoundsFunctions";

export function GetQuadGeometryData(
  data: VoxelQuadGeometryNode,
  transform: VoxelGeometryTransform
) {
  const quad = TransformQuad(Quad.Create(data.points), transform);
  quad.orientation = 0;

  const normals = quad.normals.getAsArray();
  const averageNormal: Vec3Array = [0, 0, 0];

  for (let i = 0; i < normals.length; i++) {
    averageNormal[0] += normals[i].x;
    averageNormal[1] += normals[i].y;
    averageNormal[2] += normals[i].z;
  }
  averageNormal[0] /= normals.length;
  averageNormal[1] /= normals.length;
  averageNormal[2] /= normals.length;

  // Normalize the average normal
  const magnitude = Math.sqrt(
    averageNormal[0] * averageNormal[0] +
      averageNormal[1] * averageNormal[1] +
      averageNormal[2] * averageNormal[2]
  );
  if (magnitude !== 0) {
    averageNormal[0] /= magnitude;
    averageNormal[1] /= magnitude;
    averageNormal[2] /= magnitude;
  }

  const unitNormal = closestUnitNormal(averageNormal);
  let closestFace = VoxelFaces.Up;
  if (unitNormal[0] == 1) closestFace = VoxelFaces.East;
  if (unitNormal[0] == -1) closestFace = VoxelFaces.West;
  if (unitNormal[1] == 1) closestFace = VoxelFaces.Up;
  if (unitNormal[1] == -1) closestFace = VoxelFaces.Down;
  if (unitNormal[2] == 1) closestFace = VoxelFaces.North;
  if (unitNormal[2] == -1) closestFace = VoxelFaces.South;

  const vertexWeights = addQuadWeights(quad, closestFace);

  closestFace = closestFace;
  return {
    quad,
    vertexWeights,
    closestFace,
    quadBounds: GetBounds(quad.positions.getAsArray().map((_)=>Vector3Like.ToArray(_)))
  };
}
