import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";

export type Directions = "north" | "south" | "east" | "west";
const diagonalLineGenerators: Record<
 Directions,
 (
  voxel: string,
  shapeState: number,
  yStart: number,
  xzStart: number,
  start: number,
  end: number
 ) => void
> = {
 north: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;
  for (let z = start; z < end; z++) {
   DVEW.worldData.paintVoxel(voxel, "default", shapeState, xzStart, y, z);
   y++;
  }
 },
 south: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;

  for (let z = start; z > end; z--) {
   DVEW.worldData.paintVoxel(voxel, "default", shapeState, xzStart, y, z);
   y++;
  }
 },
 east: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;
  for (let x = start; x < end; x++) {
   DVEW.worldData.paintVoxel(voxel, "default", shapeState, x, y, xzStart);
   y++;
  }
 },
 west: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;
  for (let x = start; x > end; x--) {
   DVEW.worldData.paintVoxel(voxel, "default", shapeState, x, y, xzStart);
   y++;
  }
 },
};

export const GenerateDiagonalLine = (
 direction: Directions,
 voxel: string,
 shapeState: number,
 yStart: number,
 xzStart: number,
 start: number,
 end: number
) => {
 diagonalLineGenerators[direction](
  voxel,
  shapeState,
  yStart,
  xzStart,
  start,
  end
 );
};
