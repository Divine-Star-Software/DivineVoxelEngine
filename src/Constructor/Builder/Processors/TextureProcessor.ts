import { TypedArrays } from "divine-binary-object/Types/DBO.types";
import { DirectionNames } from "Meta";
import { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
import { MeshBuilderTool } from "../Tools/MeshBuilderTool.js";
import { MesherDataTool } from "../Tools/MesherDataTools.js";

type ItemShapeData = {
 id: string;
 faces: {
  direction: DirectionNames;
  position: [number, number, number];
  dimensions: [number, number, number];
  uvs: [number, number, number, number];
 }[];
};

type FaceData = {
 xStart: number;
 xEnd: number;
 yStart: number;
 yEnd: number;
 type: Faces;
};

type Faces = "west" | "east" | "top" | "bottom";
const POSFunction: Record<Faces, (face: FaceData) => [number, number, number]> =
 {
  top: (face) => {
   const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
   let y = (yStart + 1) / TextureProcessor.height;

   let x =
    (face.xStart + (face.xEnd - face.xStart + 1) / 2) / TextureProcessor.width;
   return [x, y, 0];
  },
  bottom: (face) => {
   const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
   let y = yStart / TextureProcessor.height;

   let x =
    (face.xStart + (face.xEnd - face.xStart + 1) / 2) / TextureProcessor.width;
   return [x, y, 0];
  },
  east: (face) => {
   const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));

   let y =
    (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;

   let x = (face.xStart + 1) / TextureProcessor.width;
   return [x, y, 0];
  },
  west: (face) => {
   const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));

   let y =
    (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;

   let x = face.xEnd / TextureProcessor.width;
   return [x, y, 0];
  },
 };

const DIMFunction: Record<Faces, (face: FaceData) => [number, number]> = {
 top: (face) => {
  const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
  return [width, TextureProcessor.depth];
 },
 bottom: (face) => {
  const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
  return [width, TextureProcessor.depth];
 },
 east: (face) => {
  const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
  return [TextureProcessor.depth, height];
 },
 west: (face) => {
  const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
  return [TextureProcessor.depth, height];
 },
};

const mesher = new MeshBuilderTool();
const mesherData = new MesherDataTool();
mesherData.attributes.add([["cuv3", [[], 3, "32f"]]]);
mesherData.vars.add([["texture", 0]]);
mesher.setMesherTool(mesherData);
export const TextureProcessor = {
 visitedMap: <Record<Faces, Record<string, boolean>>>{
  top: {},
  bottom: {},
  east: {},
  west: {},
 },

 _resetVisitedMap() {
  this.visitedMap = {
   top: {},
   bottom: {},
   east: {},
   west: {},
  };
 },

 faceMap: <Record<DirectionNames, number>>{
  top: 0,
  bottom: 1,
  east: 2,
  west: 3,
  south: 4,
  north: 5,
 },

 height: 16,
 width: 16,
 depth: 1 / 16,

 getPosition: POSFunction,
 getDimensions: DIMFunction,

 getTruePosition(face: FaceData) {
  return {
   xStart: face.xStart / (this.width - 1),
   xEnd: face.xEnd / (this.width - 1),
   yStart: Math.abs(face.yEnd - (this.height - 1)) / (this.height - 1),
   yEnd: Math.abs(face.yStart - (this.height - 1)) / (this.height - 1),
  };
 },

 processTexture(buildTask: BuildNodeMesh) {
  const [location, type, data] = buildTask;
  const textureId = data.textureId;
  const textureData = data.textureData;
  mesherData.setVar("texture", textureId);

  const processed: number[][] = [];

  this.width = Math.sqrt(textureData.length / 4);
  this.height = Math.sqrt(textureData.length / 4);

  let x = 0;
  let y = 0;
  for (let i = 0; i < textureData.length; i += 4) {
   if (!processed[y]) {
    processed[y] = [];
   }
   if (textureData[i + 3]) {
    processed[y].push(1);
   } else {
    processed[y].push(0);
   }
   x++;
   if (x == this.width) {
    y++;
    x = 0;
   }
  }

  mesher.quad
   .setDirection("south")
   .setDimensions(1, 1)
   .setPosition(0.5, 0.5, -this.depth / 2)
   .uvs.setWidth(0, 1)
   .setHeight(0, 1)
   .add(mesherData.getVar("texture")!)
   .create()
   .setDirection("north")
   .setPosition(0.5, 0.5, this.depth / 2)
   .uvs.add(mesherData.getVar("texture")!)
   .create();

  for (let y = 0; y < this.height; y++) {
   for (let x = 0; x < this.width; x++) {
    if (!processed[y][x]) continue;
    const result = this._process(processed, x, y);
    if (result.t && !this.visited(x, y, "top")) {
     this.visit(x, y, "top");
     mesher.quad.setDirection("top");
     this.buildFace(this.gettopFace(processed, x, y));
    }
    if (result.b && !this.visited(x, y, "bottom")) {
     this.visit(x, y, "bottom");
     mesher.quad.setDirection("bottom");
     this.buildFace(this.getbottomFace(processed, x, y));
    }
    if (result.w && !this.visited(x, y, "west")) {
     this.visit(x, y, "west");
     mesher.quad.setDirection("west");
     this.buildFace(this.getwestFace(processed, x, y));
    }
    if (result.e && !this.visited(x, y, "east")) {
     this.visit(x, y, "east");
     mesher.quad.setDirection("east");
     this.buildFace(this.geteastFace(processed, x, y));
    }
   }
  }
  this._resetVisitedMap();

  const [attributes, transfers] = mesherData.getAllAttributes();

  mesher.quad.clear();
  mesherData.resetAll();

  const returnData: SetNodeMesh = [
   location,
   //@ts-ignore
   attributes,
  ];

  
  return [returnData, transfers] as const;
 },

 _process(data: number[][], x: number, y: number) {
  let addwest = false;
  let addeast = false;
  let addbottom = false;
  let addtop = false;

  if (!data[y - 1]) {
   addtop = true;
  }
  if (data[y - 1]) {
   if (!data[y - 1][x]) {
    addtop = true;
   }
  }

  if (!data[y + 1]) {
   addbottom = true;
  }
  if (data[y + 1]) {
   if (!data[y + 1][x]) {
    addbottom = true;
   }
  }

  if (!data[y][x - 1]) {
   addwest = true;
  }

  if (!data[y][x + 1]) {
   addeast = true;
  }

  return {
   w: addwest,
   e: addeast,
   t: addtop,
   b: addbottom,
  };
 },

 gettopFace(data: number[][], sx: number, y: number) {
  const face = this.getBlankFace(sx, y, "top");
  let endX = sx;
  for (let x = sx; x < this.width; x++) {
   const result = this._process(data, x, y);
   this.visit(x, y, "top");
   if (!result.t || !data[y][x] || x == this.width - 1) {
    if (x == this.width - 1) {
     endX = x;
    } else {
     endX = x - 1;
    }
    break;
   }
  }
  face.xEnd = endX;
  return face;
 },

 getbottomFace(data: number[][], sx: number, y: number) {
  const face = this.getBlankFace(sx, y, "bottom");
  let endX = sx;
  for (let x = sx; x < this.width; x++) {
   const result = this._process(data, x, y);
   this.visit(x, y, "bottom");
   if (!result.b || !data[y][x] || x == this.width - 1) {
    if (x == this.width - 1) {
     endX = x;
    } else {
     endX = x - 1;
    }
    break;
   }
  }
  face.xEnd = endX;
  return face;
 },

 getwestFace(data: number[][], x: number, sy: number) {
  const face = this.getBlankFace(x, sy, "west");
  let endY = sy;
  for (let y = sy; y < this.height; y++) {
   const result = this._process(data, x, y);
   this.visit(x, y, "west");
   if (!result.w || !data[y][x] || y == this.height - 1) {
    if (y == this.height - 1) {
     endY = y;
    } else {
     endY = y - 1;
    }

    break;
   }
  }
  face.yEnd = endY;
  return face;
 },

 geteastFace(data: number[][], x: number, sy: number) {
  const face = this.getBlankFace(x, sy, "east");
  let endY = sy;
  for (let y = sy; y < this.height; y++) {
   const result = this._process(data, x, y);
   this.visit(x, y, "east");
   if (!result.e || !data[y][x] || y == this.height - 1) {
    if (y == this.height - 1) {
     endY = y;
    } else {
     endY = y - 1;
    }
    break;
   }
  }
  face.yEnd = endY;
  return face;
 },

 getBlankFace(x: number, y: number, face: Faces) {
  return {
   xStart: x,
   xEnd: x,
   yStart: y,
   yEnd: y,
   type: face,
  };
 },

 visit(x: number, y: number, face: Faces) {
  this.visitedMap[face][`${x}-${y}`] = true;
 },

 visited(x: number, y: number, face: Faces) {
  return this.visitedMap[face][`${x}-${y}`];
 },

 calculateUV(face: FaceData): [number, number, number, number] {
  const ws = face.xStart / this.width;
  const we = (face.xEnd + 1) / this.width;
  const hs = face.yStart / this.height;
  const he = (face.yEnd + 1) / this.height;
  return [ws, we, hs, he];
 },

 buildFace(face: FaceData) {
  const uv = this.calculateUV(face);
  const dim = this.getDimensions[face.type](face);
  const pos = this.getPosition[face.type](face);
  mesher.quad
   .setDimensions(dim[0], dim[1])
   .setPosition(pos[0], pos[1], pos[2])
   .uvs.setWidth(uv[0], uv[1])
   .setHeight(uv[2], uv[3])
   .add(mesherData.getVar("texture")!)
   .create();
 },
};
