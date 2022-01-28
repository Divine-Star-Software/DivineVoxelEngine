export type EngineSettingsData = {
 textureOptions?: {
  width: number;
  height: number;
 };
 chunks?: {
  chunkXPow2: number;
  chunkYPow2: number;
  chunkZPow2: number;
 };
 lighting?: {
  doAO: boolean;
  doColors: boolean;
  doSunLight: boolean;
  doRGBLight: boolean;
  autoRGBLight: boolean;
  autoSunLight: boolean;
 };
 materials?: {
  disableFloraShaderEffects: boolean;
  disableFluidShaderEffects: boolean;
 };
 meshing?: {
  maxBuilderThreads: number;
 };
};
