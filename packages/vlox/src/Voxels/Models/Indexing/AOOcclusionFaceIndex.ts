import {
  getBitArrayIndex,
  setBitArrayIndex,
} from "../../../Util/Binary/BinaryArrays";
import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type AOOcclusionFaceIndexData = {
  buffer: ArrayBufferLike;
  totalFaces: number;
};
const flatIndexSize = VoxelRelativeCubeIndex.flatIndex.size;

function getIndex(
  geomtryId: number,
  directionIndex: number,
  faceIndex: number,
  totalFaces: number,
  vertexIndex: number
) {
  const start =
    totalFaces * 4 * flatIndexSize * geomtryId +
    directionIndex * (totalFaces * 4);
  return start + faceIndex * 4 + vertexIndex;
}
export class AOOcclusionFaceIndex {
  view: Uint8Array;

  readonly totalFaces: number;

  constructor(data: AOOcclusionFaceIndexData) {
    this.view = new Uint8Array(data.buffer);
    this.totalFaces = data.totalFaces;
  }

  getValue(
    geomtryId: number,
    directionIndex: number,
    faceIndex: number,
    vertexIndex: number
  ) {
    return getBitArrayIndex(
      this.view,
      getIndex(
        geomtryId,
        directionIndex,
        faceIndex,
        this.totalFaces,
        vertexIndex
      )
    );
  }

  setValue(
    geomtryId: number,
    directionIndex: number,
    faceIndex: number,
    vertexIndex: number,
    value = 0
  ) {
    return setBitArrayIndex(
      this.view,
      getIndex(
        geomtryId,
        directionIndex,
        faceIndex,
        this.totalFaces,
        vertexIndex
      ),
      value
    );
  }

  toJSON(): AOOcclusionFaceIndexData {
    return {
      buffer: this.view.buffer,
      totalFaces: this.totalFaces,
    };
  }
}
