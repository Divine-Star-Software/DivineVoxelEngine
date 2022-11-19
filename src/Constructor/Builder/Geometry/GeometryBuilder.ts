import {
 GeometryBuildData,
 QuadDimensions,
 QuadTransforms,
} from "Meta/Constructor/Geometry/Geometry.types";
import { DirectionNames, Vector3 } from "Meta/Util.types";
import { QuadBuilder } from "./Quad/QuadBuilder.js";
import { QuadUVs } from "./Quad/QuadUVs.js";

export const GeometryBuilder = {
 data: <GeometryBuildData>{},

 quads: {
  builder: QuadBuilder,
  uvs: QuadUVs,
 },

 setData(data: GeometryBuildData) {
  this.data = data;
 },
 clearData() {
  (this as any).data = null;
 },

 createQuad(
  directon: DirectionNames,
  dimensions: QuadDimensions,
  origion: Vector3,
  flip = false,
  transforms?: QuadTransforms
 ) {
  QuadBuilder.create(
   directon,
   origion,
   dimensions,
   this.data,
   flip,
   transforms
  );
 },

};
