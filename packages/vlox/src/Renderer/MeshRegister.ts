import { type LocationData } from "../Math/index.js";
import { Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../World/WorldSpaces.js";
import { SectorMesh } from "./Classes/SectorMesh.js";
import { DVESectionMeshInterface } from "./Classes/DVESectionMeshInterface.js";

export type MeshRegisterDimensions = Map<
  string,
  Map<string, SectorMesh>
>;

class Sectors {
  static add(location: LocationData): SectorMesh {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) dimension = MeshRegister.dimensions.add(location[0]);

    const sector = new SectorMesh([
      location[0],
      ...Vector3Like.ToArray(
        WorldSpaces.sector.getPositionXYZ(location[1], location[2], location[3])
      ),
    ] as LocationData);
    dimension.set(
      WorldSpaces.sector.getKeyXYZ(location[1], location[2], location[3]),
      sector
    );
    return sector;
  }

  static remove(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    const index = WorldSpaces.sector.getKeyXYZ(
      location[1],
      location[2],
      location[3]
    );
    const sector = dimension.get(index);
    if (!sector) return false;
    dimension.delete(index);
    if (dimension.size == 0) {
      MeshRegister.dimensions.remove(location[0]);
    }
    return sector;
  }

  static get(location: LocationData) {
    let dimension = MeshRegister.dimensions.get(location[0]);
    if (!dimension) return false;
    return dimension.get(
      WorldSpaces.sector.getKeyXYZ(location[1], location[2], location[3])
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
    [location: LocationData, substance: string, mesh: DVESectionMeshInterface]
  > {
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

  static remove(id: string) {
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
  static _dimensions: MeshRegisterDimensions = new Map([["main", new Map()]]);
  static dimensions = Dimensions;
  static sectors = Sectors;

  static clearAll() {
    for (const [dkey, dim] of this._dimensions) {
      this.dimensions.remove(dkey);
    }
    this._dimensions.clear();
    this._dimensions.set("main", new Map());
  }
}
