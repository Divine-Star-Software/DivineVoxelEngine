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
  static sector = SectorSpace;
  static section = SectionSpace;
  static voxel = VoxelSpace;
}

EngineSettings.addEventListener("synced", (event) => {
  event.detail.settings;

  SectorSpace.power2Axes.x = EngineSettings.settings.sectors.sectorXPow2;
  SectorSpace.power2Axes.y = EngineSettings.settings.sectors.sectorYPow2;
  SectorSpace.power2Axes.z = EngineSettings.settings.sectors.sectorZPow2;
  SectorSpace.bounds.x = 1 << SectorSpace.power2Axes.x;
  SectorSpace.bounds.y = 1 << SectorSpace.power2Axes.y;
  SectorSpace.bounds.z = 1 << SectorSpace.power2Axes.z;

  SectionSpace.power2Axes.x = EngineSettings.settings.sections.sectionXPow2;
  SectionSpace.power2Axes.y = EngineSettings.settings.sections.sectionYPow2;
  SectionSpace.power2Axes.z = EngineSettings.settings.sections.sectionZPow2;
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
