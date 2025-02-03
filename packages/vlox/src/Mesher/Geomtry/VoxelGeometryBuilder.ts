import {
  Vector3Like,
  Vec2Array,
  Vec3Array,
  Vector2Like,
  Vector4Like,
} from "@amodx/math";
import { VoxelShaderData } from "../VoxelShaderData";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool";

import { Quad } from "./Primitives/Quad";
import { QuadVerticies } from "./Geometry.types";
import {
  VoxelMeshVertexConstants,
  VoxelMeshVertexStructCursor,
} from "../../Mesher/Tools/VoxelMeshVertexStructCursor";

const empty: number[] = [];
const structCursor = new VoxelMeshVertexStructCursor();
export class VoxelGeometryBuilder {
  /*   static addTriangle(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    points: [Vec3Array, Vec3Array, Vec3Array],
    [[u1, v1], [u2, v2], [u3, v3]]: [Vec2Array, Vec2Array, Vec2Array]
  ) {
    if (!tool.mesh) return;
    const worldLight = tool.vars.light;
    const worldAO = tool.vars.ao;
    const texture = tool.vars.textureIndex;
    GeometryBuilder.addTriangle(tool, origin, points);
    {
      const attribute = tool.mesh.getAttribute("voxelData");

      attribute.push(
        VoxelShaderData.createAttribute(
          worldLight.vertices[1],
          worldAO.vertices[1],
          0
        ),
        VoxelShaderData.createAttribute(
          worldLight.vertices[2],
          worldAO.vertices[2],
          0
        ),
        VoxelShaderData.createAttribute(
          worldLight.vertices[3],
          worldAO.vertices[3],
          9
        )
      );
    }
    {
      const uvs = tool.mesh.getAttribute("uv");
      uvs.push(u1, v1, texture, u2, v2, texture, u3, v3, texture);
    }
    {
      const uvs = tool.mesh.getAttribute("textureIndex");

      uvs.push(
        //v1
        0,
        0,
        0,
        0,
        //v2
        0,
        0,
        0,
        0,
        //v3
        0,
        0,
        0,
        0
      );
    }
    {
      const colors = tool.mesh.getAttribute("colors");
      colors.push(
        //v1
        0,
        0,
        0,
        //v2
        0,
        0,
        0,
        //v3
        0,
        0,
        0
      );
    }
  } */

  static addQuad(tool: VoxelMesherDataTool, origin: Vector3Like, quad: Quad) {
    if (!tool.mesh) return;

    const worldLight = tool.vars.light;
    const worldAO = tool.vars.ao;
    const animData = tool.vars.animation;
    const texture = tool.vars.textureIndex;
    const overlayTextures = tool.vars.overlayTextures;
    const topRightPos = quad.positions.vertices[0];
    const topLeftPos = quad.positions.vertices[1];
    const bottomLeftPos = quad.positions.vertices[2];
    const bottomRightPos = quad.positions.vertices[3];
    const topRightNor = quad.normals.vertices[0];
    const topLeftNor = quad.normals.vertices[1];
    const bottomLeftNor = quad.normals.vertices[2];
    const bottomRightNor = quad.normals.vertices[3];
    const topRightVoxelData = VoxelShaderData.createAttribute(
      worldLight.vertices[QuadVerticies.TopRight],
      worldAO.vertices[QuadVerticies.TopRight],
      animData.vertices[QuadVerticies.TopRight]
    );
    const topLeftVoxelData = VoxelShaderData.createAttribute(
      worldLight.vertices[QuadVerticies.TopLeft],
      worldAO.vertices[QuadVerticies.TopLeft],
      animData.vertices[QuadVerticies.TopLeft]
    );
    const bottomLeftVoxelData = VoxelShaderData.createAttribute(
      worldLight.vertices[QuadVerticies.BottomLeft],
      worldAO.vertices[QuadVerticies.BottomLeft],
      animData.vertices[QuadVerticies.BottomLeft]
    );
    const bottomRightVoxelData = VoxelShaderData.createAttribute(
      worldLight.vertices[QuadVerticies.BottomRight],
      worldAO.vertices[QuadVerticies.BottomRight],
      animData.vertices[QuadVerticies.BottomRight]
    );
    const indices = tool.mesh!.indices;
    let indIndex = tool.mesh.indicieCount;
    let sides = quad.doubleSided ? 2 : 1;
    const flip = quad.flip;
    let orientation = quad.orientation;
    while (sides--) {
      const baseIndex = tool.mesh.vertexCount;
      if (!flip) {
        tool.mesh.buffer.setIndex(baseIndex);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          topRightPos,
          topRightNor,
          quad.uvs.vertices[QuadVerticies.TopRight],
          topRightVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 1);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          topLeftPos,
          topLeftNor,
          quad.uvs.vertices[QuadVerticies.TopLeft],
          topLeftVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 2);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          bottomLeftPos,
          bottomLeftNor,
          quad.uvs.vertices[QuadVerticies.BottomLeft],
          bottomLeftVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 3);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          bottomRightPos,
          bottomRightNor,
          quad.uvs.vertices[QuadVerticies.BottomRight],
          bottomRightVoxelData,
          texture,
          overlayTextures
        );
      }
      if (flip) {
        tool.mesh.buffer.setIndex(baseIndex);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          topLeftPos,
          topLeftNor,
          quad.uvs.vertices[QuadVerticies.TopLeft],
          topLeftVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 1);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          topRightPos,
          topRightNor,
          quad.uvs.vertices[QuadVerticies.TopRight],
          topRightVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 2);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          bottomRightPos,
          bottomRightNor,
          quad.uvs.vertices[QuadVerticies.BottomRight],
          bottomRightVoxelData,
          texture,
          overlayTextures
        );
        tool.mesh.buffer.setIndex(baseIndex + 3);
        structCursor.data = tool.mesh.buffer.currentArray;
        structCursor.index = tool.mesh.buffer.curentIndex;
        addVertex(
          tool.mesh.buffer.curentIndex,
          tool.mesh.buffer.currentArray,
          origin,
          bottomLeftPos,
          bottomLeftNor,
          quad.uvs.vertices[QuadVerticies.BottomLeft],
          bottomLeftVoxelData,
          texture,
          overlayTextures
        );
      }

      if (!orientation && !flip) {
        indices.setIndex(indIndex).currentArray[indices.curentIndex] =
          baseIndex;
        indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
          baseIndex + 1;
        indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
          baseIndex + 3;
        indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] =
          baseIndex;
      } else if (!orientation && flip) {
        indices.setIndex(indIndex).currentArray[indices.curentIndex] =
          baseIndex;
        indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
          baseIndex + 3;
        indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
          baseIndex + 1;
        indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] =
          baseIndex;
      }

      if (orientation && !flip) {
        indices.setIndex(indIndex).currentArray[indices.curentIndex] =
          baseIndex;
        indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
          baseIndex + 3;
        indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
          baseIndex + 1;
        indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] =
          baseIndex;
      } else if (orientation && flip) {
        indices.setIndex(indIndex).currentArray[indices.curentIndex] =
          baseIndex;
        indices.setIndex(indIndex + 1).currentArray[indices.curentIndex] =
          baseIndex + 1;
        indices.setIndex(indIndex + 2).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 3).currentArray[indices.curentIndex] =
          baseIndex + 2;
        indices.setIndex(indIndex + 4).currentArray[indices.curentIndex] =
          baseIndex + 3;
        indices.setIndex(indIndex + 5).currentArray[indices.curentIndex] =
          baseIndex;
      }

      tool.mesh.addVerticies(4, 6);
    }
  }
}

const addVertex = (
  index: number,
  array: Float32Array,
  origin: Vector3Like,
  position: Vector3Like,
  normal: Vector3Like,
  uvs: Vector2Like,
  voxelData: number,
  texture: number,
  overlayTextures: Vector4Like
)=> {
  index *= VoxelMeshVertexConstants.VertexFloatSize;
  array[VoxelMeshVertexConstants.PositionOffset + index] =
    position.x + origin.x;
  array[VoxelMeshVertexConstants.PositionOffset + index + 1] =
    position.y + origin.y;
  array[VoxelMeshVertexConstants.PositionOffset + index + 2] =
    position.z + origin.z;

  array[VoxelMeshVertexConstants.UVOffset + index] = uvs.x;
  array[VoxelMeshVertexConstants.UVOffset + index + 1] = uvs.y;

  array[VoxelMeshVertexConstants.NormalOffset + index] = normal.x;
  array[VoxelMeshVertexConstants.NormalOffset + index + 1] = normal.y;
  array[VoxelMeshVertexConstants.NormalOffset + index + 2] = normal.z;

  array[VoxelMeshVertexConstants.TextureIndexOffset + index] =
    VoxelShaderData.createTextureIndex(texture, overlayTextures.x);
  array[VoxelMeshVertexConstants.TextureIndexOffset + index + 1] =
    VoxelShaderData.createTextureIndex(overlayTextures.y, overlayTextures.z);
  array[VoxelMeshVertexConstants.TextureIndexOffset + index + 2] =
    VoxelShaderData.createTextureIndex(overlayTextures.w, 0);

  array[VoxelMeshVertexConstants.VoxelDataOFfset + index] = voxelData;
}
