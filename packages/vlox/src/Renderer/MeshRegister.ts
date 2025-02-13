import { type LocationData } from "../Math/index.js";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../World/WorldSpaces.js";
import { SectorMesh } from "./Classes/SectorMesh.js";

export type MeshRegisterDimensions = Map<number, Map<string, SectorMesh>>;

const tempVec3 = Vector3Like.Create();
const tempVec3Array: Vec3Array = [0, 0, 0];

class Sectors {
  static add(dimensionId: number, x: number, y: number, z: number): SectorMesh {
    let dimension = MeshRegister.dimensions.get(dimensionId);
    if (!dimension) dimension = MeshRegister.dimensions.add(dimensionId);

    const sector = new SectorMesh([
      dimensionId,
      ...WorldSpaces.sector.getPositionVec3Array(x, y, z, tempVec3Array),
    ] as LocationData);
    dimension.set(
      WorldSpaces.hash.hashVec3(WorldSpaces.sector.getPosition(x, y, z)),
      sector
    );
    return sector;
  }

  static addAt(location: LocationData) {
    return this.add(...location);
  }

  static remove(dimensionId: number, x: number, y: number, z: number) {
    let dimension = MeshRegister.dimensions.get(dimensionId);
    if (!dimension) return false;
    const key = WorldSpaces.hash.hashVec3(
      WorldSpaces.sector.getPosition(x, y, z, tempVec3)
    );
    const sector = dimension.get(key);
    if (!sector) return false;
    dimension.delete(key);
    if (dimension.size == 0) {
      MeshRegister.dimensions.remove(dimensionId);
    }
    return sector;
  }

  static removeAt(location: LocationData) {
    return this.remove(...location);
  }

  static get(dimensionId: number, x: number, y: number, z: number) {
    let dimension = MeshRegister.dimensions.get(dimensionId);
    if (!dimension) return false;
    return dimension.get(
      WorldSpaces.hash.hashVec3(
        WorldSpaces.sector.getPosition(x, y, z, tempVec3)
      )
    );
  }

  static getAt(location: LocationData) {
    return this.get(...location);
  }
}

class Dimensions {
  static add(id: number) {
    const dimension = new Map();
    MeshRegister._dimensions.set(id, dimension);
    return dimension;
  }

  static get(id: number) {
    return MeshRegister._dimensions.get(id);
  }

  static remove(id: number) {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return false;
    dimension.forEach((sector) => {
      sector.sections.forEach((section) => {
        section.meshes.forEach((sectionMeshes) => {
          sectionMeshes.dispose();
        });
      });
    });
    MeshRegister._dimensions.delete(id);
    return true;
  }
}

export class MeshRegister {
  static _dimensions: MeshRegisterDimensions = new Map([[0, new Map()]]);
  static dimensions = Dimensions;
  static sectors = Sectors;

  static clearAll() {
    for (const [dkey, dim] of this._dimensions) {
      this.dimensions.remove(dkey);
    }
    this._dimensions.clear();
    this._dimensions.set(0, new Map());
  }
}

(window as any).MeshRegister = MeshRegister;
