//types
import type { LocationData } from "@divinevoxel/core/Math/index.js";
import type { SetChunkMeshTask } from "@divinevoxel/core/Contexts/Render/Tasks/RenderTasks.types.js";

//objects
import { SubstanceRules } from "../Rules/SubstanceRules.js";
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";

//data
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { WorldRegister } from "../../../Data//World/WorldRegister.js";

//tools
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";

export class ChunkProcessor {
  mDataTool = new BuilderDataTool();
  heightMapTool = new HeightMapTool();
  relative: { x: 0; y: 0; z: 0 };
  nLocation: LocationData = ["main", 0, 0, 0];
  _states = {
    foundVoxel: false,
  };
  _process(doSecondCheck = false) {
    if (!this.mDataTool.loadInAtLocation(this.nLocation)) return;
    if (!this.mDataTool.isRenderable()) return;

    this._states.foundVoxel = true;
    if (!doSecondCheck) {
      if (this.mDataTool.hasSecondaryVoxel()) {
        this._process(true);
      }
    }
    const constructor = this.mDataTool.getConstructor();
    const mesher = RenderedSubstances.meshers.get(
      this.mDataTool.getSubstnaceData().getRendered()
    );

    if (!mesher || !constructor) return;

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
  }

  build(location: LocationData) {
    WorldRegister.cache.enable();
    this.heightMapTool.chunk.loadInAtLocation(location);
    this.mDataTool.setDimension(location[0]);
    const [dimension, cx, cy, cz] = location;
    this.nLocation[0] = dimension;
    let index = 0;
    let lastY = -Infinity;
    const maxIndex = WorldSpaces.chunk.getVolume();
    while (index < maxIndex) {
      const { x, y, z } = WorldSpaces.voxel.getIndexToXYZ(index);

      if (y != lastY) {
        this._states.foundVoxel = false;
        this.heightMapTool.chunk.setY(y);
        if (
          !this.heightMapTool.chunk.hasVoxels() &&
          !this.heightMapTool.chunk.isDirty()
        ) {
          index += WorldSpaces.chunk.getIndexXYZ(0, 1, 0);
          lastY = y;
          continue;
        }
      }

      this.nLocation[1] = x + cx;
      this.nLocation[2] = y + cy;
      this.nLocation[3] = z + cz;
      this._process();

      if (y != lastY) {
        if (this.heightMapTool.chunk.isDirty()) {
          this.heightMapTool.chunk.setHasVoxels(this._states.foundVoxel);
          this.heightMapTool.chunk.setDirty(false);
        }
      }
      lastY = y;
      index++;
    }

    WorldRegister.cache.disable();

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

   // console.log("send build",chunks,location)
    DivineVoxelEngineConstructor.instance.core.threads.parent.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  }
}
