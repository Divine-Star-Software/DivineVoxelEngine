import { StartContrusctor } from "@divinevoxel/react/Contexts/Constructor";
import { GetLightDebugBox } from "./Voxels/LightDebugBox";
import { GetMarkerBox } from "./Voxels/MarkerBox";
import { GetDreamEther } from "./Voxels/LiquidDreamEther";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor";
import { Flat3DIndex, Vec3Array } from "@divinevoxel/core/Math";
import { BrushTool } from "@divinevoxel/core/Tools/Brush/Brush";

await StartContrusctor({
  getVoxelConstructors(voxelConstructors) {
    const { defaults } = voxelConstructors;
    return [
      GetLightDebugBox(),
      GetMarkerBox(),
      GetDreamEther(),
      defaults.box.simple("dve_debug_box", {
        top: ["#dve_solid", "dve_debug_box", "top"],
        bottom: ["#dve_solid", "dve_debug_box", "bottom"],
        north: ["#dve_solid", "dve_debug_box", "north"],
        south: ["#dve_solid", "dve_debug_box", "south"],
        east: ["#dve_solid", "dve_debug_box", "east"],
        west: ["#dve_solid", "dve_debug_box", "west"],
      }),
      defaults.box.simple("dve_data_holder", [
        "#dve_solid",
        "dve_data_holder",
        "front",
      ]),
      //dream
      defaults.box.simple("dve_dream_grass_block", [
        "#dve_flora",
        "dve_dream_grass_block",
        "grassy-top",
      ]),
      defaults.box.pillar("dve_dream_stone_pillar", {
        top: ["#dve_solid", "dve_dream_stone_pillar", "top"],
        bottom: ["#dve_solid", "dve_dream_stone_pillar", "top"],
        sideBottom: ["#dve_solid", "dve_dream_stone_pillar", "side-bottom"],
        sideMiddle: ["#dve_solid", "dve_dream_stone_pillar"],
        sideTop: ["#dve_solid", "dve_dream_stone_pillar", "side-top"],
        sideFloat: ["#dve_solid", "dve_dream_stone_pillar", "top"],
      }),
      defaults.box.pillar("dve_dream_stone", {
        top: ["#dve_solid", "dve_dream_stone", "grassy-top"],
        bottom: ["#dve_solid", "dve_dream_stone"],
        sideBottom: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
      }),
      defaults.box.simple("dve_dream_lamp", ["#dve_solid", "dve_dream_lamp"]),
      defaults.box.pillar("dve_dream_stone_slab", {
        top: ["#dve_solid", "dve_dream_stone", "grassy-top"],
        bottom: ["#dve_solid", "dve_dream_stone"],
        sideBottom: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
      }),
      defaults.box.simple("dve_dream_log", ["#dve_solid", "dve_dream_log"]),
      defaults.box.simple("dve_dream_stone_stair", [
        "#dve_solid",
        "dve_dream_stone",
      ]),
      defaults.crossedPanel.simple("dve_dream_grass", [
        "#dve_flora",
        "dve_dream_grass",
      ]),
      defaults.panel.simple("dve_dream_vine", ["#dve_flora", "dve_dream_vine"]),
      defaults.box.simple("dve_dream_leaves", [
        "#dve_flora",
        "dve_dream_leaves",
      ]),
      //dread
      defaults.box.pillar("dve_dread_stone_pillar", {
        top: ["#dve_solid", "dve_dread_stone_pillar", "top"],
        bottom: ["#dve_solid", "dve_dread_stone_pillar", "top"],
        sideBottom: ["#dve_solid", "dve_dread_stone_pillar", "side-bottom"],
        sideMiddle: ["#dve_solid", "dve_dread_stone_pillar"],
        sideTop: ["#dve_solid", "dve_dread_stone_pillar", "side-top"],
        sideFloat: ["#dve_solid", "dve_dread_stone_pillar", "top"],
      }),
      defaults.box.pillar("dve_dread_stone", {
        top: ["#dve_solid", "dve_dread_stone", "grassy-top"],
        bottom: ["#dve_solid", "dve_dread_stone"],
        sideBottom: ["#dve_solid", "dve_dread_stone"],
        sideMiddle: ["#dve_solid", "dve_dread_stone"],
        sideTop: ["#dve_solid", "dve_dread_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dread_stone", "grassy-side"],
      }),
      defaults.box.simple("dve_dread_lamp", ["#dve_solid", "dve_dread_lamp"]),
      defaults.liquid.simple("dve_liquid_dread_ether", [
        ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
        ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
      ]),

      defaults.crossedPanel.simple("dve_dread_grass", [
        "#dve_solid",
        "dve_dread_grass",
      ]),
    ];
  },
});

const flatIndex = new Flat3DIndex();
flatIndex.bounds = {
  x: 256,
  y: 128,
  z: 256,
};
const dataTool = DivineVoxelEngineConstructor.instance.getDataTool();
const brushTool = new BrushTool();
brushTool._update = false;
DivineVoxelEngineConstructor.instance.TC.registerTasks<
  [
    dimension: string,
    index: Vec3Array,
    start: Vec3Array,
    end: Vec3Array,
    sab: SharedArrayBuffer
  ]
>(
  "load-in-generated-world-segment",
  async ([dimension, index, start, end, sab], onDone) => {
    const data = new Uint32Array(sab);
    const sx = start[0];
    const sz = start[2];
    const ex = end[0];
    const ez = end[2];
    const sy = start[1];
    const ey = end[1];

    brushTool.start();
    let [six, siy, siz] = index;
    let ix = six,
      iy = siy,
      iz = siz;

    for (let x = sx; x < ex; x++) {
      iz = siz;
   
      for (let z = sz; z < ez; z++) {
        iy = siy;
      
        for (let y = sy; y < ey; y++) {
         
          const voxel_index = flatIndex.getIndex([ix, iy, iz]) * 2;

          const mainData = data[voxel_index];
          const stateData = data[voxel_index + 1];
          let id = mainData & 0xffff;
          let light = (mainData & (0xffff << 16)) >>> 16;
          let state = stateData & 0xffff;
          let secondaryId = (stateData & (0xffff << 16)) >>> 16;

          if (!id) {
            iy++;
            brushTool._dt.setXYZ(x, y, z).loadIn();
            brushTool._dt.setLight(light).commit();
            continue;
          }

          brushTool.setXYZ(x, y, z).setRaw([id, light, state, secondaryId]);
          brushTool.paint();
          brushTool._dt.setXYZ(x, y, z).loadIn();
          brushTool._dt.setLight(light).commit();

          iy++;
        }
        iz++;
      }
      ix++;
    }
    brushTool.stop();
    if (onDone) onDone();
  },
  "deferred"
);
