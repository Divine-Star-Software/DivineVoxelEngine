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
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";

export class ChunkProcessor {
  mDataTool = new BuilderDataTool();
  heightMapTool = new HeightMapTool();
  relative: { x: 0; y: 0; z: 0 };
  nLocation: LocationData = ["main", 0, 0, 0];
  _process(doSecondCheck = false): boolean {
    if (!this.mDataTool.loadInAtLocation(this.nLocation)) return false;
    if (!this.mDataTool.isRenderable()) return false;

    let hasVoxel = false;
    this.mDataTool.setSecondary(doSecondCheck);
    if (!doSecondCheck) {
      if (this.mDataTool.hasSecondaryVoxel()) {
        hasVoxel = this._process(true);
      }
    }
    const constructor = this.mDataTool.getConstructor();
    const mesher = RenderedSubstances.meshers.get(
      this.mDataTool.getSubstnaceData().getRendered()
    );

    if (!mesher || !constructor) return hasVoxel;

    const voxelPOS = WorldSpaces.voxel
      .setLocation(this.nLocation)
      .getPosition();
    ShapeTool.origin.x = voxelPOS.x;
    ShapeTool.origin.y = voxelPOS.y;
    ShapeTool.origin.z = voxelPOS.z;

    mesher.voxel.loadInAtLocation(this.nLocation);
    mesher.nVoxel.loadInAtLocation(this.nLocation);
    ShapeTool.setMesher(mesher);
    constructor.process(mesher);
    mesher.resetVars();
    return true;
  }

  build(location: LocationData, priority = 0) {
    this.heightMapTool.chunk.loadInAtLocation(location);
    this.mDataTool.setDimension(location[0]);
    const [dimension, cx, cy, cz] = location;
    this.nLocation[0] = dimension;
    const [minY, maxY] = this.heightMapTool.chunk.getMinMax();
    if (Math.abs(minY) == Infinity || Math.abs(maxY) == Infinity) return;

    for (let y = minY; y <= maxY; y++) {
      let foundVoxels = false;
      for (let x = 0; x < WorldSpaces.chunk._bounds.x; x++) {
        for (let z = 0; z < WorldSpaces.chunk._bounds.z; z++) {
          this.nLocation[1] = x + cx;
          this.nLocation[2] = y + cy;
          this.nLocation[3] = z + cz;
          if (this._process()) {
            foundVoxels = true;
          }
        }
      }
      this.heightMapTool.chunk.setY(y).setHasVoxels(foundVoxels);
      this.heightMapTool.chunk.setY(y).setDirty(false);
    }



    const chunks = <SetChunkMeshTask>[location, [], priority];
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
  }
}
