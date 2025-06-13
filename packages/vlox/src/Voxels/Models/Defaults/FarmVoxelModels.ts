import { VoxelGeometryData, VoxelModelData } from "../VoxelModel.types";

const farmlandGeomtry: VoxelGeometryData = {
  id: "dve_farmland",
  divisor: [16, 16, 16],
  arguments: {
    upTex: {
      type: "texture",
    },
    upTexRotation: {
      type: "int",
      default: 0,
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
        [0, 0, 0],
        [16, 13, 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: [0, 0, 16, 16],
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: [0, 0, 16, 16],
        },
        north: {
          texture: "@northTex",
          uv: [0, 0, 16, 13],
        },
        south: {
          texture: "@southTex",
          uv: [0, 0, 16, 13],
        },
        east: {
          texture: "@eastTex",
          uv: [0, 0, 16, 13],
        },
        west: {
          texture: "@westTex",
          uv: [0, 0, 16, 13],
        },
      },
    },
  ],
};

const farmlandModel: VoxelModelData = {
  id: "dve_farmland",
  relationsSchema: [],

  stateSchema: [
    {
      name: "moist",
      bitIndex: 0,
      bitSize: 1,
      values: ["false", "true"],
    },
    {
      name: "rotation",
      bitIndex: 1,
      bitSize: 1,
      values: ["0", "90"],
    },
  ],
  arguments: {
    topTexture: {
      type: "texture",
    },
    sideTexture: {
      type: "texture",
    },
    moistTexture: {
      type: "texture",
    },
  },

  conditonalNodes: {},
  properties: {
    dve_placing_strategy: "*",
    dve_simulation_behavior: "dve_frarmland",
  },
  stateNodes: {
    "moist=false,rotation=0": [
      {
        geometryId: "dve_farmland",
        inputs: {
          upTex: "@topTexture",
          downTex: "@sideTexture",
          northTex: "@sideTexture",
          southTex: "@sideTexture",
          eastTex: "@sideTexture",
          westTex: "@sideTexture",
        },
      },
    ],
    "moist=false,rotation=90": [
      {
        geometryId: "dve_farmland",
        inputs: {
          upTex: "@topTexture",
          upTexRotation: 90,
          downTex: "@sideTexture",
          northTex: "@sideTexture",
          southTex: "@sideTexture",
          eastTex: "@sideTexture",
          westTex: "@sideTexture",
        },
      },
    ],
    "moist=true,rotation=0": [
      {
        geometryId: "dve_farmland",
        inputs: {
          upTex: "@moistTexture",
          downTex: "@sideTexture",
          northTex: "@sideTexture",
          southTex: "@sideTexture",
          eastTex: "@sideTexture",
          westTex: "@sideTexture",
        },
      },
    ],
    "moist=true,rotation=90": [
      {
        geometryId: "dve_farmland",
        inputs: {
          upTex: "@moistTexture",
          upTexRotation: 90,
          downTex: "@sideTexture",
          northTex: "@sideTexture",
          southTex: "@sideTexture",
          eastTex: "@sideTexture",
          westTex: "@sideTexture",
        },
      },
    ],
  },
};

const cropGeomtry: VoxelGeometryData = {
  id: "dve_crop",
  doNotBuildRules: true,
  cullingProcedure: {
    type: "none",
  },
  divisor: [16, 16, 16],
  arguments: {
    texture: {
      type: "texture",
    },
    doubleSided: {
      type: "boolean",
      default: true,
    },
  },
  nodes: [
    {
      type: "quad",
      points: [
        [16, 16, 2],
        [0, 16, 2],
        [0, 0, 2],
        [16, 0, 2],
      ],
      doubleSided: "@doubleSided",
      uv: [0, 0, 16, 16],
      texture: "@texture",
    },
    {
      type: "quad",
      points: [
        [16, 16, 14],
        [0, 16, 14],
        [0, 0, 14],
        [16, 0, 14],
      ],
      doubleSided: "@doubleSided",
      uv: [0, 0, 16, 16],
      texture: "@texture",
    },

    {
      type: "quad",
      points: [
        [2, 16, 16],
        [2, 16, 0],
        [2, 0, 0],
        [2, 0, 16],
      ],
      doubleSided: "@doubleSided",
      uv: [0, 0, 16, 16],
      texture: "@texture",
    },
    {
      type: "quad",
      points: [
        [14, 16, 16],
        [14, 16, 0],
        [14, 0, 0],
        [14, 0, 16],
      ],
      doubleSided: "@doubleSided",
      uv: [0, 0, 16, 16],
      texture: "@texture",
    },
  ],
};

const cropModel: VoxelModelData = {
  id: "dve_crop",
  divisor: [16, 16, 16],
  relationsSchema: [],
  stateSchema: [
    {
      name: "level",
      bitIndex: 0,
      bitSize: 3,
    },
  ],
  arguments: {
    doubleSided: {
      type: "boolean",
      default: false,
    },
    level1: {
      type: "texture",
    },
    level2: {
      type: "texture",
    },
    level3: {
      type: "texture",
    },
    level4: {
      type: "texture",
    },
    level5: {
      type: "texture",
    },
    level6: {
      type: "texture",
    },
    level7: {
      type: "texture",
    },
  },
  properties: {
    dve_placing_strategy: "*",
    dve_simulation_behavior: "dve_crop",
  },
  conditonalNodes: {},
  stateNodes: {
    "level=0": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level1",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=1": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level2",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=2": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level3",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=3": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level4",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=4": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level5",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=5": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level6",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=6": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level7",
          doubleSided: "@doubleSided",
        },
      },
    ],
    "level=7": [
      {
        geometryId: "dve_crop",
        position: [0, -3, 0],
        inputs: {
          texture: "@level8",
          doubleSided: "@doubleSided",
        },
      },
    ],
  },
};

export const farmGeomtry = [farmlandGeomtry, cropGeomtry];
export const farmModels = [farmlandModel, cropModel];
