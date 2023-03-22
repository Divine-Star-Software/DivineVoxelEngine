import { LightData } from "../../../../Data/Light/LightByte.js";
import type { QuadData } from "../../Types/ShapeBuilder.types";
import { ShapeTool } from "../ShapeTool.js";

export const ShapeBuilder = {
 build(quads: QuadData[]) {
  for (const quad of quads) {
   if (quad[6] >= 0) {
    ShapeTool.builder.quad.setFlipped(quad[6] == 1);
   }
   ShapeTool.builder.quad
    .setDimensions(quad[1][0], quad[1][1])
    .setDirection(quad[0])
    .updatePosition(quad[2][0], quad[2][1], quad[2][2])
    .overlayUVs.add(ShapeTool.data.getOverlayUV())
    .uvs.setRoation(quad[5][0])
    .uvs.setWidth(quad[5][1], quad[5][2])
    .uvs.setHeight(quad[5][3], quad[5][4])
    .uvs.add(ShapeTool.data.getUV()[0]);

   const aoData = ShapeTool.data.getAO();

   if (aoData.length == 4 && quad[3].length == 4) {
    ShapeTool.builder.quad.AO.add([
     quad[3][0] < 0 ? aoData[Math.abs(quad[3][0]) - 1] : quad[3][0],
     quad[3][1] < 0 ? aoData[Math.abs(quad[3][1]) - 1] : quad[3][1],
     quad[3][2] < 0 ? aoData[Math.abs(quad[3][2]) - 1] : quad[3][2],
     quad[3][3] < 0 ? aoData[Math.abs(quad[3][3]) - 1] : quad[3][3],
    ]);
   }


   const lightData = ShapeTool.data.getLight();

   if (lightData.length == 4 && quad[4].length == 4) {
    if (quad[4][0] == -5) {
     ShapeTool.builder.quad.light.add([this._getBrightestLight(lightData)]);
    } else {
     ShapeTool.builder.quad.light.add([
      quad[4][0] < 0 ? lightData[Math.abs(quad[4][0]) - 1] : quad[4][0],
      quad[4][1] < 0 ? lightData[Math.abs(quad[4][1]) - 1] : quad[4][1],
      quad[4][2] < 0 ? lightData[Math.abs(quad[4][2]) - 1] : quad[4][2],
      quad[4][3] < 0 ? lightData[Math.abs(quad[4][3]) - 1] : quad[4][3],
     ]);
    }
   }
   ShapeTool.builder.quad.create().uvs.clear().clearTransform();
  }
 },

 _getBrightestLight(data: number[]) {
  let s = 0;
  let r = 0;
  let g = 0;
  let b = 0;
  for (const nl of data) {
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
  }

  let rl = LightData.setS(s, 0);
  rl = LightData.setR(r, rl);
  rl = LightData.setG(g, rl);
  return LightData.setB(b, rl);
 },
};
