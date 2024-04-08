import { Position3Matrix, Vec2Array, Vec3Array } from "@divinevoxel/core/Math";
import { VoxelShaderDataTool } from "@divinevoxel/core/Tools/Shaders/VoxelShaderData";
import { GeometryNormals } from "./GeometryNormals";
import { VoxelMesherDataTool } from "Builder/Tools/VoxelMesherDataTool";

const faceData = new VoxelShaderDataTool();

export class VoxelGeometry {
  static addTriangle(
    tool: VoxelMesherDataTool,
    origin: Position3Matrix,
    [[p1x, p1y, p1z], [p2x, p2y, p2z], [p3x, p3y, p3z]]: [
      Vec3Array,
      Vec3Array,
      Vec3Array
    ],
    [[u1, v1], [u2, v2], [u3, v3]]: [Vec2Array, Vec2Array, Vec2Array]
  ) {
    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const texture = tool.getTexture();

    tool.addPositions(
      //v1
      origin.x + p1x,
      origin.y + p1y,
      origin.z + p1z,
      //v2
      origin.x + p2x,
      origin.y + p2y,
      origin.z + p2z,
      //v3
      origin.x + p3x,
      origin.y + p3y,
      origin.z + p3z
    );

    const normals = GeometryNormals.getTriangleNormals(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z]
    );

    tool.addIndices(
      tool.indicieIndex,
      tool.indicieIndex + 1,
      tool.indicieIndex + 2
    );
    tool.addNormals(
      //v1
      normals[0],
      normals[1],
      normals[2],
      //v2
      normals[0],
      normals[1],
      normals[2],
      //v3
      normals[0],
      normals[1],
      normals[2]
    );

    tool.indicieIndex += 3;
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
    origin: Position3Matrix,
    doubleSided: boolean,
    [[p1x, p1y, p1z], [p2x, p2y, p2z], [p3x, p3y, p3z], [p4x, p4y, p4z]]: [
      Vec3Array,
      Vec3Array,
      Vec3Array,
      Vec3Array
    ],
    [[u1, v1], [u2, v2], [u3, v3], [u4, v4]]: [
      Vec2Array,
      Vec2Array,
      Vec2Array,
      Vec2Array
    ]
  ) {
    let sides = doubleSided ? 2 : 1;
    const worldLight = tool.getWorldLight();
    const worldAO = tool.getWorldAO();
    const texture = tool.getTexture();

    const normals = GeometryNormals.getQuadNormal(
      [p1x, p1y, p1z],
      [p2x, p2y, p2z],
      [p3x, p3y, p3z],
      [p4x, p4y, p4z]
    );
    tool.addNormals(
      //v1
      normals[0][0],
      normals[0][1],
      normals[0][2],
      //v2
      normals[1][0],
      normals[1][1],
      normals[1][2],
      //v3
      normals[2][0],
      normals[2][1],
      normals[2][2],
      //v4
      normals[3][0],
      normals[3][1],
      normals[3][2]
    );

    tool.addIndices(
      tool.indicieIndex,
      tool.indicieIndex + 1,
      tool.indicieIndex + 2,
      tool.indicieIndex + 2,
      tool.indicieIndex + 3,
      tool.indicieIndex
    );
    if (doubleSided) {
      tool.addIndices(
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex
      );
      tool.addNormals(
        //v1
        -normals[0][0],
        -normals[0][1],
        -normals[0][2],
        //v2
        -normals[1][0],
        -normals[1][1],
        -normals[1][2],
        //v3
        -normals[2][0],
        -normals[2][1],
        -normals[2][2],
        //v4
        -normals[3][0],
        -normals[3][1],
        -normals[3][2]
      );
    }
    for (let i = 0; i < sides; i++) {
      tool.addPositions(
        //v1
        origin.x + p1x,
        origin.y + p1y,
        origin.z + p1z,
        //v2
        origin.x + p2x,
        origin.y + p2y,
        origin.z + p2z,
        //v3
        origin.x + p3x,
        origin.y + p3y,
        origin.z + p3z,
        //v4
        origin.x + p4x,
        origin.y + p4y,
        origin.z + p4z
      );

      tool.indicieIndex += 4;

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
}
