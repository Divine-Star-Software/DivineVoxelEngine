export class RegisterDataManager<T extends { id: string }> {
 data = new Map<string, T>();
 getData(id: string) {
  const voxelData = this.data.get(id);
  if (!voxelData) {
   throw new Error(`Voxel with ${id} does not exists.`);
  }
  return voxelData;
 }
 registerData(data: T | T[]) {
  if (Array.isArray(data)) {
   for (const voxel of data) {
    this.data.set(voxel.id, voxel);
   }
   return;
  }
  this.data.set(data.id, data);
 }
 clear() {
  this.data.clear();
 }
}
