import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { VoxelModelRuleBuilderRegister } from "../VoxelModelRuleBuilderRegister";

export function BuildFinalInputs(model: VoxelRulesModoel) {
  const stateVoxelInputs: Record<string, any[]> = {};

  const conditionalShapeStateVoxelInputs: Record<string, any[]> = {};

  for (const [voxelId, voxel] of model.voxels) {
    const voxelModData = model.voxelModData.get(voxelId)!;

    for (const modVoxelInputKey in voxel.inputs) {
      const modVoxelInput = voxel.inputs[modVoxelInputKey];
      const baseStates: any[] = [];
      for (const state in model.data.stateNodes) {
        const geoNodes: any[] = [];
        const stateNodes = model.data.stateNodes[state];
        for (let n = 0; n < stateNodes.length; n++) {
          const node = stateNodes[n];
          const geo = VoxelModelRuleBuilderRegister.getGeomtryFromLink(node);
          if (!geo) throw new Error(`Geometry does not exist`);
          geo.input.resetDefaults();
          for (const geoArg in node.inputs) {
            const constructorArg = node.inputs[geoArg];
            if (geo.input.isArgString(constructorArg)) {
              const arg = constructorArg.replace("@", "");
              if (!Object.hasOwn(modVoxelInput, arg)) {
                console.warn(
                  `Could not input for voxel ${voxelId} and geo ${geo.data.id}. ${geoArg} does not exist`
                );
                continue;
              }
              geo.input.proxy[geoArg] = modVoxelInput[arg];
              continue;
            }
            geo.input.proxy[geoArg] = constructorArg;
          }

          geoNodes[model.stateData.geometryLinkStateMap[state][n]] =
            geo.input.cloneArgs();
        }

        baseStates[model.stateData.stateRecord[state]] = geoNodes;
      }
      stateVoxelInputs[voxelId] ??= [];
      stateVoxelInputs[voxelId][voxelModData.modRecord[modVoxelInputKey]] =
        baseStates;

      const condiotnalStates: any[] = [];
      for (const state in model.data.conditonalNodes) {
        const geoNodes: any[] = [];
        const stateNodes = model.data.conditonalNodes[state];
        for (let i = 0; i < stateNodes.length; i++) {
          const node = stateNodes[i];
          const geo = VoxelModelRuleBuilderRegister.getGeomtryFromLink(node);
          if (!geo) throw new Error(`Geometry does not exist`);
          geo.input.resetDefaults();
          for (const geoArg in node.inputs) {
            const constructorArg = node.inputs[geoArg];

            if (geo.input.isArgString(constructorArg)) {
              geo.input.proxy[geoArg] =
                modVoxelInput[constructorArg.replace("@", "")];
              continue;
            }
            geo.input.proxy[geoArg] = constructorArg;
          }
          geoNodes[i] = geo.input.cloneArgs();
        }

        condiotnalStates[model.stateData.condiotnalShapeStateRecord[state]] =
          geoNodes;
      }
      conditionalShapeStateVoxelInputs[voxelId] ??= [];
      conditionalShapeStateVoxelInputs[voxelId][
        voxelModData.modRecord[modVoxelInputKey]
      ] = condiotnalStates;
    }
  }
  return {
    stateVoxelInputs,
    conditionalShapeStateVoxelInputs,
  };
}
