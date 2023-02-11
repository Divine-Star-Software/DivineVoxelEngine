//types
import type { DivineVoxelEngineWorld } from "out/World/DivineVoxelEngineWorld.js"; //voxels
export function RegisterVoxels(DVEW: DivineVoxelEngineWorld) {
 DVEW.voxelManager.registerVoxelData([
  //util
  {
   id: "dve_debugbox",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_is_light_source", true],
    ["#dve_light_value", [15, 15, 15]],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_lightdebug",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dataholder",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_is_rich", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_markerbox",
   states: 15,
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  //dream
  {
   id: "dve_dreamstone",
   states: 1,
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "grassy-stone"],
   ],
  },
  {
   id: "dve_dreamstonepillar",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dreamgrassblock",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dreamlamp",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_is_light_source", true],
    ["#dve_light_value", [15, 0, 15]],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dreamstoneslab",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_halfbox"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "grassy-stone"],
   ],
  },
  {
   id: "dve_dream-log",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "wood"],
   ],
  },
  {
   id: "dve_dreamstone-stair",
   tags: [
    ["#dve_substance", "#dve_transparent"],
    ["#dve_shape_id", "#dve_stair"],
    ["#dve_collider_id", "#dve_stair"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dreamgrass",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_crossed_panels"],
    ["#dve_check_collisions", false],
    ["#dve_material", "grass"],
   ],
  },
  {
   id: "dve_dreamvine",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_panel"],
    ["#dve_check_collisions", false],
    ["#dve_material", "grass"],
   ],
  },
  {
   id: "dve_dream-leafs",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "grass"],
   ],
  },
  {
   id: "dve_liquiddreamether",
   tags: [
    ["#dve_substance", "#dve_liquid"],
    ["#dve_shape_id", "#dve_liquid"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "water"],
   ],
  },
  //dread
  {
   id: "dve_dreadstone",
   states: 1,
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "grassy-stone"],
   ],
  },
  {
   id: "dve_dreadgrassblock",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },
  {
   id: "dve_dreadgrass",
   tags: [
    ["#dve_substance", "#dve_flora"],
    ["#dve_shape_id", "#dve_crossed_panels"],
    ["#dve_check_collisions", false],
    ["#dve_material", "grass"],
   ],
  },
  {
   id: "dve_dreadlamp",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_is_light_source", true],
    ["#dve_light_value", [15, 0, 0]],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },

  {
   id: "dve_dreadstonepillar",
   tags: [
    ["#dve_substance", "#dve_solid"],
    ["#dve_shape_id", "#dve_box"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "stone"],
   ],
  },

  {
   id: "dve_liquiddreadether",
   tags: [
    ["#dve_substance", "#dve_liquid"],
    ["#dve_shape_id", "#dve_liquid"],
    ["#dve_collider_id", "#dve_box"],
    ["#dve_check_collisions", true],
    ["#dve_material", "water"],
   ],
  },
 ]);
}
