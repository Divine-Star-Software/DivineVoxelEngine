//types
import type { MatrixLoadedChunk } from "Meta/Matrix/Matrix.types.js";
import type { EngineSettingsData, VoxelData } from "Meta/index.js";
//objects
import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//functions
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import { FullChunkTemplate } from "Meta/Constructor/ChunkTemplate.types.js";
import { VoxelProcessData } from "Meta/Constructor/Voxel.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
 heightByte: Util.getHeightByte(),
 voxelByte: Util.getVoxelByte(),
 faceByte: Util.getFaceByte(),
 _3dArray: Util.getFlat3DArray(),
 lightByte: Util.getLightByte(),
 worldMatrix: WorldMatrix,
 voxellightMixCalc: VoxelLightMixCalc,
 doVoxelLight: CalculateVoxelLight,
 chunkTemplates: <Record<number, Record<number, number[][]>>>{},
 exposedFaces: <number[]>[],
 faceStates: <number[]>[],
 textureRotation: <Rotations[]>[],
 settings: {
  doAO: true,
  doSun: true,
  doRGB: true,
 },
 getBaseTemplateNew(): FullChunkTemplate {
  return {
   solid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    overlayUVTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   transparent: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    overlayUVTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   flora: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    overlayUVTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   fluid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    overlayUVTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   magma: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    overlayUVTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
  };
 },

 makeAllChunkTemplates(
  chunk: MatrixLoadedChunk,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): FullChunkTemplate {
  const voxels = chunk.voxels;
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  let maxX = DVEC.worldBounds.chunkXSize;
  let maxZ = DVEC.worldBounds.chunkZSize;

  for (let x = 0; x < maxX; x++) {
   for (let z = 0; z < maxZ; z++) {
    let minY = this.heightByte.getLowestExposedVoxel(x, z, chunk.heightMap);
    let maxY =
     this.heightByte.getHighestExposedVoxel(x, z, chunk.heightMap) + 1;
    for (let y = minY; y < maxY; y++) {
     const rawVoxelData = this._3dArray.getValue(x, y, z, voxels);
     if (this.voxelByte.getId(rawVoxelData) == 0) continue;
     const voxelCheck = DVEC.worldMatrix.getVoxel(
      chunkX + x,
      chunkY + y,
      chunkZ + z
     );

     if (!voxelCheck) continue;

     const voxelObject = DVEC.voxelManager.getVoxel(voxelCheck[0]);
     if (!voxelObject) continue;
     const voxelState = voxelCheck[1];

     let faceBit = 0;

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "top",
       voxelObject,
       x + chunkX,
       y + chunkY + 1,
       z + chunkZ
      )
     ) {
      this.exposedFaces[0] = 1;
      this.faceStates[0] = 0;
      this.textureRotation[0] = 0;
      faceBit = this.faceByte.markFaceAsExposed("top", faceBit);
     } else {
      this.exposedFaces[0] = 0;
      this.faceStates[0] = -1;
     }

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "bottom",
       voxelObject,
       x + chunkX,
       y + chunkY - 1,
       z + chunkZ
      )
     ) {
      this.exposedFaces[1] = 1;
      this.faceStates[1] = 0;
      this.textureRotation[1] = 0;
      faceBit = this.faceByte.markFaceAsExposed("bottom", faceBit);
     } else {
      this.exposedFaces[1] = 0;
      this.faceStates[1] = -1;
     }

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "east",
       voxelObject,
       x + chunkX + 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      this.exposedFaces[2] = 1;
      this.faceStates[2] = 0;
      this.textureRotation[2] = 0;
      faceBit = this.faceByte.markFaceAsExposed("east", faceBit);
     } else {
      this.exposedFaces[2] = 0;
      this.faceStates[2] = -1;
     }

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "west",
       voxelObject,
       x + chunkX - 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      this.exposedFaces[3] = 1;
      this.faceStates[3] = 0;
      this.textureRotation[3] = 0;
      faceBit = this.faceByte.markFaceAsExposed("west", faceBit);
     } else {
      this.exposedFaces[3] = 0;
      this.faceStates[3] = -1;
     }

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "south",
       voxelObject,
       x + chunkX,
       y + chunkY,
       z + chunkZ - 1
      )
     ) {
      this.exposedFaces[4] = 1;
      this.faceStates[4] = 0;
      this.textureRotation[4] = 0;
      faceBit = this.faceByte.markFaceAsExposed("south", faceBit);
     } else {
      this.exposedFaces[4] = 0;
      this.faceStates[4] = -1;
     }

     if (
      DVEB.voxelHelper.voxelFaceCheck(
       "north",
       voxelObject,
       x + chunkX,
       y + chunkY,
       z + chunkZ + 1
      )
     ) {
      this.exposedFaces[5] = 1;
      this.faceStates[5] = 0;
      this.textureRotation[5] = 0;
      faceBit = this.faceByte.markFaceAsExposed("north", faceBit);
     } else {
      this.exposedFaces[5] = 0;
      this.faceStates[5] = -1;
     }

     if (faceBit == 0) continue;

     let baseTemplate;
     if (voxelObject.data.substance == "transparent") {
      baseTemplate = template["solid"];
     } else {
      baseTemplate = template[voxelObject.data.substance];
     }

     voxelObject.process(
      {
       voxelState: voxelState,
       voxelData: rawVoxelData,
       exposedFaces: this.exposedFaces,
       faceStates: this.faceStates,
       textureRotations : this.textureRotation,
       shapeTemplate: baseTemplate.shapeTemplate,
       shapeStateTemplate: baseTemplate.shapeStateTemplate,
       overlayUVTemplate: baseTemplate.overlayUVTemplate,
       uvTemplate: baseTemplate.uvTemplate,
       colorTemplate: baseTemplate.colorTemplate,
       aoTemplate: baseTemplate.aoTemplate,
       lightTemplate: baseTemplate.lightTemplate,
       chunkX: chunkX,
       chunkY: chunkY,
       chunkZ: chunkZ,
       x: x,
       y: y,
       z: z,
      },
      DVEB as any
     );

     baseTemplate.positionTemplate.push(x, y, z);

     if (this.exposedFaces[0]) {
      faceBit = this.faceByte.setFaceRotateState(
       "top",
       this.faceStates[0],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "top",
       this.textureRotation[0],
       faceBit
      );
     }
     if (this.exposedFaces[1]) {
      faceBit = this.faceByte.setFaceRotateState(
       "bottom",
       this.faceStates[1],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "bottom",
       this.textureRotation[1],
       faceBit
      );
     }
     if (this.exposedFaces[2]) {
      faceBit = this.faceByte.setFaceRotateState(
       "east",
       this.faceStates[2],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "east",
       this.textureRotation[2],
       faceBit
      );
     }
     if (this.exposedFaces[3]) {
      faceBit = this.faceByte.setFaceRotateState(
       "west",
       this.faceStates[3],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "west",
       this.textureRotation[3],
       faceBit
      );
     }
     if (this.exposedFaces[4]) {
      faceBit = this.faceByte.setFaceRotateState(
       "south",
       this.faceStates[4],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "south",
       this.textureRotation[4],
       faceBit
      );
     }
     if (this.exposedFaces[5]) {
      faceBit = this.faceByte.setFaceRotateState(
       "north",
       this.faceStates[5],
       faceBit
      );
      faceBit = this.faceByte.setFaceTextureState(
       "north",
       this.textureRotation[5],
       faceBit
      );
     }

     baseTemplate.faceTemplate.push(faceBit);
    }
   }
  }
  return template;
 },

 processVoxelLight(data: VoxelProcessData, ignoreAO = false): void {
  this.doVoxelLight(
   data,
   data.chunkX + data.x,
   data.chunkY + data.y,
   data.chunkZ + data.z,
   ignoreAO
  );
 },

 syncSettings(settings: EngineSettingsData) {
  const materials = settings.materials;
  if (materials?.doAO) {
   this.settings.doAO = true;
  }
  if (materials?.doRGBLight) {
   this.settings.doRGB = true;
  }
  if (materials?.doSunLight) {
   this.settings.doSun = true;
  }
 },
};
