//types
import type { LocationData } from "../../Math/index.js";
import type { SetChunkMeshTask } from "../../Contexts/Render/Tasks/RenderTasks.types.js";
//objects
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
import { DivineVoxelEngineConstructor } from "../../Contexts/Constructor/DivineVoxelEngineConstructor.js";

//data
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";

//tools
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";
import { VoxelGeometryLookUp } from "../../VoxelModels/Constructor/VoxelGeometryLookUp.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { ColumnCursor } from "../../Data/Cursor/ColumnCursor.js";
import { DVEMesher } from "../../Mesher/Mesher.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";

export class ChunkProcessor {
  heightMapTool = new HeightMapTool();

  substanceData = new SubstanceDataTool();
  columnCursor = new ColumnCursor();

  _process(x: number, y: number, z: number, doSecondCheck = false): boolean {
    if (!this.columnCursor.loadIn(x, y, z)) return false;
    if (!this.columnCursor.voxel.isRenderable()) return false;

    let hasVoxel = false;
    this.columnCursor.voxel.setSecondary(doSecondCheck);
    if (!doSecondCheck) {
      if (this.columnCursor.voxel.hasSecondaryVoxel()) {
        hasVoxel = this._process(x, y, z, true);
      }
    }
    const constructor = DVEMesher.instance.constructors.get(
      this.columnCursor.voxel.getStringId()
    );

    this.substanceData.setSubstance(this.columnCursor.voxel.getSubstance());
    const mesher = RenderedSubstances.meshers.get(
      this.substanceData.getRendered()
    );

    if (!mesher || !constructor) {
      throw new Error(
        `Could not find mesh or constructor ${this.columnCursor.voxel.getId()} | ${this.columnCursor.voxel.getName()} | ${
          constructor?.id
        }`
      );
    }

    ShapeTool.origin.x = this.columnCursor._voxelPosition.x;
    ShapeTool.origin.y = this.columnCursor._voxelPosition.y;
    ShapeTool.origin.z = this.columnCursor._voxelPosition.z;
    mesher.position.x = x;
    mesher.position.y = y;
    mesher.position.z = z;
    mesher.voxel = this.columnCursor.voxel;
    mesher.nVoxel.loadInAt(x, y, z);
    ShapeTool.setMesher(mesher);
    mesher.startConstruction();
    constructor.process(mesher);
    mesher.endConstruction();
    mesher.resetVars();
    return true;
  }

  build(location: LocationData, priority = 0) {
    this.heightMapTool.chunk.loadInAtLocation(location);

    RenderedSubstances.setDimension(location[0]);

    const [dimension, cx, cy, cz] = location;

    this.columnCursor.setColumn(...location);

    let [minY, maxY] = this.heightMapTool.chunk.getMinMax();
    const maxX = WorldSpaces.chunk._bounds.x;
    const maxZ = WorldSpaces.chunk._bounds.z;

    if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) return;
    VoxelGeometryLookUp.start(dimension, location[1], location[2], location[3]);
    for (const [substance, mesher] of RenderedSubstances.meshers) {
      mesher.bvhTool.reset();
    }
    for (let y = minY; y <= maxY; y++) {
      let foundVoxels = false;
      for (let x = 0; x < maxX; x++) {
        for (let z = 0; z < maxZ; z++) {
          if (this._process(x + cx, y + cy, z + cz)) {
            foundVoxels = true;
          }
        }
      }
      this.heightMapTool.chunk.setY(y).setHasVoxels(foundVoxels);
      this.heightMapTool.chunk.setY(y).setDirty(false);
    }
    VoxelGeometryLookUp.stop();
    const trasnfers: any[] = [];
    const chunkEffects: SetChunkMeshTask[2] = [];

    for (const e in ShapeTool.effects) {
      const float = Float32Array.from(ShapeTool.effects[e]);
      trasnfers.push(float.buffer);
      chunkEffects.push([e, float]);
    }
    ShapeTool.effects = {};
    const chunkMeshes: SetChunkMeshTask[1] = [];
    const chunks = <SetChunkMeshTask>[
      location,
      chunkMeshes,
      chunkEffects,
      priority,
    ];

    for (const [substance, mesher] of RenderedSubstances.meshers) {
      if (mesher.mesh!.positions.length == 0) {
        chunkMeshes.push([substance, false]);
        mesher.resetAll();
        continue;
      }

      const compactMesh = CompactVoxelMesh(mesher);

      trasnfers.push(
        ...(compactMesh[0] == 0
          ? [compactMesh[1]]
          : [
              compactMesh[1],
              compactMesh[2].buffer,
              compactMesh[3].buffer,
              compactMesh[4].buffer,
            ])
      );
      chunks[1].push([substance, [location, compactMesh]]);

      mesher.resetAll();
    }

    DivineVoxelEngineConstructor.instance.threads.parent.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  }
}
