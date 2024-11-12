import { VoxelFaceTransparentResultsIndex } from "../../Indexing/VoxelFaceTransparentResultsIndex";
import { VoxelRulesModoel } from "../Classes/VoxelRulesModel";
import { VoxelModelManager } from "../VoxelModelManager";

const isArgString = (data: any) => {
  if (typeof data !== "string") return;
  return data[0] == "@";
};

export function BuildFinalInputs(model: VoxelRulesModoel) {
  const shapeStateVoxelInputs: Record<string, any[]> = {};
  const transparentVoxelFaceIndexes: Record<
    string,
    VoxelFaceTransparentResultsIndex
  > = {};
  const conditionalShapeStateVoxelInputs: Record<string, any[]> = {};

  for (const [voxelId, voxel] of model.voxels) {
    const transparentIndex = new VoxelFaceTransparentResultsIndex({
      buffer: new SharedArrayBuffer(
        model.stateData.relativeByteCount * Object.keys(voxel.inputs).length
      ),
      resultsSize: model.stateData.relativeByteCount,
    });
    transparentVoxelFaceIndexes[voxelId] = transparentIndex;
    const voxelModData = model.voxelModData.get(voxelId)!;

    for (const modVoxelInputKey in voxel.inputs) {
      const modVoxelInput = voxel.inputs[modVoxelInputKey];
      const modIndex = voxelModData.modRecord[modVoxelInputKey];
      const baseStates: any[] = [];
      for (const state in model.data.shapeStatesNodes) {
        const geoNodes: any[] = [];
        const shapeStateNodes = model.data.shapeStatesNodes[state];
        for (const node of shapeStateNodes) {
          const geo = VoxelModelManager.getGeomtryFromLink(node);
          if (!geo) throw new Error(`Geometry does not exist`);
          geo.inputs.resetDefaults();
          for (const geoArg in node.inputs) {
            const constructorArg = node.inputs[geoArg];
            if (isArgString(constructorArg)) {
              geo.inputs[geoArg] = modVoxelInput[constructorArg];
              continue;
            }
            geo.inputs[geoArg] = constructorArg;
          }

          geoNodes[model.stateData.geometryLinkPalette[node.id]] =
            geo.inputs.cloneArgs();

          const byteIndex =
            model.stateData.relativeGeometryByteIndexMap[
              model.stateData.shapeStateRelativeGeometryMap[
                model.stateData.shapeStateRecord[state]
              ][
                VoxelModelManager.geometryPalette.getNumberId(
                  VoxelModelManager.getGeometryLinkId(node)
                )
              ]
            ];
          if (geo.data.ogData.doNotBuildRules !== true) {
            for (let i = 0; i < geo.inputs.faceTransparentIndex.length; i++) {
              transparentIndex.setValue(
                modIndex,
                byteIndex,
                i,
                geo.inputs.faceTransparentIndex[i] ? 1 : 0
              );
            }
          }
        }

        baseStates[model.stateData.shapeStateRecord[state]] = geoNodes;
      }
      shapeStateVoxelInputs[voxelId] ??= [];
      shapeStateVoxelInputs[voxelId][voxelModData.modRecord[modVoxelInputKey]] =
        baseStates;

      const condiotnalStates: any[] = [];
      for (const state in model.data.shapeStatesConditonalNodes) {
        const geoNodes: any[] = [];
        const shapeStateNodes = model.data.shapeStatesConditonalNodes[state];
        for (let i = 0; i < shapeStateNodes.length; i++) {
          const node = shapeStateNodes[i];
          const geo = VoxelModelManager.getGeomtryFromLink(node);
          if (!geo) throw new Error(`Geometry does not exist`);
          //   geo.inputs.resetDefaults();
          for (const geoArg in node.inputs) {
            const constructorArg = node.inputs[geoArg];

            if (isArgString(constructorArg)) {
              geo.inputs[geoArg] = modVoxelInput[constructorArg];
              continue;
            }
            geo.inputs[geoArg] = constructorArg;
          }
          geoNodes[i] = geo.inputs.cloneArgs();

          const byteIndex =
            model.stateData.relativeGeometryByteIndexMap[
              model.stateData.condiotnalShapeStateRelativeGeometryMap[
                model.stateData.condiotnalShapeStateRecord[state]
              ][
                VoxelModelManager.geometryPalette.getNumberId(
                  VoxelModelManager.getGeometryLinkId(node)
                )
              ]
            ];

          if (geo.data.ogData.doNotBuildRules !== true) {
            for (let i = 0; i < geo.inputs.faceTransparentIndex.length; i++) {
              transparentIndex.setValue(
                modIndex,
                byteIndex,
                i,
                geo.inputs.faceTransparentIndex[i] ? 1 : 0
              );
            }
          }
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
    shapeStateVoxelInputs,
    transparentVoxelFaceIndexes,
    conditionalShapeStateVoxelInputs,
  };
}
