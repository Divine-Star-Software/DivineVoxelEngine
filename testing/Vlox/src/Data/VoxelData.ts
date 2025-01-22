import { VoxelData } from "@divinevoxel/vlox/VoxelData/Voxel.types";
export const DVEVoxelData: VoxelData[] = [
  {
    id: "dve_liquid_dream_ether",
    properties: {
      dve_is_transparent: true,
      dve_substance: "dve_liquid",
      dve_shape_id: "dve_liquid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "water",
      dve_model_data: {
        id: "dve_liquid",
        inputs: {
          "*": {
            "@flowTexture": ["dve_voxel", "dve_liquid_dream_ether", "still-1"],
            "@stillTexture": ["dve_voxel", "dve_liquid_dream_ether", "still-1"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_fence",
    properties: {
      dve_is_transparent: true,
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "wood",

      dve_model_data: {
        id: "dve_fence",
        inputs: {
          "*": {
            "@upTex": ["dve_voxel", "dve_dream_log"],
            "@downTex": ["dve_voxel", "dve_dream_log"],
            "@northTex": ["dve_voxel", "dve_dream_log"],
            "@southTex": ["dve_voxel", "dve_dream_log"],
            "@eastTex": ["dve_voxel", "dve_dream_log"],
            "@westTex": ["dve_voxel", "dve_dream_log"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_leaves",
    properties: {
      dve_substance: "dve_flora",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "leaves",

      dve_named_states: [
        {
          id: "dve_dream_leaves",
          name: "Dream Leaves",
          mod: "*",
          state: "*",
          properties: {},
          display: {
            type: "model",
            mod: "*",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_cube",
        inputs: {
          "*": {
            "@texture": ["dve_voxel", "dve_dream_leaves"],
            "@transparent": true,
          },
        },
      },
    },
  },
  {
    id: "dve_dream_log",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "wood",

      dve_named_states: [
        {
          id: "dve_dream_log",
          name: "Dream Log",
          mod: "*",
          state: "*",
          properties: {},
          display: {
            type: "model",
            mod: "*",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_oriented_cube",
        modRelationSchema: [],
        inputs: {
          "*": {
            "@upTex": ["dve_voxel", "dve_dream_log"],
            "@downTex": ["dve_voxel", "dve_dream_log"],
            "@northTex": ["dve_voxel", "dve_dream_log"],
            "@southTex": ["dve_voxel", "dve_dream_log"],
            "@eastTex": ["dve_voxel", "dve_dream_log"],
            "@westTex": ["dve_voxel", "dve_dream_log"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_stone",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dream_stone",
          name: "Dream Stone",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=false",
            state: "*",
          },
        },
        {
          id: "dve_grassy_dream_stone",
          name: "Grassy Dream Stone",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=true",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_cube",
        modSchema: [
          {
            name: "grassy",
            type: "string",
            values: {
              0: "false",
              1: "true",
            },
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": { "@texture": ["dve_voxel", "dve_dream_stone"] },
          "grassy=true": {
            "@texture": ["dve_voxel", "dve_dream_stone", "grassy-top"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_lever",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_is_transparent: true,
      dve_material: "wax",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,

      dve_named_states: [
        {
          id: "dve_dream_lever",
          name: "Lever",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "*",
            state: "placement=north,direction=north,state=on",
          },
        },
      ],

      dve_model_data: {
        id: "dve_lever",
        inputs: {
          "*": {
            "@baseTexture": ["dve_voxel", "dve_dream_stone"],
            "@leverTexture": ["dve_voxel", "dve_lever"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_candle",
    properties: {
      dve_substance: "dve_solid",
      dve_material: "wax",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_is_light_source: false,
      dve_light_value: [15, 15, 15],

      dve_model_data: {
        id: "dve_candle",
        inputs: {
          "*": {
            "@candleTexture": ["dve_voxel", "dve_candle"],
            "@candleLitTexture": ["dve_voxel", "dve_candle", "lit"],
          },
        },
      },
    },
  },
  {
    id: "dve_dread_grass",
    properties: {
      dve_substance: "dve_flora",
      dve_shape_id: "dve_crossed_panels",
      dve_material: "grass",
      dve_collider_id: "dve_climable_box",
      dve_check_collisions: true,

      dve_model_data: {
        id: "dve_simple_crossed_panels",
        inputs: {
          "*": {
            "@texture": ["dve_voxel", "dve_dread_grass"],
          },
        },
      },
    },
  },

  {
    id: "dve_dread_stone_thin_panel",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "grassy-stone",

      dve_model_data: {
        id: "dve_simple_thin_panel",
        inputs: {
          "*": {
            "@upDownTextures": ["dve_voxel", "dve_dread_stone"],
            "@sideTextures": ["dve_voxel", "dve_dread_stone"],
          },
        },
      },
    },
  },
  {
    id: "dve_dread_stone",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dread_stone",
          name: "Dread Stone",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=false",
            state: "*",
          },
        },
        {
          id: "dve_grassy_dread_stone",
          name: "Grassy Dread Stone",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=true",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_cube",
        modSchema: [
          {
            name: "grassy",
            type: "string",
            values: {
              0: "false",
              1: "true",
            },
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": { "@texture": ["dve_voxel", "dve_dread_stone"] },
          "grassy=true": {
            "@texture": ["dve_voxel", "dve_dread_stone", "grassy-top"],
          },
        },
      },
    },
  },

  {
    id: "dve_dread_stone_slab",
    properties: {
      dve_is_transparent: true,
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dread_stone_slab",
          name: "Dread Stone Slab",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=false",
            state: "*",
          },
        },
        {
          id: "dve_grassy_dread_stone_slab",
          name: "Grassy Dread Stone Slab",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "grassy=true",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_half_cube",
        modSchema: [
          {
            name: "grassy",
            type: "string",
            values: {
              0: "false",
              1: "true",
            },
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": {
            "@upDownTextures": ["dve_voxel", "dve_dread_stone"],
            "@sideTextures": ["dve_voxel", "dve_dread_stone"],
          },
          "grassy=true": {
            "@upDownTextures": ["dve_solid", "dve_dread_stone", "grassy-top"],
            "@sideTextures": ["dve_voxel", "dve_dread_stone", "grassy-top"],
          },
        },
      },
    },
  },
  {
    id: "dve_dread_stone_stair",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dream_lever",
          name: "Lever",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "*",
            state: "placement=down,direction=north,connected=false",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_stair",
        inputs: {
          "*": {
            "@texture": ["dve_voxel", "dve_dread_stone"],
          },
        },
      },
    },
  },
  {
    id: "dve_dream_grass",
    properties: {
      dve_substance: "dve_flora",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_no_ao: true,
      dve_is_transparent: true,
      dve_material: "grass",

      dve_named_states: [
        {
          id: "dve_dream_grass",
          name: "Dream Grass",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "*",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_crossed_panels",
        inputs: {
          "*": {
            "@texture": ["dve_voxel", "dve_dream_grass"],
            "@doubleSided": true,
          },
        },
      },
    },
  },
  {
    id: "dve_dream_lamp",
    properties: {
      dve_substance: "dve_glow",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "stone",
      dve_is_light_source: true,
      dve_light_value: [15, 0, 15],

      dve_named_states: [
        {
          id: "dve_dream_lamp",
          name: "Dream Lamp",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "*",
            state: "*",
          },
        },
      ],

      dve_model_data: {
        id: "dve_simple_cube",
        inputs: {
          "*": { "@texture": ["dve_voxel", "dve_dream_lamp"] },
        },
      },
    },
  },

  {
    id: "dve_dream_stone_pillar",
    properties: {
      dve_substance: "dve_solid",
      dve_shape_id: "dve_cube",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_material: "wood",
      dve_named_states: [
        {
          id: "dve_dream_stone_pillar",
          name: "Dream Stone Pillar",
          mod: "*",
          state: "*",
          properties: [],
          display: {
            type: "model",
            mod: "*",
            state: "*",
          },
        },
      ],
      dve_model_data: {
        id: "dve_oriented_cube",
        modRelationSchema: [],
        inputs: {
          "*": {
            "@upTex": ["dve_voxel", "dve_dream_stone_pillar"],
            "@downTex": ["dve_voxel", "dve_dream_stone_pillar"],
            "@northTex": ["dve_voxel", "dve_dream_stone_pillar"],
            "@southTex": ["dve_voxel", "dve_dream_stone_pillar"],
            "@eastTex": ["dve_voxel", "dve_dream_stone_pillar"],
            "@westTex": ["dve_voxel", "dve_dream_stone_pillar"],
          },
        },
      },
    },
  },
  //util
  /* 
  {
    id: "dve_debug_box",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      ["dve_is_light_source", true],
      ["dve_light_value", [15, 15, 15]],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_light_debug",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_data_holder",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_is_rich", true],
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_marker_box",

    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  //dream
  {
    id: "dve_dream_stone",

    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      "dve_material": "grassy-stone",
    ],
  },
  {
    id: "dve_dream_stone_pillar",
    properties: [
      "dve_is_transparent": true,
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
      [
        "dve_model_data",
        {
          id: "dve_pillar_cube",
          inputs: {
            "*": {
              "@sideConnectedTex": ["dve_voxel", "dve_dream_stone_pillar"],
              "@sideDisconnectedTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "top",
              ],
              "@sideUpTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "side-top",
              ],
              "@sideDownTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "side-bottom",
              ],
              "@upTex": ["dve_voxel", "dve_dream_stone_pillar", "top"],
              "@downTex": ["dve_voxel", "dve_dream_stone_pillar", "top"],
            },
          },
        },
      ],
    ],
  },
  {
    id: "dve_dream_grass_block",
    properties: [
      "dve_substance": "dve_flora",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_lamp",
    properties: [
      ["dve_substance", "dve_glow"],  
      "dve_shape_id": "dve_cube",
      ["dve_is_light_source", true],
      ["dve_light_value", [15, 0, 15]],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_stone_slab",
    properties: [
      "dve_substance": "dve_solid",
      ["dve_shape_id", "dve_half_cube"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      "dve_material": "grassy-stone",
    ],
  },
  {
    id: "dve_dream_log",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      "dve_material": "wood",
    ],
  },

  {
    id: "dve_dream_stone_stair",
    properties: [
      ["dve_substance", "dve_transparent"],
      ["dve_shape_id", "dve_stair"],
      ["dve_collider_id", "dve_stair"],
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_grass",
    properties: [
      "dve_substance": "dve_flora",
      ["dve_shape_id", "dve_crossed_panels"],
      ["dve_check_collisions", false],
      ["dve_material", "grass"],
    ],
  },
  {
    id: "dve_dream_vine",
    properties: [
      "dve_substance": "dve_flora",
      ["dve_shape_id", "dve_flat_panel"],
      ["dve_check_collisions", false],
      ["dve_material", "grass"],
    ],
  },
  {
    id: "dve_dream_leaves",
    properties: [
      "dve_substance": "dve_flora",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "grass"],
    ],
  },
  {
    id: "dve_liquid_dream_ether",
    properties: [
      ["dve_substance", "dve_liquid"],
      ["dve_shape_id", "dve_liquid"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "water"],
    ],
  },
  //dread


  {
    id: "dve_dread_grass_block",
    properties: [
      "dve_substance": "dve_flora",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },
  {
    id: "dve_dread_grass",
    properties: [
      ["dve_substance", "dve_translucent"],
      ["dve_shape_id", "dve_crossed_panels"],
      ["dve_material", "grass"],
      ["dve_collider_id", "dve_climable_box"],
      "dve_check_collisions": true,
    ],
  },
  {
    id: "dve_dread_lamp",
    properties: [
      ["dve_substance", "dve_glow"],
      "dve_shape_id": "dve_cube",
      ["dve_is_light_source", true],
      ["dve_light_value", [15, 0, 0]],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },

  {
    id: "dve_dread_stone_pillar",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "stone"],
    ],
  },

  {
    id: "dve_liquid_dread_ether",
    properties: [
      ["dve_substance", "dve_magma"],
      ["dve_shape_id", "dve_liquid"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_material", "water"],
      ["dve_light_value", [15, 0, 0]],
      ["dve_is_light_source", true],
    ],
  },
  */
];
