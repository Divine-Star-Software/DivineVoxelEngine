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

test("column position is correct using getPositionXYZ", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.column._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.column._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.column.getPositionXYZ(cx, cy, cz);
        indexes.push(x, y, z);
        expected.push(x, 0, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("column position is correct using getPositionLocation", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.column._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.column._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.column.getPositionLocation([
          "main",
          cx,
          cy,
          cz,
        ]);
        indexes.push(x, y, z);
        expected.push(x, 0, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("column position is correct using getPosition", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.column._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.column._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.column.setXYZ(cx, cy, cz).getPosition();
        indexes.push(x, y, z);
        expected.push(x, 0, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});

test("chunk position is correct using getPositionLocation", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.chunk._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.chunk._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.chunk.getPositionLocation([
          "main",
          cx,
          cy,
          cz,
        ]);
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("chunk position is correct using getPositionXYZ", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.chunk._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.chunk._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.chunk.getPositionXYZ(cx, cy, cz);
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("chunk position is correct using getPosition", () => {
  const indexes = [];
  const expected = [];
  for (
    let cx = 0;
    cx < WorldSpaces.region._bounds.x;
    cx += WorldSpaces.chunk._bounds.x
  ) {
    for (
      let cz = 0;
      cz < WorldSpaces.region._bounds.z;
      cz += WorldSpaces.chunk._bounds.z
    ) {
      for (
        let cy = 0;
        cy < WorldSpaces.region._bounds.y;
        cy += WorldSpaces.chunk._bounds.y
      ) {
        const { x, y, z } = WorldSpaces.chunk.setXYZ(cx, cy, cz).getPosition();
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});

test("voxel position is correct using getPositionLocation", () => {
  const indexes = [];
  const expected = [];
  for (let cx = 0; cx < WorldSpaces.chunk._bounds.x; cx++) {
    for (let cz = 0; cz < WorldSpaces.chunk._bounds.z; cz++) {
      for (let cy = 0; cy < WorldSpaces.chunk._bounds.y; cy++) {
        const { x, y, z } = WorldSpaces.voxel.getPositionLocation([
          "main",
          cx,
          cy,
          cz,
        ]);
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("voxel position is correct using getPositionXYZ", () => {
  const indexes = [];
  const expected = [];
  for (let cx = 0; cx < WorldSpaces.chunk._bounds.x; cx++) {
    for (let cz = 0; cz < WorldSpaces.chunk._bounds.z; cz++) {
      for (let cy = 0; cy < WorldSpaces.chunk._bounds.y; cy++) {
        const { x, y, z } = WorldSpaces.voxel.getPositionXYZ(cx, cy, cz);
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
test("voxel position is correct using getPosition", () => {
  const indexes = [];
  const expected = [];
  for (let cx = 0; cx < WorldSpaces.chunk._bounds.x; cx++) {
    for (let cz = 0; cz < WorldSpaces.chunk._bounds.z; cz++) {
      for (let cy = 0; cy < WorldSpaces.chunk._bounds.y; cy++) {
        const { x, y, z } = WorldSpaces.voxel.setXYZ(cx, cy, cz).getPosition();
        indexes.push(x, y, z);
        expected.push(x, y, z);
      }
    }
  }
  expect(indexes.toString()).toBe(expected.toString());
});
