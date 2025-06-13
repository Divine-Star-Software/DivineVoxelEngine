import { VoxelModelData } from "../VoxelModel.types";

export const simpleThinPannel: VoxelModelData = {
  id: "dve_simple_thin_panel",
  relationsSchema: [],
  stateSchema: [
    {
      name: "placement",
      bitIndex: 0,
      bitSize: 3,
      values: ["down", "up", "north", "south", "east", "west"],
    },
    {
      name: "direction",
      bitIndex: 3,
      bitSize: 2,
      values: ["north", "south", "east", "west"],
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
  properties: {
    dve_placing_strategy: "*",
  },
  conditonalNodes: {},
  stateNodes: {
    "placement=down,direction=south": [
      {
        geometryId: "dve_thin_panel_down",
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 0,
          downTex: "@upDownTextures",
          downTexRotation: 0,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=down,direction=north": [
      {
        geometryId: "dve_thin_panel_down",
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 180,
          downTex: "@upDownTextures",
          downTexRotation: 180,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=down,direction=east": [
      {
        geometryId: "dve_thin_panel_down",
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 90,
          downTex: "@upDownTextures",
          downTexRotation: 90,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=down,direction=west": [
      {
        geometryId: "dve_thin_panel_down",
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 270,
          downTex: "@upDownTextures",
          downTexRotation: 270,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],

    "placement=up,direction=north": [
      {
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 180,
          downTex: "@upDownTextures",
          downTexRotation: 180,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=up,direction=south": [
      {
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 0,
          downTex: "@upDownTextures",
          downTexRotation: 0,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=up,direction=east": [
      {
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 90,

          downTex: "@upDownTextures",
          downTexRotation: 90,

          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=up,direction=west": [
      {
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          upTex: "@upDownTextures",
          upTexRotation: 270,
          downTex: "@upDownTextures",
          downTexRotation: 270,
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],

    "placement=north,direction=north": [
      {
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 180,

          southTex: "@upDownTextures",
          southTexRotation: 180,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=north,direction=south": [
      {
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 0,

          southTex: "@upDownTextures",
          southTexRotation: 0,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=north,direction=east": [
      {
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 90,

          southTex: "@upDownTextures",
          southTexRotation: 90,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=north,direction=west": [
      {
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 270,

          southTex: "@upDownTextures",
          southTexRotation: 270,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],

    "placement=south,direction=north": [
      {
        geometryId: "dve_thin_panel_south",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 180,

          southTex: "@upDownTextures",
          southTexRotation: 180,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=south,direction=south": [
      {
        geometryId: "dve_thin_panel_south",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 0,

          southTex: "@upDownTextures",
          southTexRotation: 0,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=south,direction=east": [
      {
        geometryId: "dve_thin_panel_south",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 90,

          southTex: "@upDownTextures",
          southTexRotation: 90,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=south,direction=west": [
      {
        geometryId: "dve_thin_panel_south",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@upDownTextures",
          northTexRotation: 270,

          southTex: "@upDownTextures",
          southTexRotation: 270,

          eastTex: "@sideTextures",
          westTex: "@sideTextures",
        },
      },
    ],
    "placement=east,direction=north": [
      {
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 0,

          westTex: "@upDownTextures",
          westTexRotation: 0,
        },
      },
    ],
    "placement=east,direction=south": [
      {
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 180,

          westTex: "@upDownTextures",
          westTexRotation: 180,
        },
      },
    ],
    "placement=east,direction=east": [
      {
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 90,

          westTex: "@upDownTextures",
          westTexRotation: 90,
        },
      },
    ],
    "placement=east,direction=west": [
      {
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 270,

          westTex: "@upDownTextures",
          westTexRotation: 270,
        },
      },
    ],

    "placement=west,direction=north": [
      {
        geometryId: "dve_thin_panel_west",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 0,

          westTex: "@upDownTextures",
          westTexRotation: 0,
        },
      },
    ],
    "placement=west,direction=south": [
      {
        geometryId: "dve_thin_panel_west",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 180,

          westTex: "@upDownTextures",
          westTexRotation: 180,
        },
      },
    ],
    "placement=west,direction=east": [
      {
        geometryId: "dve_thin_panel_west",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 90,

          westTex: "@upDownTextures",
          westTexRotation: 90,
        },
      },
    ],
    "placement=west,direction=west": [
      {
        geometryId: "dve_thin_panel_west",
        inputs: {
          upTex: "@sideTextures",
          downTex: "@sideTextures",
          northTex: "@sideTextures",
          southTex: "@sideTextures",
          eastTex: "@upDownTextures",
          eastTexRotation: 270,

          westTex: "@upDownTextures",
          westTexRotation: 270,
        },
      },
    ],
  },
};
export const simpleCrossedPannel: VoxelModelData = {
  id: "dve_simple_crossed_panels",
  relationsSchema: [],
  stateSchema: [],
  properties: {
    dve_placing_strategy: "*",
  },
  arguments: {
    texture: {
      type: "texture",
    },
    doubleSided: {
      type: "boolean",
      default: false,
    },
  },
  conditonalNodes: {},
  stateNodes: {
    "*": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
  },
};
export const orientedCrossedPannel: VoxelModelData = {
  id: "dve_oriented_crossed_panels",
  relationsSchema: [],
  properties: {
    dve_placing_strategy: "*",
  },
  stateSchema: [
    {
      name: "placement",
      bitIndex: 0,
      bitSize: 3,
      values: ["down", "up", "north", "south", "east", "west"],
    },
    {
      name: "direction",
      bitIndex: 3,
      bitSize: 2,
      values: ["north", "south", "east", "west"],
    },
  ],
  arguments: {
    texture: {
      type: "texture",
    },
    doubleSided: {
      type: "boolean",
      default: false,
    },
  },
  conditonalNodes: {},

  stateNodes: {
    "placement=down,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=down,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=down,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=down,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=up,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=up,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],

    "placement=up,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=up,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=north,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=north,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],

    "placement=north,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=north,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=south,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=south,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=south,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=south,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=east,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=east,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=east,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=east,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=west,direction=north": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 0,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=west,direction=south": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 180,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=west,direction=east": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 270,
          doubleSided: "@doubleSided",
        },
      },
    ],
    "placement=west,direction=west": [
      {
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
      {
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          texture: "@texture",
          textureRotation: 90,
          doubleSided: "@doubleSided",
        },
      },
    ],
  },
};
