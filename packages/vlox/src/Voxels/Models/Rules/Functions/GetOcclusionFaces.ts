import { Vec3Array, Vector3Like } from "@amodx/math";

import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { CompiledVoxelGeometryNodes } from "../../CompiledVoxelModel.types";
import { TransformBox, TransformQuad } from "../../Shared/Transform";
import { Quad } from "../../../../Mesher/Geomtry/Primitives/Quad";
import { OcclusionFaceRegister } from "../Classes/OcclusionFaceRegister";

export function GetOcclusionFaces(
  parentId: string,
  geometry: VoxelRuleGeometry,
  data: CompiledVoxelGeometryNodes[]
) {
  const faceIds: number[] = [];

  let vertexCount = 0;
  let faceCount = 0;

  let nodeId = 0;
  for (const prcoessedNode of data) {
    if (prcoessedNode.node.type == "box") {
      const [start, end] = prcoessedNode.node.points.map((_) =>
        Vector3Like.Create(..._)
      );
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
        prcoessedNode.tranform
      );

 
      for (let i = 0; i < tranformed.length; i++) {
        faceIds.push(
          OcclusionFaceRegister.getQuadId(tranformed[i].positions.toVec3Array())
        );
      }

      //  console.warn("GET QUAD IDS", geometry.id, faceContainer.faceIds);

      faceCount += 6;
      vertexCount += 6 * 4;
    }
    if (prcoessedNode.node.type == "quad") {
      const quad = TransformQuad(
        Quad.Create(prcoessedNode.node.points),
        prcoessedNode.tranform
      );

      faceIds.push(
        OcclusionFaceRegister.getQuadId(quad.positions.toVec3Array())
      );

      faceCount++;
      vertexCount += 4;
    }
 
  }
  geometry.vertexCount = vertexCount;
  geometry.faceCount = faceCount;

  return faceIds;
}
