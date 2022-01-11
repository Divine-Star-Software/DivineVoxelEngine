import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type {
 VoxelShapeAddData,
 VoxelShapeAddReturnData,
 VoxelShapeInterface,
} from "Meta/Builder/Shapes/VoxelShape.interface";

type BoxFaceFunction = (data: VoxelShapeAddData) => VoxelShapeAddReturnData;

export class BoxVoxelShape implements VoxelShapeInterface {
 width: number = 0.5;
 depth: number = 0.5;
 height: number = 0.5;
 constructor(public shapeHelper: ShapeHelperInterface) {}
 faces: Record<number, BoxFaceFunction> = {
  //add top face
  0: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + -this.depth,
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + -this.depth
   );
   data.indices.push(
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex,
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add bottom face
  1: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth,
    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth,
    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + this.depth,
    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + this.depth
   );
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add west face
  2: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + -this.depth,
    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + this.depth,

    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth
   );
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add east face
  3: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + -this.depth,

    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth,
    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + this.depth
   );
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add north face
  4: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + -this.depth,

    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + -this.depth,
    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth,

    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + -this.depth
   );
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,

    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add south face
  5: (data: VoxelShapeAddData) => {
   data.postions.push(
    data.position.x + this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + -this.width,
    data.position.y + this.height,
    data.position.z + this.depth,
    data.position.x + -this.width,
    data.position.y + -this.height,
    data.position.z + this.depth,
    data.position.x + this.width,
    data.position.y + -this.height,
    data.position.z + this.depth
   );
   data.indices.push(
    data.indicieIndex + 2,
    data.indicieIndex + 1,
    data.indicieIndex,
    data.indicieIndex + 3,
    data.indicieIndex + 2,
    data.indicieIndex
   );
   const uv = data.unTemplate[data.uvTemplateIndex];
   data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
   this.shapeHelper.calculateAOColor(
    data.linearColors,
    data.aoTemplate,
    data.aoIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newLightIndex: data.lightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
 };

 addToChunkMesh(data: VoxelShapeAddData) {
  data.position.x += this.width;
  data.position.z += this.depth;
  data.position.y += this.height;

  if (this.shapeHelper.util.isFaceExposexd(data.face, "top")) {
   const newData = this.faces[0](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "bottom")) {
   const newData = this.faces[1](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "west")) {
   const newData = this.faces[2](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "east")) {
   const newData = this.faces[3](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "north")) {
   const newData = this.faces[4](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "south")) {
   const newData = this.faces[5](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.lightIndex = newData.newLightIndex;
   data.aoIndex = newData.newAOIndex;
  }
  return {
   newIndicieIndex: data.indicieIndex,
   newUVTemplateIndex: data.uvTemplateIndex,
   newLightIndex: data.lightIndex,
   newAOIndex: data.aoIndex,
  };
 }
}
