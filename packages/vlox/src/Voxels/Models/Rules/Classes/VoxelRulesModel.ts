import {
  VoxelModelConstructorData,
  VoxelModelData,
} from "../../VoxelModel.types";
import { BuildStateData } from "../../../../Voxels/Functions/BuildStateData";
import { VoxelStateSchemaData } from "../../../../Voxels/State/State.types";

export class VoxelRulesModoel {
  states = new Map<string, string[]>();
  conditionalNodes = new Map<string, string[]>();

  stateData: ReturnType<typeof BuildStateData>;

  voxels = new Map<string, VoxelModelConstructorData>();
  voxelModData = new Map<
    string,
    {
      modSchema: VoxelStateSchemaData;
      modStateTree: any[];
      modPalette: any[];
      modRecord: Record<string, any>;
    }
  >();

  constructor(public data: VoxelModelData) {}

  registerShapeState(id: string, geomtryId: string) {
    let stateArray = this.states.get(id);
    if (!stateArray) {
      stateArray = [];
      this.states.set(id, stateArray);
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
