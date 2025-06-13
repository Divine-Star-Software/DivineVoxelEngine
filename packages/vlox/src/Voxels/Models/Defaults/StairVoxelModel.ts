import { VoxelModelData } from "../VoxelModel.types";

export const stair: VoxelModelData = {
  id: "dve_simple_stair",
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
      name: "rotation",
      bitIndex: 3,
      bitSize: 2,
      values: ["0", "90", "180", "270"],
    },
    {
      name: "connected",
      bitIndex: 5,
      bitSize: 1,
      values: ["false", "true"],
    },
  ],
  arguments: {
    texture: {
      type: "texture",
    },
  },
  conditonalNodes: {},
  stateNodes: {
    "placement=up,rotation=0,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0, 0.5],
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
    "placement=up,rotation=90,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
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
    "placement=up,rotation=180,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
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
    "placement=up,rotation=270,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
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
    "placement=down,rotation=0,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0.5, 0.5],
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
    "placement=down,rotation=90,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0.5, 0],
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
    "placement=down,rotation=180,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0.5, 0],
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
    "placement=down,rotation=270,connected=false": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0, 0.5, 0],
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

    "placement=north,rotation=0,connected=false": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0.5, 0],
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
    "placement=north,rotation=90,connected=false": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
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
    "placement=north,rotation=180,connected=false": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0.5, 0, 0],
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
    "placement=north,rotation=270,connected=false": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
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

    "placement=south,rotation=0,connected=false": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0.5, 0.5],
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
    "placement=south,rotation=90,connected=false": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_west_east",
        position: [0, 0, 0.5],
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
    "placement=south,rotation=180,connected=false": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0.5, 0, 0.5],
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
    "placement=south,rotation=270,connected=false": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0, 0, 0.5],
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

    "placement=east,rotation=0,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0, 0.5, 0],
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
    "placement=east,rotation=90,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0, 0, 0],
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
    "placement=east,rotation=180,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0, 0, 0.5],
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
    "placement=east,rotation=270,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0, 0, 0],
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

    "placement=west,rotation=0,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0.5, 0],
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
    "placement=west,rotation=90,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_south_north",
        position: [0.5, 0, 0],
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
    "placement=west,rotation=180,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0.5, 0, 0.5],
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
    "placement=west,rotation=270,connected=false": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_quater_cube_up_down",
        position: [0.5, 0, 0],
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

    //connected
    "placement=up,rotation=0,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0.5],
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
    "placement=up,rotation=90,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0, 0.5],
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
    "placement=up,rotation=180,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0],
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
    "placement=up,rotation=270,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        position: [0, 0.5, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
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

    "placement=down,rotation=0,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0.5],
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
    "placement=down,rotation=90,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0.5],
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
    "placement=down,rotation=180,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0],
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
    "placement=down,rotation=270,connected=true": [
      {
        geometryId: "dve_half_cube_down_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0],
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

    "placement=north,rotation=0,connected=true": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0],
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
    "placement=north,rotation=90,connected=true": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0],
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
    "placement=north,rotation=180,connected=true": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0],
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
    "placement=north,rotation=270,connected=true": [
      {
        position: [0, 0, 0.5],
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
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

    "placement=south,rotation=0,connected=true": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0.5],
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
    "placement=south,rotation=90,connected=true": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0.5],
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
    "placement=south,rotation=180,connected=true": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0.5],
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
    "placement=south,rotation=270,connected=true": [
      {
        geometryId: "dve_half_cube_south_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0, 0.5],
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

    "placement=east,rotation=0,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0.5],
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
    "placement=east,rotation=90,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0.5, 0],
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
    "placement=east,rotation=180,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0, 0, 0.5],
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
    "placement=east,rotation=270,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        position: [0.5, 0, 0],
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
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

    "placement=west,rotation=0,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0.5],
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
    "placement=west,rotation=90,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0.5, 0],
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
    "placement=west,rotation=180,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0.5],
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
    "placement=west,rotation=270,connected=true": [
      {
        geometryId: "dve_half_cube_west_half",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
      {
        geometryId: "dve_eighth_cube",
        position: [0.5, 0, 0],
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
