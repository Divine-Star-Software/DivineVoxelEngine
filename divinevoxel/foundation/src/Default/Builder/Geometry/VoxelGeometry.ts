import { Vector3Like, Vec2Array, Vec3Array } from "@amodx/math";
import { VoxelShaderData } from "../../../Data/VoxelShaderData";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool";

import { GeometryBuilder } from "@amodx/meshing/Geometry/GeometryBuilder";
import { Quad } from "@amodx/meshing/Classes/Quad";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";

export class VoxelGeometry {
  static addTriangle(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    points: [Vec3Array, Vec3Array, Vec3Array],
    [[u1, v1], [u2, v2], [u3, v3]]: [Vec2Array, Vec2Array, Vec2Array]
  ) {
    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const texture = tool.getTexture();
    GeometryBuilder.addTriangle(tool, origin, points);
    {
      const attribute = tool.getAttribute("voxelData");

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
      const uvs = tool.getAttribute("uv");
      uvs.push(u1, v1, texture, u2, v2, texture, u3, v3, texture);
    }
    {
      const uvs = tool.getAttribute("textureIndex");

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
      const colors = tool.getAttribute("colors");
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
  }

  static addQuad(tool: VoxelMesherDataTool, origin: Vector3Like, quad: Quad) {
    GeometryBuilder.addQuad(tool, origin, quad);

    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const animData = tool.getAnimationData();
    const texture = tool.getTexture();
    const overlayTextures = tool.getOverlayTextures();
    const attribute = tool.getAttribute("voxelData");
    const uvs = tool.getAttribute("uv");
    const textureIndex = tool.getAttribute("textureIndex");
    const colors = tool.getAttribute("colors");

    let sides = quad.doubleSided ? 2 : 1;

    let attrIndex = attribute.length;
    let uvIndex = uvs.length;
    let textureIndexIndex = textureIndex.length;
    let colorIndex = colors.length;

    while (sides--) {
      if (!quad.flip) {
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopRight],
          worldAO.vertices[QuadVerticies.TopRight],
          animData.vertices[QuadVerticies.TopRight]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopLeft],
          worldAO.vertices[QuadVerticies.TopLeft],
          animData.vertices[QuadVerticies.TopLeft]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomLeft],
          worldAO.vertices[QuadVerticies.BottomLeft],
          animData.vertices[QuadVerticies.BottomLeft]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomRight],
          worldAO.vertices[QuadVerticies.BottomRight],
          animData.vertices[QuadVerticies.BottomRight]
        );

        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].y;
      } else {
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopLeft],
          worldAO.vertices[QuadVerticies.TopLeft],
          animData.vertices[QuadVerticies.TopLeft]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.TopRight],
          worldAO.vertices[QuadVerticies.TopRight],
          animData.vertices[QuadVerticies.TopRight]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomRight],
          worldAO.vertices[QuadVerticies.BottomRight],
          animData.vertices[QuadVerticies.BottomRight]
        );
        attribute[attrIndex++] = VoxelShaderData.createAttribute(
          worldLight.vertices[QuadVerticies.BottomLeft],
          worldAO.vertices[QuadVerticies.BottomLeft],
          animData.vertices[QuadVerticies.BottomLeft]
        );

        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].y;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
      }

      //1
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      //2
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      //3
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );
      //4
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        texture,
        overlayTextures.vertices[QuadVerticies.TopRight]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.TopLeft],
        overlayTextures.vertices[QuadVerticies.BottomLeft]
      );
      textureIndex[textureIndexIndex++] = VoxelShaderData.createTextureIndex(
        overlayTextures.vertices[QuadVerticies.BottomRight],
        0
      );

      for (let i = 0; i < 4; i++) {
        colors[colorIndex++] = 0;
        colors[colorIndex++] = 0;
        colors[colorIndex++] = 0;
      }
    }

    attribute.length = attrIndex;
    uvs.length = uvIndex;
    textureIndex.length = textureIndexIndex;
    colors.length = colorIndex;
  }
}
