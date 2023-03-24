import { ConstructorHooks } from "../Hooks/ConstructorHooks.js";
import { LocationData } from "voxelspaces";
import { VoxelConstructors } from "./Constructors/Voxel/VoxelConstructors.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { SubstanceRules } from "./Rules/SubstanceRules.js";
import { RenderedSubstances } from "./Substances/RenderedSubstances.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { TextureProcessor } from "./Processors/TextureProcessor.js";

export const Builder = {
 constructors: VoxelConstructors,
 textureManager: TextureManager,
 chunkProcessor: ChunkProcessor,
 textureProcessor: TextureProcessor,
 overrides: OverrideManager,
 renderedSubstances: RenderedSubstances,

 $INIT() {
  SubstanceRules.$INIT();
  ConstructorHooks.texturesRegistered.addToRun((manager) => {
   this.constructors.constructors._map.forEach((_) => {
    _.onTexturesRegistered(manager);
   });
  });
 },
 buildChunk(location: LocationData, LOD = 1) {
  this.chunkProcessor.build(location);
  return true;
 },
};
