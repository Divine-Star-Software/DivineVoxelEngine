//types
import type { LocationData } from "@divinevoxel/core/Math/index.js";
import type { SetChunkMeshTask } from "@divinevoxel/core/Contexts/Render/Tasks/RenderTasks.types.js";
import { Flat3DIndex } from "@amodx/math/Volumes/Indexing/Flat3DIndex.js";
//objects
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";
//data
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
//tools

import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";
import { Vec3Array } from "@amodx/math";

const mDataTool = new BuilderDataTool();

export const TemplateProcessor = {
  relative: { x: 0, y: 0, z: 0 },
  nLocation: <LocationData>["main", 0, 0, 0],
  _states: {
    foundVoxel: false,
  },
  _process(index: number, template: Uint32Array) {
    const mainId = template[index] & 0xffff;
    if (!mainId || !mDataTool.loadInAtLocation(this.nLocation)) return;

    const constructor = mDataTool.getConstructor();
    const mesher = RenderedSubstances.meshers.get(
      mDataTool.getSubstnaceData().getRendered()
    );

    if (!mesher || !constructor) return;
    mesher.template.setActive(true);
    mesher.template.load(template, index);
    const voxelPOS = WorldSpaces.voxel
      .setLocation(this.nLocation)
      .getPosition();

    mesher.voxel.loadInAtLocation(this.nLocation);
    mesher.nVoxel.loadInAtLocation(this.nLocation);
    ShapeTool.setMesher(mesher);

    constructor.process(mesher);
    mesher.resetVars();
    mesher.template.setActive(false);
  },

  build(
    location: LocationData,
    template: Uint32Array,
    startIndex: Vec3Array,
    templateIndex: Flat3DIndex
  ) {
    mDataTool.setDimension(location[0]);
    const [dimension, cx, cy, cz] = location;
    this.nLocation[0] = dimension;

    let [six, siy, siz] = startIndex;
    let ix = six,
      iy = siy,
      iz = siz;

    const curosr = new Int32Array(3);

    for (let x = cx; x < cx + 16; x++) {
      iz = siz;
      for (let z = cz; z < cz + 16; z++) {
        iy = siy;
        for (let y = cy; y < cy + 16; y++) {
          this.nLocation[1] = x;
          this.nLocation[2] = y;
          this.nLocation[3] = z;
          curosr[0] = ix;
          curosr[1] = iy;
          curosr[2] = iz;
          //   this._process(templateIndex.getIndex(curosr) * 17, template);
          iy++;
        }
        iz++;
      }
      ix++;
    }
    const chunks = <SetChunkMeshTask>[location, [], 0];
    const trasnfers: any[] = [];
    for (const [substance, mesher] of RenderedSubstances.meshers._map) {
      if (mesher.getAttribute("position").length == 0) {
        chunks[1].push([substance, false]);
        mesher.resetAll();
        continue;
      }

      const [attributes, buffers] = mesher.getAllAttributes();

      trasnfers.push(...buffers);
      chunks[1].push([substance, [location, attributes]]);
      mesher.resetAll();
    }

    DivineVoxelEngineConstructor.instance.core.threads.parent.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  },
};
