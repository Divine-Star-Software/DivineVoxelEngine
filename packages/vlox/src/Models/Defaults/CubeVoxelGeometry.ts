import { VoxelGeometryData } from "../VoxelModel.types";

export const cube: VoxelGeometryData = {
  id: "dve_cube",
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
      default: [0, 0, 1, 1],
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
        [1, 1, 1],
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
export const halfDownCube: VoxelGeometryData = {
  id: "dve_half_cube_down_half",
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
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 1, 0.5],
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
      default: [0, 0, 1, 0.5],
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
      default: [0, 0, 1, 0.5],
    },
    eastTexRotation: {
      type: "int",
      default: 0,
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 1, 0.5],
    },
    westTexRotation: {
      type: "int",
      default: 0,
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 0.5, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const halfSouthCube: VoxelGeometryData = {
  id: "dve_half_cube_south_half",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 1, 0.5],
    },
    upTexRotation: {
      type: "int",
      default: 0,
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 1, 0.5],
    },
    downTexRotation: {
      type: "int",
      default: 0,
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
    eastTex: {
      type: "texture",
    },
    eastUvs: {
      type: "box-uv",
      default: [0, 0, 0.5, 1],
    },
    eastTexRotation: {
      type: "int",
      default: 0,
    },
    westTex: {
      type: "texture",
    },
    westUvs: {
      type: "box-uv",
      default: [0, 0, 0.5, 1],
    },
    westTexRotation: {
      type: "int",
      default: 0,
    },
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 1, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const halfWestCube: VoxelGeometryData = {
  id: "dve_half_cube_west_half",
  arguments: {
    upTex: {
      type: "texture",
    },
    upUvs: {
      type: "box-uv",
      default: [0, 0, 0.5, 1],
    },
    upTexRotation: {
      type: "int",
      default: 0,
    },
    downTex: {
      type: "texture",
    },
    downUvs: {
      type: "box-uv",
      default: [0, 0, 0.5, 1],
    },
    downTexRotation: {
      type: "int",
      default: 0,
    },
    northTex: {
      type: "texture",
    },
    northUvs: {
      type: "box-uv",
      default: [0, 0, 0.5, 1],
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
      default: [0, 0, 0.5, 1],
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
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 1, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const quaterCubeWestEast: VoxelGeometryData = {
  id: "dve_quater_cube_west_east",
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
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [1, 0.5, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const quaterCubeSouthNorth: VoxelGeometryData = {
  id: "dve_quater_cube_south_north",
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
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 1],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const quaterCubeUpDown: VoxelGeometryData = {
  id: "dve_quater_cube_up_down",
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
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 1, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};

export const eighthCube: VoxelGeometryData = {
  id: "dve_eighth_cube",
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
  },
  nodes: [
    {
      type: "box",
      points: [
        [0, 0, 0],
        [0.5, 0.5, 0.5],
      ],
      faces: {
        up: {
          texture: "@upTex",
          uv: "@upUvs",
          rotation: "@upTexRotation",
        },
        down: {
          texture: "@downTex",
          uv: "@downUvs",
          rotation: "@downTexRotation",
        },
        north: {
          texture: "@northTex",
          uv: "@northUvs",
          rotation: "@northTexRotation",
        },
        south: {
          texture: "@southTex",
          uv: "@southUvs",
          rotation: "@southTexRotation",
        },
        east: {
          texture: "@eastTex",
          uv: "@eastUvs",
          rotation: "@eastTexRotation",
        },
        west: {
          texture: "@westTex",
          uv: "@westUvs",
          rotation: "@westTexRotation",
        },
      },
    },
  ],
};
