import { VoxelData } from "@divinevoxel/vlox/Voxels";
export const DVEVoxelData: VoxelData[] = [
  {
    id: "dve_farmland",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_is_transparent: true,
      dve_voxel_material: "dirt",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_simulation_behavior: "dve_farmland",
      dve_model_data: {
        id: "dve_farmland",
        inputs: {
          "*": {
            topTexture: "dve_farmland",
            moistTexture: "dve_farmland_moist",
            sideTexture: "dve_dirt",
          },
        },
      },
    },
  },
  {
    id: "dve_wheat",
    properties: {
      dve_substance: "dve_flora",
      dve_rendered_material: "dve_flora",
      dve_is_transparent: true,
      dve_voxel_material: "plant",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      // dve_simulation_behavior: "dve_crop",
      dve_model_data: {
        id: "dve_crop",
        inputs: {
          "*": {
            doubleSided: true,
            level1: "dve_wheat:1",
            level2: "dve_wheat:2",
            level3: "dve_wheat:3",
            level4: "dve_wheat:4",
            level5: "dve_wheat:5",
            level6: "dve_wheat:6",
            level7: "dve_wheat:7",
            level8: "dve_wheat:8",
          },
        },
      },
    },
  },
  {
    id: "dve_dirt",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_is_transparent: true,
      dve_voxel_material: "dirt",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_model_data: {
        id: "dve_simple_cube",
        modSchema: [],
        modRelationSchema: [],
        inputs: {
          "*": {
            texture: "dve_dirt",
          },
        },
      },
    },
  },
  {
    id: "dve_dream_leaves",
    properties: {
      dve_substance: "dve_flora",
      dve_rendered_material: "dve_flora",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "leaves",

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
        id: "dve_transparent_simple_cube",
        inputs: {
          "*": {
            texture: "dve_dream_leaves",
          },
        },
      },
    },
  },
  {
    id: "dve_dread_stone",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dread_stone",
          name: "Dread Stone",
          mod: "grassy=false",
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
          mod: "grassy=true",
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
            bitIndex: 0,
            bitSize: 1,
            values: ["false", "true"],
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": {
            texture: {
              type: "consistent-rotation",
              texture: "dve_dread_stone:default",
              rotations: [0, 90, 270],
            },
          },
          "grassy=true": {
            texture: "dve_dread_stone:grassy-top",
          },
        },
      },
    },
  },

  {
    id: "dve_debug_box",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "stone",
      dve_model_data: {
        id: "dve_oriented_cube",
        modRelationSchema: [],
        inputs: {
          "*": {
            upTex: "dve_debug_box:top",
            downTex: "dve_debug_box:bottom",
            northTex: "dve_debug_box:north",
            southTex: "dve_debug_box:south",
            eastTex: "dve_debug_box:east",
            westTex: "dve_debug_box:west",
          },
        },
      },
    },
  },
  {
    id: "dve_dream_grass",
    properties: {
      dve_substance: "dve_flora",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_no_ao: true,
      dve_is_transparent: true,
      dve_voxel_material: "grass",

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
            texture: "dve_dream_grass",
            doubleSided: true,
          },
        },
      },
    },
  },

  {
    id: "dve_liquid_dream_ether",
    properties: {
      dve_is_transparent: true,
      dve_substance: "dve_liquid",
      dve_rendered_material: "dve_liquid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "water",
      dve_simulation_behavior: "dve_liquid",
      dve_model_data: {
        id: "dve_liquid",
        inputs: {
          "*": {
            stillTexture: {
              type: "outlined",
              texture: "dve_liquid_dream_ether:still",
              textureRecrod: {
                top: "dve_foam:top",
                bottom: "dve_foam:bottom",
                left: "dve_foam:left",
                right: "dve_foam:right",

                "corner-top-right": "dve_foam:corner-top-right",
                "corner-top-left": "dve_foam:corner-top-left",
                "corner-top-left-top-right":
                  "dve_foam:corner-top-left-top-right",

                "corner-bottom-right": "dve_foam:corner-bottom-right",
                "corner-bottom-left": "dve_foam:corner-bottom-left",
                "corner-bottom-left-bottom-right":
                  "dve_foam:corner-bottom-left-bottom-right",
              },
            },
            flowTexture: "dve_liquid_dream_ether:still",
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
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "wood",
      dve_named_states: [
        {
          id: "dve_dream_fence",
          name: "Dream Frence",
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
        id: "dve_fence",
        inputs: {
          "*": {
            upTex: "dve_dream_log",
            downTex: "dve_dream_log",
            northTex: "dve_dream_log",
            southTex: "dve_dream_log",
            eastTex: "dve_dream_log",
            westTex: "dve_dream_log",
          },
        },
      },
    },
  },

  {
    id: "dve_dream_log",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "wood",
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
            upTex: "dve_dream_log",
            downTex: "dve_dream_log",
            northTex: "dve_dream_log",
            southTex: "dve_dream_log",
            eastTex: "dve_dream_log",
            westTex: "dve_dream_log",
          },
        },
      },
    },
  },
  {
    id: "dve_dream_stone",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "grassy-stone",
      dve_named_states: [
        {
          id: "dve_dream_stone",
          name: "Dream Stone",
          mod: "grassy=false",
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
          mod: "grassy=true",
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
            bitIndex: 0,
            bitSize: 1,
            values: ["false", "true"],
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": { texture: "dve_dream_stone:default" },
          "grassy=true": {
            texture: "dve_dream_stone:grassy-top",
          },
        },
      },
    },
  },
  {
    id: "dve_dream_lever",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",

      dve_is_transparent: true,
      dve_voxel_material: "wax",
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
            state: "placement=down,direction=north,state=off",
          },
        },
      ],
      dve_model_data: {
        id: "dve_lever",
        inputs: {
          "*": {
            baseTexture: "dve_dream_stone:default",
            leverTexture: "dve_lever",
          },
        },
      },
    },
  },
  {
    id: "dve_dream_candle",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_voxel_material: "wax",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_is_light_source: false,
      dve_light_value: [15, 15, 15],

      dve_model_data: {
        id: "dve_candle",
        inputs: {
          "*": {
            candleTexture: "dve_candle:default",
            candleLitTexture: "dve_candle:lit",
          },
        },
      },
    },
  },
  {
    id: "dve_dread_grass",
    properties: {
      dve_substance: "dve_flora",
      dve_voxel_material: "grass",
      dve_collider_id: "dve_climable_box",
      dve_check_collisions: true,
      dve_model_data: {
        id: "dve_simple_crossed_panels",
        inputs: {
          "*": {
            texture: "dve_dread_grass",
          },
        },
      },
    },
  },
  {
    id: "dve_dread_stone_thin_panel",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "grassy-stone",

      dve_model_data: {
        id: "dve_simple_thin_panel",
        inputs: {
          "*": {
            upDownTextures: "dve_dread_stone:default",
            sideTextures: "dve_dread_stone:default",
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
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "grassy-stone",

      dve_named_states: [
        {
          id: "dve_dread_stone_slab",
          name: "Dread Stone Slab",
          mod: "grassy=false",
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
          mod: "grassy=true",
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
            bitIndex: 0,
            bitSize: 1,
            values: ["false", "true"],
          },
        ],
        modRelationSchema: [],
        inputs: {
          "grassy=false": {
            upDownTextures: "dve_dread_stone:default",
            sideTextures: "dve_dread_stone:default",
          },
          "grassy=true": {
            upDownTextures: "dve_dread_stone:grassy-top",
            sideTextures: "dve_dread_stone:grassy-top",
          },
        },
      },
    },
  },
  {
    id: "dve_dread_stone_stair",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "grassy-stone",

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
            texture: "dve_dread_stone:default",
          },
        },
      },
    },
  },

  {
    id: "dve_dream_lamp",
    properties: {
      dve_substance: "dve_glow",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "stone",
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
          "*": { texture: "dve_dream_lamp" },
        },
      },
    },
  },
  {
    id: "dve_dream_stone_pillar",
    properties: {
      dve_substance: "dve_solid",
      dve_rendered_material: "dve_solid",
      dve_collider_id: "dve_cube",
      dve_check_collisions: true,
      dve_voxel_material: "wood",
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
        id: "dve_pillar_cube",
        modRelationSchema: [],
        inputs: {
          "*": {
            sideConnectedTex: "dve_dream_stone_pillar:side-connected",
            sideDisconnectedTex: "dve_dream_stone_pillar:top",
            sideUpTex: "dve_dream_stone_pillar:side-up",
            sideDownTex: "dve_dream_stone_pillar:side-down",
            upTex: "dve_dream_stone_pillar:top",
            downTex: "dve_dream_stone_pillar:top",
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
      ["dve_voxel_material", "stone"],
    ],
  },
  {
    id: "dve_light_debug",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "stone"],
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
      ["dve_voxel_material", "stone"],
    ],
  },
  {
    id: "dve_marker_box",

    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "stone"],
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
      "dve_voxel_material": "grassy-stone",
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
      ["dve_voxel_material", "stone"],
      [
        "dve_model_data",
        {
          id: "dve_pillar_cube",
          inputs: {
            "*": {
              "sideConnectedTex": ["dve_voxel", "dve_dream_stone_pillar"],
              "sideDisconnectedTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "top",
              ],
              "sideUpTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "side-top",
              ],
              "sideDownTex": [
                "dve_solid",
                "dve_dream_stone_pillar",
                "side-bottom",
              ],
              "upTex": ["dve_voxel", "dve_dream_stone_pillar", "top"],
              "downTex": ["dve_voxel", "dve_dream_stone_pillar", "top"],
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
      ["dve_voxel_material", "stone"],
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
      ["dve_voxel_material", "stone"],
    ],
  },
  {
    id: "dve_dream_stone_slab",
    properties: [
      "dve_substance": "dve_solid",
      ["dve_shape_id", "dve_half_cube"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      "dve_voxel_material": "grassy-stone",
    ],
  },
  {
    id: "dve_dream_log",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      "dve_voxel_material": "wood",
    ],
  },

  {
    id: "dve_dream_stone_stair",
    properties: [
      ["dve_substance", "dve_transparent"],
      ["dve_shape_id", "dve_stair"],
      ["dve_collider_id", "dve_stair"],
      "dve_check_collisions": true,
      ["dve_voxel_material", "stone"],
    ],
  },
  {
    id: "dve_dream_grass",
    properties: [
      "dve_substance": "dve_flora",
      ["dve_shape_id", "dve_crossed_panels"],
      ["dve_check_collisions", false],
      ["dve_voxel_material", "grass"],
    ],
  },
  {
    id: "dve_dream_vine",
    properties: [
      "dve_substance": "dve_flora",
      ["dve_shape_id", "dve_flat_panel"],
      ["dve_check_collisions", false],
      ["dve_voxel_material", "grass"],
    ],
  },
  {
    id: "dve_dream_leaves",
    properties: [
      "dve_substance": "dve_flora",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "grass"],
    ],
  },
  {
    id: "dve_liquid_dream_ether",
    properties: [
      ["dve_substance", "dve_liquid"],
      ["dve_shape_id", "dve_liquid"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "water"],
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
      ["dve_voxel_material", "stone"],
    ],
  },
  {
    id: "dve_dread_grass",
    properties: [
      ["dve_substance", "dve_translucent"],
      ["dve_shape_id", "dve_crossed_panels"],
      ["dve_voxel_material", "grass"],
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
      ["dve_voxel_material", "stone"],
    ],
  },

  {
    id: "dve_dread_stone_pillar",
    properties: [
      "dve_substance": "dve_solid",
      "dve_shape_id": "dve_cube",
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "stone"],
    ],
  },

  {
    id: "dve_liquid_dread_ether",
    properties: [
      ["dve_substance", "dve_magma"],
      ["dve_shape_id", "dve_liquid"],
      "dve_collider_id": "dve_cube",
      "dve_check_collisions": true,
      ["dve_voxel_material", "water"],
      ["dve_light_value", [15, 0, 0]],
      ["dve_is_light_source", true],
    ],
  },
  */
];
