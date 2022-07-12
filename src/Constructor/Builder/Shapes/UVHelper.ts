import { VoxelShapeAddData } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";

type UVCords = { start: number; end: number };
type Rotations = 0 | 90 | 180 | 270;

type UVFunctionData = {
 uvs: number[];
 uv: number;
 width: UVCords;
 height: UVCords;
 flipped: boolean;
 rotoate: Rotations;
};
/**
 * |||||||||||||||||||||||||||||||||||||
 * [TOP & BOTTOM]
 * Not Flipped
 *
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 * ===============================
 * Flipped
 *
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 *||||||||||||||||||||||||||||||||||||||||
 * [Sides]
 * Not Flipped
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 * ===============================
 * Flipped
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 */
export const UVHelper = {
 uvRotations: <
  Record<
   "top" | "side" | "bottom",
   Record<
    Rotations,
    (
     uv: number,
     ws: number,
     we: number,
     hs: number,
     he: number,
     flipped: boolean,
     uvs: number[]
    ) => void
   >
  >
 >{
  top: {
   0: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    } else {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    }
   },
   90: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    } else {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    }
   },
   180: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    } else {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    }
   },
   270: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    } else {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    }
   },
  },
  bottom: {
   0: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    } else {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    }
   },
   90: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    } else {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    }
   },
   180: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    } else {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    }
   },
   270: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    } else {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    }
   },
  },
  side: {
   0: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    } else {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    }
   },
   90: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
    } else {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    }
   },
   180: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
    } else {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    }
   },
   270: (uv, ws, we, hs, he, flipped, uvs) => {
    if (!flipped) {
     uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
    } else {
     uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
    }
   },
  },
 },
 uvFunctions: <Record<DirectionNames, (data: UVFunctionData) => void>>{
  top: (data) => {
   UVHelper.uvRotations.top[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
  },
  bottom: (data) => {
   UVHelper.uvRotations.bottom[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
  },
  north: (data) => {
   UVHelper.uvRotations.side[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
  },
  south: (data) => {
   UVHelper.uvRotations.side[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
  },
  east: (data) => {
   UVHelper.uvRotations.side[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
  },
  west: (data) => {
   UVHelper.uvRotations.side[data.rotoate](
    data.uv,
    data.width.start,
    data.width.end,
    data.height.start,
    data.height.end,
    data.flipped,
    data.uvs
   );
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
