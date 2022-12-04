import { VoxelData } from "Meta/index.js";
import { DVEW } from "../DivineVoxelEngineWorld.js";
import type { RemoteTagManagerInitData } from "Libs/DivineBinaryTags/Meta/Util.types.js";
import { VoxelDataTags } from "./Tags/VoxelTags.js";

let shapeMap: Record<string, number> | null = null;
export const VoxelDataCreator = {
 voxelBuffer: new SharedArrayBuffer(0),
 voxelMapBuffer: new SharedArrayBuffer(0),

 initData: <RemoteTagManagerInitData>{},

 __shapeMapSet: false,

 isReady() {
  return this.__shapeMapSet;
 },

 $createVoxelData() {
  if (!shapeMap) return;
  const substanceMap = DVEW.data.register.voxels.substanceMap;

  const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;

  const initData = VoxelDataTags.$INIT({
   indexBufferMode: "shared",
   numberOfIndexes: totalVoxels,
  });

  const buffer = new SharedArrayBuffer(initData.bufferSize);
  initData.buffer = buffer;
  const vp = this.palette;
  this.voxelMapBuffer = new SharedArrayBuffer(vp._count * 2);
  const voxelMap = new Uint16Array(this.voxelMapBuffer);
  VoxelDataTags.setBuffer(buffer);

  let currentCount = 0;
  let currentParent = 0;

  for (let i = 2; i < voxelMap.length; i++) {
   let newParent = vp.getVoxelBaseId(i);
   if (newParent != currentParent) {
    currentParent = newParent;
    voxelMap[i] = currentCount;
    const voxel = DVEW.voxelManager.getVoxelData(
     vp.getVoxelStringId(newParent)
    );

    VoxelDataTags.setTagIndex(currentCount);
    VoxelDataTags.setTag("#dve:substance", substanceMap[voxel.substance]);

    VoxelDataTags.setTag("#dve:shape_id", shapeMap[voxel.shapeId]);
    VoxelDataTags.setTag("#dve:material", 0);
    VoxelDataTags.setTag("#dve:hardness", voxel.hardnress);

    VoxelDataTags.setTag("#dve:is_light_source", voxel.lightSource ? 1 : 0);
    VoxelDataTags.setTag(
     "#dve:light_value",
     voxel.lightValue ? voxel.lightValue : 0
    );
    VoxelDataTags.setTag("#dve:is_rich", voxel.isRich ? 1 : 0);
    if (voxel.physics) {
     VoxelDataTags.setTag(
      "#dve:check_collisions",
      voxel.physics.checkCollisions ? 1 : 0
     );
     VoxelDataTags.setTag(
      "#dve:check_collisions",
      voxel.physics.collider ? 1 : 0
     );
    }

    currentCount++;
   }
  }



  this.initData = initData;
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
  _palette: <Record<number, string>>{
   0: "dve:air",
   1: "dve:barrier",
  },
  _map: <Record<string, number>>{
   "dve:air": 0,
   "dve:barrier": 1,
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

  getVoxelBaseId(id: number) {
   const mainData = this.getVoxelStringId(id);
   return this.getVoxelStateId(mainData, 0);
  },

  getVoxelStateId(voxelId: string, voxelState: number): number {
   return this._map[voxelId] + voxelState;
  },

  getVoxelStringId(voxelId: number): string {
   return this._palette[voxelId];
  },

  getVoxelState(voxelId: number) {
   const trueId = this._palette[voxelId];
   const mapId = this._map[trueId];
   return voxelId - mapId;
  },

  get() {
   return this._palette;
  },
  getMap() {
   return this._map;
  },
 },
};
