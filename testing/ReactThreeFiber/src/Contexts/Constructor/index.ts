import { StartContrusctor } from "@divinevoxel/react/Contexts/Constructor";
import { GetLightDebugBox } from "./Voxels/LightDebugBox";
import { GetMarkerBox } from "./Voxels/MarkerBox";
import { GetDreamEther } from "./Voxels/LiquidDreamEther";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor";
import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { BrushTool } from "@divinevoxel/core/Tools/Brush/Brush";
import { LocationData } from "@divinevoxel/core/Math";
import { DVEDefaultBuilder } from "@divinevoxel/foundation/Builder/Builder";
const defaults = DVEDefaultBuilder.defaults;
await StartContrusctor({
  builder: new DVEDefaultBuilder({
    constructors: [
      GetLightDebugBox(),
      GetMarkerBox(),
      GetDreamEther(),
      defaults.box.simple("dve_debug_box", {
        up: ["#dve_solid", "dve_debug_box", "up"],
        down: ["#dve_solid", "dve_debug_box", "down"],
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
        "grassy-up",
      ]),
      defaults.box.pillar("dve_dream_stone_pillar", {
        up: ["#dve_solid", "dve_dream_stone_pillar", "up"],
        down: ["#dve_solid", "dve_dream_stone_pillar", "up"],
        sideDown: ["#dve_solid", "dve_dream_stone_pillar", "side-down"],
        sideMiddle: ["#dve_solid", "dve_dream_stone_pillar"],
        sideUp: ["#dve_solid", "dve_dream_stone_pillar", "side-up"],
        sideFloat: ["#dve_solid", "dve_dream_stone_pillar", "up"],
      }),
      defaults.box.pillar("dve_dream_stone", {
        up: ["#dve_solid", "dve_dream_stone", "grassy-up"],
        down: ["#dve_solid", "dve_dream_stone"],
        sideDown: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideUp: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
      }),
      defaults.box.simple("dve_dream_lamp", ["#dve_solid", "dve_dream_lamp"]),
      defaults.box.pillar("dve_dream_stone_slab", {
        up: ["#dve_solid", "dve_dream_stone", "grassy-up"],
        down: ["#dve_solid", "dve_dream_stone"],
        sideDown: ["#dve_solid", "dve_dream_stone"],
        sideMiddle: ["#dve_solid", "dve_dream_stone"],
        sideUp: ["#dve_solid", "dve_dream_stone", "grassy-side"],
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
        up: ["#dve_solid", "dve_dread_stone_pillar", "up"],
        down: ["#dve_solid", "dve_dread_stone_pillar", "up"],
        sideDown: ["#dve_solid", "dve_dread_stone_pillar", "side-down"],
        sideMiddle: ["#dve_solid", "dve_dread_stone_pillar"],
        sideUp: ["#dve_solid", "dve_dread_stone_pillar", "side-up"],
        sideFloat: ["#dve_solid", "dve_dread_stone_pillar", "up"],
      }),
      defaults.box.pillar("dve_dread_stone", {
        up: ["#dve_solid", "dve_dread_stone", "grassy-up"],
        down: ["#dve_solid", "dve_dread_stone"],
        sideDown: ["#dve_solid", "dve_dread_stone"],
        sideMiddle: ["#dve_solid", "dve_dread_stone"],
        sideUp: ["#dve_solid", "dve_dread_stone", "grassy-side"],
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
    ],
  }),

});

const loadInFlatIndex = Flat3DIndex.GetXZYOrder();
loadInFlatIndex.setBounds(256, 128, 256);
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

    const location: LocationData = [dimension, 0, 0, 0];
    let [six, siy, siz] = index;
    let ix = six,
      iy = siy,
      iz = siz;

    for (let x = sx; x < ex; x += 16) {
      iz = siz;

      for (let z = sz; z < ez; z += 16) {
        iy = siy;

        for (let y = sy; y < ey; y += 16) {
          if (!dataTool._chunkTool.loadInAtLocation([dimension, x, y, z]))
            continue;

          let vix = ix,
            viy = iy,
            viz = iz;

          for (let cx = x; cx < x + 16; cx++) {
            viz = iz;
            for (let cz = z; cz < z + 16; cz++) {
              viy = iy;
              for (let cy = y; cy < y + 16; cy++) {
                location[1] = cx;
                location[2] = cy;
                location[3] = cz;

                const index =
                  DivineVoxelEngineConstructor.instance.data.spaces.voxel.getIndexLocation(
                    location
                  );

                const voxel_index =
                  loadInFlatIndex.getIndex([vix, viy, viz]) * 2;

                const mainData = data[voxel_index];
                const stateData = data[voxel_index + 1];
                dataTool._chunkTool.segments.id.set(index, mainData & 0xffff);
                dataTool._chunkTool.segments.light.set(
                  index,
                  (mainData & (0xffff << 16)) >>> 1
                );
                dataTool._chunkTool.segments.state.set(
                  index,
                  stateData & 0xffff
                );
                dataTool._chunkTool.segments.secondaryId.set(
                  index,
                  (stateData & (0xffff << 16)) >>> 16
                );
                viy++;
              }
              viz++;
            }
            vix++;
          }

          iy += 16;
        }
        iz += 16;
      }
      ix += 16;
    }

    if (onDone) onDone();
  },
  "deferred"
);

const templateInFlatIndex = Flat3DIndex.GetXZYOrder();
templateInFlatIndex.setBounds(64, 128, 64);
DivineVoxelEngineConstructor.instance.TC.registerTasks<
  [
    dimension: string,
    index: Vec3Array,
    start: Vec3Array,
    end: Vec3Array,
    sab: SharedArrayBuffer
  ]
>(
  "build-world-template",
  async ([dimension, index, start, end, sab], onDone) => {
    const data = new Uint32Array(sab);
    const sx = start[0];
    const sz = start[2];
    const ex = end[0];
    const ez = end[2];
    const sy = start[1];
    const ey = end[1];

    let [six, siy, siz] = index;
    let ix = six,
      iy = siy,
      iz = siz;
    for (let x = sx; x < ex; x += 16) {
      iz = siz;
      for (let z = sz; z < ez; z += 16) {
        iy = siy;
        for (let y = sy; y < ey; y += 16) {
    /*       TemplateProcessor.build(
            [dimension, x, y, z],
            data,
            [ix * 16, iy * 16, iz * 16],
            templateInFlatIndex
          ); */
          iy++;
        }
        iz++;
      }
      ix++;
    }

    if (onDone) onDone();
  },
  "deferred"
);
