import { VoxelData } from "@divinevoxel/core";

export const DVEVoxelData: VoxelData[] = [
  {
    id: "dve_dread_stone_thin_panel",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
      [
        "#dve_model_data",
        {
          id: "dve_simple_thin_panel",
          inputs: {
            "*": {
              "@upDownTextures": ["#dve_solid", "dve_dread_stone"],
              "@sideTextures": ["#dve_solid", "dve_dread_stone"],
            },
          },
        },
      ],
    ],
  },
  {
    id: "dve_dread_stone",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
      [
        "#dve_model_data",
        {
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
            "grassy=false": { "@texture": ["#dve_solid", "dve_dread_stone"] },
            "grassy=true": {
              "@texture": ["#dve_solid", "dve_dread_stone", "grassy-top"],
            },
          },
        },
      ],
    ],
  },

  {
    id: "dve_dread_stone_slab",
    tags: [
      ["#dve_is_transparent", true],
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
      [
        "#dve_model_data",
        {
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
              "@upDownTextures": ["#dve_solid", "dve_dread_stone"],
              "@sideTextures": ["#dve_solid", "dve_dread_stone"],
            },
            "grassy=true": {
              "@upDownTextures": [
                "#dve_solid",
                "dve_dread_stone",
                "grassy-top",
              ],
              "@sideTextures": ["#dve_solid", "dve_dread_stone", "grassy-top"],
            },
          },
        },
      ],
    ],
  },
  {
    id: "dve_dread_stone_stair",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
      [
        "#dve_model_data",
        {
          id: "dve_simple_stair",
          inputs: {
            "*": {
              "@texture": ["#dve_solid", "dve_dread_stone"],
            },
          },
        },
      ],
    ],
  },
  //util
  /* 
  {
    id: "dve_debug_box",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_is_light_source", true],
      ["#dve_light_value", [15, 15, 15]],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_light_debug",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_data_holder",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_is_rich", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_marker_box",

    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  //dream
  {
    id: "dve_dream_stone",

    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
    ],
  },
  {
    id: "dve_dream_stone_pillar",
    tags: [
      ["#dve_is_transparent", true],
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
      [
        "#dve_model_data",
        {
          id: "dve_pillar_cube",
          inputs: {
            "*": {
              "@sideConnectedTex": ["#dve_solid", "dve_dream_stone_pillar"],
              "@sideDisconnectedTex": [
                "#dve_solid",
                "dve_dream_stone_pillar",
                "top",
              ],
              "@sideUpTex": [
                "#dve_solid",
                "dve_dream_stone_pillar",
                "side-top",
              ],
              "@sideDownTex": [
                "#dve_solid",
                "dve_dream_stone_pillar",
                "side-bottom",
              ],
              "@upTex": ["#dve_solid", "dve_dream_stone_pillar", "top"],
              "@downTex": ["#dve_solid", "dve_dream_stone_pillar", "top"],
            },
          },
        },
      ],
    ],
  },
  {
    id: "dve_dream_grass_block",
    tags: [
      ["#dve_substance", "#dve_flora"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_lamp",
    tags: [
      ["#dve_substance", "#dve_glow"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_is_light_source", true],
      ["#dve_light_value", [15, 0, 15]],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_stone_slab",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_half_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grassy-stone"],
    ],
  },
  {
    id: "dve_dream_log",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "wood"],
    ],
  },
  {
    id: "dve_dream_log_fence",
    tags: [
      ["#dve_is_transparent", true],
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "wood"],
      [
        "#dve_model_data",
        {
          id: "dve_fence",
          inputs: {
            "*": {
              "@upTex": ["#dve_solid", "dve_dream_log"],
              "@downTex": ["#dve_solid", "dve_dream_log"],
              "@northTex": ["#dve_solid", "dve_dream_log"],
              "@southTex": ["#dve_solid", "dve_dream_log"],
              "@eastTex": ["#dve_solid", "dve_dream_log"],
              "@westTex": ["#dve_solid", "dve_dream_log"],
            },
          },
        },
      ],
    ],
  },
  {
    id: "dve_dream_stone_stair",
    tags: [
      ["#dve_substance", "#dve_transparent"],
      ["#dve_shape_id", "#dve_stair"],
      ["#dve_collider_id", "#dve_stair"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_dream_grass",
    tags: [
      ["#dve_substance", "#dve_flora"],
      ["#dve_shape_id", "#dve_crossed_panels"],
      ["#dve_check_collisions", false],
      ["#dve_material", "grass"],
    ],
  },
  {
    id: "dve_dream_vine",
    tags: [
      ["#dve_substance", "#dve_flora"],
      ["#dve_shape_id", "#dve_flat_panel"],
      ["#dve_check_collisions", false],
      ["#dve_material", "grass"],
    ],
  },
  {
    id: "dve_dream_leaves",
    tags: [
      ["#dve_substance", "#dve_flora"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "grass"],
    ],
  },
  {
    id: "dve_liquid_dream_ether",
    tags: [
      ["#dve_substance", "#dve_liquid"],
      ["#dve_shape_id", "#dve_liquid"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "water"],
    ],
  },
  //dread


  {
    id: "dve_dread_grass_block",
    tags: [
      ["#dve_substance", "#dve_flora"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },
  {
    id: "dve_dread_grass",
    tags: [
      ["#dve_substance", "#dve_translucent"],
      ["#dve_shape_id", "#dve_crossed_panels"],
      ["#dve_material", "grass"],
      ["#dve_collider_id", "#dve_climable_box"],
      ["#dve_check_collisions", true],
    ],
  },
  {
    id: "dve_dread_lamp",
    tags: [
      ["#dve_substance", "#dve_glow"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_is_light_source", true],
      ["#dve_light_value", [15, 0, 0]],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },

  {
    id: "dve_dread_stone_pillar",
    tags: [
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
    ],
  },

  {
    id: "dve_liquid_dread_ether",
    tags: [
      ["#dve_substance", "#dve_magma"],
      ["#dve_shape_id", "#dve_liquid"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "water"],
      ["#dve_light_value", [15, 0, 0]],
      ["#dve_is_light_source", true],
    ],
  },
  */
];
