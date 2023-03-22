import { ConstructorHooks } from "../Hooks/ConstructorHooks.js";
import { VoxelConstructors } from "./Constructors/VoxelConstructors.js";
import { ChunkProcessor } from "./Processor/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { SubstanceRules } from "./Rules/SubstanceRules.js";
import { RenderedSubstances } from "./Substances/RenderedSubstances.js";
import { TextureManager } from "./Textures/TextureManager.js";
export const Builder = {
    constructors: VoxelConstructors,
    textureManager: TextureManager,
    processor: ChunkProcessor,
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
    buildChunk(location, LOD = 1) {
        this.processor.build(location);
        return true;
    },
};
