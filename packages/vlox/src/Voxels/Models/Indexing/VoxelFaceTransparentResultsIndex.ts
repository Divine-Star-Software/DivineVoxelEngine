import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";

export type VoxelFaceTransparentResultsIndexData = {
  buffer: SharedArrayBuffer;
  resultsSize: number;
};

export class VoxelFaceTransparentResultsIndex {
  view: Uint8Array;

  constructor(public data: VoxelFaceTransparentResultsIndexData) {
    this.view = new Uint8Array(data.buffer);
  }

  getValue(modState: number, faceByteIndex: number, faceIndex: number) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      this.data.resultsSize * modState + faceByteIndex,
      faceIndex
    );
  }

  setValue(
    modState: number,
    faceByteIndex: number,
    faceIndex: number,
    value = 1
  ) {
    BinaryArrays.setBitArrayIndex(
      this.view,
      this.data.resultsSize * modState + faceByteIndex,
      faceIndex,
      value
    );
  }
}
