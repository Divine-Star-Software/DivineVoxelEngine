import { Region, Column, Chunk } from "../../../../Data/World/Classes/index.js";

export const WorldDataGenerator = {
  chunk: {
    create(buffer: ArrayBuffer | false = false): Chunk {
      if (buffer) {
      }
      return Chunk.CreateNew();
    },
  },
  column: {
    create(buffer: ArrayBuffer | false = false): Column {
      if (buffer) {
      }
      return Column.CreateNew({});
    },
  },
  region: {
    create(buffer: ArrayBuffer | false = false): Region {
      if (buffer) {
      }

      return Region.CreateNew();
    },
  },
};
