import { MesherDataTool } from "@amodx/meshing/Tools/MesherDataTools.js";
import { Mesher } from "../Classes/Mesher.js";
import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types.js";
import { BinaryNumberTypes } from "@amodx/binary";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import { GeometryBuilder } from "@amodx/meshing";
import { Flat2DIndex, Vec2Array, Vector3Like } from "@amodx/math";

const Quads = {
  north: Quad.Create(
    [
      [0, 0, 0],
      [1, 1, 0],
    ],
    Quad.FullUVs as any,
    false,
    1
  ),
  south: Quad.Create(
    [
      [0, 0, 0],
      [1, 1, 0],
    ],
    Quad.FullUVs as any,
    false,
    0
  ),
};

const tool = new MesherDataTool();
tool.attributes.set("uv", [[], 2, BinaryNumberTypes.Float32]);
tool.attributes.set("textureIndex", [[], 3, BinaryNumberTypes.Float32]);
/**
 * @todo
 * For 32x32 textures the uvs and pixels are not correct.
 * Some pixels seem to be missing and the uvs are off slightly.
 * Added the uv offset for now to make it look a little better but pixels are still missing.
 */
class TXTBuilderBase extends Mesher {
  build(buildTask: BuildNodeMesh) {
    const [location, type, data] = buildTask;
    const textureId: number = data.textureId;
    const textureData = data.textureData;
    tool.setVar("texture", textureId);

    const width = Math.sqrt(textureData.length / 4);
    const height = Math.sqrt(textureData.length / 4);
    const factor = 1 / width;

    const textureDataIndex = Flat2DIndex.GetXYOrder();
    textureDataIndex.setBounds(width, height);

    const origin = Vector3Like.Create(-0.5, -0.5, -0.5);

    const isSolid = (x: number, y: number) =>
      x >= 0 &&
      x < width &&
      y >= 0 &&
      y < height &&
      textureData[textureDataIndex.getIndexXY(x, y) * 4 + 3] > 0.01
        ? true
        : false;

    const uvs = tool.getAttribute("uv");
    const textureIndex = tool.getAttribute("textureIndex");
    const uvOffset = width > 16 ? -(2 / Math.max(width, height)) : 0;

    const addUvs = (sx: number, sy: number, ex: number, ey: number) => {
      uvs.push(
        (ex + uvOffset) * factor,
        (ey + uvOffset) * factor,
        (sx - uvOffset) * factor,
        (ey + uvOffset) * factor,
        (sx - uvOffset) * factor,
        (sy - uvOffset) * factor,
        (ex + uvOffset) * factor,
        (sy - uvOffset) * factor
      );
      textureIndex.push(
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0
      );
    };

    {
      GeometryBuilder.addQuad(tool, origin, Quads.south);
      uvs.push(
        Quads.south.uvs.vertices[QuadVerticies.TopRight].x,
        Quads.south.uvs.vertices[QuadVerticies.TopRight].y,
        Quads.south.uvs.vertices[QuadVerticies.TopLeft].x,
        Quads.south.uvs.vertices[QuadVerticies.TopLeft].y,
        Quads.south.uvs.vertices[QuadVerticies.BottomLeft].x,
        Quads.south.uvs.vertices[QuadVerticies.BottomLeft].y,
        Quads.south.uvs.vertices[QuadVerticies.BottomRight].x,
        Quads.south.uvs.vertices[QuadVerticies.BottomRight].y
      );

      textureIndex.push(
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0
      );
    }

    {
      const backPositionZ = factor;
      Quads.north.positions.vertices[QuadVerticies.TopRight].z = backPositionZ;
      Quads.north.positions.vertices[QuadVerticies.TopLeft].z = backPositionZ;
      Quads.north.positions.vertices[QuadVerticies.BottomLeft].z =
        backPositionZ;
      Quads.north.positions.vertices[QuadVerticies.BottomRight].z =
        backPositionZ;
      Quads.north.flip = true;
      uvs.push(
        Quads.north.uvs.vertices[QuadVerticies.TopLeft].x,
        Quads.north.uvs.vertices[QuadVerticies.TopLeft].y,
        Quads.north.uvs.vertices[QuadVerticies.TopRight].x,
        Quads.north.uvs.vertices[QuadVerticies.TopRight].y,
        Quads.north.uvs.vertices[QuadVerticies.BottomRight].x,
        Quads.north.uvs.vertices[QuadVerticies.BottomRight].y,
        Quads.north.uvs.vertices[QuadVerticies.BottomLeft].x,
        Quads.north.uvs.vertices[QuadVerticies.BottomLeft].y
      );
      GeometryBuilder.addQuad(tool, origin, Quads.north);
      textureIndex.push(
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0,
        textureId,
        0,
        0
      );
    }

    for (let x = 0; x < width; x++) {
      let eastFace: Vec2Array | null = null;
      let westFace: Vec2Array | null = null;
      for (let y = 0; y < height; y++) {
        let eastFaceExposed = true;
        let westFaceExposed = true;

        if (!isSolid(x, y)) {
          eastFaceExposed = false;
          westFaceExposed = false;
        }
        if (isSolid(x + 1, y)) {
          eastFaceExposed = false;
        }
        if (isSolid(x - 1, y)) {
          westFaceExposed = false;
        }

        if (eastFace && !eastFaceExposed) {
          const newQuad = Quad.Create(
            [
              [x * factor + factor, eastFace[1] * factor, 0],
              [x * factor + factor, y * factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            0
          );
          GeometryBuilder.addQuad(tool, origin, newQuad);

          let [sx, sy] = eastFace;
          let ex = x;
          let ey = y;
          ex += 1;
          addUvs(sx, sy, ex, ey);
          eastFace = null;
        }

        if (westFace && !westFaceExposed) {
          const newQuad = Quad.Create(
            [
              [x * factor, westFace[1] * factor, 0],
              [x * factor, y * factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            1
          );
          GeometryBuilder.addQuad(tool, origin, newQuad);
          let [sx, sy] = westFace;
          let ex = x;
          let ey = y;
          ex += 1;
          addUvs(sx, sy, ex, ey);
          westFace = null;
        }
        const isPixel = isSolid(x, y);
        if (!isSolid(x + 1, y) && !eastFace && isPixel) {
          eastFace = [x, y];
        }
        if (!isSolid(x - 1, y) && !westFace && isPixel) {
          westFace = [x, y];
        }
      }
    }
    for (let y = 0; y < height; y++) {
      let upFace: Vec2Array | null = null;
      let downFace: Vec2Array | null = null;

      for (let x = 0; x < width; x++) {
        let upFaceExposed = true;
        let downFaceExposed = true;

        if (!isSolid(x, y)) {
          upFaceExposed = false;
          downFaceExposed = false;
        }
        if (isSolid(x, y + 1)) {
          upFaceExposed = false;
        }
        if (isSolid(x, y - 1)) {
          downFaceExposed = false;
        }

        if (upFace && !upFaceExposed) {
          const newQuad = Quad.Create(
            [
              [upFace[0] * factor, y * factor + factor, 0],
              [x * factor, y * factor + factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            0
          );
          GeometryBuilder.addQuad(tool, origin, newQuad);
          let [sx, sy] = upFace;
          let [ex, ey] = [x, y];

          ey += 1;
          addUvs(sx, sy, ex, ey);
          upFace = null;
        }

        if (downFace && !downFaceExposed) {
          const newQuad = Quad.Create(
            [
              [downFace[0] * factor, y * factor, 0],
              [x * factor, y * factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            1
          );
          GeometryBuilder.addQuad(tool, origin, newQuad);
          let [sx, sy] = downFace;
          let [ex, ey] = [x, y];
          ey += 1;
          addUvs(sx, sy, ex, ey);
          downFace = null;
        }

        const isPixel = isSolid(x, y);
        if (!isSolid(x, y + 1) && !upFace && isPixel) {
          upFace = [x, y];
        }
        if (!isSolid(x, y - 1) && !downFace && isPixel) {
          downFace = [x, y];
        }
      }
    }

    const [attributes, transfers] = tool.getAllAttributes();
    for (const [type, data] of attributes) {
      if (type == "position") {
        for (let i = 0; i < data.length; i += 3) {
          (data as any as number[])[i] -= 0.5;
          (data as any as number[])[i + 1] -= 0.5;
          (data as any as number[])[i + 2];
        }
      }
    }

    tool.resetVars();

    tool.resetAttributes();
    return [[location, attributes], transfers] as [SetNodeMesh, ArrayBuffer[]];
  }
}

export const TextureBuilder = new TXTBuilderBase("#dve_node_texture");
