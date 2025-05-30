import { LocationData } from "../../../Math";
import type { SetSectionMeshTask } from "../../Types/Mesher.types";
//data
import { WorldSpaces } from "../../../World/WorldSpaces.js";
//tools
import { VoxelGeometryBuilderCacheSpace } from "../../Models/VoxelGeometryBuilderCacheSpace.js";
import { SectionCursor } from "../../../World/Cursor/SectionCursor.js";
import { VoxelModelBuilder } from "../../Models/VoxelModelBuilder.js";
import { VoxelModelConstructorRegister } from "../../Models/VoxelModelConstructorRegister.js";
import { WorldVoxelCursor } from "../../../World/Cursor/WorldVoxelCursor";
import { VoxelMeshBVHBuilder } from "../../Geomtry/VoxelMeshBVHBuilder";
import { Vector3Like } from "@amodx/math";
import { RenderedMaterials } from "../../Models/RenderedMaterials";
import { CompactVoxelSectionMesh } from "../CompactVoxelSectionMesh";
import { DataCursorInterface } from "Voxels/Cursor/DataCursor.interface";

let space: VoxelGeometryBuilderCacheSpace;
const bvhTool = new VoxelMeshBVHBuilder();

function meshVoxel(
  x: number,
  y: number,
  z: number,
  voxel: WorldVoxelCursor,
  worldCursor: DataCursorInterface,
  sectionCursor: SectionCursor
): boolean {
  let added = false;
  const constructor =
    VoxelModelConstructorRegister.constructorsPaltte[voxel.getVoxelId()];
  const builder = constructor.builder;
  builder.origin.x = sectionCursor._voxelPosition.x;
  builder.origin.y = sectionCursor._voxelPosition.y;
  builder.origin.z = sectionCursor._voxelPosition.z;
  builder.position.x = x;
  builder.position.y = y;
  builder.position.z = z;
  builder.voxel = voxel;
  builder.nVoxel = worldCursor;
  builder.startConstruction();
  added = constructor.process();
  builder.endConstruction();
  return added;
}

const padding = Vector3Like.Create(5, 5, 5);
export function MeshSectionBase(
  worldCursor: DataCursorInterface,
  sectionCursor: SectionCursor,
  location: LocationData,
  transfers: any[] = []
): SetSectionMeshTask | null {
  if (!space)
    space = new VoxelGeometryBuilderCacheSpace({
      x: WorldSpaces.section.bounds.x + padding.x,
      y: WorldSpaces.section.bounds.y + padding.y,
      z: WorldSpaces.section.bounds.z + padding.z,
    });
  const { x: cx, y: cy, z: cz } = sectionCursor._sectionPosition;

  const section = sectionCursor._section!;

  let [minY, maxY] = section.getMinMax();
  if (minY == Infinity && maxY == -Infinity) {
    section.setInProgress(false);
    return null;
  }
  space.start(cx - (padding.x - 1), cy - (padding.y - 1), cz - (padding.z - 1));

  bvhTool.reset();
  const effects = {};
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    const mesher = RenderedMaterials.meshers[i];
    mesher.space = space;
    mesher.bvhTool = bvhTool;
    mesher.effects = effects;
  }

  const slice = WorldSpaces.section.bounds.x * WorldSpaces.section.bounds.z;

  const startY = minY * slice;
  const endY = (maxY + 1) * slice;

  for (let i = startY; i < endY; i++) {
    if (!(i % slice)) {
      const y = i / slice;
      if (!section.getHasVoxel(y) && !section.getHasVoxelDirty(y)) {
        i += slice - 1;
        continue;
      }
    }
    if (!section.ids[i] || section.getBuried(i)) continue;
    const voxel = sectionCursor.getVoxelAtIndex(i);
    const x = cx + sectionCursor._voxelPosition.x;
    const y = cy + sectionCursor._voxelPosition.y;
    const z = cz + sectionCursor._voxelPosition.z;

    let addedVoxel = false;
    if (meshVoxel(x, y, z, voxel, worldCursor, sectionCursor))
      addedVoxel = true;
    if (voxel.hasSecondaryVoxel()) {
      voxel.setSecondary(true);
      if (meshVoxel(x, y, z, voxel, worldCursor, sectionCursor))
        addedVoxel = true;
      voxel.setSecondary(false);
    }

    section.setBuried(i, !addedVoxel);
  }

  const meshed: VoxelModelBuilder[] = [];
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    const mesher = RenderedMaterials.meshers[i];
    if (!mesher.mesh.vertexCount) {
      mesher.clear();
      mesher.bvhTool = null;
      continue;
    }
    const { min, max } = mesher.bvhTool!.getMeshBounds();
    mesher.mesh.minBounds.x = min[0];
    mesher.mesh.minBounds.y = min[1];
    mesher.mesh.minBounds.z = min[2];
    mesher.mesh.maxBounds.x = max[0];
    mesher.mesh.maxBounds.y = max[1];
    mesher.mesh.maxBounds.z = max[2];

    meshed.push(mesher);
  }

  const compactMesh = CompactVoxelSectionMesh(location, meshed, transfers);

  for (let i = 0; i < meshed.length; i++) {
    meshed[i].clear();
    meshed[i].bvhTool = null;
  }

  section.setInProgress(false);

  return compactMesh;
}
