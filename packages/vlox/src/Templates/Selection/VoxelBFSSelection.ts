import { Flat3DIndex, Vector3Like } from "@amodx/math";
import { IVoxelSelection } from "./VoxelSelecton";
import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../Util/Binary/BinaryArrays";
import { FullVoxelTemplate } from "../Full/FullVoxelTemplate";

export interface VoxelBFSSelectionData {
  origin: Vector3Like;
  size: Vector3Like;
  bitIndex: Uint8Array;
}

export class VoxelBFSSelection
  implements IVoxelSelection, VoxelBFSSelectionData
{
  origin = Vector3Like.Create();
  size = Vector3Like.Create();
  bitIndex: Uint8Array;
  index = Flat3DIndex.GetXZYOrder();

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
    maxSize = 1000
  ) {
    const min = Vector3Like.Create(Infinity, Infinity, Infinity);
    const max = Vector3Like.Create(-Infinity, -Infinity, -Infinity);

    const voxelId =
      cursor.getVoxel(position.x, position.y, position.z)?.getVoxelId() || 0;

    if (!voxelId) return false;

    const queue: number[] = [position.x, position.y, position.z];
    let size = 0;
    const visited = new Set<string>();

    while (queue.length) {
      if (size > maxSize) break;
      const x = queue.shift()!;
      const y = queue.shift()!;
      const z = queue.shift()!;

      const key = `${x}-${y}-${z}`;
      if (visited.has(key)) continue;
      visited.add(key);
      if (x < min.x) min.x = x;
      if (y < min.y) min.y = y;
      if (z < min.z) min.z = z;

      if (x > max.x) max.x = x;
      if (y > max.y) max.y = y;
      if (z > max.z) max.z = z;

      for (let i = 0; i < CardinalNeighbors3D.length; i++) {
        const n = CardinalNeighbors3D[i];
        let nx = x + n[0];
        let ny = y + n[1];
        let nz = z + n[2];

        const voxel = cursor.getVoxel(nx, ny, nz);
        if (!voxel || voxel.getVoxelId() != voxelId) continue;

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
          if (!visited.has(key)) continue;
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

  toTemplate(cursor: DataCursorInterface): FullVoxelTemplate {
    const templateData = FullVoxelTemplate.CreateNew([
      this.size.x,
      this.size.y,
      this.size.z,
    ]);
    templateData.mask = this.bitIndex.slice();
    const template = new FullVoxelTemplate(templateData);

    for (let x = this.origin.x; x < this.origin.x + this.size.x; x++) {
      for (let y = this.origin.y; y < this.origin.y + this.size.y; y++) {
        for (let z = this.origin.z; z < this.origin.z + this.size.z; z++) {
          if (!this.isSelected(x, y, z)) continue;
          const voxel = cursor.getVoxel(x, y, z);
          if (!voxel || voxel.isAir()) continue;

          const index = template.getIndex(
            x - this.origin.x,
            y - this.origin.y,
            z - this.origin.z
          );

          template.ids[index] = voxel.ids[voxel._index];
          template.level[index] = voxel.level[voxel._index];
          template.secondary[index] = voxel.secondary[voxel._index];
        }
      }
    }
    return template;
  }

  toJSON(): VoxelBFSSelectionData {
    return {
      origin: { ...this.origin },
      size: { ...this.size },
      bitIndex: this.bitIndex.slice(),
    };
  }

  fromJSON(data: VoxelBFSSelectionData) {
    this.origin.x = data.origin.x;
    this.origin.y = data.origin.y;
    this.origin.z = data.origin.z;

    this.size.x = data.size.x;
    this.size.y = data.size.y;
    this.size.z = data.size.z;

    this.bitIndex = data.bitIndex;

    this.index.setBounds(this.size.x, this.size.y, this.size.z);
  }
}
