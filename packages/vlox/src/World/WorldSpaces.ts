//types
import { EngineSettings } from "../Settings/EngineSettings.js";
import { Vec3Array, Vector3Like } from "@amodx/math";
import {
  CubeHashVec3,
  CubeHashVec3Array,
  GetYXZOrderArrayIndex,
  GetYXZOrderArrayPositionVec3,
  GetYXZOrderArrayPositionVec3Array,
  IndexOrderingTypes,
} from "../Math/Indexing.js";

export type WorldSpaceDataKey = {
  sector: {
    size: Vector3Like;
    sectionArrayOrder: IndexOrderingTypes;
  };
  section: {
    size: Vector3Like;
    arrayOrders: {
      id: IndexOrderingTypes;
      light: IndexOrderingTypes;
      level: IndexOrderingTypes;
      secondary: IndexOrderingTypes;
    };
  };
};

const tempPosition = Vector3Like.Create();
const tempPosition2 = Vector3Like.Create();
class WorldBounds {
  static bounds = {
    MinZ: -Number.MAX_SAFE_INTEGER,
    MaxZ: Number.MAX_SAFE_INTEGER,
    MinX: -Number.MAX_SAFE_INTEGER,
    MaxX: Number.MAX_SAFE_INTEGER,
    MinY: 0,
    MaxY: 256,
  };

  static setWorldBounds(
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number
  ) {
    this.bounds.MinX = minX;
    this.bounds.MaxX = maxX;
    this.bounds.MinX = minZ;
    this.bounds.MaxZ = maxZ;
    this.bounds.MinY = minY;
    this.bounds.MaxY = maxY;
  }

  static inBounds(x: number, y: number, z: number) {
    if (x < this.bounds.MinX) return false;
    if (y < this.bounds.MinY) return false;
    if (z < this.bounds.MinZ) return false;
    if (x > this.bounds.MaxX) return false;
    if (y > this.bounds.MaxY) return false;
    if (z > this.bounds.MaxZ) return false;
    return true;
  }

  static getWorldWidth(): number {
    return this.bounds.MaxX - this.bounds.MinX;
  }

  static getWorldDepth(): number {
    return this.bounds.MaxZ - this.bounds.MinZ;
  }

  static getWorldHeightY(): number {
    return this.bounds.MaxY - this.bounds.MinY;
  }

  static getWorldDimensions(): {
    width: number;
    depth: number;
    height: number;
  } {
    return {
      width: this.getWorldWidth(),
      depth: this.getWorldDepth(),
      height: this.getWorldHeightY(),
    };
  }
}
class SectorSpace {
  static power2Axes = Vector3Like.Create();
  static bounds = Vector3Like.Create();
  static volumne = 0;
  static sectionBounds = Vector3Like.Create();
  static sectionVolumne = 0;
  static getPosition(
    x: number,
    y: number,
    z: number,
    refPosition = Vector3Like.Create()
  ): Vector3Like {
    CubeHashVec3(
      x,
      y,
      z,
      SectorSpace.power2Axes.x,
      SectorSpace.power2Axes.y,
      SectorSpace.power2Axes.z,
      refPosition
    );
    return refPosition;
  }
  static transformPosition(position: Vector3Like): Vector3Like {
    CubeHashVec3(
      position.x,
      position.y,
      position.z,
      SectorSpace.power2Axes.x,
      SectorSpace.power2Axes.y,
      SectorSpace.power2Axes.z,
      position
    );
    return position;
  }
  static getPositionVec3Array(
    x: number,
    y: number,
    z: number,
    refPosition: Vec3Array = [0, 0, 0]
  ): Vec3Array {
    CubeHashVec3Array(
      x,
      y,
      z,
      SectorSpace.power2Axes.x,
      SectorSpace.power2Axes.y,
      SectorSpace.power2Axes.z,
      refPosition
    );
    return refPosition;
  }
}

class SectionSpace {
  static power2Axes = Vector3Like.Create();
  static bounds = Vector3Like.Create();
  static volumne = 0;
  static getPosition(
    x: number,
    y: number,
    z: number,
    refPosition = Vector3Like.Create()
  ): Vector3Like {
    CubeHashVec3(
      x,
      y,
      z,
      SectionSpace.power2Axes.x,
      SectionSpace.power2Axes.y,
      SectionSpace.power2Axes.z,
      refPosition
    );
    return refPosition;
  }
  static transformPosition(position: Vector3Like): Vector3Like {
    CubeHashVec3(
      position.x,
      position.y,
      position.z,
      SectionSpace.power2Axes.x,
      SectionSpace.power2Axes.y,
      SectionSpace.power2Axes.z,
      position
    );
    return position;
  }
  static getPositionVec3Array(
    x: number,
    y: number,
    z: number,
    refPosition: Vec3Array = [0, 0, 0]
  ): Vec3Array {
    CubeHashVec3Array(
      x,
      y,
      z,
      SectionSpace.bounds.x,
      SectionSpace.bounds.y,
      SectionSpace.bounds.z,
      refPosition
    );
    return refPosition;
  }
  static getIndex(x: number, y: number, z: number): number {
    SectionSpace.getPosition(x, y, z, tempPosition);
    SectorSpace.getPosition(x, y, z, tempPosition2);

    return GetYXZOrderArrayIndex(
      (tempPosition.x - tempPosition2.x) / SectionSpace.bounds.x,
      (tempPosition.y - tempPosition2.y) / SectionSpace.bounds.y,
      (tempPosition.z - tempPosition2.z) / SectionSpace.bounds.z,
      SectorSpace.sectionBounds.x,
      SectorSpace.sectionBounds.y,
      SectorSpace.sectionBounds.z
    );
  }
  static getPositionFromIndex(
    index: number,
    refPosition = Vector3Like.Create()
  ) {
    return GetYXZOrderArrayPositionVec3(
      index,
      SectorSpace.sectionBounds.x,
      SectorSpace.sectionBounds.y,
      SectorSpace.sectionBounds.z,
      refPosition
    );
  }
  static getPositionFromIndexVec3Array(
    index: number,
    refPosition: Vec3Array = [0, 0, 0]
  ) {
    return GetYXZOrderArrayPositionVec3Array(
      index,
      SectorSpace.sectionBounds.x,
      SectorSpace.sectionBounds.y,
      SectorSpace.sectionBounds.z,
      refPosition
    );
  }
}

class VoxelSpace {
  static bounds = Vector3Like.Create();

  static getPosition(
    x: number,
    y: number,
    z: number,
    refPosition = Vector3Like.Create()
  ): Vector3Like {
    CubeHashVec3(
      x,
      y,
      z,
      SectionSpace.power2Axes.x,
      SectionSpace.power2Axes.y,
      SectionSpace.power2Axes.z,
      refPosition
    );
    refPosition.x = x - refPosition.x;
    refPosition.y = y - refPosition.y;
    refPosition.z = z - refPosition.z;
    return refPosition;
  }
  static getPositionVec3Array(
    x: number,
    y: number,
    z: number,
    refPosition: Vec3Array = [0, 0, 0]
  ): Vec3Array {
    CubeHashVec3Array(
      x,
      y,
      z,
      SectionSpace.power2Axes.x,
      SectionSpace.power2Axes.y,
      SectionSpace.power2Axes.z,
      refPosition
    );
    refPosition[0] = x - refPosition[0];
    refPosition[1] = y - refPosition[1];
    refPosition[2] = z - refPosition[2];
    return refPosition;
  }
  static transformPosition(position: Vector3Like): Vector3Like {
    const { x, y, z } = position;
    CubeHashVec3(
      x,
      y,
      z,
      SectionSpace.power2Axes.x,
      SectionSpace.power2Axes.y,
      SectionSpace.power2Axes.z,
      position
    );
    position.x = x - position.x;
    position.y = y - position.y;
    position.z = z - position.z;
    return position;
  }
  static getPositionFromIndex(
    index: number,
    refPosition = Vector3Like.Create()
  ) {
    return GetYXZOrderArrayPositionVec3(
      index,
      SectionSpace.bounds.x,
      SectionSpace.bounds.y,
      SectionSpace.bounds.z,
      refPosition
    );
  }
  static getIndex(x: number, y: number, z: number): number {
    const position = this.getPosition(x, y, z, tempPosition);
    return GetYXZOrderArrayIndex(
      position.x,
      position.y,
      position.z,
      SectionSpace.bounds.x,
      SectionSpace.bounds.y,
      SectionSpace.bounds.z
    );
  }
  static getIndexFromPosition(x: number, y: number, z: number): number {
    return GetYXZOrderArrayIndex(
      x,
      y,
      z,
      SectionSpace.bounds.x,
      SectionSpace.bounds.y,
      SectionSpace.bounds.z
    );
  }
}

class Hash {
  static hashVec3(vector3: Vector3Like) {
    return `${vector3.x}-${vector3.y}-${vector3.z}`;
  }
  static hashVec3Array(vector3: Vec3Array) {
    return `${vector3[0]}-${vector3[1]}-${vector3[2]}`;
  }
  static hashXYZ(x: number, y: number, z: number) {
    return `${x}-${y}-${z}`;
  }
}

export class WorldSpaces {
  static hash = Hash;
  static world = WorldBounds;
  static sector = SectorSpace;
  static section = SectionSpace;
  static voxel = VoxelSpace;
  static getDataKey(): WorldSpaceDataKey {
    return {
      sector: {
        size: { ...WorldSpaces.sector.bounds },
        sectionArrayOrder: "YXZ",
      },
      section: {
        size: { ...WorldSpaces.section.bounds },
        arrayOrders: {
          id: "YXZ",
          level: "YXZ",
          light: "YXZ",
          secondary: "YXZ",
        },
      },
    };
  }
}

EngineSettings.addEventListener("synced", (event) => {
  const { settings } = event.detail.settings;
  WorldBounds.setWorldBounds(
    settings.world.min.x,
    settings.world.min.y,
    settings.world.min.z,
    settings.world.max.x,
    settings.world.max.y,
    settings.world.max.z
  );

  SectorSpace.power2Axes.x = settings.world.sectorPower2Size.x;
  SectorSpace.power2Axes.y = settings.world.sectorPower2Size.y;
  SectorSpace.power2Axes.z = settings.world.sectorPower2Size.z;
  SectorSpace.bounds.x = 1 << SectorSpace.power2Axes.x;
  SectorSpace.bounds.y = 1 << SectorSpace.power2Axes.y;
  SectorSpace.bounds.z = 1 << SectorSpace.power2Axes.z;
  SectorSpace.volumne =
    SectorSpace.bounds.x * SectorSpace.bounds.y * SectorSpace.bounds.z;

  SectionSpace.power2Axes.x = settings.world.sectionPower2Size.x;
  SectionSpace.power2Axes.y = settings.world.sectionPower2Size.y;
  SectionSpace.power2Axes.z = settings.world.sectionPower2Size.z;
  SectionSpace.bounds.x = 1 << SectionSpace.power2Axes.x;
  SectionSpace.bounds.y = 1 << SectionSpace.power2Axes.y;
  SectionSpace.bounds.z = 1 << SectionSpace.power2Axes.z;

  SectionSpace.volumne =
    SectionSpace.bounds.x * SectionSpace.bounds.y * SectionSpace.bounds.z;

  SectorSpace.sectionBounds.x = SectorSpace.bounds.x / SectionSpace.bounds.x;
  SectorSpace.sectionBounds.y = SectorSpace.bounds.y / SectionSpace.bounds.y;
  SectorSpace.sectionBounds.z = SectorSpace.bounds.z / SectionSpace.bounds.z;

  SectorSpace.sectionVolumne =
    SectorSpace.sectionBounds.x *
    SectorSpace.sectionBounds.y *
    SectorSpace.sectionBounds.z;
});
