//types
import type {
 ChunkVoxels,
 FullChunkTemplate,
} from "Meta/Chunks/Chunk.types.js";
//objects
import { Util } from "../../Global/Util.helper.js";

import { DVEB } from "../DivineVoxelEngineBuilder.js";

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const ChunkProcessor = {
 voxelByte: Util.getVoxelByte(),
 _3dArray: Util.getFlat3DArray(),
 chunkTemplates: <Record<number, Record<number, number[][]>>>{},
 exposedFaces: <number[]>[],
 faceStates: <number[]>[],
 getBaseTemplateNew(): FullChunkTemplate {
  return {
   solid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    faceStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   transparent: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    faceStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   flora: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    faceStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   fluid: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    faceStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
   magma: {
    positionTemplate: [],
    faceTemplate: [],
    uvTemplate: [],
    shapeTemplate: [],
    shapeStateTemplate: [],
    faceStateTemplate: [],
    colorTemplate: [],
    lightTemplate: [],
    aoTemplate: [],
   },
  };
 },

 makeAllChunkTemplates(
  voxels: ChunkVoxels,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): FullChunkTemplate {
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  let maxX = DVEB.worldBounds.chunkXSize;
  let maxZ = DVEB.worldBounds.chunkZSize;
  let maxY = DVEB.worldBounds.chunkYSize;
  for (let x = 0; x < maxX; x++) {
   for (let z = 0; z < maxZ; z++) {
    for (let y = 0; y < maxY; y++) {
     const rawVoxelData = this._3dArray.getValue(x, y, z, voxels);
     if (this.voxelByte.getId(rawVoxelData) == 0) continue;
     const voxelCheck = DVEB.worldMatrix.getVoxel(
      chunkX + x,
      chunkY + y,
      chunkZ + z
     );

     if (!voxelCheck) continue;

     const voxelObject = DVEB.voxelManager.getVoxel(voxelCheck[0]);
     const voxelState = voxelCheck[1];

     let baseTemplate = template[voxelObject.data.substance];
     if (voxelObject.data.substance == "transparent") {
      baseTemplate = template["solid"];
     }

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
      faceBit = faceBit | (1 << 0);
      this.exposedFaces[0] = 1;
      this.faceStates[0] = 0;
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
      faceBit = faceBit | (1 << 1);
      this.exposedFaces[1] = 1;
      this.faceStates[1] = 0;
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
      faceBit = faceBit | (1 << 2);
      this.exposedFaces[2] = 1;
      this.faceStates[2] = 0;
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
      faceBit = faceBit | (1 << 3);
      this.exposedFaces[3] = 1;
      this.faceStates[3] = 0;
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
      faceBit = faceBit | (1 << 4);
      this.exposedFaces[4] = 1;
      this.faceStates[4] = 0;
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
      faceBit = faceBit | (1 << 5);
      this.exposedFaces[5] = 1;
      this.faceStates[5] = 0;
     } else {
      this.exposedFaces[5] = 0;
      this.faceStates[5] = -1;
     }

     if (faceBit == 0) continue;

     voxelObject.process(
      {
       voxelState: voxelState,
       voxelData: rawVoxelData,
       exposedFaces: this.exposedFaces,
       faceStates: this.faceStates,
       shapeTemplate: baseTemplate.shapeTemplate,
       shapeStateTemplate: baseTemplate.shapeStateTemplate,
       faceStateTemplate: baseTemplate.faceStateTemplate,
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
      DVEB
     );

     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faceBit);

     if (this.exposedFaces[0] && this.faceStates[0] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[0]);
     }
     if (this.exposedFaces[1] && this.faceStates[1] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[1]);
     }
     if (this.exposedFaces[2] && this.faceStates[2] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[2]);
     }
     if (this.exposedFaces[3] && this.faceStates[3] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[3]);
     }
     if (this.exposedFaces[4] && this.faceStates[4] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[4]);
     }
     if (this.exposedFaces[5] && this.faceStates[5] > -1) {
      baseTemplate.faceStateTemplate.push(this.faceStates[5]);
     }
    }
   }
  }
  return template;
 },
};
