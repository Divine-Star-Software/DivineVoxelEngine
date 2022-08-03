export type EngineSettingsData = {
 nexus: {
  enabled: boolean;
  autoSyncChunks: boolean;
  autoSyncVoxelPalette: boolean;
 };
 data: {
  enabled: boolean;
  autoSyncChunks: boolean;
 };
 richWorld: {
  enabled: boolean;
  autoSyncChunks: boolean;
  autoSyncVoxelPalette: boolean;
 };
 fx: {
  enabled: boolean;
  autoSyncChunks: boolean;
  autoSyncVoxelPalette: boolean;
 };
 server: {
  enabled: boolean;
 };
 textureOptions: {
  width: number;
  height: number;
  animationTime: number;
 };
 world: {
  maxX: number;
  minX: number;
  maxZ: number;
  minZ: number;
  maxY: number;
  minY: number;
 };
 regions: {
  regionXPow2: number;
  regionYPow2: number;
  regionZPow2: number;
 };
 chunks: {
  autoHeightMap: boolean;
  chunkXPow2: number;
  chunkYPow2: number;
  chunkZPow2: number;
 };
 updating: {
  autoRebuild: boolean;
 };
 lighting: {
  doAO: boolean;
  doSunLight: boolean;
  doRGBLight: boolean;
  autoRGBLight: boolean;
  autoSunLight: boolean;
 };
 voxels: {
  doColors: boolean;
 };
 meshes: {
  clearChachedGeometry: boolean;
  checkMagmaCollisions: boolean;
  checkFluidCollisions: boolean;
  checkFloraCollisions: boolean;
  checkSolidCollisions: boolean;
  seralize: boolean;
  pickable: boolean;
 };
 materials: {
  disableFloraShaderEffects: boolean;
  disableFluidShaderEffects: boolean;
  doAO: boolean;
  doSunLight: boolean;
  doRGBLight: boolean;
 };
};
