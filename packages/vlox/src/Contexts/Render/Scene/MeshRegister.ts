import { type LocationData } from "../../../Math/index.js";
import { Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { MushRegisterRegion } from "../../../Renderer/Classes/MushRegisterRegion.js";
import { MeshRegisterColumn } from "../../../Renderer/Classes/MeshRegisterColumn.js";
import { ChunkMesh } from "../../../Renderer/Classes/ChunkMesh.js";
import { ChunkMeshInterface } from "../../../Renderer/DVEChunkMeshInterface.js"

export type MeshRegisterDimensions = Map<
  string,
  Map<string, MushRegisterRegion>
>;

class Chunk {
  static addMesh(location: LocationData, mesh: ChunkMeshInterface, substance: string) {
    let column = MeshRegister.column.get(location);
    if (!column) {
      column = MeshRegister.column.add(location);
    }
    const index = WorldSpaces.chunk.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    let chunk = column.chunks.get(index);
    if (!chunk) {
      chunk = new ChunkMesh([location[1], location[2], location[3]]);
      column.chunks.set(index, chunk);
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
    let chunk = column.chunks.get(index);
    if (!chunk) {
      chunk = new ChunkMesh([location[1], location[2], location[3]]);
      column.chunks.set(index, chunk);
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
    const chunk = column.chunks.get(index);
    if (!chunk) return false;
    const chunkMesh = chunk.meshes.get(substance);
    if (!chunkMesh) return false;
    chunk.meshes.delete(substance);
    if (chunk.meshes.size == 0) {
      column.chunks.delete(index);
    }
    return chunkMesh;
  }

  static getMesh(location: LocationData, substance: string) {
    const column = MeshRegister.column.get(location);

    if (!column) return false;
    const chunk = column.chunks.get(
      WorldSpaces.chunk.getIndexXYZ(location[1], location[2], location[3])
    );
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
    const chunk = column.chunks.get(index);
    if (!chunk) return false;
    column.chunks.delete(index);
    return chunk;
  }
  static get(location: LocationData) {
    const column = MeshRegister.column.get(location);
    if (!column) return false;
    const chunk = column.chunks.get(
      WorldSpaces.chunk.getIndexXYZ(location[1], location[2], location[3])
    );
    if (!chunk) return false;
    return chunk;
  }
}

class Column {
  static add(location: LocationData): MeshRegisterColumn {
    let region = MeshRegister.region.get(location);
    if (!region) {
      region = MeshRegister.region.add(location);
    }
    const column = new MeshRegisterColumn([
      location[0],
      ...Vector3Like.ToArray(
        WorldSpaces.column.getPositionXYZ(location[1], location[2], location[3])
      ),
    ] as LocationData);
    region.columns.set(
      WorldSpaces.column.getIndexXYZ(location[1], location[2], location[3]),
      column
    );
    return column;
  }

  static remove(location: LocationData) {
    const region = MeshRegister.region.get(location);
    if (!region) return false;
    const index = WorldSpaces.column.getIndexXYZ(
      location[1],
      location[2],
      location[3]
    );
    const column = region.columns.get(index);
    if (!column) return false;
    region.columns.delete(index);
    if (region.columns.size == 0) {
      MeshRegister.region.remove(location);
    }
    return column;
  }

  static get(location: LocationData) {
    const region = MeshRegister.region.get(location);
    if (!region) return false;

    return region.columns.get(
      WorldSpaces.column.getIndexXYZ(location[1], location[2], location[3])
    );
  }
}

class Region {
  static add(location: LocationData): MushRegisterRegion {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) {
      dimension = MeshRegister.dimensions.add(location[0]);
    }
    const region = new MushRegisterRegion();
    dimension.set(
      WorldSpaces.region.getKeyXYZ(location[1], location[2], location[3]),
      region
    );
    return region;
  }

  static remove(location: LocationData) {
    const region = this.get(location);
    if (!region) return false;
    const dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    dimension.delete(
      WorldSpaces.region.getKeyXYZ(location[1], location[2], location[3])
    );
    region.columns.forEach((column) => {
      column.chunks.forEach((chunk) => {
        chunk.meshes.forEach((chunkMeshes) => {
          chunkMeshes.dispose();
        });
      });
    });
    return true;
  }

  static get(location: LocationData) {
    const dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    const region = dimension.get(
      WorldSpaces.region.getKeyXYZ(location[1], location[2], location[3])
    );
    if (!region) return false;
    return region;
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
  ): Generator<[location: LocationData, substance: string, mesh: ChunkMeshInterface]> {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return;
    for (const [key, region] of dimension) {
      for (const [columnKey, column] of region.columns) {
        for (const [chunkKey, chunk] of column.chunks) {
          for (const [substance, mesh] of chunk.meshes) {
            yield [
              [
                column.location[0],
                column.location[1],
                column.location[2] + chunkKey * WorldSpaces.chunk._bounds.y,
                column.location[3],
              ],
              substance,
              mesh,
            ];
          }
        }
      }
    }
  }

  static remove(id: string) {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return false;
    dimension.forEach((region) => {
      region.columns.forEach((column) => {
        column.chunks.forEach((chunk) => {
          chunk.meshes.forEach((chunkMeshes) => {
            chunkMeshes.dispose();
          });
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
  static region = Region;
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
