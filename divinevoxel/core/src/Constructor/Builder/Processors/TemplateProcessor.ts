//types
import type { LocationData } from "Math/index.js";
import type { SetChunkMeshTask } from "Types/Tasks/RenderTasks.types.js";
import { Flat3DIndex } from "../../../Math/Flat3DIndex.js";
import type { Vec3Array } from "../../../Math/";
//objects
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
import { DivineVoxelEngineConstructor } from "../../DivineVoxelEngineConstructor.js";

//data
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

//tools
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";

const mDataTool = new BuilderDataTool();
const heightMapTool = new HeightMapTool();

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
    ShapeTool.builder.quad
      .clear()
      .setPosition(voxelPOS.x, voxelPOS.y, voxelPOS.z);
    constructor.process(mesher);
    mesher.resetSegments();
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

    for (let x = cx; x < cx + 16; x++) {
      iz = siz;
      for (let z = cz; z < cz + 16; z++) {
        iy = siy;
        for (let y = cy; y < cy + 16; y++) {
          this.nLocation[1] = x;
          this.nLocation[2] = y;
          this.nLocation[3] = z;
          this._process(templateIndex.getIndex([ix, iy, iz]) * 17, template);
          iy++;
        }
        iz++;
      }
      ix++;
    }
    const chunks = <SetChunkMeshTask>[location, []];
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

    DivineVoxelEngineConstructor.instance.parentComm.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  },
};
