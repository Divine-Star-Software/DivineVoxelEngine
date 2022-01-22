import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type {
 VoxelShapeAddData,
 VoxelShapeAddReturnData,
 VoxelShapeInterface,
} from "Meta/Builder/Shapes/VoxelShape.interface";

type BoxFaceFunction = (data: VoxelShapeAddData) => VoxelShapeAddReturnData;

export class BoxVoxelShape implements VoxelShapeInterface {
 id = "Box";
 width: number = 0.5;
 depth: number = 0.5;
 height: number = 0.5;
 constructor(public shapeHelper: ShapeHelperInterface) {}
 faces: Record<number, BoxFaceFunction> = {
  //add top face
  0: (data: VoxelShapeAddData) => {
   data.positions.push(
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
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateAOColor(
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );


   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add bottom face
  1: (data: VoxelShapeAddData) => {
   data.positions.push(
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
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateAOColor(
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );


   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add west face
  2: (data: VoxelShapeAddData) => {
   data.positions.push(
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
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );


   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add east face
  3: (data: VoxelShapeAddData) => {
   data.positions.push(
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
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateAOColor(
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );


   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add north face
  4: (data: VoxelShapeAddData) => {
   data.positions.push(
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
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateAOColor(
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );


   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
    newAOIndex: data.aoIndex + 4,
   };
  },
  //add south face
  5: (data: VoxelShapeAddData) => {
   data.positions.push(
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
   this.shapeHelper.calculateRGBLightColor(
    data.RGBLightColors,
    data.RGBLightTemplate,
    data.rgbLightIndex
   );
   this.shapeHelper.calculateAOColor(
    data.AOColors,
    data.aoTemplate,
    data.aoIndex
   );
   this.shapeHelper.calculateSunightColor(
    data.sunLightColors,
    data.sunLightTemplate,
    data.sunlightIndex
   );

   return {
    newIndicieIndex: data.indicieIndex + 4,
    newUVTemplateIndex: data.uvTemplateIndex + 1,
    newRGBLightIndex: data.rgbLightIndex + 4,
    newColorIndex: data.colorIndex + 4,
    newSunLightIndex: data.sunlightIndex + 4,
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
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "bottom")) {
   const newData = this.faces[1](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "west")) {
   const newData = this.faces[2](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "east")) {
   const newData = this.faces[3](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "north")) {
   const newData = this.faces[4](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  if (this.shapeHelper.util.isFaceExposexd(data.face, "south")) {
   const newData = this.faces[5](data);
   data.indicieIndex = newData.newIndicieIndex;
   data.uvTemplateIndex = newData.newUVTemplateIndex;
   data.rgbLightIndex = newData.newRGBLightIndex;
   data.aoIndex = newData.newAOIndex;
   data.colorIndex = newData.newColorIndex;
   data.sunlightIndex = newData.newSunLightIndex;
  }
  return {
   newIndicieIndex: data.indicieIndex,
   newUVTemplateIndex: data.uvTemplateIndex,
   newColorIndex: data.colorIndex,
   newRGBLightIndex: data.rgbLightIndex,
   newSunLightIndex: data.sunlightIndex,
   newAOIndex: data.aoIndex,
  };
 }
}
