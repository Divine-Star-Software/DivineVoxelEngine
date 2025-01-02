import { Mesher } from "../Classes/Mesher.js";
import { BuilderDataTool } from "../../Tools/BuilderDataTool.js";
import { RenderedSubstances } from "../../Rules/RenderedSubstances.js";
import { ShapeTool } from "../../Shapes/ShapeTool.js";
import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types.js";
import { VoxelGeometryLookUp } from "../../../VoxelModels/Constructor/VoxelGeometryLookUp.js";
import { CompactMesh } from "../../Functions/CompactMesh.js";
class VoxelBuilderBase extends Mesher {
  dataTool = new BuilderDataTool();

  constructor(public id: string) {
    super(id);
    this.dataTool.setMode(BuilderDataTool.Modes.VOXEL_DATA);
  }

  build([location, type, rawVoxelData]: BuildNodeMesh):
    | [SetNodeMesh, ArrayBuffer[]]
    | false {
    if (!this.dataTool.loadInRaw(rawVoxelData).isRenderable()) return false;

    const constructor = this.dataTool.getConstructor();
    const mesher = RenderedSubstances.meshers.get(
      this.dataTool.getSubstnaceData().getRendered()
    );

    if (!mesher || !constructor) return false;
    ShapeTool.origin.x = -.5;
    ShapeTool.origin.y = -.5;
    ShapeTool.origin.z = -.5;
    mesher.resetAll();
    VoxelGeometryLookUp.start("main",0,0,0);
    VoxelGeometryLookUp.dataTool
      .loadInRaw(rawVoxelData)
      .setMode(BuilderDataTool.Modes.VOXEL_DATA);
    
/*     mesher.voxel
      .loadInRaw(rawVoxelData)
      .setMode(BuilderDataTool.Modes.VOXEL_DATA); */
    mesher.nVoxel.setMode(BuilderDataTool.Modes.VOXEL_DATA).loadIn();
    ShapeTool.setMesher(mesher);
    constructor.process(mesher);
    mesher.resetVars();
    const [attributes, buffers] = mesher.mesh!.getAllAttributes();


    for (const [type, data] of attributes) {
      if (type == "position") {
        for (let i = 0; i < data.length; i++) {
          (data as any as number[])[i] -= 0.5;
        }
      }
    }


    mesher.nVoxel.setMode(BuilderDataTool.Modes.WORLD);
    VoxelGeometryLookUp.dataTool.setMode(BuilderDataTool.Modes.WORLD);
    VoxelGeometryLookUp.stop();


    const compacted = CompactMesh(mesher);
    mesher.resetVars();
    mesher.mesh!.clear();

    return [[location, compacted], [compacted[1]]] as [
      SetNodeMesh,
      ArrayBuffer[],
    ];
  }
}

export const VoxelBuilder = new VoxelBuilderBase("#dve_node_voxel");
