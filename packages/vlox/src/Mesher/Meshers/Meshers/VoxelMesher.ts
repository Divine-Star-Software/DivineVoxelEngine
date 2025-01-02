import { Mesher } from "../Classes/Mesher.js";
import { RenderedSubstances } from "../../Rules/RenderedSubstances.js";
import { ShapeTool } from "../../Shapes/ShapeTool.js";
import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types.js";
import { VoxelGeometryLookUp } from "../../../VoxelModels/Constructor/VoxelGeometryLookUp.js";
import { CompactMesh } from "../../Functions/CompactMesh.js";
import { TemplateCursor } from "../../../Data/Cursor/Template/TemplateCursor.js";
import { VoxelCursor } from "../../../Data/Cursor/VoxelCursor.js";
import { SubstanceDataTool } from "../../../Tools/Data/SubstanceDataTool.js";
import { DVEMesher } from "../../../Mesher/Mesher.js";
import { FullVoxelTemplate } from "../../../Templates/FullVoxelTemplate.js";

class VoxelBuilderBase extends Mesher {
  templateCursor = new TemplateCursor();
  voxelCursor = new VoxelCursor();
  substanceData = new SubstanceDataTool();

  constructor(public id: string) {
    super(id);

    this.templateCursor.setTemplate(
      new FullVoxelTemplate(FullVoxelTemplate.CreateNew([3, 3, 3], 0xf))
    );
  }

  build([location, type, rawVoxelData]: BuildNodeMesh):
    | [SetNodeMesh, ArrayBuffer[]]
    | false {
    const voxel = this.templateCursor.getVoxel(1, 1, 1)!;
    voxel.copyRaw(rawVoxelData);
    voxel.process();
    if (!voxel.isRenderable()) return false;

    const constructor = DVEMesher.instance.constructors.get(
      voxel.getStringId()
    );

    this.substanceData.setSubstance(voxel.getSubstance());
    const mesher = RenderedSubstances.meshers.get(
      this.substanceData.getRendered()
    );
    if (!mesher || !constructor) return false;
    ShapeTool.origin.x = -0.5;
    ShapeTool.origin.y = -0.5;
    ShapeTool.origin.z = -0.5;
    mesher.resetAll();
    VoxelGeometryLookUp.start("main", 0, 0, 0);

    mesher.position.x = 1;
    mesher.position.y = 1;
    mesher.position.z = 1;

    mesher.voxel = this.voxelCursor.copy(voxel);
    mesher.nVoxel = this.templateCursor;

    ShapeTool.setMesher(mesher);
    constructor.process(mesher);
    mesher.resetVars();

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
