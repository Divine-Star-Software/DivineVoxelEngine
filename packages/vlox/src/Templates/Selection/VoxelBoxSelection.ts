import { Vec3Array, Vec3ArrayLike, Vector3Like } from "@amodx/math";
import { IVoxelSelection } from "./VoxelSelecton";
import { BoxVoxelTemplate } from "../Shapes/BoxVoxelTemplate";
import { IVoxelshapeTemplateBaseData } from "../Shapes/VoxelShapeTemplate.types";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
const getMinMax = (...points: Vec3Array[]): [Vec3Array, Vec3Array] => {
  if (points.length === 0) {
    throw new Error("At least one point is required to calculate min/max.");
  }

  let min: Vec3Array = [...points[0]];
  let max: Vec3Array = [...points[0]];

  for (const point of points) {
    for (let i = 0; i < 3; i++) {
      if (point[i] < min[i]) {
        min[i] = point[i];
      }
      if (point[i] > max[i]) {
        max[i] = point[i];
      }
    }
  }

  return [min, max];
};

const getSize = (start: Vector3Like, end: Vector3Like) => {
  return Vector3Like.Create(end.x - start.x, end.y - start.y, end.z - start.z);
};

export class VoxelBoxSelection implements IVoxelSelection {
  origin = Vector3Like.Create();
  end = Vector3Like.Create();
  size = Vector3Like.Create();

  isSelected(x: number, y: number, z: number): boolean {
    if (x < this.origin.x || x >= this.end.x) return false;
    if (y < this.origin.y || y >= this.end.y) return false;
    if (z < this.origin.z || z >= this.end.z) return false;
    return true;
  }

  reConstruct(
    startPosition: Vector3Like,
    startNormal: Vector3Like,
    endPosition: Vector3Like,
    endNormal: Vector3Like,
    offset = 0
  ) {
    const size = getSize(startPosition, endPosition);

    const point1: Vec3Array = [
      startPosition.x,
      startPosition.y,
      startPosition.z,
    ];

    const point2 = Vec3ArrayLike.Add(point1, [
      size.x || 1,
      size.y || 1,
      size.z || 1,
    ]);
    const minPoint: Vec3Array = [
      Math.min(point1[0], point2[0]),
      Math.min(point1[1], point2[1]),
      Math.min(point1[2], point2[2]),
    ];
    const maxPoint: Vec3Array = [
      Math.max(point1[0], point2[0]),
      Math.max(point1[1], point2[1]),
      Math.max(point1[2], point2[2]),
    ];

    if (size.x < 0) maxPoint[0] += 1;
    if (size.y < 0) maxPoint[1] += 1;
    if (size.z < 0) maxPoint[2] += 1;

    const normalOffset = Vec3ArrayLike.Add(
      [startPosition.x, startPosition.y, startPosition.z],
      Vec3ArrayLike.MultiplyScalar(
        [startNormal.x, startNormal.y, startNormal.z],
        offset
      )
    );

    const [finalMin, finalMax] = getMinMax(minPoint, maxPoint, normalOffset);

    const finalSize: Vec3Array = [
      Math.abs(finalMax[0] - finalMin[0]),
      Math.abs(finalMax[1] - finalMin[1]),
      Math.abs(finalMax[2] - finalMin[2]),
    ];
    if (finalSize[0] == 0 && finalSize[1] == 0 && finalSize[2] == 0) {
      this.origin.x = startPosition.x;
      this.origin.y = startPosition.y;
      this.origin.z = startPosition.z;
      this.end.x = startPosition.x + startNormal.x;
      this.end.y = startPosition.y + startNormal.y;
      this.end.z = startPosition.z + startNormal.z;
      this.size.x = 1;
      this.size.y = 1;
      this.size.z = 1;
    } else {
      this.origin.x = finalMin[0];
      this.origin.y = finalMin[1];
      this.origin.z = finalMin[2];
      this.end.x = finalMax[0];
      this.end.y = finalMax[1];
      this.end.z = finalMax[2];
      this.size.x = finalSize[0];
      this.size.y = finalSize[1];
      this.size.z = finalSize[2];
    }
  }

  toTemplate(data?: Partial<IVoxelshapeTemplateBaseData>) {
    const boxTemplate = BoxVoxelTemplate.CreateNew({
      width: this.size.x,
      height: this.size.y,
      depth: this.size.z,
      ...(data ? data : {}),
    });
    return new BoxVoxelTemplate(boxTemplate);
  }

  toExtrudedTemplate(cursor: DataCursorInterface, normal: Vector3Like) {}
}
