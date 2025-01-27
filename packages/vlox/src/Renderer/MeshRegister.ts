import { type LocationData } from "../Math/index.js";
import { Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../World/WorldSpaces.js";
import { MeshRegisterColumn } from "./Classes/MeshRegisterColumn.js";
import { ChunkMesh } from "./Classes/ChunkMesh.js";
import { ChunkMeshInterface } from "./DVEChunkMeshInterface.js";

export type MeshRegisterDimensions = Map<
  string,
  Map<string, MeshRegisterColumn>
>;

class Chunk {
  static addMesh(
    location: LocationData,
    mesh: ChunkMeshInterface,
    substance: string
  ) {
    let column = MeshRegister.column.get(location);
    if (!column) {
      column = MeshRegister.column.add(location);
    }
    const index = WorldSpaces.chunk.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    let chunk = column.chunks[index];
    if (!chunk) {
      chunk = new ChunkMesh([location[1], location[2], location[3]]);
      column.chunks[index] = chunk;
    }
    chunk?.meshes.set(substance, mesh);
    return chunk;
  }
  static add(location: LocationData) {
    let column = MeshRegister.column.get(location);
    if (!column) {
      column = MeshRegister.column.add(location);
    }
    const index = WorldSpaces.chunk.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    let chunk = column.chunks[index];
    if (!chunk) {
      chunk = new ChunkMesh([location[1], location[2], location[3]]);
      column.chunks[index] = chunk;
    }
    return chunk;
  }
  static removeMesh(location: LocationData, substance: string) {
    const column = MeshRegister.column.get(location);
    if (!column) return false;
    const index = WorldSpaces.chunk.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    const chunk = column.chunks[index];
    if (!chunk) return false;
    const chunkMesh = chunk.meshes.get(substance);
    if (!chunkMesh) return false;
    chunk.meshes.delete(substance);
    if (chunk.meshes.size == 0) {
      (column.chunks as any)[index] = undefined;
    }
    return chunkMesh;
  }

  static getMesh(location: LocationData, substance: string) {
    const column = MeshRegister.column.get(location);

    if (!column) return false;
    const chunk =
      column.chunks[
        WorldSpaces.chunk.getIndexXYZ(location[1], location[2], location[3])
      ];
    if (!chunk) return false;
    const chunkMesh = chunk.meshes.get(substance);
    if (!chunkMesh) return false;
    return chunkMesh;
  }
  static remove(location: LocationData) {
    const column = MeshRegister.column.get(location);
    if (!column) return false;
    const index = WorldSpaces.chunk.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    const chunk = column.chunks[index];
    if (!chunk) return false;
    (column.chunks as any)[index] = undefined;
    return chunk;
  }
  static get(location: LocationData) {
    const column = MeshRegister.column.get(location);
    if (!column) return false;
    const chunk =
      column.chunks[
        WorldSpaces.chunk.getIndexXYZ(location[1], location[2], location[3])
      ];
    if (!chunk) return false;
    return chunk;
  }
}

class Column {
  static add(location: LocationData): MeshRegisterColumn {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) dimension = MeshRegister.dimensions.add(location[0]);

    const column = new MeshRegisterColumn([
      location[0],
      ...Vector3Like.ToArray(
        WorldSpaces.column.getPositionXYZ(location[1], location[2], location[3])
      ),
    ] as LocationData);
    dimension.set(
      WorldSpaces.column.getKeyXYZ(location[1], location[2], location[3]),
      column
    );
    return column;
  }

  static remove(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    const index = WorldSpaces.column.getKeyXYZ(
      location[1],
      location[2],
      location[3]
    );
    const column = dimension.get(index);
    if (!column) return false;
    dimension.delete(index);
    if (dimension.size == 0) {
      MeshRegister.dimensions.remove(location[0]);
    }
    return column;
  }

  static get(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    return dimension.get(
      WorldSpaces.column.getKeyXYZ(location[1], location[2], location[3])
    );
  }
}

class Dimensions {
  static add(id: string) {
    const dimension = new Map();
    MeshRegister._dimensions.set(id, dimension);
    return dimension;
  }

  static get(id: string) {
    return MeshRegister._dimensions.get(id);
  }

  static *getAllMeshes(
    id: string
  ): Generator<
    [location: LocationData, substance: string, mesh: ChunkMeshInterface]
  > {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return;
    for (const [key, column] of dimension) {
      for (let i = 0; i < column.chunks.length; i++) {
        for (const [substance, mesh] of column.chunks[i].meshes) {
          yield [
            [
              column.location[0],
              column.location[1],
              column.location[2] + i * WorldSpaces.chunk.bounds.y,
              column.location[3],
            ],
            substance,
            mesh,
          ];
        }
      }
    }
  }

  static remove(id: string) {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return false;
    dimension.forEach((column) => {
      column.chunks.forEach((chunk) => {
        chunk.meshes.forEach((chunkMeshes) => {
          chunkMeshes.dispose();
        });
      });
    });
    MeshRegister._dimensions.delete(id);
    return true;
  }
}

export class MeshRegister {
  // Main dimensions data store
  static _dimensions: MeshRegisterDimensions = new Map([["main", new Map()]]);
  static dimensions = Dimensions;
  static column = Column;
  static chunk = Chunk;

  static clearAll() {
    for (const [dkey, dim] of this._dimensions) {
      this.dimensions.remove(dkey);
    }
    this._dimensions.clear();
    this._dimensions.set("main", new Map());
  }
}
