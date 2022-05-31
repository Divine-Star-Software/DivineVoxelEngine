export type EngineSettingsData = {
 nexus?: {
  enabled: boolean;
 };
 server?: {
  enabled: boolean;
 };
 textureOptions?: {
  width: number;
  height: number;
  animationTime: number;
 };
 world?: {
  voxelPaletteMode: "global" | "per-region";
  maxX : number,
  minX : number,
  maxZ : number,
  minZ : number,
  maxY : number,
  minY : number
 };
 regions?: {
  regionXPow2: number;
  regionYPow2: number;
  regionZPow2: number;
 };
 chunks?: {
  autoHeightMap: boolean;
  chunkXPow2: number;
  chunkYPow2: number;
  chunkZPow2: number;
 };
 updating?: {
  autoRebuild: boolean;
 };
 lighting?: {
  doAO: boolean;
  doSunLight: boolean;
  doRGBLight: boolean;
  autoRGBLight: boolean;
  autoSunLight: boolean;
 };
 voxels?: {
  doColors: boolean;
 };
 materials?: {
  disableFloraShaderEffects: boolean;
  disableFluidShaderEffects: boolean;
  doAO: boolean;
  doSunLight: boolean;
  doRGBLight: boolean;
 };
};
