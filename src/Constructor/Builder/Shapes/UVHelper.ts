import { VoxelShapeAddData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";

type UVFunctionData = {
 uvs: number[];
 uv: number;
 startPercent: number;
 endPerfect: number;
 flipped: boolean;
 rotoate: number;
};

export const UVHelper = {
 uvFunctions: <Record<DirectionNames, (data: UVFunctionData) => void>>{
  top: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
   } else {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   }
  },
  bottom: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
   } else {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   }
  },
  north: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   } else {
    data.uvs.push(s, e, uv, e, e, uv, e, s, uv, e, e, uv);
   }
  },
  south: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   } else {
    data.uvs.push(s, e, uv, e, e, uv, e, s, uv, e, e, uv);
   }
  },
  east: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   } else {
    data.uvs.push(s, e, uv, e, e, uv, e, s, uv, e, e, uv);
   }
  },
  west: (data) => {
   let uv = data.uv;
   let s = data.startPercent;
   let e = data.endPerfect;
   if (!data.flipped) {
    data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
   } else {
    data.uvs.push(s, e, uv, e, e, uv, e, s, uv, e, e, uv);
   }
  },
 },

 addUVs(face: DirectionNames, data: UVFunctionData) {
  this.uvFunctions[face](data);
 },

 processOverlayUVs(data: VoxelShapeAddData) {
  let k = data.overylayUVTemplateIndex;
  let i = 4;
  while (i--) {
   data.overlayUVs.push(
    data.overylayUVTemplate[k],
    data.overylayUVTemplate[k + 1],
    data.overylayUVTemplate[k + 2],
    data.overylayUVTemplate[k + 3]
   );
  }
 },
};
