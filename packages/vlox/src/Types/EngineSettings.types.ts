export class EngineSettingsData {
  rendererSettings = { mode: "webgl" as "webgl" | "webgpu" };
  floatingOrigi = {
    enable: false,
  };
  nexus = {
    enabled: false,
    autoSyncChunks: true,
    autoSyncVoxelPalette: true,
  };
  dataLoader = {
    enabled: false,
    autoSyncChunks: true,
    mode: "indexdb",
  };
  server = {
    enabled: false,
  };
  richWorld = {
    enabled: false,
    autoSyncChunks: true,
    autoSyncVoxelPalette: true,
  };
  textures = {
    animationTime: 20,
    textureSize: 16,
    mipMapSizes: [16, 12, 8, 4],
  };
  updating = {
    autoRebuild: true,
  };
  world = {
    maxX: Number.MAX_SAFE_INTEGER,
    minX: -Number.MAX_SAFE_INTEGER,
    maxZ: Number.MAX_SAFE_INTEGER,
    minZ: -Number.MAX_SAFE_INTEGER,
    maxY: 256,
    minY: 0,
  };
  regions = {
    regionXPow2: 9,
    regionYPow2: 8,
    regionZPow2: 9,
  };
  chunks = {
    autoHeightMap: true,
    chunkXPow2: 4,
    chunkYPow2: 4,
    chunkZPow2: 4,
  };
  voxels = {
    doColors: true,
  };
  flow = {
    enable: true,
    baseFlowLimit: 200,
  };
  lighting = {
    doAO: true,
    doSunLight: true,
    doRGBLight: true,
    autoRGBLight: true,
    autoSunLight: true,
  };
  meshes = {
    clearChachedGeometry: true,
    checkMagmaCollisions: false,
    checkLiquidCollisions: false,
    checkFloraCollisions: false,
    checkSolidCollisions: false,
    serialize: false,
    pickable: false,
  };
}
