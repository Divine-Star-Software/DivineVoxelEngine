import {
  Region,
  Column,
  Chunk,
  RegionData,
  ColumnData,
  ChunkData,
} from "../../../../Data/World/Classes/index.js";

export const WorldDataGenerator = {
  chunk: {
    create(buffer: ArrayBuffer | false = false): ChunkData {
      if (buffer) {
      }
      return Chunk.CreateNew();
    },
  },
  column: {
    create(buffer: ArrayBuffer | false = false): ColumnData {
      if (buffer) {
      }
      return Column.CreateNew({});
    },
  },
  region: {
    create(buffer: ArrayBuffer | false = false): RegionData {
      if (buffer) {
      }

      return Region.CreateNew();
    },
  },
};
