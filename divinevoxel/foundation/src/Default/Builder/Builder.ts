import { LocationData } from "@divinevoxel/core/Math/index.js";
import { VoxelConstructors } from "./Constructors/Voxel/VoxelConstructors.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { RenderedSubstances } from "./Rules/RenderedSubstances.js";
import { TextureRegister } from "../../Textures/TextureRegister.js";
import { MesherManager } from "./Meshers/MesherManager.js";
import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { DVEBuilder } from "../../Interfaces/Builder/DVEBuilder.js";
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
  textureManager = TextureRegister;
  chunkProcessor = new ChunkProcessor();
  nodes = MesherManager;
  overrides = OverrideManager;
  renderedSubstances = RenderedSubstances;

  observers = DVEBuilder.observers;

  constructor(data: DVEDefaultBuilderInitData) {
    super();
    if (!DVEDefaultBuilder.instance) DVEDefaultBuilder.instance = this;

    this.constructors.registerVoxel(data.constructors);

    return DVEDefaultBuilder.instance;
  }

  init() {
    DivineVoxelEngineConstructor.instance.TC.registerTasks(
      "sync-texuture-index",
      (data: any) => {
        this.textureManager.setTextureIndex(data);
        this.constructors.constructors._map.forEach((_) => {
          _.onTexturesRegistered(this.textureManager);
        });
        this.observers.texturesRegistered.notify(this.textureManager);
        this.textureManager.releaseTextureData();
        SubstanceRules.$BuildRules();
      }
    );
    DivineVoxelEngineConstructor.instance.TC.registerTasks<BuildNodeMesh>(
      "build-node-mesh",
      (data, onDone) => {
        const nodeData = this.nodes.buildNode(data);
        if (!nodeData) return onDone ? onDone(false) : 0;
        onDone ? onDone(nodeData[0], nodeData[1]) : 0;
      },
      "deferred"
    );
  }
  buildChunk(location: LocationData, LOD = 1,priority = 0) {
    this.chunkProcessor.build(location);
    return true;
  }
}
