import { type LocationData } from "../Math/index.js";
import { Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../World/WorldSpaces.js";
import { SectorMesh } from "./Classes/SectorMesh.js";

export type MeshRegisterDimensions = Map<number, Map<string, SectorMesh>>;

class Sectors {
  static add(location: LocationData): SectorMesh {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) dimension = MeshRegister.dimensions.add(location[0]);

    const sector = new SectorMesh([
      location[0],
      ...WorldSpaces.sector.getPositionVec3Array(
        location[1],
        location[2],
        location[3]
      ),
    ] as LocationData);
    dimension.set(
      WorldSpaces.hash.hashVec3(
        WorldSpaces.sector.getPosition(location[1], location[2], location[3])
      ),
      sector
    );
    return sector;
  }

  static remove(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    const key = WorldSpaces.hash.hashVec3(
      WorldSpaces.sector.getPosition(location[1], location[2], location[3])
    );
    const sector = dimension.get(key);
    if (!sector) return false;
    dimension.delete(key);
    if (dimension.size == 0) {
      MeshRegister.dimensions.remove(location[0]);
    }
    return sector;
  }

  static get(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    return dimension.get(
      WorldSpaces.hash.hashVec3(
        WorldSpaces.sector.getPosition(location[1], location[2], location[3])
      )
    );
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

  static *getAllMeshes(
    id: number
  ): Generator<[location: LocationData, substance: string, mesh: any]> {
    const dimension = MeshRegister._dimensions.get(id);
    if (!dimension) return;
    for (const [key, sector] of dimension) {
      for (let i = 0; i < sector.sections.length; i++) {
        for (const [substance, mesh] of sector.sections[i].meshes) {
          yield [
            [
              sector.location[0],
              sector.location[1],
              sector.location[2] + i * WorldSpaces.section.bounds.y,
              sector.location[3],
            ],
            substance,
            mesh,
          ];
        }
      }
    }
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
