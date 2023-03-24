import type { QuadData } from "../../Types/ShapeBuilder.types";
import { QuadVertexData } from "../../Classes/VertexData.js";
import { LightData } from "../../../../Data/Light/LightByte.js";
import { ShapeTool } from "../ShapeTool.js";
import { QuadVertexes } from "Constructor/Builder/Types/Geometry.types.js";

const LightValue = new QuadVertexData();
const AOValue = new QuadVertexData();

const getIndex = (v: number) => {
 return <QuadVertexes>Math.abs(v);
};

export const ShapeBuilder = {
 build(quads: QuadData[]) {
  const aoData = ShapeTool.data.getWorldAO();
  const lightData = ShapeTool.data.getWorldLight();
  for (const quad of quads) {
   if (quad[6] >= 0) {
    ShapeTool.builder.quad.setFlipped(quad[6] == 1);
   }

   ShapeTool.builder.quad
    .setDimensions(quad[1][0], quad[1][1])
    .setDirection(quad[0])
    .updatePosition(quad[2][0], quad[2][1], quad[2][2])
    .textures.setRoation(quad[5][0])
    .setWidth(quad[5][1], quad[5][2])
    .setHeight(quad[5][3], quad[5][4])
    .add(ShapeTool.data.getUV())
    .overlayTexture.add(ShapeTool.data.getOverlayTextures());
   AOValue.setAll(0);
   AOValue.set(
    quad[3][0] < 0 ? aoData.vetexes[getIndex(quad[3][0])] : quad[3][0],
    quad[3][1] < 0 ? aoData.vetexes[getIndex(quad[3][1])] : quad[3][1],
    quad[3][2] < 0 ? aoData.vetexes[getIndex(quad[3][2])] : quad[3][2],
    quad[3][3] < 0 ? aoData.vetexes[getIndex(quad[3][3])] : quad[3][3]
   );

   ShapeTool.builder.quad.AO.add(AOValue);

   LightValue.setAll(0);
   if (quad[4][0] == -5) {
    this._getBrightestLight(lightData);
   } else {
    LightValue.set(
     quad[4][0] < 0 ? lightData.vetexes[getIndex(quad[4][0])] : quad[4][0],
     quad[4][1] < 0 ? lightData.vetexes[getIndex(quad[4][1])] : quad[4][1],
     quad[4][2] < 0 ? lightData.vetexes[getIndex(quad[4][2])] : quad[4][2],
     quad[4][3] < 0 ? lightData.vetexes[getIndex(quad[4][3])] : quad[4][3]
    );
   }
   ShapeTool.builder.quad.light.add(LightValue);

   ShapeTool.builder.quad.create().textures.clear().clearTransform();
  }
 },

 _getBrightestLight(data: QuadVertexData) {
  let s = 0;
  let r = 0;
  let g = 0;
  let b = 0;
  data.forEach((v, nl) => {
   const sl = LightData.getS(nl);
   if (sl > s) {
    s = sl;
   }

   const rl = LightData.getR(nl);
   if (rl > r) {
    r = rl;
   }

   const gl = LightData.getG(nl);
   if (gl > g) {
    g = gl;
   }

   const bl = LightData.getB(nl);
   if (bl > b) {
    b = bl;
   }
  });

  let rl = LightData.setS(s, 0);
  rl = LightData.setR(r, rl);
  rl = LightData.setG(g, rl);
  rl = LightData.setB(b, rl);
  LightValue.setAll(rl);
 },
};
