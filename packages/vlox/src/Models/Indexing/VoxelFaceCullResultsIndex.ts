import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type VoxelFaceCullResultsIndexData = {
  buffer: ArrayBufferLike;
  faceByteCount: number;
};

const flatIndexSize = VoxelRelativeCubeIndex.flatIndex.size;

function getByteIndex(
  otherId: number,
  directionIndex: number,
  faceByteCount: number
) {
  return (
    otherId * faceByteCount * flatIndexSize + directionIndex * faceByteCount
  );
}
export class VoxelFaceCullResultsIndex {
  view: Uint16Array;

  readonly faceByteCount: number;

  constructor(data: VoxelFaceCullResultsIndexData) {
    this.view = new Uint16Array(data.buffer);
    this.faceByteCount = data.faceByteCount;
  }

  getValue(otherId: number, directionIndex: number, faceIndex: number) {
    const v =
      this.view[
        getByteIndex(otherId, directionIndex, this.faceByteCount) + faceIndex
      ];
    return v == 65535 ? -1 : v;
  }

  setValue(
    otherId: number,
    directionIndex: number,
    faceIndex: number,
    value = -1
  ) {
    return (this.view[
      getByteIndex(otherId, directionIndex, this.faceByteCount) + faceIndex
    ] = value);
  }
  getData(): VoxelFaceCullResultsIndexData {
    return {
      buffer: this.view.buffer,
      faceByteCount: this.faceByteCount,
    };
  }
}
