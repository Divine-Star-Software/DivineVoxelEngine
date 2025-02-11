import { VoxelGeometryData, VoxelModelData } from "./VoxelModel.types";
export const chainGeometry: VoxelGeometryData = {
  id: "dve_chain",
  divisor: [16, 16, 16],
  doNotBuildRules: true,
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "quad",
      points: [
        [5, 16, 11],
        [11, 16, 5],
        [11, 0, 5],
        [5, 0, 11],
      ],
      uv: [0, 0, 6, 1],
      texture: "@texture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [11, 16, 11],
        [5, 16, 5],
        [5, 0, 5],
        [11, 0, 11],
      ],
      uv: [0, 0, 6, 16],
      texture: "@texture",
      doubleSided: true,
    },
  ],
};
export const chainModel: VoxelModelData = {
  id: "dve_chain",
  arguments: {
    texture: {
      type: "texture",
    },
  },
  relationsSchema: [],
  stateSchema: [
    {
      name: "axis",
      type: "string",
      values: ["y", "x", "z"],
    },
  ],
  conditonalNodes: {},
  stateNodes: {
    "axis=y": [
      {
        id: "main",
        geometryId: "dve_chain",
        inputs: {
          texture: "@texture",
        },
      },
    ],
    "axis=x": [
      {
        id: "main",
        geometryId: "dve_chain",
        rotation: [90, 0, 0],
        inputs: {
          texture: "@texture",
        },
      },
    ],
    "axis=z": [
      {
        id: "main",
        geometryId: "dve_chain",
        rotation: [0, 0, 90],
        inputs: {
          texture: "@texture",
        },
      },
    ],
  },
};

export const carpetGeometry: VoxelGeometryData = {
  id: "dve_carpet",
  divisor: [16, 16, 16],
  arguments: {
    topBottomTex: {
      type: "texture",
    },
    sideTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [16, 1, 16],
      ],
      faces: {
        up: {
          texture: "@topBottomTex",
          uv: [0, 0, 16, 16],
        },
        down: {
          texture: "@topBottomTex",
          uv: [0, 0, 16, 16],
        },
        north: {
          texture: "@sideTex",
          uv: [0, 0, 16, 1],
        },
        south: {
          texture: "@sideTex",
          uv: [0, 0, 16, 1],
        },
        east: {
          texture: "@sideTex",
          uv: [0, 0, 16, 1],
        },
        west: {
          texture: "@sideTex",
          uv: [0, 0, 16, 1],
        },
      },
    },
  ],
};

export const carpetModel: VoxelModelData = {
  id: "dve_carpet",
  arguments: {
    topBottomTex: {
      type: "texture",
    },
    sideTex: {
      type: "texture",
    },
  },
  relationsSchema: [],
  stateSchema: [],
  conditonalNodes: {},
  stateNodes: {
    "*": [
      {
        id: "main",
        geometryId: "dve_carpet",
        inputs: {
          topBottomTex: "@topBottomTex",
          sideTex: "@sideTex",
        },
      },
    ],
  },
};

export const fencePost: VoxelGeometryData = {
  id: "dve_fence_post",
  divisor: [16, 16, 16],
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [6, 0, 6],
        [10, 16, 10],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [6, 6, 10, 10],
        },
        down: {
          texture: "@downTex",
          uv: [6, 6, 10, 10],
        },
        north: {
          texture: "@northTex",
          uv: [6, 0, 10, 16],
        },
        south: {
          texture: "@southTex",
          uv: [6, 0, 10, 16],
        },
        east: {
          texture: "@eastTex",
          uv: [6, 0, 10, 16],
        },
        west: {
          texture: "@westTex",
          uv: [6, 0, 10, 16],
        },
      },
    },
  ],
};

export const fenceEastWest: VoxelGeometryData = {
  id: "dve_fence_east_west",
  divisor: [16, 16, 16],
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 12, 7],
        [6, 15, 9],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [0, 7, 7, 9],
        },
        down: {
          texture: "@downTex",
          uv: [0, 7, 7, 9],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7, 6, 10],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7, 6, 10],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7, 6, 10],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7, 6, 10],
        },
      },
    },
    {
      type: "box",
      points: [
        [0, 6, 7],
        [6, 9, 9],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [0, 7, 7, 9],
        },
        down: {
          texture: "@downTex",
          uv: [0, 7, 7, 9],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7, 6, 10],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7, 6, 10],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7, 6, 10],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7, 6, 10],
        },
      },
    },
  ],
};

export const fenceNorthsouth: VoxelGeometryData = {
  id: "dve_fence_north_south",
  divisor: [16, 16, 16],
  arguments: {
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    southTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 12, 0],
        [9, 15, 6],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [7, 0, 9, 7],
        },
        down: {
          texture: "@downTex",
          uv: [7, 0, 9, 7],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7, 6, 10],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7, 6, 10],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7, 6, 10],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7, 6, 10],
        },
      },
    },
    {
      type: "box",
      points: [
        [7, 6, 0],
        [9, 9, 6],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [7, 0, 9, 7],
        },
        down: {
          texture: "@downTex",
          uv: [7, 0, 9, 7],
        },
        north: {
          texture: "@northTex",
          uv: [0, 7, 6, 10],
        },
        south: {
          texture: "@southTex",
          uv: [0, 7, 6, 10],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 7, 6, 10],
        },
        west: {
          texture: "@westTex",
          uv: [0, 7, 6, 10],
        },
      },
    },
  ],
};

export const fence: VoxelModelData = {
  id: "dve_fence",
  divisor: [16,16,16],
  relationsSchema: [
    {
      name: "same-east",
      conditions: [
        {
          type: "same-voxel",
          direction: [1, 0, 0],
        },
      ],
    },
    {
      name: "same-west",
      conditions: [
        {
          type: "same-voxel",
          direction: [-1, 0, 0],
        },
      ],
    },
    {
      name: "same-north",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 0, 1],
        },
      ],
    },
    {
      name: "same-south",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 0, -1],
        },
      ],
    },
  ],
  stateSchema: [],
  arguments: {
    southTex: {
      type: "texture",
    },
    northTex: {
      type: "texture",
    },
    eastTex: {
      type: "texture",
    },
    westTex: {
      type: "texture",
    },
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
  },
  conditonalNodes: {
    "same-south=true": [
      {
        id: "fence_connection_south",
        geometryId: "dve_fence_north_south",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
    "same-north=true": [
      {
        id: "fence_connection_north",
        geometryId: "dve_fence_north_south",
        position: [0, 0, 10],
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
    "same-east=true": [
      {
        id: "fence_connection_east",
        position: [10, 0, 0],
        geometryId: "dve_fence_east_west",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
    "same-west=true": [
      {
        id: "fence_connection_west",
        geometryId: "dve_fence_east_west",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
  },

  stateNodes: {
    "*": [
      {
        id: "fence_post",
        geometryId: "dve_fence_post",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
  },
};

export const candlesGeometry1: VoxelGeometryData = {
  id: "dve_candle_state_1",
  divisor: [16, 16, 16],
  doNotBuildRules: true,
  arguments: {
    candleTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 0, 7],
        [9, 6, 9],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [10, 13, 11, 15],
        },
        down: {
          texture: "@candleTexture",
          uv: [9, 12, 12, 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [0, 10, 2, 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [3, 10, 5, 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [6, 10, 8, 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [0, 10, 2, 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7, 8, 9],
        [9, 8, 7],
        [9, 6, 7],
        [7, 6, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [9, 8, 9],
        [7, 8, 7],
        [7, 6, 7],
        [9, 6, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry2: VoxelGeometryData = {
  id: "dve_candle_state_2",
  doNotBuildRules: true,
  divisor: [16, 16, 16],
  arguments: {
    candleTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 0, 7],
        [9, 5, 9],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [10, 13, 11, 15],
        },
        down: {
          texture: "@candleTexture",
          uv: [9, 12, 12, 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [0, 11, 2, 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [3, 11, 5, 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [6, 11, 8, 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [0, 11, 2, 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7, 7, 9],
        [9, 7, 7],
        [9, 5, 7],
        [7, 5, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [9, 7, 9],
        [7, 7, 7],
        [7, 5, 7],
        [9, 5, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry3: VoxelGeometryData = {
  id: "dve_candle_state_3",
  doNotBuildRules: true,
  divisor: [16, 16, 16],
  arguments: {
    candleTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 0, 7],
        [9, 4, 9],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [10, 13, 11, 15],
        },
        down: {
          texture: "@candleTexture",
          uv: [9, 12, 12, 16],
        },
        north: {
          texture: "@candleTexture",
          uv: [0, 12, 2, 16],
        },
        south: {
          texture: "@candleTexture",
          uv: [3, 12, 5, 16],
        },
        east: {
          texture: "@candleTexture",
          uv: [6, 12, 8, 16],
        },
        west: {
          texture: "@candleTexture",
          uv: [0, 12, 2, 16],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7, 6, 9],
        [9, 6, 7],
        [9, 4, 7],
        [7, 4, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [9, 6, 9],
        [7, 6, 7],
        [7, 4, 7],
        [9, 4, 9],
      ],
      uv: [14, 14, 16, 16],
      texture: "@candleTexture",
      doubleSided: true,
    },
  ],
};
export const candlesGeometry4: VoxelGeometryData = {
  id: "dve_candle_state_4",
  doNotBuildRules: true,
  divisor: [16, 16, 16],
  arguments: {
    candleTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 0, 7],
        [9, 3, 9],
      ],
      faces: {
        up: {
          texture: "@candleTexture",
          uv: [10, 13, 11, 15],
        },
        down: {
          texture: "@candleTexture",
          uv: [9, 12, 12, 1],
        },
        north: {
          texture: "@candleTexture",
          uv: [0, 13, 2, 1],
        },
        south: {
          texture: "@candleTexture",
          uv: [3, 13, 5, 1],
        },
        east: {
          texture: "@candleTexture",
          uv: [6, 13, 8, 1],
        },
        west: {
          texture: "@candleTexture",
          uv: [0, 13, 2, 1],
        },
      },
    },
    {
      type: "quad",
      points: [
        [7, 5, 9],
        [9, 5, 7],
        [9, 3, 7],
        [7, 3, 9],
      ],
      uv: [14, 14, 1, 1],
      texture: "@candleTexture",
      doubleSided: true,
    },
    {
      type: "quad",
      points: [
        [9, 5, 9],
        [7, 5, 7],
        [7, 3, 7],
        [9, 3, 9],
      ],
      uv: [14, 14, 1, 1],
      texture: "@candleTexture",
      doubleSided: true,
    },
  ],
};
export const candlesModel: VoxelModelData = {
  id: "dve_candle",
  divisor: [16, 16, 16],
  arguments: {
    candleTexture: {
      type: "texture",
    },
    candleLitTexture: {
      type: "texture",
    },
  },
  relationsSchema: [],

  stateSchema: [
    {
      name: "num_candles",
      type: "number",
      maxValue: 3,
    },
    {
      name: "lit",
      type: "string",
      values: ["false", "true"],
    },
  ],
  effects: [
    {
      type: "fx-points",
      effectId: "candle_particles",
      values: {
        "num_candles=0,lit=true": [[8, 8.5, 8]],
        "num_candles=1,lit=true": [
          [8 + -2, 8.5, 8],
          [8 + 2, 8.5, 8],
        ],
        "num_candles=2,lit=true": [
          [8 + -2, 8.5, 8 + 2],
          [8 + 2, 7.5, 8 + 2],
          [8 + 2, 6.5, 8 + -2],
        ],
        "num_candles=3,lit=true": [
          [8 + -2, 8.5, 8 + 2],
          [8 + 2, 7.5, 8 + 2],
          [8 + 2, 6.5, 8 + -2],
          [8 + -2, 5.5, 8 + -2],
        ],
      },
    },
    {
      type: "tag",
      tagId: "dve_is_light_source",
      values: {
        "num_candles=0,lit=false": false,
        "num_candles=0,lit=true": true,
        "num_candles=1,lit=false": false,
        "num_candles=1,lit=true": true,
        "num_candles=2,lit=false": false,
        "num_candles=2,lit=true": true,
        "num_candles=3,lit=false": false,
        "num_candles=3,lit=true": true,
      },
    },
  ],
  conditonalNodes: {},
  stateNodes: {
    "num_candles=0,lit=false": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
    ],
    "num_candles=1,lit=false": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 0],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 0],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
    ],
    "num_candles=2,lit=false": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2, 0, -2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
    ],
    "num_candles=3,lit=false": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2, 0, -2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
      {
        id: "candel_4",
        geometryId: "dve_candle_state_4",
        position: [-2, 0, -2],
        inputs: {
          candleTexture: "@candleTexture",
        },
      },
    ],

    "num_candles=0,lit=true": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
    ],
    "num_candles=1,lit=true": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 0],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 0],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
    ],
    "num_candles=2,lit=true": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2, 0, -2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
    ],
    "num_candles=3,lit=true": [
      {
        id: "candel_1",
        geometryId: "dve_candle_state_1",
        position: [-2, 0, 2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_2",
        geometryId: "dve_candle_state_2",
        position: [2, 0, 2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_3",
        geometryId: "dve_candle_state_3",
        position: [2, 0, -2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
      {
        id: "candel_4",
        geometryId: "dve_candle_state_4",
        position: [-2, 0, -2],
        inputs: {
          candleTexture: "@candleLitTexture",
        },
      },
    ],
  },
};

export const leverGeometryBase: VoxelGeometryData = {
  id: "dve_lever_model_base",
  divisor: [16, 16, 16],
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [4, 0, 4],
        [12, 3, 12],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [4, 4, 12, 12],
        },
        down: {
          texture: "@texture",
          uv: [5, 4, 10, 12],
        },
        north: {
          texture: "@texture",
          uv: [5, 0, 10, 3],
        },
        south: {
          texture: "@texture",
          uv: [5, 0, 10, 3],
        },
        east: {
          texture: "@texture",
          uv: [4, 0, 12, 3],
        },
        west: {
          texture: "@texture",
          uv: [4, 0, 12, 3],
        },
      },
    },
  ],
};

export const leverGeometryDown: VoxelGeometryData = {
  id: "dve_lever_model",
  divisor: [16, 16, 16],
  doNotBuildRules: true,
  arguments: {
    texture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [7, 0, 7],
        [9, 14, 9],
      ],
      faces: {
        up: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
        down: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
        north: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
        south: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
        east: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
        west: {
          texture: "@texture",
          uv: [7, 0, 9, 14],
        },
      },
    },
  ],
};

export const leverGeometry = [leverGeometryBase, leverGeometryDown];

export const leverModel: VoxelModelData = {
  id: "dve_lever",
  divisor: [16, 16, 16],
  arguments: {
    baseTexture: {
      type: "texture",
    },
    leverTexture: {
      type: "texture",
    },
  },
  relationsSchema: [],
  stateSchema: [
    {
      name: "placement",
      type: "string",
      values: ["down", "up", "north", "south", "east", "west"],
    },
    {
      name: "direction",
      type: "string",
      values: ["north", "south", "east", "west"],
    },
    {
      name: "state",
      type: "string",
      values: ["off", "on"],
    },
  ],
  conditonalNodes: {},
  stateNodes: {
    "placement=down,direction=north,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -8, -3],
        rotation: [-45, 0, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=north,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -8, 3],
        rotation: [45, 0, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=south,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -0.8, 3],
        rotation: [45, 0, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=south,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -0.8, -3],
        rotation: [-45, 0, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=east,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-3, -8, 0],
        rotation: [0, 0, 45],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=east,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [3, -8, 0],
        rotation: [0, 0, -45],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=west,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [3, -8, 0],
        rotation: [0, 0, -45],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=down,direction=west,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-3, -8, 0],
        rotation: [0, 0, 45],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],

    //placment up
    "placement=up,direction=north,state=off": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [45, 0, 0],
        position: [0, 2, -3],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=north,state=on": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [-45, 0, 0],
        position: [0, 2, 3],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=south,state=off": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [-45, 0, 0],
        position: [0, 2, 3],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=south,state=on": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [45, 0, 0],
        position: [0, 2, -3],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=east,state=off": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [0, 0, -45],
        position: [-3, 2, -0],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=east,state=on": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [0, 0, 45],
        position: [3, 2, -0],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=west,state=off": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [0, 0, 45],
        position: [3, 2, -0],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=up,direction=west,state=on": [
      {
        id: "lever_base",
        rotation: [0, 0, 180],
        rotationPivot: [8, 8, 8],
        geometryId: "dve_lever_model_base",
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        rotation: [0, 0, -45],
        position: [-3, 2, -0],
        rotationPivot: [8, 8, 8],
        flip: [0, 1, 0],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],

    //placement north
    "placement=north,direction=north,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [-90 - 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=north,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [-90 + 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=south,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [-90 + 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=south,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [-90 - 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=east,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-5, 0, 8],
        rotation: [-90, 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=east,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [5, 0, 8],
        rotation: [-90, -45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=west,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-5, 0, 8],
        rotation: [-90, 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=north,direction=west,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [-90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [5, 0, 8],
        rotation: [-90, -45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],

    "placement=south,direction=north,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90 + 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=north,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90 - 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=south,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90 - 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=south,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90 + 45, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=east,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-5, 0, 8],
        rotation: [90, -45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=east,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [5, 0, 8],
        rotation: [90, 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=west,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [-5, 0, 8],
        rotation: [90, -45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=south,direction=west,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [90, 0, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [5, 0, 8],
        rotation: [90, 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],

    "placement=east,direction=north,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90, -90, 45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=north,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90, -90, -45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=south,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90, -90, -45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=south,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90, -90, 45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=east,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, 5],
        rotation: [90, -90 + 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=east,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, -5],
        rotation: [90, -90 - 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=west,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, -5],
        rotation: [90, -90 - 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=east,direction=west,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, 90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, 5],
        rotation: [90, -90 + 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],

    "placement=west,direction=north,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90, 90, -45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=north,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90, 90, 45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=south,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, 5, 8],
        rotation: [90, 90, 45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=south,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [0, -5, 8],
        rotation: [90, 90, -45],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=east,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, 5],
        rotation: [90, 90 - 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=east,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, -5],
        rotation: [90, 90 + 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=west,state=off": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },

      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, -5],
        rotation: [90, 90 + 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
    "placement=west,direction=west,state=on": [
      {
        id: "lever_base",
        geometryId: "dve_lever_model_base",
        rotation: [0, 0, -90],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@baseTexture",
        },
      },
      {
        id: "lever",
        geometryId: "dve_lever_model",
        position: [8, 0, 5],
        rotation: [90, 90 - 45, 0],
        rotationPivot: [8, 8, 8],
        inputs: {
          texture: "@leverTexture",
        },
      },
    ],
  },
};
