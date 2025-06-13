import { VoxelModelData } from "../VoxelModel.types";

export const simpleCube: VoxelModelData = {
  id: "dve_simple_cube",
  relationsSchema: [],
  stateSchema: [],
  arguments: {
    texture: {
      type: "texture",
    },
  },

  conditonalNodes: {},
  properties: {
    dve_placing_strategy: "*",
    dve_full_block: true,
  },
  stateNodes: {
    "*": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
    ],
  },
};

export const simpleTransparentCube: VoxelModelData = {
  id: "dve_transparent_simple_cube",
  relationsSchema: [],
  stateSchema: [],
  arguments: {
    texture: {
      type: "texture",
    },
    transparent: {
      type: "boolean",
      default: false,
    },
  },

  conditonalNodes: {},
  properties: {
    dve_full_block: true,
    dve_placing_strategy: "*",
  },
  stateNodes: {
    "*": [
      {
        geometryId: "dve_cube",
        cullingProcedure: {
          type: "transparent",
        },
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
    ],
  },
};

export const simpleNoCulledCube: VoxelModelData = {
  id: "dve_no_cull_simple_cube",
  relationsSchema: [],
  stateSchema: [],
  arguments: {
    texture: {
      type: "texture",
    },
  },

  conditonalNodes: {},
  properties: {
    dve_full_block: true,
    dve_placing_strategy: "*",
  },
  stateNodes: {
    "*": [
      {
        geometryId: "dve_cube",
        cullingProcedure: {
          type: "none",
        },
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
    ],
  },
};

export const orientedCube: VoxelModelData = {
  id: "dve_oriented_cube",
  relationsSchema: [],
  stateSchema: [
    {
      name: "placement",
      bitIndex: 0,
      bitSize: 3,
      values: ["down", "up", "north", "south", "east", "west"],
    },
    {
      name: "rotation",
      bitIndex: 3,
      bitSize: 2,
      values: ["0", "90", "180", "270"],
    },
  ],
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
  properties: {
    dve_placing_strategy: [
      //down normal
      {
        face: "up",
        direction: [0, -1, 0],
        state: "placement=down,rotation=0",
      },
      {
        face: "up",
        direction: [0, 0, -1],
        state: "placement=down,rotation=0",
      },
      {
        face: "up",
        direction: [0, 0, 1],
        state: "placement=down,rotation=90",
      },
      {
        face: "up",
        direction: [-1, 0, 0],
        state: "placement=down,direction=esat",
      },
      {
        face: "up",
        direction: [1, 0, 0],
        state: "placement=down,rotation=270",
      },
      //down alt
      {
        face: "up",
        direction: [0, 0, -1],
        state: "placement=north,rotation=0",
        alt: 0,
      },
      {
        face: "up",
        direction: [0, 0, 1],
        state: "placement=south,rotation=90",
        alt: 0,
      },
      {
        face: "up",
        direction: [-1, 0, 0],
        state: "placement=east,direction=esat",
      },
      {
        face: "up",
        direction: [1, 0, 0],
        state: "placement=west,rotation=270",
      },
      //north normal
      {
        face: "north",
        direction: [0, 0, -1],
        state: "placement=north,rotation=0",
      },
      //south normal
      {
        face: "south",
        direction: [0, 0, 1],
        state: "placement=south,rotation=0",
      },
      //east normal
      {
        face: "east",
        direction: [-1, 0, 0],
        state: "placement=east,rotation=0",
      },
      //west normal
      {
        face: "west",
        direction: [1, 0, 0],
        state: "placement=west,rotation=0",
      },
    ],
  },

  conditonalNodes: {},
  stateNodes: {
    "placement=down,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          upTexRotation: 0,
          downTex: "@downTex",
          downTexRotation: 0,
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],
    "placement=down,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          upTexRotation: 180,
          downTex: "@downTex",
          downTexRotation: 180,
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
        },
      },
    ],

    "placement=down,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          upTexRotation: 90,
          downTex: "@downTex",
          downTexRotation: 90,
          northTex: "@eastTex",
          southTex: "@westTex",
          eastTex: "@southTex",
          westTex: "@northTex",
        },
      },
    ],
    "placement=down,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          upTexRotation: 270,
          downTex: "@downTex",
          downTexRotation: 270,
          northTex: "@westTex",
          southTex: "@eastTex",
          eastTex: "@northTex",
          westTex: "@southTex",
        },
      },
    ],
    "placement=up,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@downTex",
          upTexRotation: 0,
          downTex: "@upTex",
          downTexRotation: 0,
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
          northTexRotation: 180,
          southTexRotation: 180,
          eastTexRotation: 180,
          westTexRotation: 180,
        },
      },
    ],
    "placement=up,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@downTex",
          upTexRotation: 180,
          downTex: "@upTex",
          downTexRotation: 180,
          northTex: "@southTex",
          southTex: "@northTex",
          eastTex: "@westTex",
          westTex: "@eastTex",
          northTexRotation: 180,
          southTexRotation: 180,
          eastTexRotation: 180,
          westTexRotation: 180,
        },
      },
    ],

    "placement=up,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@downTex",
          upTexRotation: 90,
          downTex: "@upTex",
          downTexRotation: 90,
          northTex: "@eastTex",
          southTex: "@westTex",
          eastTex: "@southTex",
          westTex: "@northTex",
          northTexRotation: 180,
          southTexRotation: 180,
          eastTexRotation: 180,
          westTexRotation: 180,
        },
      },
    ],
    "placement=up,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@downTex",
          upTexRotation: 270,
          downTex: "@upTex",
          downTexRotation: 270,
          northTex: "@westTex",
          southTex: "@eastTex",
          eastTex: "@northTex",
          westTex: "@southTex",
          northTexRotation: 180,
          southTexRotation: 180,
          eastTexRotation: 180,
          westTexRotation: 180,
        },
      },
    ],

    "placement=south,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@northTex",
          northTex: "@upTex",
          northTexRotation: 0,
          southTex: "@downTex",
          southTexRotation: 0,
          downTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
          upTexRotation: 0,
          downTexRotation: 0,
          eastTexRotation: 90,
          westTexRotation: 90,
        },
      },
    ],

    "placement=south,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@southTex",
          northTex: "@upTex",
          northTexRotation: 180,
          southTex: "@downTex",
          southTexRotation: 180,
          downTex: "@northTex",
          eastTex: "@westTex",
          westTex: "@eastTex",
          upTexRotation: 0,
          downTexRotation: 0,
          eastTexRotation: 90,
          westTexRotation: 90,
        },
      },
    ],

    "placement=south,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@westTex",
          northTex: "@upTex",
          northTexRotation: 90,
          southTex: "@downTex",
          southTexRotation: 90,
          downTex: "@eastTex",
          eastTex: "@southTex",
          westTex: "@northTex",
          upTexRotation: 0,
          downTexRotation: 0,
          eastTexRotation: 90,
          westTexRotation: 90,
        },
      },
    ],

    "placement=south,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@eastTex",
          northTex: "@upTex",
          northTexRotation: 270,
          southTex: "@downTex",
          southTexRotation: 270,
          downTex: "@westTex",
          eastTex: "@northTex",
          westTex: "@southTex",
          upTexRotation: 0,
          downTexRotation: 0,
          eastTexRotation: 90,
          westTexRotation: 90,
        },
      },
    ],

    "placement=north,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@southTex",
          northTex: "@downTex",
          northTexRotation: 180,
          southTex: "@upTex",
          southTexRotation: 180,
          downTex: "@northTex",
          eastTex: "@westTex",
          westTex: "@eastTex",
          upTexRotation: 180,
          downTexRotation: 180,
          eastTexRotation: 270,
          westTexRotation: 270,
        },
      },
    ],

    "placement=north,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@northTex",
          northTex: "@downTex",
          northTexRotation: 0,
          southTex: "@upTex",
          southTexRotation: 0,
          downTex: "@southTex",
          eastTex: "@eastTex",
          westTex: "@westTex",
          upTexRotation: 180,
          downTexRotation: 180,
          eastTexRotation: 270,
          westTexRotation: 270,
        },
      },
    ],

    "placement=north,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@westTex",
          northTex: "@downTex",
          northTexRotation: 90,
          southTex: "@upTex",
          southTexRotation: 90,
          downTex: "@eastTex",
          eastTex: "@southTex",
          westTex: "@northTex",
          upTexRotation: 180,
          downTexRotation: 180,
          eastTexRotation: 270,
          westTexRotation: 270,
        },
      },
    ],

    "placement=north,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@eastTex",
          northTex: "@downTex",
          northTexRotation: 270,
          southTex: "@upTex",
          southTexRotation: 270,
          downTex: "@westTex",
          eastTex: "@northTex",
          westTex: "@southTex",
          upTexRotation: 180,
          downTexRotation: 180,
          eastTexRotation: 270,
          westTexRotation: 270,
        },
      },
    ],

    "placement=west,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@northTex",
          upTexRotation: 90,
          downTex: "@southTex",
          downTexRotation: 90,
          northTex: "@eastTex",
          southTex: "@westTex",
          eastTex: "@upTex",
          westTex: "@downTex",
          eastTexRotation: 0,
          westTexRotation: 0,
          northTexRotation: 90,
          southTexRotation: 90,
        },
      },
    ],
    "placement=west,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@southTex",
          upTexRotation: 90,
          downTex: "@northTex",
          downTexRotation: 90,
          northTex: "@westTex",
          southTex: "@eastTex",
          eastTex: "@upTex",
          westTex: "@downTex",
          eastTexRotation: 180,
          westTexRotation: 180,
          northTexRotation: 90,
          southTexRotation: 90,
        },
      },
    ],

    "placement=west,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@eastTex",
          upTexRotation: 90,
          downTex: "@westTex",
          downTexRotation: 90,
          northTex: "@southTex",
          southTex: "@northTex",
          eastTex: "@upTex",
          westTex: "@downTex",
          eastTexRotation: 270,
          westTexRotation: 270,
          northTexRotation: 90,
          southTexRotation: 90,
        },
      },
    ],
    "placement=west,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@westTex",
          upTexRotation: 90,
          downTex: "@eastTex",
          downTexRotation: 90,
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@upTex",
          westTex: "@downTex",
          eastTexRotation: 90,
          westTexRotation: 90,
          northTexRotation: 90,
          southTexRotation: 90,
        },
      },
    ],
    "placement=east,rotation=0": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@northTex",
          upTexRotation: 270,
          downTex: "@southTex",
          downTexRotation: 270,
          northTex: "@eastTex",
          southTex: "@westTex",
          eastTex: "@downTex",
          westTex: "@upTex",
          eastTexRotation: 0,
          westTexRotation: 0,
          northTexRotation: 270,
          southTexRotation: 270,
        },
      },
    ],
    "placement=east,rotation=90": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@southTex",
          upTexRotation: 270,
          downTex: "@northTex",
          downTexRotation: 270,
          northTex: "@westTex",
          southTex: "@eastTex",
          eastTex: "@downTex",
          westTex: "@upTex",
          eastTexRotation: 180,
          westTexRotation: 180,
          northTexRotation: 270,
          southTexRotation: 270,
        },
      },
    ],

    "placement=east,rotation=180": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@eastTex",
          upTexRotation: 270,
          downTex: "@westTex",
          downTexRotation: 270,
          northTex: "@southTex",
          southTex: "@northTex",
          eastTex: "@downTex",
          westTex: "@upTex",
          eastTexRotation: 270,
          westTexRotation: 270,
          northTexRotation: 270,
          southTexRotation: 270,
        },
      },
    ],
    "placement=east,rotation=270": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@westTex",
          upTexRotation: 270,
          downTex: "@eastTex",
          downTexRotation: 270,
          northTex: "@northTex",
          southTex: "@southTex",
          eastTex: "@downTex",
          westTex: "@upTex",
          eastTexRotation: 90,
          westTexRotation: 90,
          northTexRotation: 270,
          southTexRotation: 270,
        },
      },
    ],
  },
};

export const simpleHalfCube: VoxelModelData = {
  id: "dve_simple_half_cube",
  relationsSchema: [],
  stateSchema: [
    {
      name: "placement",
      bitIndex: 0,
      bitSize: 3,
      values: ["down", "up", "north", "south", "east", "west"],
    },
  ],
  arguments: {
    upDownTextures: {
      type: "texture",
    },
    sideTextures: {
      type: "texture",
    },
  },
  conditonalNodes: {},
  properties: {
    dve_placing_strategy: "*",
  },
  stateNodes: {
    "placement=down": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@upDownTextures",
          downTex: "@upDownTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=up": [
      {
        position: [0, 0.5, 0],
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@upDownTextures",
          downTex: "@upDownTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=south": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          southTex: "@upDownTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=north": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          southTex: "@upDownTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],

    "placement=west": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          westTex: "@upDownTextures",
        },
      },
    ],
    "placement=east": [
      {
        position: [0.5, 0, 0],
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          westTex: "@upDownTextures",
        },
      },
    ],
  },
};

export const pillarCube: VoxelModelData = {
  id: "dve_pillar_cube",
  relationsSchema: [
    {
      name: "same-down",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, -1, 0],
        },
      ],
    },
    {
      name: "same-up",
      conditions: [
        {
          type: "same-voxel",
          direction: [0, 1, 0],
        },
      ],
    },
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
  stateSchema: [
    {
      name: "direction",
      bitIndex: 0,
      bitSize: 2,
      values: ["down-up", "south-north", "west-east"],
    },
  ],
  arguments: {
    sideConnectedTex: {
      type: "texture",
    },
    sideDisconnectedTex: {
      type: "texture",
    },
    sideUpTex: {
      type: "texture",
    },
    sideDownTex: {
      type: "texture",
    },
    upTex: {
      type: "texture",
    },
    downTex: {
      type: "texture",
    },
  },
  conditonalNodes: {},
  properties: {
    dve_placing_strategy: "*",
  },
  stateNodes: {
    "direction=down-up,same-down=false,same-up=false": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@sideDisconnectedTex",
          southTex: "@sideDisconnectedTex",
          eastTex: "@sideDisconnectedTex",
          westTex: "@sideDisconnectedTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=false": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@sideUpTex",
          southTex: "@sideUpTex",
          eastTex: "@sideUpTex",
          westTex: "@sideUpTex",
        },
      },
    ],
    "direction=down-up,same-down=false,same-up=true": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@sideDownTex",
          southTex: "@sideDownTex",
          eastTex: "@sideDownTex",
          westTex: "@sideDownTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=true": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@upTex",
          downTex: "@downTex",
          northTex: "@sideConnectedTex",
          southTex: "@sideConnectedTex",
          eastTex: "@sideConnectedTex",
          westTex: "@sideConnectedTex",
        },
      },
    ],

    "direction=south-north,same-south=false,same-north=false": [],
    "direction=south-north,same-south=true,same-north=false": [],
    "direction=south-north,same-south=false,same-north=true": [],
    "direction=south-north,same-south=true,same-north=true": [],
    "direction=west-east,same-west=false,same-east=false": [],
    "direction=west-east,same-west=true,same-east=false": [],
    "direction=west-east,same-west=false,same-east=true": [],
    "direction=west-east,same-west=true,same-east=true": [],
  },
};
