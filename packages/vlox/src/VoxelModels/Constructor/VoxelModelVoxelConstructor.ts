import { VoxelConstructor } from "../../Mesher/Constructors/Voxel/Classes/VoxelConstructor";
import { TextureRegister } from "../../Textures/TextureRegister";
import { VoxelMesherDataTool } from "../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelModelConstructor } from "./Register/VoxelModelsConstructor";
import { VoxelInputsSyncData } from "../VoxelModelRules.types";
import { VoxelModelConstructorRegister } from "./Register/VoxelModelConstructorRegister";
import { ShapeTool } from "../../Mesher/Shapes/ShapeTool";
import { VoxelGeometryLookUp } from "./VoxelGeometryLookUp";
import { StateSchema } from "../State/Schema/StateSchema";
import { StateTreeReader } from "../State/StateTreeReader";
import { VoxelFaceTransparentResultsIndex } from "../Indexing/VoxelFaceTransparentResultsIndex";

export class VoxelModelVoxelConstructor extends VoxelConstructor {
  isModel: true = true;

  geometries: number[][] = [];

  modSchema: StateSchema;
  modTree: StateTreeReader;

  transparentIndex: VoxelFaceTransparentResultsIndex;

  baseInputMap: any[];
  conditonalInputMap: any[];

  constructor(
    public id: string,
    public model: VoxelModelConstructor,
    voxleData: VoxelInputsSyncData
  ) {
    super();
    this.baseInputMap = voxleData.baseGeometryInputMap;
    this.conditonalInputMap = voxleData.condiotnalGeometryInputMap;
    this.transparentIndex = new VoxelFaceTransparentResultsIndex(
      voxleData.transparentFaceIndex
    );

    this.modSchema = new StateSchema(voxleData.modSchema);

    this.modTree = new StateTreeReader(
      this.modSchema,
      0,
      voxleData.modStateTree
    );
  }

  isShapeStateFaceTransparent(
    modState: number,
    shapeState: number,
    geoId: number,
    faceIndex: number
  ) {
    return (
      this.transparentIndex.getValue(
        modState,
        this.model.getShapeStateTransaprentByteIndex(shapeState, geoId),
        faceIndex
      ) == 1
    );
  }

  isCondtionalStateFaceTransparent(
    modState: number,
    shapeState: number,
    geoId: number,
    faceIndex: number
  ) {
    return (
      this.transparentIndex.getValue(
        modState,
        this.model.getCondtionalStateTransaprentByteIndex(shapeState, geoId),
        faceIndex
      ) == 1
    );
  }

  process(tool: VoxelMesherDataTool) {
    const hashed = VoxelGeometryLookUp.getHash(
      tool.voxel.x,
      tool.voxel.y,
      tool.voxel.z
    );

    const treeState = VoxelGeometryLookUp.stateCache[hashed];
    const modState = VoxelGeometryLookUp.modCache[hashed];

    if (treeState !== undefined && treeState > -1) {
      const geoLinks = this.model.data.shapeStateMap[treeState];
      const geometries = this.model.data.shapeStateGeometryMap[treeState];

      const geometriesLength = geoLinks.length;

      const inputs = this.baseInputMap[modState][treeState];

      for (let i = 0; i < geometriesLength; i++) {
        const nodeId = geoLinks[i];
        const geoInputs = inputs[nodeId];

        const geomtry = VoxelModelConstructorRegister.geometry[geometries[i]];

        const nodesLength = geomtry.nodes.length;
        for (let k = 0; k < nodesLength; k++) {
          geomtry.nodes[k].add(tool, hashed, ShapeTool.origin, geoInputs[k]);
        }
      }
    }

    const conditonalTreeState =
      VoxelGeometryLookUp.conditonalStateCache[hashed];

    if (conditonalTreeState !== undefined && conditonalTreeState > -1) {
      const condiotnalNodes =
        this.model.data.condiotnalShapeStateMap[conditonalTreeState];
      const condiotnalNodesLength = condiotnalNodes.length;

      for (let c = 0; c < condiotnalNodesLength; c++) {
        const geometries = condiotnalNodes[c];
        const geometriesLength = geometries.length;
        const inputs = this.conditonalInputMap[modState][c];

        for (let i = 0; i < geometriesLength; i++) {
          const nodeId = geometries[i];
          const geoInputs = inputs[i];

          const geomtry =
            VoxelModelConstructorRegister.geometry[
              this.model.data.geoLinkMap[nodeId]
            ];

          const nodesLength = geomtry.nodes.length;
          for (let k = 0; k < nodesLength; k++) {
            geomtry.nodes[k].add(tool, hashed, ShapeTool.origin, geoInputs[k]);
          }
        }
      }
    }

    tool.clearCalculatedData();
  }

  onTexturesRegistered(textureManager: typeof TextureRegister): void {}
}
