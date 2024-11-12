import { VoxelGeometryData } from "../VoxelModel.types";
export const diagonalFlatPanelWestEast: VoxelGeometryData = {
  id: "dve_diagonal_flat_panel_west_east",
  arguments: {
    texture: {
      type: "texture",
    },
    uvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    textureRotation: {
      type: "int",
      default: 0,
    },
    transaprent: {
      type: "boolean",
      default: false,
    },
    doubleSided: {
      type: "boolean",
      default: false,
    },
  },
  nodes: [
    {
      type: "quad",
      points: [
        [0, 1, 1],
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
      ],
      doubleSided: "@doubleSided",
      uv: "@uvs",
      texture: "@texture",
      textureRotation: "@textureRotation",
    },
  ],
};
export const diagonalFlatPanelEastWest: VoxelGeometryData = {
  id: "dve_diagonal_flat_panel_east_west",
  arguments: {
    texture: {
      type: "texture",
    },
    uvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    textureRotation: {
      type: "int",
      default: 0,
    },
    transaprent: {
      type: "boolean",
      default: false,
    },
    doubleSided: {
      type: "boolean",
      default: false,
    },
  },
  nodes: [
    {
      type: "quad",
      points: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
        [1, 0, 1],
      ],
      doubleSided: "@doubleSided",
      uv: "@uvs",
      texture: "@texture",
      textureRotation: "@textureRotation",
    },
  ],
};

export const thinPanelDown: VoxelGeometryData = {
  id: "dve_thin_panel_down",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    upTexRotation: {
      type: "int",
      default: 0,
    },
    upTexTransparent: {
      type: "boolean",
      default: false,
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    downTexRotation: {
      type: "int",
      default: 0,
    },
    downTexTransparent: {
      type: "boolean",
      default: false,
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    northTexRotation: {
      type: "int",
      default: 0,
    },
    northTexTransparent: {
      type: "boolean",
      default: false,
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    southTexRotation: {
      type: "int",
      default: 0,
    },
    southTexTransparent: {
      type: "boolean",
      default: false,
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    eastTexRotation: {
      type: "int",
      default: 0,
    },
    eastTexTransparent: {
      type: "boolean",
      default: false,
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    westTexRotation: {
      type: "int",
      default: 0,
    },
    westTexTransparent: {
      type: "boolean",
      default: false,
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 3 / 16, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
          transparent: "@upTexTransparent",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
          transparent: "@downTexTransparent",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
          transparent: "@northTexTransparent",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
          transparent: "@southTexTransparent",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
          transparent: "@eastTexTransparent",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
          transparent: "@westTexTransparent",
        },
      },
    },
  ],
};
export const thinPanelSouth: VoxelGeometryData = {
  id: "dve_thin_panel_south",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    upTexRotation: {
      type: "int",
      default: 0,
    },
    upTexTransparent: {
      type: "boolean",
      default: false,
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 3 / 16],
    },
    downTexRotation: {
      type: "int",
      default: 0,
    },
    downTexTransparent: {
      type: "boolean",
      default: false,
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    northTexRotation: {
      type: "int",
      default: 0,
    },
    northTexTransparent: {
      type: "boolean",
      default: false,
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    southTexRotation: {
      type: "int",
      default: 0,
    },
    southTexTransparent: {
      type: "boolean",
      default: false,
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    eastTexRotation: {
      type: "int",
      default: 0,
    },
    eastTexTransparent: {
      type: "boolean",
      default: false,
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    westTexRotation: {
      type: "int",
      default: 0,
    },
    westTexTransparent: {
      type: "boolean",
      default: false,
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 1, 3 / 16],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
          transparent: "@upTexTransparent",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
          transparent: "@downTexTransparent",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
          transparent: "@northTexTransparent",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
          transparent: "@southTexTransparent",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
          transparent: "@eastTexTransparent",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
          transparent: "@westTexTransparent",
        },
      },
    },
  ],
};
export const thinPanelWest: VoxelGeometryData = {
  id: "dve_thin_panel_west",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    upTexRotation: {
      type: "int",
      default: 0,
    },
    upTexTransparent: {
      type: "boolean",
      default: false,
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    downTexRotation: {
      type: "int",
      default: 0,
    },
    downTexTransparent: {
      type: "boolean",
      default: false,
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    northTexRotation: {
      type: "int",
      default: 0,
    },
    southTex: {
      type: "texture",
    },
    southUvs: {
      type: "box-uv",
      default: [0, 0, 3 / 16, 1],
    },
    southTexTransparent: {
      type: "boolean",
      default: false,
    },
    southTexRotation: {
      type: "int",
      default: 0,
    },
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    eastTexRotation: {
      type: "int",
      default: 0,
    },
    eastTexTransparent: {
      type: "boolean",
      default: false,
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 1],
    },
    westTexRotation: {
      type: "int",
      default: 0,
    },
    westTexTransparent: {
      type: "boolean",
      default: false,
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [3 / 16, 1, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
          transparent: "@upTexTransparent",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
          transparent: "@downTexTransparent",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
          transparent: "@northTexTransparent",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
          transparent: "@southTexTransparent",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
          transparent: "@eastTexTransparent",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
          transparent: "@westTexTransparent",
        },
      },
    },
  ],
};
