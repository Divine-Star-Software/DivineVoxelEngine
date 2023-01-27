import { VoxelData } from "Meta/index.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Types/Util.types.js";
import { VoxelDataTags } from "../Tags/VoxelTags.js";
import { VoxelPalette } from "Meta/Data/WorldData.types.js";
import { VoxelPaletteReader } from "../../../Data/Voxel/VoxelPalette.js";

let shapeMap: Record<string, number> | null = null;
export const VoxelDataGenerator = {
 voxelBuffer: new SharedArrayBuffer(0),
 voxelMapBuffer: new SharedArrayBuffer(0),

 initData: <RemoteTagManagerInitData>{},

 __shapeMapSet: false,

 isReady() {
  return this.__shapeMapSet;
 },

 $generateVoxelData() {
  if (!shapeMap) return;
  const substanceMap = DVEW.data.register.voxels.substanceMap;

  const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;

  const initData = VoxelDataTags.$INIT({
   indexBufferMode: "shared",
   numberOfIndexes: totalVoxels,
  });

  VoxelPaletteReader.setVoxelPalette(this.palette.get(), this.palette.getMap());
  const buffer = new SharedArrayBuffer(initData.bufferSize);
  initData.buffer = buffer;
  const vp = this.palette;
  this.voxelMapBuffer = new SharedArrayBuffer(vp._count * 2);
  const voxelMap = new Uint16Array(this.voxelMapBuffer);
  VoxelDataTags.setBuffer(buffer);

  let currentCount = 0;
  let currentParent = 0;

  let materialCount = 0;
  let colliderCount = 0;
  const foundMaterials: Record<string, number> = {};
  const materialMap: Record<number, string> = {};
  const foundCollider: Record<string, number> = {};
  const colliderMap: Record<number, string> = {};
  for (let i = 2; i < voxelMap.length; i++) {
   let newParent = VoxelPaletteReader.id.baseNumeric(i);
   if (newParent != currentParent) {
    currentParent = newParent;
    voxelMap[i] = currentCount;
    const voxel = DVEW.voxelManager.getVoxelData(
     VoxelPaletteReader.id.stringFromNumber(newParent)
    );

    let materialId = foundMaterials[voxel.material];
    if (foundMaterials[voxel.material] == undefined) {
     materialMap[materialCount] = voxel.material;
     foundMaterials[voxel.material] = materialCount;
     materialId = materialCount;
     materialCount++;
    }
    let colliderId = 0;
    if (voxel.physics?.collider) {
     colliderId = foundCollider[voxel.physics.collider];
     if (foundCollider[voxel.physics.collider] == undefined) {
      colliderMap[colliderCount] = voxel.physics?.collider;
      foundCollider[voxel.physics.collider] = colliderCount;
      colliderId = colliderCount;
      colliderCount++;
     }
    }

    VoxelDataTags.setTagIndex(currentCount);
    VoxelDataTags.setTag("#dve_substance", substanceMap[voxel.substance]);

    VoxelDataTags.setTag("#dve_shape_id", shapeMap[voxel.shapeId]);
    VoxelDataTags.setTag("#dve_material", materialId);
    VoxelDataTags.setTag("#dve_hardness", voxel.hardnress);

    VoxelDataTags.setTag("#dve_is_light_source", voxel.lightSource ? 1 : 0);
    VoxelDataTags.setTag(
     "#dve_light_value",
     voxel.lightValue ? voxel.lightValue : 0
    );
    VoxelDataTags.setTag("#dve_is_rich", voxel.isRich ? 1 : 0);
    if (voxel.physics) {
     VoxelDataTags.setTag(
      "#dve_check_collisions",
      voxel.physics.checkCollisions ? 1 : 0
     );
     VoxelDataTags.setTag("#dve_collider_id", colliderId);
    }

    currentCount++;
   }
  }

  this.initData = initData;
  DVEW.data.voxelTags.colliderMap = colliderMap;
  DVEW.data.voxelTags.materialMap = materialMap;
  DVEW.data.voxelTags.sync(voxelMap);
  DVEW.data.voxelTags.$INIT(initData);

  //@ts-ignore
  delete this["shapeMap"];
 },

 setShapeMap(newShapeMap: Record<string, number>) {
  shapeMap = newShapeMap;
  this.__shapeMapSet = true;
 },

 palette: {
  _count: 2,
  _palette: <VoxelPalette>["dve_air", "dve_barrier"],
  _map: <Record<string, number>>{
   dve_air: 0,
   dve_barrier: 1,
  },

  registerVoxel(voxel: VoxelData) {
   this._palette[this._count] = voxel.id;
   this._map[voxel.id] = this._count;
   if (voxel.states) {
    for (let i = this._count; i <= this._count + voxel.states; i++) {
     this._palette[i] = voxel.id;
    }
    this._count += voxel.states;
   }
   this._count++;
  },

  get() {
   return this._palette;
  },
  getMap() {
   return this._map;
  },
 },
};
