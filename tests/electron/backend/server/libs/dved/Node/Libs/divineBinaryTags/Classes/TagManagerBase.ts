import { BufferTypes } from "../Types/Util.types.js";
import { DBTUtil, NumberTypeMap, TagNodeTypes } from "../Util/DBTUtil.js";

const TagIndexData: [
  byteIndex: number,
  bitOffSet: number,
  bitSize: number,
  type: number
] = [0, 0, 0, 0];

const getIndexData = (data: DataView, indexBufferIndex: number) => {
  TagIndexData[0] = data.getUint32(indexBufferIndex);
  indexBufferIndex += DBTUtil.getTypedSize("32ui");
  TagIndexData[1] = data.getUint8(indexBufferIndex);
  indexBufferIndex += DBTUtil.getTypedSize("8ui");
  TagIndexData[2] = data.getUint8(indexBufferIndex);
  indexBufferIndex += DBTUtil.getTypedSize("8ui");
  TagIndexData[3] = data.getUint8(indexBufferIndex);
  indexBufferIndex += DBTUtil.getTypedSize("8ui");

  return TagIndexData;
};

export class TagManagerBase {
  byteOffSet = 0;
  tagSize = 0;
  tagIndexes = 0;

  data = new DataView(new ArrayBuffer(0));

  indexMap: Map<string, number> = new Map();
  index = new DataView(new ArrayBuffer(0));

  constructor(public id: string) {}

  setBuffer(data: BufferTypes | DataView) {
    if (data instanceof DataView) {
      this.data = data;
      return;
    }
    this.data = new DataView(data);
  }

  setTagIndex(index: number) {
    this.byteOffSet = index * this.tagSize;
  }

  getTag(id: string): number {
    const byteIndex = this.indexMap.get(id);
    if (byteIndex === undefined) {
      throw new Error(`Tag with id: ${id} does not exist.`);
    }
    const indexData = getIndexData(this.index, byteIndex);
    if (
      indexData[3] == TagNodeTypes.boolean ||
      indexData[3] == TagNodeTypes.number
    ) {
      return DBTUtil.getBitValue(
        this.data.getUint8(indexData[0] + this.byteOffSet),
        indexData[1],
        indexData[2]
      );
    }
    if (indexData[3] == TagNodeTypes.typedNumber) {
      return DBTUtil.getTypedNumber(
        this.data,
        indexData[0] + this.byteOffSet,
        indexData[2]
      );
    }
    return -Infinity;
  }

  setTag(id: string, value: number) {
    const byteIndex = this.indexMap.get(id);
    if (byteIndex === undefined) {
      throw new Error(`Tag with id: ${id} does not exist.`);
    }
    const indexData = getIndexData(this.index, byteIndex);
    if (
      indexData[3] == TagNodeTypes.boolean ||
      indexData[3] == TagNodeTypes.number
    ) {
      this.data.setUint8(
        indexData[0] + this.byteOffSet,
        DBTUtil.setBitValue(
          this.data.getUint8(indexData[0] + this.byteOffSet),
          indexData[1],
          value,
          indexData[2]
        )
      );
      return true;
    }
    if (indexData[3] == TagNodeTypes.typedNumber) {
      DBTUtil.setTypedNumber(
        this.data,
        indexData[0] + this.byteOffSet,
        indexData[2],
        value
      );
      return true;
    }
    return false;
  }

  getArrayTagValue(id: string, index: number) {
    const byteIndex = this.indexMap.get(id);
    if (byteIndex === undefined) {
      throw new Error(`Tag with id: ${id} does not exist.`);
    }
    const indexData = getIndexData(this.index, byteIndex);
    if (indexData[3] == TagNodeTypes.typedNumberArray) {
      return DBTUtil.getTypedNumber(
        this.data,
        indexData[0] +
          this.byteOffSet +
          index * DBTUtil.getTypedSizeFromNumber(indexData[2]),
        indexData[2]
      );
    }
    return -Infinity;
  }

  /**## getArrayTagByteIndex
   *  Get the actual byte index for the provided index of the array.
   * @param id
   * @param index
   * @returns
   */
  getArrayTagByteIndex(id: string, index: number) {
    const byteIndex = this.indexMap.get(id);
    if (byteIndex === undefined) {
      throw new Error(`Tag with id: ${id} does not exist.`);
    }
    const indexData = getIndexData(this.index, byteIndex);
    if (indexData[3] == TagNodeTypes.typedNumberArray) {
      return (
        indexData[0] +
        this.byteOffSet +
        index * DBTUtil.getTypedSizeFromNumber(indexData[2])
      );
    }
    return -Infinity;
  }

  setArrayTagValue(id: string, index: number, value: number) {
    const byteIndex = this.indexMap.get(id);
    if (byteIndex === undefined) {
      throw new Error(`Tag with id: ${id} does not exist.`);
    }
    const indexData = getIndexData(this.index, byteIndex);
    if (indexData[3] == TagNodeTypes.typedNumberArray) {
      return DBTUtil.setTypedNumber(
        this.data,
        indexData[0] +
          this.byteOffSet +
          index * DBTUtil.getTypedSizeFromNumber(indexData[2]),
        indexData[2],
        value
      );
    }
    return -Infinity;
  }

  loopThroughTags(run: (id: string, value: number) => void) {
    this.indexMap.forEach((i, id) => {
      run(id, this.getTag(id));
    });
  }
  loopThroughIndex(run: (data: number[]) => void) {
    this.indexMap.forEach((index, id) => {
      const indexData = getIndexData(this.index, index);
      run(indexData);
    });
  }
  loopThroughAllIndexTags(
    run: (id: string, value: number, index: number) => void
  ) {
    for (let index = 0; index < this.tagIndexes; index++) {
      this.setTagIndex(index);
      this.indexMap.forEach((i, id) => {
        run(id, this.getTag(id), index);
      });
    }
  }
}
