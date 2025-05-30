import { Flat3DIndex, Vec3Array, Vector3Like } from "@amodx/math";
import { IVoxelSelection } from "./VoxelSelecton";
import { CardinalNeighbors2D } from "../../Math/CardinalNeighbors";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
import {
  getBitArrayIndex,
  getBitAtomicArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BinaryArrays";
import { PaintVoxelData } from "../../Voxels/Types/PaintVoxelData";
import { FullVoxelTemplate } from "../Full/FullVoxelTemplate";

export interface VoxelSurfaceSelectionData {
  origin: Vector3Like;
  size: Vector3Like;
  normal: Vector3Like;
  bitIndex: Uint8Array;
  extrusion: number;
}

export class VoxelSurfaceSelection
  implements IVoxelSelection, VoxelSurfaceSelectionData
{
  origin = Vector3Like.Create();
  size = Vector3Like.Create();
  normal = Vector3Like.Create();
  bitIndex: Uint8Array;
  index = Flat3DIndex.GetXZYOrder();
  extrusion = 0;

  isSelected(x: number, y: number, z: number): boolean {
    if (x < this.origin.x || x >= this.origin.x + this.size.x) return false;
    if (y < this.origin.y || y >= this.origin.y + this.size.y) return false;
    if (z < this.origin.z || z >= this.origin.z + this.size.z) return false;
    return (
      getBitArrayIndex(
        this.bitIndex,
        this.index.getIndexXYZ(
          x - this.origin.x,
          y - this.origin.y,
          z - this.origin.z
        )
      ) === 1
    );
  }

  reConstruct(
    cursor: DataCursorInterface,
    position: Vector3Like,
    normal: Vector3Like,
    extrusion: number,
    maxSize = 1000
  ) {
    this.normal.x = normal.x;
    this.normal.y = normal.y;
    this.normal.z = normal.z;
    let axis = "x";
    if (normal.x) axis = "x";
    if (normal.y) axis = "y";
    if (normal.z) axis = "z";

    const min = Vector3Like.Create(Infinity, Infinity, Infinity);
    const max = Vector3Like.Create(-Infinity, -Infinity, -Infinity);

    const queue: number[] = [
      position.x + normal.x,
      position.y + normal.y,
      position.z + normal.z,
    ];
    let size = 0;
    const visted = new Set<string>();

    while (queue.length) {
      if (size > maxSize) break;
      const x = queue.shift()!;
      const y = queue.shift()!;
      const z = queue.shift()!;

      const key = `${x}-${y}-${z}`;
      if (visted.has(key)) continue;
      visted.add(key);
      if (x < min.x) min.x = x;
      if (y < min.y) min.y = y;
      if (z < min.z) min.z = z;

      if (x > max.x) max.x = x;
      if (y > max.y) max.y = y;
      if (z > max.z) max.z = z;

      for (let i = 0; i < CardinalNeighbors2D.length; i++) {
        const n = CardinalNeighbors2D[i];

        let nx = x;
        let ny = y;
        let nz = z;
        if (axis == "x") {
          ny += n[0];
          nz += n[1];
        }
        if (axis == "y") {
          nx += n[0];
          nz += n[1];
        }
        if (axis == "z") {
          nx += n[0];
          ny += n[1];
        }

        const voxel = cursor.getVoxel(nx, ny, nz);
        if (!voxel || !voxel.isAir()) continue;

        const bottomVoxel = cursor.getVoxel(
          nx - normal.x,
          ny - normal.y,
          nz - normal.z
        );
        if (!bottomVoxel || bottomVoxel.isAir()) continue;

        queue.push(nx, ny, nz);
      }
      size++;
    }

    if (min.x == Infinity || min.y == Infinity || min.z == Infinity)
      return false;
    if (max.x == -Infinity || max.y == -Infinity || max.z == -Infinity)
      return false;

    const sizeX = max.x - min.x + 1;
    const sizeY = max.y - min.y + 1;
    const sizeZ = max.z - min.z + 1;

    this.index.setBounds(sizeX, sizeY, sizeZ);
    this.bitIndex = new Uint8Array(Math.ceil((sizeX * sizeY * sizeZ) / 8));
    for (let x = min.x; x < min.x + sizeX; x++) {
      for (let y = min.y; y < min.y + sizeY; y++) {
        for (let z = min.z; z < min.z + sizeZ; z++) {
          const key = `${x}-${y}-${z}`;
          if (!visted.has(key)) continue;
          setBitArrayIndex(
            this.bitIndex,
            this.index.getIndexXYZ(x - min.x, y - min.y, z - min.z),
            1
          );
        }
      }
    }

    this.size.x = sizeX;
    this.size.y = sizeY;
    this.size.z = sizeZ;

    this.origin.x = min.x;
    this.origin.y = min.y;
    this.origin.z = min.z;
  }

  toTemplate(
    cursor: DataCursorInterface,
    voxelOrExtrude: PaintVoxelData | true
  ): FullVoxelTemplate;
  toTemplate(cursor: DataCursorInterface, extrude: true): FullVoxelTemplate;
  toTemplate(
    cursor: DataCursorInterface,
    voxel: PaintVoxelData
  ): FullVoxelTemplate;
  toTemplate(
    cursor: DataCursorInterface,
    voxelOrExtrude: PaintVoxelData | true
  ): FullVoxelTemplate {
    let extrude = false;
    let voxel: PaintVoxelData | null = null;
    if (typeof voxelOrExtrude == "boolean") {
      extrude = true;
    } else {
      voxel = voxelOrExtrude;
    }
    const template = new FullVoxelTemplate(
      FullVoxelTemplate.CreateNew([this.size.x, this.size.y, this.size.z])
    );

    if (!extrude && voxel) {
      const raw = PaintVoxelData.ToRaw(voxel);
      for (let x = this.origin.x; x < this.origin.x + this.size.x; x++) {
        for (let y = this.origin.y; y < this.origin.y + this.size.y; y++) {
          for (let z = this.origin.z; z < this.origin.z + this.size.z; z++) {
            if (this.isSelected(x, y, z)) {
              const index = template.getIndex(
                x - this.origin.x,
                y - this.origin.y,
                z - this.origin.z
              );
              template.ids[index] = raw[0];
              template.level[index] = raw[2];
              template.secondary[index] = raw[3];
            }
          }
        }
      }
      return template;
    }
    for (let x = this.origin.x; x < this.origin.x + this.size.x; x++) {
      for (let y = this.origin.y; y < this.origin.y + this.size.y; y++) {
        for (let z = this.origin.z; z < this.origin.z + this.size.z; z++) {
          if (this.isSelected(x, y, z)) {
            let nx = x;
            let ny = y;
            let nz = z;
            const index = template.getIndex(
              x - this.origin.x,
              y - this.origin.y,
              z - this.origin.z
            );
            while (true) {
              nx -= this.normal.x;
              ny -= this.normal.y;
              nz -= this.normal.z;

              if (!this.isSelected(nx, ny, nz)) {
                const voxel = cursor.getVoxel(nx, ny, nz)!;

                if (!voxel || voxel.isAir()) break;
                template.ids[index] = voxel.ids[voxel._index];
                template.level[index] = voxel.level[voxel._index];
                template.secondary[index] = voxel.secondary[voxel._index];
                break;
              }

              if (x < this.origin.x || x >= this.origin.x + this.size.x)
                continue;
              if (y < this.origin.y || y >= this.origin.y + this.size.y)
                continue;
              if (z < this.origin.z || z >= this.origin.z + this.size.z)
                continue;

              const nIndex = template.getIndex(
                nx - this.origin.x,
                ny - this.origin.y,
                nz - this.origin.z
              );
              if (!template.isAir(nIndex)) {
                template.ids[index] = template.ids[nIndex];
                template.level[index] = template.level[nIndex];
                template.secondary[index] = template.secondary[nIndex];
              }
            }
          }
        }
      }
    }

    return template;
  }

  toJSON(): VoxelSurfaceSelectionData {
    return {
      origin: { ...this.origin },
      normal: { ...this.normal },
      extrusion: this.extrusion,
      bitIndex: this.bitIndex.slice(),
      size: this.size,
    };
  }

  fromJSON(data: VoxelSurfaceSelectionData) {
    this.origin.x = data.origin.x;
    this.origin.y = data.origin.y;
    this.origin.z = data.origin.z;

    this.normal.x = data.normal.x;
    this.normal.y = data.normal.y;
    this.normal.z = data.normal.z;

    this.extrusion = data.extrusion;

    this.bitIndex = data.bitIndex;

    this.size.x = data.size.x;
    this.size.y = data.size.y;
    this.size.z = data.size.z;

    this.index.setBounds(this.size.x, this.size.y, this.size.z);
  }
}
