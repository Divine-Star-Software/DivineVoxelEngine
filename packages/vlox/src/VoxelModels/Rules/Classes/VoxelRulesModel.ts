import {
  VoxelModelConstructorData,
  VoxelModelData,
} from "../../VoxelModel.types";
import { BuildStateData } from "../Functions/BuildStateData";

export class VoxelRulesModoel {
  shapeStates = new Map<string, string[]>();
  conditionalNodes = new Map<string, string[]>();

  stateData: ReturnType<typeof BuildStateData>;

  voxels = new Map<string, VoxelModelConstructorData>();
  voxelModData = new Map<
    string,
    {
      modSchema: any[];
      modStateTree: any[];
      modPalette: any[];
      modRecord: Record<string, any>;
    }
  >();

  constructor(public data: VoxelModelData) {}

  registerShapeState(id: string, geomtryId: string) {
    let stateArray = this.shapeStates.get(id);
    if (!stateArray) {
      stateArray = [];
      this.shapeStates.set(id, stateArray);
    }

    if (!stateArray.find((_) => _ == geomtryId)) stateArray.push(geomtryId);
  }
  registerCondiotnalNode(id: string, geomtryId: string) {
    let stateArray = this.conditionalNodes.get(id);
    if (!stateArray) {
      stateArray = [];
      this.conditionalNodes.set(id, stateArray);
    }

    if (!stateArray.find((_) => _ == geomtryId)) stateArray.push(geomtryId);
  }
}
