export const SecotrData = {
  byteSize: 0,
  maxSectors: 16,

  getSectorsNeeded(byteLength: number) {
    return Math.ceil(byteLength / SecotrData.byteSize);
  },
  getTotalSectorsInFile(byteLength: number) {
    return Math.ceil(
      Math.abs(byteLength - RegionHeaderData.byteSize) / SecotrData.byteSize
    );
  },
  getSectorByteIndex(index: number) {
    return index * this.byteSize + RegionHeaderData.byteSize;
  },

  getTotalBytesNeeded(byteLength: number) {
    return this.getSectorsNeeded(byteLength) * this.byteSize;
  },
};

export const RegionHeaderData = {
  byteSize: 0,
};
