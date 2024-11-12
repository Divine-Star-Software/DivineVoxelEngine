import { VoxelModelData } from "../VoxelModel.types";

export const simpleCube: VoxelModelData = {
  id: "dve_simple_cube",
  relationsSchema: [],
  shapeStateSchema: [],
  arguments: {
    texture: {
      type: "texture",
    },
    transparent: {
      type: "boolean",
      default: false,
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "*": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@texture",
          "@upTexTransparent":"@transparent",
          "@downTex": "@texture",
          "@downTexTransparent":"@transparent",
          "@northTex": "@texture",
          "@northTexTransparent":"@transparent",
          "@southTex": "@texture",
          "@southTexTransparent":"@transparent",
          "@eastTex": "@texture",
          "@eastTexTransparent":"@transparent",
          "@westTex": "@texture",
          "@westTexTransparent":"@transparent",
        },
      },
    ],
  },
};

export const orientedCube: VoxelModelData = {
  id: "dve_oriented_cube",
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "placement",
      type: "string",
      values: {
        0: "down",
        1: "up",
        2: "north",
        3: "south",
        4: "east",
        5: "west",
      },
    },
    {
      name: "direction",
      type: "string",
      values: {
        0: "north",
        1: "south",
        2: "east",
        3: "west",
      },
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
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "placement=down,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@upTexRotation": 0,
          "@downTex": "@downTex",
          "@downTexRotation": 0,
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
        },
      },
    ],
    "placement=down,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@upTexRotation": 180,
          "@downTex": "@downTex",
          "@downTexRotation": 180,
          "@northTex": "@southTex",
          "@southTex": "@northTex",
          "@eastTex": "@westTex",
          "@westTex": "@eastTex",
        },
      },
    ],
    "placement=down,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@upTexRotation": 90,
          "@downTex": "@downTex",
          "@downTexRotation": 90,
          "@northTex": "@eastTex",
          "@southTex": "@westTex",
          "@eastTex": "@southTex",
          "@westTex": "@northTex",
        },
      },
    ],
    "placement=down,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@upTexRotation": 270,
          "@downTex": "@downTex",
          "@downTexRotation": 270,
          "@northTex": "@westTex",
          "@southTex": "@eastTex",
          "@eastTex": "@northTex",
          "@westTex": "@southTex",
        },
      },
    ],

    "placement=up,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@downTex",
          "@upTexRotation": 0,
          "@downTex": "@upTex",
          "@downTexRotation": 0,
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
          "@northTexRotation": 180,
          "@southTexRotation": 180,
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
        },
      },
    ],
    "placement=up,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@downTex",
          "@upTexRotation": 180,
          "@downTex": "@upTex",
          "@downTexRotation": 180,
          "@northTex": "@southTex",
          "@southTex": "@northTex",
          "@eastTex": "@westTex",
          "@westTex": "@eastTex",
          "@northTexRotation": 180,
          "@southTexRotation": 180,
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
        },
      },
    ],
    "placement=up,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@downTex",
          "@upTexRotation": 90,
          "@downTex": "@upTex",
          "@downTexRotation": 90,
          "@northTex": "@eastTex",
          "@southTex": "@westTex",
          "@eastTex": "@southTex",
          "@westTex": "@northTex",
          "@northTexRotation": 180,
          "@southTexRotation": 180,
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
        },
      },
    ],
    "placement=up,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@downTex",
          "@upTexRotation": 270,
          "@downTex": "@upTex",
          "@downTexRotation": 270,
          "@northTex": "@westTex",
          "@southTex": "@eastTex",
          "@eastTex": "@northTex",
          "@westTex": "@southTex",
          "@northTexRotation": 180,
          "@southTexRotation": 180,
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
        },
      },
    ],

    "placement=south,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@northTex",
          "@northTex": "@upTex",
          "@northTexRotation": 0,
          "@southTex": "@downTex",
          "@southTexRotation": 0,
          "@downTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
          "@upTexRotation": 0,
          "@downTexRotation": 0,
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
        },
      },
    ],

    "placement=south,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@southTex",
          "@northTex": "@upTex",
          "@northTexRotation": 180,
          "@southTex": "@downTex",
          "@southTexRotation": 180,
          "@downTex": "@northTex",
          "@eastTex": "@westTex",
          "@westTex": "@eastTex",
          "@upTexRotation": 0,
          "@downTexRotation": 0,
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
        },
      },
    ],

    "placement=south,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@westTex",
          "@northTex": "@upTex",
          "@northTexRotation": 90,
          "@southTex": "@downTex",
          "@southTexRotation": 90,
          "@downTex": "@eastTex",
          "@eastTex": "@southTex",
          "@westTex": "@northTex",
          "@upTexRotation": 0,
          "@downTexRotation": 0,
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
        },
      },
    ],

    "placement=south,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@eastTex",
          "@northTex": "@upTex",
          "@northTexRotation": 270,
          "@southTex": "@downTex",
          "@southTexRotation": 270,
          "@downTex": "@westTex",
          "@eastTex": "@northTex",
          "@westTex": "@southTex",
          "@upTexRotation": 0,
          "@downTexRotation": 0,
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
        },
      },
    ],

    "placement=north,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@northTex",
          "@northTex": "@downTex",
          "@northTexRotation": 0,
          "@southTex": "@upTex",
          "@southTexRotation": 0,
          "@downTex": "@southTex",
          "@eastTex": "@eastTex",
          "@westTex": "@westTex",
          "@upTexRotation": 180,
          "@downTexRotation": 180,
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
        },
      },
    ],

    "placement=north,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@southTex",
          "@northTex": "@downTex",
          "@northTexRotation": 180,
          "@southTex": "@upTex",
          "@southTexRotation": 180,
          "@downTex": "@northTex",
          "@eastTex": "@westTex",
          "@westTex": "@eastTex",
          "@upTexRotation": 180,
          "@downTexRotation": 180,
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
        },
      },
    ],

    "placement=north,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@westTex",
          "@northTex": "@downTex",
          "@northTexRotation": 90,
          "@southTex": "@upTex",
          "@southTexRotation": 90,
          "@downTex": "@eastTex",
          "@eastTex": "@southTex",
          "@westTex": "@northTex",
          "@upTexRotation": 180,
          "@downTexRotation": 180,
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
        },
      },
    ],

    "placement=north,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@eastTex",
          "@northTex": "@downTex",
          "@northTexRotation": 270,
          "@southTex": "@upTex",
          "@southTexRotation": 270,
          "@downTex": "@westTex",
          "@eastTex": "@northTex",
          "@westTex": "@southTex",
          "@upTexRotation": 180,
          "@downTexRotation": 180,
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
        },
      },
    ],

    "placement=west,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@northTex",
          "@upTexRotation": 90,
          "@downTex": "@southTex",
          "@downTexRotation": 90,
          "@northTex": "@eastTex",
          "@southTex": "@westTex",
          "@eastTex": "@upTex",
          "@westTex": "@downTex",
          "@eastTexRotation": 0,
          "@westTexRotation": 0,
          "@northTexRotation": 90,
          "@southTexRotation": 90,
        },
      },
    ],
    "placement=west,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@southTex",
          "@upTexRotation": 90,
          "@downTex": "@northTex",
          "@downTexRotation": 90,
          "@northTex": "@westTex",
          "@southTex": "@eastTex",
          "@eastTex": "@upTex",
          "@westTex": "@downTex",
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
          "@northTexRotation": 90,
          "@southTexRotation": 90,
        },
      },
    ],
    "placement=west,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@eastTex",
          "@upTexRotation": 90,
          "@downTex": "@westTex",
          "@downTexRotation": 90,
          "@northTex": "@southTex",
          "@southTex": "@northTex",
          "@eastTex": "@upTex",
          "@westTex": "@downTex",
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
          "@northTexRotation": 90,
          "@southTexRotation": 90,
        },
      },
    ],
    "placement=west,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@westTex",
          "@upTexRotation": 90,
          "@downTex": "@eastTex",
          "@downTexRotation": 90,
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@upTex",
          "@westTex": "@downTex",
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
          "@northTexRotation": 90,
          "@southTexRotation": 90,
        },
      },
    ],

    "placement=east,direction=south": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@northTex",
          "@upTexRotation": 270,
          "@downTex": "@southTex",
          "@downTexRotation": 270,
          "@northTex": "@eastTex",
          "@southTex": "@westTex",
          "@eastTex": "@downTex",
          "@westTex": "@upTex",
          "@eastTexRotation": 0,
          "@westTexRotation": 0,
          "@northTexRotation": 270,
          "@southTexRotation": 270,
        },
      },
    ],
    "placement=east,direction=north": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@southTex",
          "@upTexRotation": 270,
          "@downTex": "@northTex",
          "@downTexRotation": 270,
          "@northTex": "@westTex",
          "@southTex": "@eastTex",
          "@eastTex": "@downTex",
          "@westTex": "@upTex",
          "@eastTexRotation": 180,
          "@westTexRotation": 180,
          "@northTexRotation": 270,
          "@southTexRotation": 270,
        },
      },
    ],
    "placement=east,direction=east": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@eastTex",
          "@upTexRotation": 270,
          "@downTex": "@westTex",
          "@downTexRotation": 270,
          "@northTex": "@southTex",
          "@southTex": "@northTex",
          "@eastTex": "@downTex",
          "@westTex": "@upTex",
          "@eastTexRotation": 270,
          "@westTexRotation": 270,
          "@northTexRotation": 270,
          "@southTexRotation": 270,
        },
      },
    ],
    "placement=east,direction=west": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@westTex",
          "@upTexRotation": 270,
          "@downTex": "@eastTex",
          "@downTexRotation": 270,
          "@northTex": "@northTex",
          "@southTex": "@southTex",
          "@eastTex": "@downTex",
          "@westTex": "@upTex",
          "@eastTexRotation": 90,
          "@westTexRotation": 90,
          "@northTexRotation": 270,
          "@southTexRotation": 270,
        },
      },
    ],
  },
};

export const simpleHalfCube: VoxelModelData = {
  id: "dve_simple_half_cube",
  relationsSchema: [],
  shapeStateSchema: [
    {
      name: "placement",
      type: "string",
      values: {
        0: "down",
        1: "up",
        2: "north",
        3: "south",
        4: "east",
        5: "west",
      },
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
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "placement=down": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_down_half",
        inputs: {
          "@upTex": "@upDownTextures",
          "@downTex": "@upDownTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=up": [
      {
        id: "half_cube",
        position: [0, 0.5, 0],
        geometryId: "dve_half_cube_down_half",
        inputs: {
          "@upTex": "@upDownTextures",
          "@downTex": "@upDownTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=south": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_south_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@southTex": "@upDownTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=north": [
      {
        id: "half_cube",
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@southTex": "@upDownTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],

    "placement=west": [
      {
        id: "half_cube",
        geometryId: "dve_half_cube_west_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@westTex": "@upDownTextures",
        },
      },
    ],
    "placement=east": [
      {
        id: "half_cube",
        position: [0.5, 0, 0],
        geometryId: "dve_half_cube_west_half",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@westTex": "@upDownTextures",
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
  shapeStateSchema: [
    {
      name: "direction",
      type: "string",
      values: {
        0: "down-up",
        1: "south-north",
        2: "west-east",
      },
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
  shapeStatesConditonalNodes: {},

  shapeStatesNodes: {
    "direction=down-up,same-down=false,same-up=false": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideDisconnectedTex",
          "@southTex": "@sideDisconnectedTex",
          "@eastTex": "@sideDisconnectedTex",
          "@westTex": "@sideDisconnectedTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=false": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideUpTex",
          "@southTex": "@sideUpTex",
          "@eastTex": "@sideUpTex",
          "@westTex": "@sideUpTex",
        },
      },
    ],
    "direction=down-up,same-down=false,same-up=true": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideDownTex",
          "@southTex": "@sideDownTex",
          "@eastTex": "@sideDownTex",
          "@westTex": "@sideDownTex",
        },
      },
    ],
    "direction=down-up,same-down=true,same-up=true": [
      {
        id: "cube",
        geometryId: "dve_cube",
        inputs: {
          "@upTex": "@upTex",
          "@downTex": "@downTex",
          "@northTex": "@sideConnectedTex",
          "@southTex": "@sideConnectedTex",
          "@eastTex": "@sideConnectedTex",
          "@westTex": "@sideConnectedTex",
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
