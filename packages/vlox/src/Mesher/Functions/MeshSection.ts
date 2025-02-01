import { LocationData } from "../../Math";
import type { SetSectionMeshTask } from "../../Renderer/Renderer.types.js";
//data
import { WorldSpaces } from "../../World/WorldSpaces.js";
//tools
import {
  VoxelGeometryLookUp,
  VoxelGeometryLookUpSpace,
} from "../Models/VoxelGeometryLookUp.js";
import { CompactVoxelMesh } from "./CompactVoxelMesh.js";
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { SectionCursor } from "../../World/Cursor/SectionCursor.js";
import { RenderedMaterials } from "../RenderedMaterials";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";
import { SectionHeightMap } from "../../World/Section/SectionHeightMap.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { WorldVoxelCursor } from "../../World/Cursor/WorldVoxelCursor";
import { VoxelMeshBVHBuilder } from "../Tools/VoxelMeshBVHBuilder";
import { Vector3Like } from "@amodx/math";

const sectionCursor = new SectionCursor();
const worldCursor = new WorldCursor();
let space: VoxelGeometryLookUpSpace;
const bvhTool = new VoxelMeshBVHBuilder();
function process(x: number, y: number, z: number): boolean {
  const voxel = sectionCursor.getVoxel(x, y, z);
  if (!voxel) return false;
  if (!voxel.isRenderable()) return false;

  if (voxel.hasSecondaryVoxel()) {
    voxel.setSecondary(true);
    meshVoxel(x, y, z, voxel);
    voxel.setSecondary(false);
  }

  meshVoxel(x, y, z, voxel);
  return true;
}

function meshVoxel(x: number, y: number, z: number, voxel: WorldVoxelCursor) {
  const constructor =
    VoxelModelConstructorRegister.constructorsPaltte[voxel.getId()];
  if (!constructor) {
    throw new Error(
      `Could not find constructor ${voxel.getId()} | ${voxel.getName()} `
    );
  }
  const mesher = RenderedMaterials.meshers[voxel.getRenderedMaterial()];
  if (!mesher) {
    throw new Error(
      `Could not find material for ${voxel.getId()} | ${voxel.getName()} | ${constructor?.id} | ${voxel.getMaterial()} | ${voxel.getRenderedMaterialStringId()}`
    );
  }

  mesher.origin.x = sectionCursor._voxelPosition.x;
  mesher.origin.y = sectionCursor._voxelPosition.y;
  mesher.origin.z = sectionCursor._voxelPosition.z;
  mesher.position.x = x;
  mesher.position.y = y;
  mesher.position.z = z;
  mesher.voxel = voxel;
  mesher.nVoxel = worldCursor;
  mesher.startConstruction();
  constructor.process(mesher);
  mesher.endConstruction();
  mesher.reset();
}

const padding = Vector3Like.Create(5, 5, 5);
export function MeshSection(
  location: LocationData
): [task: SetSectionMeshTask, transfers: any[]] | null {
  if (!space)
    space = VoxelGeometryLookUp.createSpace(
      WorldSpaces.section.bounds.x + padding.x,
      WorldSpaces.section.bounds.y + padding.y,
      WorldSpaces.section.bounds.z + padding.z
    );

  const [dimension, cx, cy, cz] = location;

  const sector = WorldRegister.sectors.get(dimension, cx, cy, cz);
  if (!sector) return null;
  const section = sector.getSection(cy);
  SectionHeightMap.setSection(section);
  worldCursor.setFocalPoint(...location);
  sectionCursor.setSection(...location);

  let [minY, maxY] = SectionHeightMap.getMinMax();
  const maxX = WorldSpaces.section.bounds.x;
  const maxZ = WorldSpaces.section.bounds.z;

  if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) return null;
  space.start(cx - padding.x, cy - padding.y, cz - padding.z);
  VoxelGeometryLookUp.start(space);

  bvhTool.reset();
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    RenderedMaterials.meshers[i].bvhTool = bvhTool;
  }

  for (let y = minY; y <= maxY; y++) {
    let foundVoxels = false;
    if (!SectionHeightMap.getVoxel(y) && !SectionHeightMap.getDirty(y))
      continue;
    for (let x = 0; x < maxX; x++) {
      for (let z = 0; z < maxZ; z++) {
        let found = process(x + cx, y + cy, z + cz);
        if (found) foundVoxels = true;
      }
    }
    SectionHeightMap.setVoxel(y, foundVoxels);
    SectionHeightMap.setDirty(y, false);
  }

  VoxelGeometryLookUp.stop();
  const transfers: any[] = [];
  const sectionEffects: SetSectionMeshTask[2] = [];
  const sections = <SetSectionMeshTask>[location, [] as any, sectionEffects, 0];
  const meshed: VoxelMesherDataTool[] = [];
  for (let i = 0; i < RenderedMaterials.meshers.length; i++) {
    const mesher = RenderedMaterials.meshers[i];
    for (const e in mesher.effects) {
      const float = Float32Array.from(mesher.effects[e]);
      transfers.push(float.buffer);
      sectionEffects.push([e, float]);
    }
    if (!mesher.mesh.vertexCount) {
      mesher.resetAll();
      mesher.bvhTool = null;
      continue;
    }
    meshed.push(mesher);
  }

  const [compactMesh, buffers] = CompactVoxelMesh(meshed);
  sections[1] = compactMesh;
  for (let i = 0; i < meshed.length; i++) {
    meshed[i].resetAll();
    meshed[i].bvhTool = null;
  }

  return [sections, [...transfers, ...buffers]];
}
