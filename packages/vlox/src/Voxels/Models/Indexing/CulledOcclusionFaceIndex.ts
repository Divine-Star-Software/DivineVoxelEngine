import { getBitArrayIndex, setBitArrayIndex } from "../../../Util/Binary/BinaryArrays";
import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type CulledOcclusionFaceIndexData = {
  buffer: ArrayBufferLike;
  totalFaces: number;
};
const flatIndexSize = VoxelRelativeCubeIndex.flatIndex.size;

function getIndex(
    geomtryId: number,
  directionIndex: number,
  faceIndex: number,
  totalFaces: number
) {
  const start =
    totalFaces * flatIndexSize * geomtryId + directionIndex * totalFaces;
  return start + faceIndex;
}
export class CulledOcclusionFaceIndex {
  view: Uint8Array;

  readonly totalFaces: number;

  constructor(data: CulledOcclusionFaceIndexData) {
    this.view = new Uint8Array(data.buffer);
    this.totalFaces = data.totalFaces;
  }

  getValue(geomtryId: number, directionIndex: number, faceIndex: number) {
    return getBitArrayIndex(
      this.view,
      getIndex(geomtryId, directionIndex, faceIndex, this.totalFaces)
    );
  }

  setValue(
    geomtryId: number,
    directionIndex: number,
    faceIndex: number,
    value = 0
  ) {
    return setBitArrayIndex(
      this.view,
      getIndex(geomtryId, directionIndex, faceIndex, this.totalFaces),
      value
    );
  }

  toJSON(): CulledOcclusionFaceIndexData {
    return {
      buffer: this.view.buffer,
      totalFaces: this.totalFaces,
    };
  }
}
