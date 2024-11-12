import { Vec3Array, Vector3Like } from "@amodx/math";
import {
  OcclusionFlatQuadFace,
  OcclusionFaceContainer,
  OcclusionQuadFace,
} from "../Classes/OcclusionFace";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelFaces } from "../../../Math";
import { PrcoessedVoxelGeometryNodes } from "../../VoxelModelRules.types";
import { TransformBox, TransformQuad } from "../../Shared/Transform";
import { Quad } from "@amodx/meshing/Classes/Quad";

export function GetOcclusionFaces(
  parentId: string,
  geometry: VoxelRuleGeometry,
  data: PrcoessedVoxelGeometryNodes[]
) {
  const faceContainer = new OcclusionFaceContainer();

  let vertexCount = 0;
  let faceCount = 0;

  let nodeId = 0;
  for (const prcoessedNode of data) {
    if (prcoessedNode.node.type == "box") {
      const keys = Object.keys(prcoessedNode.tranform);

      if (
        !keys.length ||
        (keys.length == 1 &&
          keys[0] == "position" &&
          prcoessedNode.tranform.position)
      ) {
        const [start, end] = prcoessedNode.node.points.map((_) =>
          Vector3Like.Create(
            ...Vector3Like.AddArray(
              _,
              prcoessedNode.tranform.position || [0, 0, 0]
            )
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "up",
            vertexCount + VoxelFaces.Up * 4,
            VoxelFaces.Up + faceCount,
            [start.x, end.y, start.z],
            [end.x, end.y, end.z]
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "down",
            vertexCount + VoxelFaces.Down * 4,
            VoxelFaces.Down + faceCount,
            [start.x, start.y, start.z],
            [end.x, start.y, end.z]
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "north",
            vertexCount + VoxelFaces.North * 4,
            VoxelFaces.North + faceCount,
            [start.x, start.y, end.z],
            [end.x, end.y, end.z]
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "south",
            vertexCount + VoxelFaces.South * 4,
            VoxelFaces.South + faceCount,
            [start.x, start.y, start.z],
            [end.x, end.y, start.z]
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "east",
            vertexCount + VoxelFaces.East * 4,
            VoxelFaces.East + faceCount,
            [end.x, start.y, start.z],
            [end.x, end.y, end.z]
          )
        );

        faceContainer.addFace(
          new OcclusionFlatQuadFace(
            parentId,
            nodeId,
            "west",
            vertexCount + VoxelFaces.West * 4,
            VoxelFaces.West + faceCount,
            [start.x, start.y, start.z],
            [start.x, end.y, end.z]
          )
        );
      } else {
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
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.Up * 4,
            faceCount + VoxelFaces.Up,
            tranformed[VoxelFaces.Up].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.Down * 4,
            faceCount + VoxelFaces.Down,
            tranformed[VoxelFaces.Down].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.North * 4,
            faceCount + VoxelFaces.North,
            tranformed[VoxelFaces.North].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.South * 4,
            faceCount + VoxelFaces.South,
            tranformed[VoxelFaces.South].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.East * 4,
            faceCount + VoxelFaces.East,
            tranformed[VoxelFaces.East].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
        faceContainer.addFace(
          new OcclusionQuadFace(
            parentId,
            nodeId,
            vertexCount + VoxelFaces.West * 4,
            faceCount + VoxelFaces.West,
            tranformed[VoxelFaces.West].positions
              .getAsArray()
              .map((_) => Vector3Like.ToArray(_)) as any
          )
        );
      }

      faceCount += 6;
      vertexCount += 6 * 4;
    }
    if (prcoessedNode.node.type == "quad") {
      const quad = TransformQuad(
        Quad.Create(prcoessedNode.node.points),
        prcoessedNode.tranform
      );

      faceContainer.addFace(
        new OcclusionQuadFace(
          parentId,
          nodeId,
          vertexCount,
          faceCount,
          quad.positions.getAsArray().map((_) => Vector3Like.ToArray(_)) as any
        )
      );

      faceCount++;
      vertexCount += 4;
    }
    nodeId++;
    /*     if (node.type == "plane") {
      if (node.rotation) continue;
      const [start, end] = node.points;

      planes.addPlane(new OcclusionQuad(node.direction, start, end));
    } */
  }
  geometry.vertexCount = vertexCount;
  geometry.faceCount = faceCount;
  return faceContainer;
}
