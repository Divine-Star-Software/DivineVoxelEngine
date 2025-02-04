import { LocationData } from "../../Math";
import type { SetSectionMeshTask } from "../../Renderer/Renderer.types.js";
//data
import { WorldSpaces } from "../../World/WorldSpaces.js";
//tools
import { VoxelGeometryBuilderCacheSpace } from "../Models/VoxelGeometryBuilderCacheSpace.js";
import { CompactVoxelMesh } from "./CompactVoxelMesh.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { SectionCursor } from "../../World/Cursor/SectionCursor.js";
import { VoxelModelBuilder } from "../Models/VoxelModelBuilder.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { WorldVoxelCursor } from "../../World/Cursor/WorldVoxelCursor";
import { VoxelMeshBVHBuilder } from "../Geomtry/VoxelMeshBVHBuilder";
import { Vector3Like } from "@amodx/math";
import { RenderedMaterials } from "../Models/RenderedMaterials";

const sectionCursor = new SectionCursor();
const worldCursor = new WorldCursor();
let space: VoxelGeometryBuilderCacheSpace;
const bvhTool = new VoxelMeshBVHBuilder();

function meshVoxel(
  x: number,
  y: number,
  z: number,
  voxel: WorldVoxelCursor
): boolean {
  let added = false;
  const constructor =
    VoxelModelConstructorRegister.constructorsPaltte[voxel.getId()];
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
export function MeshSection(
  location: LocationData,
  transfers: any[] = []
): SetSectionMeshTask | null {
  if (!space)
    space = new VoxelGeometryBuilderCacheSpace({
      x: WorldSpaces.section.bounds.x + padding.x,
      y: WorldSpaces.section.bounds.y + padding.y,
      z: WorldSpaces.section.bounds.z + padding.z,
    });

  const [dimension, cx, cy, cz] = location;

  const sector = WorldRegister.sectors.get(dimension, cx, cy, cz);

  if (!sector) return null;
  const section = sector.getSection(cy);
  worldCursor.setFocalPoint(...location);
  sectionCursor.setSection(...location);

  let [minY, maxY] = section.getMinMax();
  if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) return null;
  space.start(cx - (padding.x - 1), cy - (padding.y - 1), cz - (padding.z - 1));

  bvhTool.reset();
  const effects = {};
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    const mesher = RenderedMaterials.meshers[i];
    mesher.space = space;
    mesher.bvhTool = bvhTool;
    mesher.effects = effects;
  }

  const volume = WorldSpaces.section.volumne;
  const slice = WorldSpaces.section.bounds.x * WorldSpaces.section.bounds.z;

  //const t = performance.now();
  for (let i = 0; i < volume; i++) {
    if (!(i % slice)) {
      const y = i / slice;
      if (!section.getHasVoxel(y) && !section.getHasVoxelDirty(y)) {
        i += slice - 1;
        continue;
      }
    }
    if (!section.ids[i]) continue;
    if (!section.ids[i] || section.getBuried(i)) continue;
    const voxel = sectionCursor.getVoxelAtIndex(i);
    const x = cx + sectionCursor._voxelPosition.x;
    const y = cy + sectionCursor._voxelPosition.y;
    const z = cz + sectionCursor._voxelPosition.z;

    let addedVoxel = false;
    if (meshVoxel(x, y, z, voxel)) addedVoxel = true;
    if (voxel.hasSecondaryVoxel()) {
      voxel.setSecondary(true);
      if (meshVoxel(x, y, z, voxel)) addedVoxel = true;
      voxel.setSecondary(false);
    }

    section.setBuried(i, !addedVoxel);
  }

  // console.log(performance.now() - t);

  const sectionEffects: SetSectionMeshTask[2] = [];
  const sections = <SetSectionMeshTask>[location, [] as any, sectionEffects, 0];
  const meshed: VoxelModelBuilder[] = [];
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    const mesher = RenderedMaterials.meshers[i];
    for (const e in mesher.effects) {
      const float = Float32Array.from(mesher.effects[e]);
      transfers.push(float.buffer);
      sectionEffects.push([e, float]);
    }
    if (!mesher.mesh.vertexCount) {
      mesher.clear();
      mesher.bvhTool = null;
      continue;
    }
    meshed.push(mesher);
  }

  const compactMesh = CompactVoxelMesh(meshed, transfers);
  sections[1] = compactMesh;
  for (let i = 0; i < meshed.length; i++) {
    meshed[i].clear();
    meshed[i].bvhTool = null;
  }

  return sections;
}
