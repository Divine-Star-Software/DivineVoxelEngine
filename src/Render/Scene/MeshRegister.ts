import type {
 MeshRegisterChunk,
 MeshRegisterDimensions,
 MushRegisterRegion,
 MeshRegisterColumn,
} from "Meta/Render/Scene/MeshRegister.types.js";
import { VoxelTemplateSubstanceType } from "Meta/index.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
export const MeshRegister = {
 _dimensions: <MeshRegisterDimensions>new Map(),

 $INIT() {
  this._dimensions.set("main", new Map());
 },

 dimensions: {
  add(id: string) {
   const dimesnion = new Map();
   MeshRegister._dimensions.set(id, dimesnion);
   return dimesnion;
  },
  get(id: string) {
   return MeshRegister._dimensions.get(id);
  },
  remove(id: string) {
   const dimension = MeshRegister._dimensions.get(id);
   if (!dimension) return false;
   dimension.forEach((region) => {
    region.columns.forEach((column) => {
     column.chunks.forEach((chunk) => {
      chunk.forEach((chunkMeshes) => {
       chunkMeshes.mesh.dispose();
      });
     });
    });
   });
   return true;
  },
 },

 region: {
  add(dimensionId: string, x: number, y: number, z: number) {
   let dimension = MeshRegister.dimensions.get(dimensionId);
   if (!dimension) {
    dimension = MeshRegister.dimensions.add(dimensionId);
   }
   const region = this._getRegionData();
   dimension.set(WorldSpaces.region.getKeyXYZ(x, y, z), region);
   return region;
  },
  remove(dimensionId: string, x: number, z: number, y = 0) {
   let dimension = MeshRegister.dimensions.get(dimensionId);
   if (!dimension) return false;
   let region = MeshRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   dimension.delete(WorldSpaces.region.getKeyXYZ(x, y, z));
   region.columns.forEach((column) => {
    column.chunks.forEach((chunk) => {
     chunk.forEach((chunkMeshes) => {
      chunkMeshes.mesh.dispose();
     });
    });
   });
   return true;
  },
  _getRegionData(): MushRegisterRegion {
   return {
    columns: new Map(),
   };
  },
  get(dimensionId: string, x: number, y: number, z: number) {
   const dimension = MeshRegister.dimensions.get(dimensionId);
   if (!dimension) return false;
   const region = dimension.get(WorldSpaces.region.getKeyXYZ(x, y, z));
   if (!region) return false;
   return region;
  },
 },
 column: {
  add(dimensionId: string, x: number, z: number, y = 0) {
   let region = MeshRegister.region.get(dimensionId, x, y, z);
   if (!region) {
    region = MeshRegister.region.add(dimensionId, x, y, z);
   }
   const column = this._getColumnData([x, y, z]);
   region.columns.set(WorldSpaces.column.getIndexXYZ(x, y, z), column);
   return column;
  },
  remove(dimensionId: string, x: number, z: number, y = 0) {
   let region = MeshRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   const index = WorldSpaces.column.getIndexXYZ(x, y, z);
   const column = region.columns.get(index);
   if (!column) return false;
   region.columns.delete(index);
   if (region.columns.size == 0) {
    MeshRegister.region.remove(dimensionId, x, y, z);
   }
   return column;
  },
  _getColumnData(
   position: [x: number, y: number, z: number]
  ): MeshRegisterColumn {
   return {
    position: position,
    chunks: new Map(),
   };
  },
  get(dimensionId: string, x: number, z: number, y = 0) {
   const region = MeshRegister.region.get(dimensionId, x, y, z);
   if (!region) return false;
   return region.columns.get(WorldSpaces.column.getIndexXYZ(x, y, z));
  },
 },
 chunk: {
  add(
   dimensionId: string,
   x: number,
   y: number,
   z: number,
   mesh: BABYLON.Mesh,
   substance: VoxelTemplateSubstanceType
  ) {
   let column = MeshRegister.column.get(dimensionId, x, z, y);
   if (!column) {
    column = MeshRegister.column.add(dimensionId, x, z, y);
   }
   const index = WorldSpaces.chunk.getIndexXYZ(x, y, z);
   let chunk = column.chunks.get(index);
   if (!chunk) {
    chunk = new Map();
    column.chunks.set(index, chunk);
   }
   chunk.set(substance, this._getChunkData(mesh));
   return chunk;
  },
  _getChunkData(mesh: BABYLON.Mesh): MeshRegisterChunk {
   return {
    mesh: mesh,
   };
  },
  remove(
   dimensionId: string,
   x: number,
   y: number,
   z: number,
   substance: VoxelTemplateSubstanceType
  ) {
   const column = MeshRegister.column.get(dimensionId, x, z, y);
   if (!column) return false;
   const index = WorldSpaces.chunk.getIndexXYZ(x, y, z);
   const chunk = column.chunks.get(index);
   if (!chunk) return false;
   const chunkMesh = chunk.get(substance);
   if (!chunkMesh) return false;
   chunk.delete(substance);
   if (chunk.size == 0) {
    column.chunks.delete(index);
   }
   return chunkMesh.mesh;
  },
  get(
   dimensionId: string,
   x: number,
   y: number,
   z: number,
   substance: VoxelTemplateSubstanceType
  ) {
   const column = MeshRegister.column.get(dimensionId, x, z, y);
   if (!column) return false;
   const chunk = column.chunks.get(WorldSpaces.chunk.getIndexXYZ(x, y, z));
   if (!chunk) return false;
   const chunkMesh = chunk.get(substance);
   if (!chunkMesh) return false;
   return chunkMesh;
  },
 },
};
