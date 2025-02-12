import { VoxelModelData } from "../VoxelModel.types";

export const stair: VoxelModelData = {
  id: "dve_simple_stair",
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
      values: ["south", "north", "east", "west"],
    },
    {
      name: "connected",
      type: "string",
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
    "placement=up,direction=north,connected=false": [
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
    "placement=up,direction=south,connected=false": [
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
    "placement=up,direction=east,connected=false": [
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
    "placement=up,direction=west,connected=false": [
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
    "placement=down,direction=north,connected=false": [
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
    "placement=down,direction=south,connected=false": [
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
    "placement=down,direction=east,connected=false": [
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
    "placement=down,direction=west,connected=false": [
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

    "placement=north,direction=north,connected=false": [
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
    "placement=north,direction=south,connected=false": [
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
    "placement=north,direction=east,connected=false": [
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
    "placement=north,direction=west,connected=false": [
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

    "placement=south,direction=north,connected=false": [
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
    "placement=south,direction=south,connected=false": [
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
    "placement=south,direction=east,connected=false": [
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
    "placement=south,direction=west,connected=false": [
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

    "placement=east,direction=north,connected=false": [
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
    "placement=east,direction=south,connected=false": [
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
    "placement=east,direction=east,connected=false": [
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
    "placement=east,direction=west,connected=false": [
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

    "placement=west,direction=north,connected=false": [
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
    "placement=west,direction=south,connected=false": [
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
    "placement=west,direction=east,connected=false": [
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
    "placement=west,direction=west,connected=false": [
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
    "placement=up,direction=north,connected=true": [
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
    "placement=up,direction=south,connected=true": [
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
    "placement=up,direction=east,connected=true": [
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
    "placement=up,direction=west,connected=true": [
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

    "placement=down,direction=north,connected=true": [
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
    "placement=down,direction=south,connected=true": [
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
    "placement=down,direction=east,connected=true": [
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
    "placement=down,direction=west,connected=true": [
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

    "placement=north,direction=north,connected=true": [
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
    "placement=north,direction=south,connected=true": [
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
    "placement=north,direction=east,connected=true": [
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
    "placement=north,direction=west,connected=true": [
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

    "placement=south,direction=north,connected=true": [
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
    "placement=south,direction=south,connected=true": [
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
    "placement=south,direction=east,connected=true": [
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
    "placement=south,direction=west,connected=true": [
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

    "placement=east,direction=north,connected=true": [
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
    "placement=east,direction=south,connected=true": [
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
    "placement=east,direction=east,connected=true": [
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
    "placement=east,direction=west,connected=true": [
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

    "placement=west,direction=north,connected=true": [
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
    "placement=west,direction=south,connected=true": [
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
    "placement=west,direction=east,connected=true": [
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
    "placement=west,direction=west,connected=true": [
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
