//types
import type { LocationData } from "../../Math/index.js";
import type { SetChunkMeshTask } from "../../Contexts/Render/Tasks/RenderTasks.types.js";
//objects
import { DivineVoxelEngineConstructor } from "../../Contexts/Constructor/DivineVoxelEngineConstructor.js";

//data
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";

//tools
import { HeightMapTool } from "../../Tools/Data/WorldData/HeightMapTool.js";
import { VoxelGeometryLookUp } from "../Models//VoxelGeometryLookUp.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { DVEMesher } from "../../Mesher/Mesher.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { WorldCursor } from "../../Data/Cursor/World/WorldCursor.js";
import { ChunkCursor } from "../../Data/Cursor/World/ChunkCursor.js";
import { RenderedSubstances } from "../Substances/RenderedSubstances.js";
import { VoxelMesherDataTool } from "Mesher/Tools/VoxelMesherDataTool.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";

export class ChunkProcessor {
  heightMapTool = new HeightMapTool();

  substanceData = new SubstanceDataTool();
  chunkCursor = new ChunkCursor();
  worldCursor = new WorldCursor();

  _process(x: number, y: number, z: number, doSecondCheck = false): boolean {
    const voxel = this.chunkCursor.getVoxel(x, y, z);
    if (!voxel) return false;
    if (!voxel.isRenderable()) return false;

    let hasVoxel = false;
    voxel.setSecondary(doSecondCheck);
    if (!doSecondCheck) {
      if (voxel.hasSecondaryVoxel()) {
        hasVoxel = this._process(x, y, z, true);
      }
    }
    const constructor = VoxelModelConstructorRegister.getConstructor(
      voxel.getStringId()
    );
    if (!constructor) {
      throw new Error(
        `Could not find constructor ${voxel.getId()} | ${voxel.getName()} `
      );
    }

    const mesher = RenderedSubstances.meshers.get(
      voxel.getRenderedMaterialStringId()
    );

    if (!mesher) {
      throw new Error(
        `Could not find material for ${voxel.getId()} | ${voxel.getName()} | ${constructor?.id} | ${voxel.getMaterial()} | ${voxel.getRenderedMaterialStringId()}`
      );
    }

    mesher.origin.x = this.chunkCursor._voxelPosition.x;
    mesher.origin.y = this.chunkCursor._voxelPosition.y;
    mesher.origin.z = this.chunkCursor._voxelPosition.z;
    mesher.position.x = x;
    mesher.position.y = y;
    mesher.position.z = z;
    mesher.voxel = voxel;
    mesher.nVoxel = this.worldCursor;
    mesher.startConstruction();
    constructor.process(mesher);
    mesher.endConstruction();
    mesher.resetVars();
    return true;
  }

  build(location: LocationData, priority = 0) {
    this.heightMapTool.chunk.loadInAtLocation(location);

    const [dimension, cx, cy, cz] = location;

    this.worldCursor.setFocalPoint(...location);
    this.chunkCursor.setChunk(...location);

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

    const chunks = <SetChunkMeshTask>[
      location,
      [] as any,
      chunkEffects,
      priority,
    ];

    const meshed: VoxelMesherDataTool[] = [];
    for (const [substance, mesher] of RenderedSubstances.meshers) {
      for (const e in mesher.effects) {
        const float = Float32Array.from(mesher.effects[e]);
        trasnfers.push(float.buffer);
        chunkEffects.push([e, float]);
      }
      if (mesher.mesh!.positions.length == 0) {
        mesher.resetAll();
        continue;
      }
      meshed.push(mesher);
    }

    const compactMesh = CompactVoxelMesh(...meshed);
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
    chunks[1] = compactMesh;
    for (const mesher of meshed) {
      mesher.resetAll();
    }

    DivineVoxelEngineConstructor.instance.threads.parent.runTasks<SetChunkMeshTask>(
      "set-chunk",
      chunks,
      trasnfers
    );
  }
}
