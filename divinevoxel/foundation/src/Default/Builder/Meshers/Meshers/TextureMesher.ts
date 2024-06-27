import { DirectionNames } from "@divinevoxel/core/Types";
import { MesherDataTool } from "@amodx/meshing/Tools/MesherDataTools.js";
import { Mesher } from "../Classes/Mesher.js";
import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types.js";
import { BinaryNumberTypes } from "@amodx/binary";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
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

const mesherData = new MesherDataTool();
mesherData.attributes.set("cuv3", [[], 3, BinaryNumberTypes.Float32]);
mesherData.vars.set("texture", 0);

const TextureProcessor = {
  height: 16,
  width: 16,
  depth: 1 / 16,

  processTexture(buildTask: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] {
    const [location, type, data] = buildTask;
    const textureId: number = data.textureId;
    const textureData = data.textureData;
    mesherData.setVar("texture", textureId);

    this.width = Math.sqrt(textureData.length / 4);
    this.height = Math.sqrt(textureData.length / 4);

    const textureIndex = Flat2DIndex.GetXYOrder();
    textureIndex.setBounds(this.width, this.height);

    const origin = Vector3Like.Create();

    const getData = (x: number, y: number) =>
      textureData[textureIndex.getIndexXY(x, y) * 4 + 3] == 0 ? 0 : 1;
    const uvs = mesherData.getAttribute("cuv3");
    const addUvs = (sx: number, sy: number, ex: number, ey: number) => {
      uvs.push(
        ex * factor,
        ey * factor,
        textureId,
        sx * factor,
        ey * factor,
        textureId,
        sx * factor,
        sy * factor,
        textureId,
        ex * factor,
        sy * factor,
        textureId
      );
    };

    {
      GeometryBuilder.addQuad(mesherData, origin, Quads.south);
      uvs.push(
        Quads.south.uvs.vertices[QuadVerticies.TopRight].x,
        Quads.south.uvs.vertices[QuadVerticies.TopRight].y,
        textureId,
        Quads.south.uvs.vertices[QuadVerticies.TopLeft].x,
        Quads.south.uvs.vertices[QuadVerticies.TopLeft].y,
        textureId,
        Quads.south.uvs.vertices[QuadVerticies.BottomLeft].x,
        Quads.south.uvs.vertices[QuadVerticies.BottomLeft].y,
        textureId,
        Quads.south.uvs.vertices[QuadVerticies.BottomRight].x,
        Quads.south.uvs.vertices[QuadVerticies.BottomRight].y,
        textureId
      );
    }

    {
      const backPositionZ = this.depth;
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
        textureId,
        Quads.north.uvs.vertices[QuadVerticies.TopRight].x,
        Quads.north.uvs.vertices[QuadVerticies.TopRight].y,
        textureId,
        Quads.north.uvs.vertices[QuadVerticies.BottomRight].x,
        Quads.north.uvs.vertices[QuadVerticies.BottomRight].y,
        textureId,
        Quads.north.uvs.vertices[QuadVerticies.BottomLeft].x,
        Quads.north.uvs.vertices[QuadVerticies.BottomLeft].y,
        textureId
      );
      GeometryBuilder.addQuad(mesherData, origin, Quads.north);
    }

    const factor = 1 / this.width;

    for (let x = 0; x < this.width; x++) {
      let eastFace: Vec2Array | null = null;
      let westFace: Vec2Array | null = null;
      for (let y = 0; y < this.height; y++) {
        let eastFaceExposed = true;
        let westFaceExposed = true;

        if (!getData(x, y)) {
          eastFaceExposed = false;
          westFaceExposed = false;
        }
        if (getData(x + 1, y)) {
          eastFaceExposed = false;
        }
        if (getData(x - 1, y)) {
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
          GeometryBuilder.addQuad(mesherData, origin, newQuad);

          let [sx, sy] = eastFace;
          let [ex, ey] = [x, y];
          ex += 1;
          addUvs(sx, sy, ex, ey);
          eastFace = null;
        }

        if (westFace && !westFaceExposed) {
          const newQuad = Quad.Create(
            [
              [x * factor, westFace[1]  * factor, 0],
              [x * factor, y * factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            1
          );
          GeometryBuilder.addQuad(mesherData, origin, newQuad);
          let [sx, sy] = westFace;
          let [ex, ey] = [x, y];
          ex += 1;
          addUvs(sx, sy, ex, ey);
          westFace = null;
        }
        const isPixel = getData(x, y) == 1;
        if (!getData(x + 1, y) && !eastFace && isPixel) {
          eastFace = [x, y];
        }
        if (!getData(x - 1, y) && !westFace && isPixel) {
          westFace = [x, y];
        }
      }
    }
    for (let y = 0; y < this.height; y++) {
      let topFace: Vec2Array | null = null;
      let bottomFace: Vec2Array | null = null;

      for (let x = 0; x < this.width; x++) {
        let topFaceExposed = true;
        let bottomFaceExposed = true;

        if (!getData(x, y)) {
          topFaceExposed = false;
          bottomFaceExposed = false;
        }
        if (getData(x, y + 1)) {
          topFaceExposed = false;
        }
        if (getData(x, y - 1)) {
          bottomFaceExposed = false;
        }

        if (topFace && !topFaceExposed) {
 
          const newQuad = Quad.Create(
            [
              [topFace[0] * factor, y * factor + factor, 0],
              [x * factor, y * factor + factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            0
          );
          GeometryBuilder.addQuad(mesherData, origin, newQuad);
          let [sx, sy] = topFace;
          let [ex, ey] = [x,y];

          ey += 1;
          addUvs(sx, sy, ex, ey);
          topFace = null;
        }

        if (bottomFace && !bottomFaceExposed) {
     
          const newQuad = Quad.Create(
            [
              [bottomFace[0] * factor, y * factor, 0],
              [x * factor, y * factor, factor],
            ],
            Quad.FullUVs as any,
            false,
            1
          );
          GeometryBuilder.addQuad(mesherData, origin, newQuad);
          let [sx, sy] = bottomFace;
          let [ex, ey] = [x,y];
          ey += 1;
          addUvs(sx, sy, ex, ey);
          bottomFace = null;
        }

        const isPixel = getData(x, y) == 1;
        if (!getData(x, y + 1) && !topFace && isPixel) {
          topFace = [x,y];
        }
        if (!getData(x, y - 1) && !bottomFace && isPixel) {
          bottomFace= [x,y];
        }
      }
    }

    const [attributes, transfers] = mesherData.getAllAttributes();

    mesherData.resetVars();

    for (const [type, data] of attributes) {
      if (type == "position") {
        for (let i = 0; i < data.length; i++) {
          (data as any as number[])[i] -= 0.5;
        }
      }
    }
    mesherData.resetAttributes();
    return [[location, attributes], transfers];
  },
};

class TXTBuilderBase extends Mesher {
  build(data: BuildNodeMesh) {
    return TextureProcessor.processTexture(data);
  }
}

export const TextureBuilder = new TXTBuilderBase("#dve_node_texture");
