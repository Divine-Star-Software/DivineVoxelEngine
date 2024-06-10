import { Vector3Like, Vec2Array, Vec3Array } from "@divinevoxel/core/Math";
import { VoxelShaderDataTool } from "../../Tools/Shaders/VoxelShaderData";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool";
import {
  QuadVertexVec3Data,
  QuadUVData,
  QuadVertexFloatData,
  QuadVerticies,
} from "./Geometry.types";

import { GeometryBuilder } from "@divinevoxel/core/Meshing/Geometry/";

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

  static addQuad(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    doubleSided: boolean,
    points: QuadVertexVec3Data,
    [[u1, v1], [u2, v2], [u3, v3], [u4, v4]]: QuadUVData,
    normalOverrides?: QuadVertexVec3Data,
    ao?: QuadVertexFloatData,
    light?: QuadVertexFloatData,
    animations?: QuadVertexFloatData,
    textureIndex?: number,
    overlayTextures?: QuadVertexFloatData
  ) {
    let sides = doubleSided ? 2 : 1;
    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const texture = tool.getTexture();
    GeometryBuilder.addQuad(tool, origin, doubleSided, points);

    for (let i = 0; i < sides; i++) {
      {
        const attribute = tool.getAttribute("voxelData");

        attribute.push(
          faceData
            .setLight(worldLight.getVertex(1))
            .setAO(worldAO.getVertex(1))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(2))
            .setAO(worldAO.getVertex(2))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(3))
            .setAO(worldAO.getVertex(3))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(4))
            .setAO(worldAO.getVertex(4))
            .setAnimation(0)
            .getValue()
        );
      }
      {
        const uvs = tool.getAttribute("cuv3");
        uvs.push(
          u1,
          v1,
          texture,
          u2,
          v2,
          texture,
          u3,
          v3,
          texture,
          u4,
          v4,
          texture
        );
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
          0,
          //v4
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
          0,
          //v4
          0,
          0,
          0
        );
      }
    }
  }

  static addSimpleQuad(
    tool: VoxelMesherDataTool,
    origin: Vector3Like,
    orientation: 0 | 1,
    flip: boolean,
    points: [Vec3Array, Vec3Array],
    [[u1, v1], [u2, v2], [u3, v3], [u4, v4]]: QuadUVData
  ) {
    GeometryBuilder.addSimpleQuad(tool, origin, orientation, flip, points);

    //  let sides = doubleSided ? 2 : 1;
    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const texture = tool.getTexture();

    if (!flip) {
      {
        const attribute = tool.getAttribute("voxelData");
        attribute.push(
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.TopRight))
            .setAO(worldAO.getVertex(QuadVerticies.TopRight))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.TopLeft))
            .setAO(worldAO.getVertex(QuadVerticies.TopLeft))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.BottomLeft))
            .setAO(worldAO.getVertex(QuadVerticies.BottomLeft))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.BottomRight))
            .setAO(worldAO.getVertex(QuadVerticies.BottomRight))
            .setAnimation(0)
            .getValue()
        );

        {
          const uvs = tool.getAttribute("cuv3");
          uvs.push(
            u1,
            v1,
            texture,
            u2,
            v2,
            texture,
            u3,
            v3,
            texture,
            u4,
            v4,
            texture
          );
        }
      }
    } else {
      {
        const attribute = tool.getAttribute("voxelData");

        attribute.push(
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.TopLeft))
            .setAO(worldAO.getVertex(QuadVerticies.TopLeft))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.TopRight))
            .setAO(worldAO.getVertex(QuadVerticies.TopRight))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.BottomRight))
            .setAO(worldAO.getVertex(QuadVerticies.BottomRight))
            .setAnimation(0)
            .getValue(),
          faceData
            .setLight(worldLight.getVertex(QuadVerticies.BottomLeft))
            .setAO(worldAO.getVertex(QuadVerticies.BottomLeft))
            .setAnimation(0)
            .getValue()
        );
      }

      {
        const uvs = tool.getAttribute("cuv3");
        uvs.push(
          u2,
          v2,
          texture,
          u1,
          v1,
          texture,
          u4,
          v4,
          texture,
          u3,
          v3,
          texture
        );
      }
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
        0,
        //v4
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
        0,
        //v4
        0,
        0,
        0
      );
    }
  }
}
