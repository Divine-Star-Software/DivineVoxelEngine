import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";
import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type VoxelAOResultsIndexData = {
  buffer: ArrayBufferLike;
  vertexByteCount: number;
};
const flatIndexSize = VoxelRelativeCubeIndex.flatIndex.size;

function getByteIndex(
  otherId: number,
  directionIndex: number,
  vertexByteCount: number
) {
  return (
    otherId * vertexByteCount * flatIndexSize + directionIndex * vertexByteCount
  );
}

export class VoxelAOResultsIndex {
  view: Uint8Array;
  readonly vertexByteCount: number;
  constructor(data: VoxelAOResultsIndexData) {
    this.vertexByteCount = data.vertexByteCount;
    this.view = new Uint8Array(data.buffer);
  }

  getValue(otherId: number, directionIndex: number, vertexIndex: number) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      getByteIndex(otherId, directionIndex, this.vertexByteCount),
      vertexIndex
    );
  }

  setValue(
    otherId: number,
    directionIndex: number,
    vertexIndex: number,
    value = 1
  ) {
    BinaryArrays.setBitArrayIndex(
      this.view,
      getByteIndex(otherId, directionIndex, this.vertexByteCount),
      vertexIndex,
      value
    );
  }
  getData(): VoxelAOResultsIndexData {
    return {
      buffer: this.view.buffer,
      vertexByteCount: this.vertexByteCount,
    };
  }
}
