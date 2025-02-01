//types
import { EngineSettings } from "../Settings/EngineSettings.js";
import { Vec3Array, Vector3Like } from "@amodx/math";
import {
  CubeHashVec3,
  CubeHashVec3Array,
  GetXYZOrderArrayIndex,
  GetXZYOrderArrayIndex,
  GetYXZOrderArrayIndex,
} from "../Math/Indexing.js";
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
    maxX: number,
    minZ: number,
    maxZ: number,
    minY: number,
    maxY: number
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

    return (tempPosition.y - tempPosition2.y) / SectionSpace.bounds.y;
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
}

EngineSettings.addEventListener("synced", (event) => {
  const { settings } = event.detail.settings;
  WorldBounds.setWorldBounds(
    settings.world.minX,
    settings.world.maxX,
    settings.world.minZ,
    settings.world.maxZ,
    settings.world.minY,
    settings.world.maxY
  );

  SectorSpace.power2Axes.x = settings.sectors.sectorXPow2;
  SectorSpace.power2Axes.y = settings.sectors.sectorYPow2;
  SectorSpace.power2Axes.z = settings.sectors.sectorZPow2;
  SectorSpace.bounds.x = 1 << SectorSpace.power2Axes.x;
  SectorSpace.bounds.y = 1 << SectorSpace.power2Axes.y;
  SectorSpace.bounds.z = 1 << SectorSpace.power2Axes.z;

  SectionSpace.power2Axes.x = settings.sections.sectionXPow2;
  SectionSpace.power2Axes.y = settings.sections.sectionYPow2;
  SectionSpace.power2Axes.z = settings.sections.sectionZPow2;
  SectionSpace.bounds.x = 1 << SectionSpace.power2Axes.x;
  SectionSpace.bounds.y = 1 << SectionSpace.power2Axes.y;
  SectionSpace.bounds.z = 1 << SectionSpace.power2Axes.z;

  SectionSpace.volumne =
    SectionSpace.bounds.x * SectionSpace.bounds.y * SectionSpace.bounds.z;

  SectorSpace.volumne =
    (SectorSpace.bounds.x / SectionSpace.bounds.x) *
    (SectorSpace.bounds.y / SectionSpace.bounds.y) *
    (SectorSpace.bounds.z / SectionSpace.bounds.z);
});
