import type { VoxelShapeAddData } from "Meta/index";
import type { DirectionNames, Position3Matrix } from "Meta/Util.types";
type DimenionsMatrix = { width: number; height: number; depth: number };
const defaultTransform = {
 v1: { x: 0, y: 0, z: 0 },
 v2: { x: 0, y: 0, z: 0 },
 v3: { x: 0, y: 0, z: 0 },
 v4: { x: 0, y: 0, z: 0 },
};
export const ShapeBuilder = {
 faceFunctions: <
  Record<
   DirectionNames,
   (
    origion: Position3Matrix,
    dimensions: DimenionsMatrix,
    data: VoxelShapeAddData,
    transform: typeof defaultTransform,
    flip?: boolean
   ) => void
  >
 >{
  top: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + dimensions.height + transform.v4.y,
     origion.z + -dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + -dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   }
   data.indices.push(
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex,

    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex
   );
   data.normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
   data.indicieIndex += 4;
  },
  bottom: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + dimensions.width + transform.v2.x,
     origion.y + -dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + -dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + -dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + -dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0);
   data.indicieIndex += 4;
  },
  //front
  south: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + -dimensions.depth + transform.v3.z,
     //v4
     origion.x + -dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + -dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + -dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + -dimensions.depth + transform.v4.z
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);

   data.indicieIndex += 4;
  },
  //back
  north: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + dimensions.depth + transform.v2.z,
     //v3
     origion.x + -dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + dimensions.depth + transform.v1.z,
     //v2
     origion.x + dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + dimensions.depth + transform.v2.z,
     //v3
     origion.x + -dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + -dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   }
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
   data.indicieIndex += 4;
  },
  //left
  west: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + -dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + -dimensions.depth + transform.v3.z,
     //v4
     origion.x + -dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + -dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + dimensions.depth + transform.v1.z,
     //v2
     origion.x + -dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + dimensions.depth + transform.v2.z,
     //v3
     origion.x + -dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + -dimensions.depth + transform.v3.z,
     //v4
     origion.x + -dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + -dimensions.depth + transform.v4.z
    );
   }

   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.normals.push(-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0);
   data.indicieIndex += 4;
  },
  //right
  east: (origion, dimensions, data, transform, flip) => {
   if (!flip) {
    data.positions.push(
     //v1
     origion.x + dimensions.width + transform.v1.x,
     origion.y + dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + -dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + -dimensions.depth + transform.v4.z
    );
   } else {
    data.positions.push(
     //v1
     origion.x + dimensions.width + transform.v1.x,
     origion.y + -dimensions.height + transform.v1.y,
     origion.z + -dimensions.depth + transform.v1.z,
     //v2
     origion.x + dimensions.width + transform.v2.x,
     origion.y + dimensions.height + transform.v2.y,
     origion.z + -dimensions.depth + transform.v2.z,
     //v3
     origion.x + dimensions.width + transform.v3.x,
     origion.y + dimensions.height + transform.v3.y,
     origion.z + dimensions.depth + transform.v3.z,
     //v4
     origion.x + dimensions.width + transform.v4.x,
     origion.y + -dimensions.height + transform.v4.y,
     origion.z + dimensions.depth + transform.v4.z
    );
   }

   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   data.normals.push(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0);
   data.indicieIndex += 4;
  },
 },

 addFace(
  direction: DirectionNames,
  origion: Position3Matrix,
  dimensions: DimenionsMatrix,
  data: VoxelShapeAddData,
  flip = false,
  transform = defaultTransform
 ) {
  this.faceFunctions[direction](origion, dimensions, data, transform, flip);
 },
};
