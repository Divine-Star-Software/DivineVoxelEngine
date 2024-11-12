import { StartContrusctor } from "@divinevoxel/vlox/Init/StartConstructor";
import { GetLightDebugBox } from "./Voxels/LightDebugBox";
import { GetMarkerBox } from "./Voxels/MarkerBox";
import { GetDreamEther } from "./Voxels/LiquidDreamEther";
import { Flat3DIndex } from "@amodx/math";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
import { DVEMesher } from "@divinevoxel/vlox/Mesher/Mesher";
import { DataTool } from "@divinevoxel/vlox/Tools/Data/DataTool";
const defaults = DVEMesher.defaults;
await StartContrusctor({
  mesherData: {
    constructors: [
      GetLightDebugBox(),
      GetMarkerBox(),
      GetDreamEther(),
      defaults.cube.simple("dve_debug_box", {
        up: ["#dve_solid", "dve_debug_box", "up"],
        down: ["#dve_solid", "dve_debug_box", "down"],
        north: ["#dve_solid", "dve_debug_box", "north"],
        south: ["#dve_solid", "dve_debug_box", "south"],
        east: ["#dve_solid", "dve_debug_box", "east"],
        west: ["#dve_solid", "dve_debug_box", "west"],
      }),
      defaults.cube.simple("dve_data_holder", [
        "#dve_solid",
        "dve_data_holder",
        "front",
      ]),
      //dream
      defaults.cube.simple("dve_dream_grass_block", [
        "#dve_flora",
        "dve_dream_grass_block",
        "grassy-up",
      ]),
      defaults.cube.pillar("dve_dream_stone_pillar", {
        top: ["#dve_solid", "dve_dream_stone_pillar", "up"],
        bottom: ["#dve_solid", "dve_dream_stone_pillar", "up"],
        sideBottom: ["#dve_solid", "dve_dream_stone_pillar", "side-down"],
        sideMiddle: ["#dve_solid", "dve_dream_stone_pillar"],
        sideTop: ["#dve_solid", "dve_dream_stone_pillar", "side-up"],
        sideFloat: ["#dve_solid", "dve_dream_stone_pillar", "up"],
      }),
      defaults.cube.pillar("dve_dream_stone", {
        top: ["#dve_solid", "dve_dream_stone", "grassy-up"],
        bottom: ["#dve_solid", "dve_dream_stone"],
        sideBottom: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
      }),
      defaults.cube.simple("dve_dream_lamp", ["#dve_glow", "dve_dream_lamp"]),
      defaults.cube.pillar("dve_dream_stone_slab", {
        top: ["#dve_solid", "dve_dream_stone", "grassy-up"],
        bottom: ["#dve_solid", "dve_dream_stone"],
        sideBottom: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
      }),
      defaults.cube.simple("dve_dream_log", ["#dve_solid", "dve_dream_log"]),
      defaults.cube.simple("dve_dream_stone_stair", [
        "#dve_solid",
        "dve_dream_stone",
      ]),
      defaults.crossedPanel.simple("dve_dream_grass", [
        "#dve_flora",
        "dve_dream_grass",
      ]),
      defaults.panel.simple("dve_dream_vine", ["#dve_flora", "dve_dream_vine"]),
      defaults.cube.simple("dve_dream_leaves", [
        "#dve_flora",
        "dve_dream_leaves",
      ]),
      //dread
      defaults.cube.pillar("dve_dread_stone_pillar", {
        top: ["#dve_solid", "dve_dread_stone_pillar", "up"],
        bottom: ["#dve_solid", "dve_dread_stone_pillar", "up"],
        sideBottom: ["#dve_solid", "dve_dread_stone_pillar", "side-down"],
        sideMiddle: ["#dve_solid", "dve_dread_stone_pillar"],
        sideTop: ["#dve_solid", "dve_dread_stone_pillar", "side-up"],
        sideFloat: ["#dve_solid", "dve_dread_stone_pillar", "up"],
      }),
      defaults.cube.simple("dve_dread_lamp", ["#dve_glow", "dve_dread_lamp"]),
      defaults.liquid.simple("dve_liquid_dread_ether", [
        ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
        ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
      ]),

      defaults.crossedPanel.simple("dve_dread_grass", [
        "#dve_solid",
        "dve_dread_grass",
      ]),
    ],
  },
});



