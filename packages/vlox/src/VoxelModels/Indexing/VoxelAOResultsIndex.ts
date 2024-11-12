import { BinaryArrays } from "@amodx/binary/Util/BinaryArrays";
import { VoxelRelativeCubeIndex } from "./VoxelRelativeCubeIndex";
export type VoxelAOResultsIndexData = {
  buffer: SharedArrayBuffer;
  vertexByteCount: number;
};

export class VoxelAOResultsIndex {
  view: DataView;

  constructor(public data: VoxelAOResultsIndexData) {
    this.view = new DataView(data.buffer);
  }

  getByteIndex(otherId: number, directionIndex: number) {
    return (
      otherId * this.data.vertexByteCount * VoxelRelativeCubeIndex.flatIndex.size +
      directionIndex * this.data.vertexByteCount
    );
  }

  getValue(otherId: number, directionIndex: number, vertexIndex: number) {
    return BinaryArrays.getBitArrayIndex(
      this.view,
      this.getByteIndex(otherId, directionIndex),
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
      this.getByteIndex(otherId, directionIndex),
      vertexIndex,
      value
    );
  }
}
