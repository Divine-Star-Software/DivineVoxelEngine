import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type VoxelFaceCullResultsIndexData = {
  buffer: SharedArrayBuffer;
  faceByteCount: number;
};

export class VoxelFaceCullResultsIndex {
  view: Uint16Array;

  constructor(public data: VoxelFaceCullResultsIndexData) {
    this.view = new Uint16Array(data.buffer);
  }

  getByteIndex(otherId: number, directionIndex: number) {
    return (
      otherId * this.data.faceByteCount * VoxelRelativeCubeIndex.flatIndex.size +
      directionIndex * this.data.faceByteCount
    );
  }

  getValue(otherId: number, directionIndex: number, faceIndex: number) {
    const v = this.view[this.getByteIndex(otherId, directionIndex) + faceIndex];
    return v == 65535 ? -1 : v;
  }

  setValue(
    otherId: number,
    directionIndex: number,
    faceIndex: number,
    value = -1
  ) {
    return (this.view[this.getByteIndex(otherId, directionIndex) + faceIndex] =
      value);
  }
}
