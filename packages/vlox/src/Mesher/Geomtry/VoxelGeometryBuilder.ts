import { Vector3Like, Vec2Array, Vec3Array } from "@amodx/math";
import { VoxelShaderData } from "../VoxelShaderData";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool";

import { Quad } from "./Primitives/Quad";
import { QuadVerticies } from "./Geometry.types";
import { VoxelMeshVertexStructCursor } from "../../Mesher/Tools/VoxelMeshVertexStructCursor";

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
    structCursor.data = tool.mesh.buffer;
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

    const indices = tool.mesh!.indices;
    let indIndex = indices.length;
    let sides = quad.doubleSided ? 2 : 1;
    const flip = quad.flip;
    let orientation = quad.orientation;
    while (sides--) {
      const baseIndex = tool.mesh.indicieIndex;
      if (!flip) {
        //1
        structCursor.index = baseIndex;
        structCursor.positionX = topRightPos.x + origin.x;
        structCursor.positionY = topRightPos.y + origin.y;
        structCursor.positionZ = topRightPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopRight],
          worldAO.vertices[QuadVerticies.TopRight],
          animData.vertices[QuadVerticies.TopRight]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.TopRight].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.TopRight].y;
        //2
        structCursor.index = baseIndex + 1;
        structCursor.positionX = topLeftPos.x + origin.x;
        structCursor.positionY = topLeftPos.y + origin.y;
        structCursor.positionZ = topLeftPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopLeft],
          worldAO.vertices[QuadVerticies.TopLeft],
          animData.vertices[QuadVerticies.TopLeft]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        //3
        structCursor.index = baseIndex + 2;
        structCursor.positionX = bottomLeftPos.x + origin.x;
        structCursor.positionY = bottomLeftPos.y + origin.y;
        structCursor.positionZ = bottomLeftPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomLeft],
          worldAO.vertices[QuadVerticies.BottomLeft],
          animData.vertices[QuadVerticies.BottomLeft]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
        //4
        structCursor.index = baseIndex + 3;
        structCursor.positionX = bottomRightPos.x + origin.x;
        structCursor.positionY = bottomRightPos.y + origin.y;
        structCursor.positionZ = bottomRightPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomRight],
          worldAO.vertices[QuadVerticies.BottomRight],
          animData.vertices[QuadVerticies.BottomRight]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.BottomRight].y;
      } else {
        //1
        structCursor.index = baseIndex;
        structCursor.positionX = topLeftPos.x + origin.x;
        structCursor.positionY = topLeftPos.y + origin.y;
        structCursor.positionZ = topLeftPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopLeft],
          worldAO.vertices[QuadVerticies.TopLeft],
          animData.vertices[QuadVerticies.TopLeft]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        //2
        structCursor.index = baseIndex + 1;
        structCursor.positionX = topRightPos.x + origin.x;
        structCursor.positionY = topRightPos.y + origin.y;
        structCursor.positionZ = topRightPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopRight],
          worldAO.vertices[QuadVerticies.TopRight],
          animData.vertices[QuadVerticies.TopRight]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.TopRight].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.TopRight].y;
        //3
        structCursor.index = baseIndex + 2;
        structCursor.positionX = bottomRightPos.x + origin.x;
        structCursor.positionY = bottomRightPos.y + origin.y;
        structCursor.positionZ = bottomRightPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomRight],
          worldAO.vertices[QuadVerticies.BottomRight],
          animData.vertices[QuadVerticies.BottomRight]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.BottomRight].y;
        //4
        structCursor.index = baseIndex + 3;
        structCursor.positionX = bottomLeftPos.x + origin.x;
        structCursor.positionY = bottomLeftPos.y + origin.y;
        structCursor.positionZ = bottomLeftPos.z + origin.z;
        structCursor.voxelData = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomLeft],
          worldAO.vertices[QuadVerticies.BottomLeft],
          animData.vertices[QuadVerticies.BottomLeft]
        );
        structCursor.uvX = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        structCursor.uvY = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
      }

      //1
      structCursor.index = baseIndex;
      structCursor.textureIndexX = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      structCursor.textureIndexY = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      structCursor.textureIndexZ = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      structCursor.normalX = topRightNor.x;
      structCursor.normalY = topRightNor.y;
      structCursor.normalZ = topRightNor.z;
      //2
      structCursor.index = baseIndex + 1;
      structCursor.textureIndexX = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      structCursor.textureIndexY = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      structCursor.textureIndexZ = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      structCursor.normalX = topLeftNor.x;
      structCursor.normalY = topLeftNor.y;
      structCursor.normalZ = topLeftNor.z;
      //3
      structCursor.index = baseIndex + 2;
      structCursor.textureIndexX = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      structCursor.textureIndexY = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      structCursor.textureIndexZ = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      structCursor.normalX = bottomLeftNor.x;
      structCursor.normalY = bottomLeftNor.y;
      structCursor.normalZ = bottomLeftNor.z;
      //4
      structCursor.index = baseIndex + 3;
      structCursor.textureIndexX = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      structCursor.textureIndexY = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      structCursor.textureIndexZ = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      structCursor.normalX = bottomRightNor.x;
      structCursor.normalY = bottomRightNor.y;
      structCursor.normalZ = bottomRightNor.z;

      if (!orientation && !flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex;
      } else if (!orientation && flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex;
      }

      if (orientation && !flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex;
      } else if (orientation && flip) {
        indices[indIndex++] = baseIndex;
        indices[indIndex++] = baseIndex + 1;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 2;
        indices[indIndex++] = baseIndex + 3;
        indices[indIndex++] = baseIndex;
      }

      tool.mesh.indicieIndex += 4;
    }
    structCursor.data = empty;
  }
}
