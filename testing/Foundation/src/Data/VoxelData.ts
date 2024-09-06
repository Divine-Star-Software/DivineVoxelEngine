import { VoxelData } from "@divinevoxel/core";

export const DVEVoxelData: VoxelData[] = [
  //util
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
      ["#dve_substance", "#dve_solid"],
      ["#dve_shape_id", "#dve_cube"],
      ["#dve_collider_id", "#dve_cube"],
      ["#dve_check_collisions", true],
      ["#dve_material", "stone"],
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
          inputs: {
            "@texture": ["#dve_solid", "dve_dread_stone"],
          },
        },
      ],
    ],
  },
/*   {
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
          id: "dve_stair",
          inputs: {
            "@upTex": ["#dve_solid", "dve_dread_stone"],
            "@downTex": ["#dve_solid", "dve_dread_stone"],
            "@northTex": ["#dve_solid", "dve_dread_stone"],
            "@southTex": ["#dve_solid", "dve_dread_stone"],
            "@eastTex": ["#dve_solid", "dve_dread_stone"],
            "@westTex": ["#dve_solid", "dve_dread_stone"],
          },
        },
      ],
    ],
  }, */

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
];
