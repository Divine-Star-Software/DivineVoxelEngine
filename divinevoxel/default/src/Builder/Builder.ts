import { ConstructorHooks } from "@divinevoxel/core/Constructor/Hooks/ConstructorHooks.js";
import { LocationData } from "@divinevoxel/core/Math/index.js";
import { VoxelConstructors } from "./Constructors/Voxel/VoxelConstructors.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { RenderedSubstances } from "./Rules/RenderedSubstances.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { NodeBuilderManager } from "./Nodes/NodeBuilderManager.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor/DivineVoxelEngineConstructor.js";
import { DVEBuilder } from "@divinevoxel/core/Interfaces/Builder/DVEBuilder.js";
import { BuildNodeMesh } from "./Tasks/BuidlerTasks.types.js";
import { SubstanceRules } from "./Rules/SubstanceRules.js";
import { VoxelConstructor } from "./Constructors/Voxel/Classes/VoxelConstructor.js";

export type DVEDefaultBuilderInitData = {
  constructors: VoxelConstructor[];
};
export class DVEDefaultBuilder extends DVEBuilder {
  static instance: DVEDefaultBuilder;
  static get defaults() {
    return VoxelConstructors.defaults;
  }
  constructors = VoxelConstructors;
  textureManager = TextureManager;
  chunkProcessor = new ChunkProcessor();
  nodes = NodeBuilderManager;
  overrides = OverrideManager;
  renderedSubstances = RenderedSubstances;

  constructor(data: DVEDefaultBuilderInitData) {
    super();
    if (!DVEDefaultBuilder.instance) DVEDefaultBuilder.instance = this;

    this.constructors.registerVoxel(data.constructors);
   
    return DVEDefaultBuilder.instance;
  }

  init() {
    ConstructorHooks.texturesRegistered.addToRun((manager) => {
      this.constructors.constructors._map.forEach((_) => {
        _.onTexturesRegistered(manager);
      });
    });
    DivineVoxelEngineConstructor.instance.TC.registerTasks(
      "sync-texuture-index",
      (data: any) => {
        console.log("SYNC TEXTURE INDEX",data);
        const DVEC = DivineVoxelEngineConstructor.instance;
        this.textureManager.setTextureIndex(data);
        DVEC.hooks.texturesRegistered.run(DVEC.builder.textureManager);


      }
    );
    DivineVoxelEngineConstructor.instance.TC.registerTasks<BuildNodeMesh>(
      "build-node-mesh",
      (data, onDone) => {
        const DVEC = DivineVoxelEngineConstructor.instance;
        const nodeData = DVEC.builder.nodes.buildNode(data);
        if (!nodeData) return onDone ? onDone(false) : 0;
        onDone ? onDone(nodeData[0], nodeData[1]) : 0;
      },
      "deferred"
    );
    DivineVoxelEngineConstructor.instance.TC.registerTasks("ready", () => {
      SubstanceRules.$BuildRules();
    });
  }
  buildChunk(location: LocationData, LOD = 1) {
    this.chunkProcessor.build(location);
    return true;
  }
}
