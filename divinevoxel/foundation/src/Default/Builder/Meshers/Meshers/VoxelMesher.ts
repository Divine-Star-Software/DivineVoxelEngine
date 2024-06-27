import { Mesher } from "../Classes/Mesher.js";
import { BuilderDataTool } from "../../Tools/BuilderDataTool.js";
import { RenderedSubstances } from "../../Rules/RenderedSubstances.js";
import { ShapeTool } from "../../Shapes/ShapeTool.js";
import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types.js";
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
    ShapeTool.origin.x = 0;
    ShapeTool.origin.y = 0;
    ShapeTool.origin.z = 0;
    mesher.resetAll();
    mesher.voxel
      .loadInRaw(rawVoxelData)
      .setMode(BuilderDataTool.Modes.VOXEL_DATA);
    mesher.nVoxel
      .loadInRaw(rawVoxelData)
      .setMode(BuilderDataTool.Modes.VOXEL_DATA);
    ShapeTool.setMesher(mesher);
    constructor.process(mesher);
    mesher.resetVars();

    const [attributes, buffers] = mesher.getAllAttributes();

    for (const [type, data] of attributes) {
      if (type == "position") {
        for (let i = 0; i < data.length; i++) {
          (data as any as number[])[i] -= 0.5;
        }
      }
    }

    mesher.voxel.setMode(BuilderDataTool.Modes.WORLD);
    mesher.nVoxel.setMode(BuilderDataTool.Modes.WORLD);

    mesher.resetAttributes();
    return [[location, attributes], buffers];
  }
}

export const VoxelBuilder = new VoxelBuilderBase("#dve_node_voxel");
