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
   DVEW.worldData.paintVoxel(voxel, 0, shapeState, xzStart, y, z);
   for(let zy = y - 1; zy >= yStart ; zy--) {
    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, xzStart, zy, z);
   } 
   y++;
  }
 },
 south: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;

  for (let z = start; z > end; z--) {
   DVEW.worldData.paintVoxel(voxel, 0, shapeState, xzStart, y, z);
   for(let zy = y - 1; zy >= yStart ; zy--) {
    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, xzStart, zy, z);
   } 
   y++;
  }
 },
 east: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;
  for (let x = start; x < end; x++) {
   DVEW.worldData.paintVoxel(voxel, 0, shapeState, x, y, xzStart);
   for(let zy = y - 1; zy >= yStart ; zy--) {
    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, x, zy, xzStart);
   } 
   y++;
  }
 },
 west: (voxel, shapeState, yStart, xzStart, start, end) => {
  let y = yStart;
  for (let x = start; x > end; x--) {
   DVEW.worldData.paintVoxel(voxel, 0, shapeState, x, y, xzStart);

   for(let zy = y - 1; zy >= yStart ; zy--) {
    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, shapeState, x, zy, xzStart);
   } 
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
