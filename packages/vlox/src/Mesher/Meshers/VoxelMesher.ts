import { MesherInterface } from "./MesherInterface.js";
import { RenderedSubstances } from "../Substances/RenderedSubstances.js";

import { BuildNodeMesh, SetNodeMesh } from "../Tasks/BuidlerTasks.types.js";
import { VoxelGeometryLookUp } from "../Models/VoxelGeometryLookUp.js";
import { TemplateCursor } from "../../Data/Cursor/Template/TemplateCursor.js";
import { VoxelCursor } from "../../Data/Cursor/VoxelCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { DVEMesher } from "../Mesher.js";
import { FullVoxelTemplate } from "../../Templates/FullVoxelTemplate.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";

class VoxelBuilderBase implements MesherInterface {
  templateCursor = new TemplateCursor();
  voxelCursor = new VoxelCursor();
  substanceData = new SubstanceDataTool();

  constructor(public id: string) {
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

    const constructor = VoxelModelConstructorRegister.getConstructor(
      voxel.getStringId()
    );

    const mesher = RenderedSubstances.meshers.get(
      voxel.getRenderedMaterialStringId()
    );
    if (!mesher || !constructor) return false;

    mesher.resetAll();
    VoxelGeometryLookUp.start("main", 0, 0, 0);
    mesher.origin.x = -0.5;
    mesher.origin.y = -0.5;
    mesher.origin.z = -0.5;
    mesher.position.x = 1;
    mesher.position.y = 1;
    mesher.position.z = 1;

    mesher.voxel = this.voxelCursor.copy(voxel);
    mesher.nVoxel = this.templateCursor;

    constructor.process(mesher);
    mesher.resetVars();

    VoxelGeometryLookUp.stop();

    const compacted = CompactVoxelMesh(mesher);
    mesher.resetVars();
    mesher.mesh!.clear();

    return [[location, compacted], [compacted[1]]] as [
      SetNodeMesh,
      ArrayBuffer[],
    ];
  }
}

export const VoxelBuilder = new VoxelBuilderBase("dve_node_voxel");
