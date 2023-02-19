import { RemoteTagManager } from "divine-binary-tags";

class VDTags extends RemoteTagManager {
 voxelIndex = new Uint16Array();
 constructor(public id: string) {
  super(id);
 }
 sync(voxelMap: Uint16Array) {
  this.voxelIndex = voxelMap;
 }
 setVoxel(id: number) {
  const index = this.voxelIndex[id];
  this.setTagIndex(index);
 }
}

export const VoxelTags = new VDTags("voxel-data");
