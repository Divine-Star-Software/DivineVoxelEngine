import { Vector3Like, Vec2Array, Vec3Array } from "@amodx/math";
import { VoxelShaderDataTool } from "../../Tools/Shaders/VoxelShaderData";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool";

import { GeometryBuilder } from "@amodx/meshing/Geometry/GeometryBuilder";
import { Quad } from "@amodx/meshing/Classes/Quad";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";

const faceData = new VoxelShaderDataTool();

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
        faceData
          .setLight(worldLight.getVertex(1))
          .setAO(worldAO.getVertex(1))
          .setAnimation(0)
          .getValue(),
        faceData
          .setLight(worldLight.getVertex(1))
          .setAO(worldAO.getVertex(1))
          .setAnimation(0)
          .getValue(),
        faceData
          .setLight(worldLight.getVertex(1))
          .setAO(worldAO.getVertex(1))
          .setAnimation(0)
          .getValue()
      );
    }
    {
      const uvs = tool.getAttribute("cuv3");
      uvs.push(u1, v1, texture, u2, v2, texture, u3, v3, texture);
    }
    {
      const uvs = tool.getAttribute("ocuv3");
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
    const texture = tool.getTexture();
    const overlayTextures = tool.getOverlayTextures();
    const attribute = tool.getAttribute("voxelData");
    const uvs = tool.getAttribute("cuv3");
    const oUVs = tool.getAttribute("ocuv3");
    const colors = tool.getAttribute("colors");

    let sides = quad.doubleSided ? 2 : 1;

    let attrIndex = attribute.length;
    let uvIndex = uvs.length;
    let oUVIndex = oUVs.length;
    let colorIndex = colors.length;

    while (sides--) {
      if (!quad.flip) {
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.TopRight))
          .setAO(worldAO.getVertex(QuadVerticies.TopRight))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.TopLeft))
          .setAO(worldAO.getVertex(QuadVerticies.TopLeft))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.BottomLeft))
          .setAO(worldAO.getVertex(QuadVerticies.BottomLeft))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.BottomRight))
          .setAO(worldAO.getVertex(QuadVerticies.BottomRight))
          .setAnimation(0)
          .getValue();

        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].y;
        uvs[uvIndex++] = texture;

        //1
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        //2
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        //3
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        //4
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
      } else {
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.TopLeft))
          .setAO(worldAO.getVertex(QuadVerticies.TopLeft))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.TopRight))
          .setAO(worldAO.getVertex(QuadVerticies.TopRight))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.BottomRight))
          .setAO(worldAO.getVertex(QuadVerticies.BottomRight))
          .setAnimation(0)
          .getValue();
        attribute[attrIndex++] = faceData
          .setLight(worldLight.getVertex(QuadVerticies.BottomLeft))
          .setAO(worldAO.getVertex(QuadVerticies.BottomLeft))
          .setAnimation(0)
          .getValue();

        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopLeft].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.TopRight].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomRight].y;
        uvs[uvIndex++] = texture;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].x;
        uvs[uvIndex++] = quad.uvs.vertices[QuadVerticies.BottomLeft].y;
        uvs[uvIndex++] = texture;

        //1
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        //2
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        //3
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
        //4
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopLeft];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.TopRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomRight];
        oUVs[oUVIndex++] = overlayTextures.vertices[QuadVerticies.BottomLeft];
      }


      for (let i = 0; i < 4; i++) {
        colors[colorIndex++] = 0;
        colors[colorIndex++] = 0;
        colors[colorIndex++] = 0;
      }
    }

    attribute.length = attrIndex;
    uvs.length = uvIndex;
    oUVs.length = oUVIndex;
    colors.length = colorIndex;
  }
}
