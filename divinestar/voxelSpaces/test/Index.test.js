import { VoxelSpaces } from "../dist/index.js";

const settings = {
  regions: {
    regionXPow2: 9,
    regionYPow2: 8,
    regionZPow2: 9,
  },
  chunks: {
    autoHeightMap: true,
    chunkXPow2: 4,
    chunkYPow2: 4,
    chunkZPow2: 4,
  },
};

const WorldSpaces = VoxelSpaces.getVoxelSpaces();

WorldSpaces.setDimensions({
  regions: {
    x: settings.regions.regionXPow2,
    y: settings.regions.regionYPow2,
    z: settings.regions.regionZPow2,
  },
  columns: {
    x: settings.chunks.chunkXPow2,
    y: settings.regions.regionYPow2,
    z: settings.chunks.chunkZPow2,
  },
  chunks: {
    x: settings.chunks.chunkXPow2,
    y: settings.chunks.chunkYPow2,
    z: settings.chunks.chunkZPow2,
  },
});

test("column index is in x/z order using getIndexLocation", () => {
  const indexes = [];
  const counts = [];
  let count = 0;
  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      const index = WorldSpaces.column.getIndexLocation(["main", x, 0, z]);
      indexes.push(index);
      counts.push(count);
      count++;
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("column index is in x/z order using getIndexXYZ", () => {
  const indexes = [];
  const counts = [];
  let count = 0;
  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      const index = WorldSpaces.column.getIndexXYZ(x, 0, z);
      indexes.push(index);
      counts.push(count);
      count++;
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("column index is in x/z order using getIndex", () => {
  const indexes = [];
  const counts = [];
  let count = 0;
  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      const index = WorldSpaces.column.setXYZ(x, 0, z).getIndex();
      indexes.push(index);
      counts.push(count);
      count++;
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("voxel index is in y/x/z order using getIndexLocation", () => {
  let count = 0;
  const indexes = [];
  const counts = [];
  for (let y = 0; y < WorldSpaces.chunk._bounds.y; y++) {
    for (let x = 0; x < WorldSpaces.chunk._bounds.x; x++) {
      for (let z = 0; z < WorldSpaces.chunk._bounds.z; z++) {
        const index = WorldSpaces.voxel.getIndexLocation(["main", x, y, z]);
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("voxel index is in y/x/z order using getIndexXYZ", () => {
  let count = 0;
  const indexes = [];
  const counts = [];
  for (let y = 0; y < WorldSpaces.chunk._bounds.y; y++) {
    for (let x = 0; x < WorldSpaces.chunk._bounds.x; x++) {
      for (let z = 0; z < WorldSpaces.chunk._bounds.z; z++) {
        const index = WorldSpaces.voxel.getIndexXYZ(x, y, z);
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("voxel index is in y/x/z order using getIndex", () => {
  let count = 0;
  const indexes = [];
  const counts = [];
  for (let y = 0; y < WorldSpaces.chunk._bounds.y; y++) {
    for (let x = 0; x < WorldSpaces.chunk._bounds.x; x++) {
      for (let z = 0; z < WorldSpaces.chunk._bounds.z; z++) {
        const index = WorldSpaces.voxel.setXYZ(x, y, z).getIndex();
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("chunk index is in y order using getIndexLocation", () => {
  const indexes = [];
  const counts = [];

  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      let count = 0;
      for (
        let y = 0;
        y < WorldSpaces.column._bounds.y;
        y += WorldSpaces.chunk._bounds.y
      ) {
        const index = WorldSpaces.chunk.getIndexLocation(["main", x, y, z]);
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("chunk index is in y order using getIndexXYZ", () => {
  const indexes = [];
  const counts = [];

  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      let count = 0;
      for (
        let y = 0;
        y < WorldSpaces.column._bounds.y;
        y += WorldSpaces.chunk._bounds.y
      ) {
        const index = WorldSpaces.chunk.getIndexXYZ(x, y, z);
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("chunk index is in y order using getIndex", () => {
  const indexes = [];
  const counts = [];

  for (
    let x = 0;
    x < WorldSpaces.region._bounds.x;
    x += WorldSpaces.column._bounds.x
  ) {
    for (
      let z = 0;
      z < WorldSpaces.region._bounds.z;
      z += WorldSpaces.column._bounds.z
    ) {
      let count = 0;
      for (
        let y = 0;
        y < WorldSpaces.column._bounds.y;
        y += WorldSpaces.chunk._bounds.y
      ) {
        const index = WorldSpaces.chunk.setXYZ(x, y, z).getIndex();
        indexes.push(index);
        counts.push(count);
        count++;
      }
    }
  }
  expect(indexes.toString()).toBe(counts.toString());
});

test("chunk position is in y order using getIndex", () => {
  const indexes = [];
  const counts = [];

  for (
    let y = 0;
    y < WorldSpaces.column._bounds.y;
    y += WorldSpaces.chunk._bounds.y
  ) {
    const index = WorldSpaces.chunk
      .setXYZ(16 * 100 * Math.random(), y, 16 * 100 * Math.random())
      .getIndex();
    const position = WorldSpaces.chunk.getPositionFromIndex(index);
    indexes.push(position.y);
    counts.push(y);
  }

  expect(indexes.toString()).toBe(counts.toString());
});
