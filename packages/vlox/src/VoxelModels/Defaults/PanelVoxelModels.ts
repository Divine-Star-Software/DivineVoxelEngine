import { VoxelModelData } from "../VoxelModel.types";

export const simpleThinPannel: VoxelModelData = {
  id: "dve_simple_thin_panel",
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
    upDownTextures: {
      type: "texture",
    },
    upDownTexturesTransparent: {
      type: "boolean",
      default: false,
    },
    sideTextures: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  //  shapeStatesOverrides: {},

  shapeStatesNodes: {
    "placement=down,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 0,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 0,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=down,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 180,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 180,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=down,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 90,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 90,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=down,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 270,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 270,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],

    "placement=up,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 180,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 180,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=up,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 0,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 0,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=up,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 90,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 90,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=up,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_down",
        position: [0, 1 - 3 / 16, 0],
        inputs: {
          "@upTex": "@upDownTextures",
          "@upTexRotation": 270,
          "@upTexTransparent": "@upDownTexturesTransparent",
          "@downTex": "@upDownTextures",
          "@downTexRotation": 270,
          "@downTexTransparent": "@upDownTexturesTransparent",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],

    "placement=north,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 180,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 180,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=north,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 0,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 0,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=north,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 90,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 90,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=north,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        position: [0, 0, 1 - 3 / 16],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 270,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 270,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],

    "placement=south,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 180,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 180,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=south,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 0,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 0,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=south,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 90,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 90,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=south,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_south",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@upDownTextures",
          "@northTexRotation": 270,
          "@northTexTransparent": "@upDownTexturesTransparent",
          "@southTex": "@upDownTextures",
          "@southTexRotation": 270,
          "@southTexTransparent": "@upDownTexturesTransparent",
          "@eastTex": "@sideTextures",
          "@westTex": "@sideTextures",
        },
      },
    ],
    "placement=east,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 0,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 0,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=east,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 180,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 180,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=east,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 90,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 90,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=east,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        position: [1 - 3 / 16, 0, 0],
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 270,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 270,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],

    "placement=west,direction=north": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 0,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 0,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=west,direction=south": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 180,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 180,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=west,direction=east": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 90,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 90,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
    "placement=west,direction=west": [
      {
        id: "cube",
        geometryId: "dve_thin_panel_west",
        inputs: {
          "@upTex": "@sideTextures",
          "@downTex": "@sideTextures",
          "@northTex": "@sideTextures",
          "@southTex": "@sideTextures",
          "@eastTex": "@upDownTextures",
          "@eastTexRotation": 270,
          "@eastTexTransparent": "@upDownTexturesTransparent",
          "@westTex": "@upDownTextures",
          "@westTexRotation": 270,
          "@westTexTransparent": "@upDownTexturesTransparent",
        },
      },
    ],
  },
};
export const simpleCrossedPannel: VoxelModelData = {
  id: "dve_simple_crossed_panels",
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
    texture: {
      type: "texture",
    },
    transparent: {
      type: "boolean",
      default: false,
    },
    doubleSided: {
      type: "boolean",
      default: false,
    },
  },
  shapeStatesConditonalNodes: {},
  //  shapeStatesOverrides: {},

  shapeStatesNodes: {
    "placement=down,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=down,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=down,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=down,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],

    "placement=up,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=up,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=up,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=up,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],

    "placement=north,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=north,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=north,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=north,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],

    "placement=south,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=south,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=south,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=south,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],

    "placement=east,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=east,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=east,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=east,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],

    "placement=west,direction=south": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 180,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=west,direction=north": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 0,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=west,direction=east": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 270,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
    "placement=west,direction=west": [
      {
        id: "quad-1",
        geometryId: "dve_diagonal_flat_panel_west_east",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
      {
        id: "quad-2",
        geometryId: "dve_diagonal_flat_panel_east_west",
        inputs: {
          "@texture": "@texture",
          "@textureRotation": 90,
          "@transaprent": "@transparent",
          "@doubleSided": "@doubleSided",
        },
      },
    ],
  },
};
