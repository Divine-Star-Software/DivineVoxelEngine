import { LocationData } from "../Math/index.js";
import { VoxelConstructorsRegister } from "./Constructors/Voxel/VoxelConstructorsRegister.js";
import { ChunkProcessor } from "./Processors/ChunkProcessor.js";
import { OverrideManager } from "./Rules/Overrides/OverridesManager.js";
import { RenderedSubstances } from "./Rules/RenderedSubstances.js";
import { TextureRegister } from "../Textures/TextureRegister.js";
import { MesherManager } from "./Meshers/MesherManager.js";
import { DivineVoxelEngineConstructor } from "../Contexts/Constructor/DivineVoxelEngineConstructor.js";
import { BuildNodeMesh } from "./Tasks/BuidlerTasks.types.js";
import { SubstanceRules } from "./Rules/SubstanceRules.js";
import { VoxelConstructor } from "./Constructors/Voxel/Classes/VoxelConstructor.js";
import { VoxelShapeManager } from "./Shapes/VoxelShapeManager.js";
import { Observable } from "@amodx/core/Observers";
import { ShapeTool } from "./Shapes/ShapeTool.js";
export type DVEMesherInitData = {
  constructors: VoxelConstructor[];
};
export class DVEMesher  {
  static observers = {
    texturesRegistered: new Observable<typeof TextureRegister>(),
  };
  static instance: DVEMesher;
  static get defaults() {
    return VoxelConstructorsRegister.defaults;
  }
  constructors = VoxelConstructorsRegister;
  textureManager = TextureRegister;
  chunkProcessor = new ChunkProcessor();
  nodes = MesherManager;
  overrides = OverrideManager;
  renderedSubstances = RenderedSubstances;

  shapes = VoxelShapeManager;

  observers = DVEMesher.observers;

  constructor(data: DVEMesherInitData) {

    if (!DVEMesher.instance) DVEMesher.instance = this;

    this.constructors.registerVoxel(data.constructors);

    return DVEMesher.instance;
  }

  init() {
    this.shapes.init();
    DivineVoxelEngineConstructor.instance.TC.registerTasks(
      "sync-texuture-index",
      (data: any) => {
        this.textureManager.setTextureIndex(data);
        this.constructors.constructors.forEach((_) => {
          try {
            _.onTexturesRegistered(this.textureManager);
          } catch (error) {
            console.log("error when loading textures into constructors");
            console.log(_);
            console.error(error);
          }
        });
        this.observers.texturesRegistered.notify(this.textureManager);
        this.textureManager.releaseTextureData();

        
        RenderedSubstances.add("#dve_solid");
        RenderedSubstances.add("#dve_flora");
        RenderedSubstances.add("#dve_liquid");
        

     //   SubstanceRules.buildRules();
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
  meshChunk(location: LocationData, LOD = 1, priority = 0) {
    this.chunkProcessor.build(location);
    return true;
  }
}
