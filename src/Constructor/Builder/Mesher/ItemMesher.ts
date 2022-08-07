import {
 ConstructItemIndexes,
 ConstructorToRenderMessages,
} from "../../../Constants/InterComms/ConstructorToRender.js";
import type { CreateItemData } from "Meta/Constructor/ItemShape.type.js";
import type { ItemProcessData } from "Meta/Items/Item.types.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";

export const ItemMesher = {
 createItem(itemId: string, x: number, y: number, z: number) {
  const item = DVEC.itemManager.getItem(itemId);
  const itemProcessData: ItemProcessData = {
   uvs: [],
  };
  item.process(itemProcessData, DVEC.DVEB);

  const itemShapeData = DVEC.itemManager.getItemShapeData(item.data.shapeId);
  const faces = itemShapeData.faces;

  const position = { x: 0, y: 0, z: 0 };
  const dimensions = { width: 0, depth: 0, height: 0 };
  const createData: CreateItemData = {
   //actual mesh data
   positions: [],
   normals: [],
   indices: [],
   RGBLightColors: [],
   sunLightColors: [],
   uvs: [],
   indicieIndex: 0,

   unTemplate: itemProcessData.uvs,
   uvTemplateIndex: 0,
   lightTemplate: [],
   lightIndex: 0,
  };

  const uv = itemProcessData.uvs[0];
  for (let i = 0; i < faces.length; i++) {
   const face = faces[i];
   position.x = face.position[0];
   position.y = face.position[1];
   position.z = face.position[2];
   dimensions.width = face.dimensions[0];
   dimensions.depth = face.dimensions[1];
   dimensions.height = face.dimensions[2];
   DVEC.DVEB.shapeBuilder.addFace(
    face.direction,
    position,
    dimensions,
    createData
   );
   let rotation: Rotations = 0;
   if (face.direction == "north") {
    rotation = 360;
   }
   DVEC.DVEB.uvHelper.addUVs(face.direction, {
    uvs: createData.uvs,
    uv: uv,
    width: { start: face.uvs[0], end: face.uvs[1] },
    height: { start: face.uvs[2], end: face.uvs[3] },
    flipped: false,
    rotoate: rotation,
   });
  }
  DVEC.DVEB.shapeHelper.calculateLightColorFromValue(
   createData.RGBLightColors,
   createData.sunLightColors,
   0xffff
  );

  const positionArray = new Float32Array(createData.positions);
  const normalsArray = new Float32Array(createData.normals);
  const indiciesArray = new Int32Array(createData.indices);
  const RGBLightColorsArray = new Float32Array(createData.RGBLightColors);
  const sunLightColorsArray = new Float32Array(createData.sunLightColors);
  const uvArray = new Float32Array(createData.uvs);
  const message: any[] = [];
  message[ConstructItemIndexes.x - 1] = x;
  message[ConstructItemIndexes.y - 1] = y;
  message[ConstructItemIndexes.z - 1] = z;
  message[ConstructItemIndexes.positionArray - 1] = positionArray.buffer;
  message[ConstructItemIndexes.normalsArray - 1] = normalsArray.buffer;
  message[ConstructItemIndexes.indiciesArray - 1] = indiciesArray.buffer;
  message[ConstructItemIndexes.RGBLightColorsArray - 1] =
   RGBLightColorsArray.buffer;
  message[ConstructItemIndexes.sunLightColorsArray - 1] =
   sunLightColorsArray.buffer;
  message[ConstructItemIndexes.uvArray - 1] = uvArray.buffer;
  
  const transfers = [
   positionArray.buffer,
   normalsArray.buffer,
   indiciesArray.buffer,
   RGBLightColorsArray.buffer,
   sunLightColorsArray.buffer,
   uvArray.buffer,
  ];
  DVEC.renderComm.sendMessage(
   ConstructorToRenderMessages.constructItem,
   message,
   transfers
  );
 },
};
