import {
  candlesGeometry1,
  candlesGeometry2,
  candlesGeometry3,
  candlesGeometry4,
  candlesModel,
  carpetGeometry,
  carpetModel,
  chainGeometry,
  chainModel,
  fence,
  fenceEastWest,
  fenceNorthsouth,
  fencePost,
  leverGeometry,
  leverModel,
} from "../Models/Examples";
import {
  cube,
  halfDownCube,
  eighthCube,
  quaterCubeSouthNorth,
  quaterCubeUpDown,
  quaterCubeWestEast,
  halfSouthCube,
  halfWestCube,
} from "../Models/Defaults/CubeVoxelGeometry";
import {
  orientedCube,
  pillarCube,
  simpleCube,
  simpleHalfCube,
} from "../Models/Defaults/CubeVoxelModels";
import {
  diagonalFlatPanelEastWest,
  diagonalFlatPanelWestEast,
  thinPanelDown,
  thinPanelSouth,
  thinPanelWest,
} from "../Models/Defaults/PanelVoxelGeometry";
import { stair } from "../Models/Defaults/StairVoxelModel";
import {
  liquidGeometry,
  liquidModel,
} from "../Models/Defaults/LiquidVoxelModel";
import { VoxelModelManager } from "../Models/Rules/VoxelModelManager";
import { VoxelGeometryData, VoxelModelData } from "../Models/VoxelModel.types";
import { VoxelData } from "./Types/Voxel.types";

import { BuildRules } from "../Models/Rules/Functions/BuildRules";
import { BuildStateData } from "./Functions/BuildStateData";
import { BuildFinalInputs } from "../Models/Rules/Functions/BuildFinalInputs";
import {
  CompiledVoxelData,
  FinalCompiledVoxelModelData,
} from "./Types/VoxelModelCompiledData.types";
import { SchemaRegister } from "../Voxels/State/SchemaRegister";
import {
  simpleCrossedPannel,
  simpleThinPannel,
} from "../Models/Defaults/PanelVoxelModels";
import { VoxelTagStates } from "./Data/VoxelTagStates";
import { VoxelIndex } from "../Voxels/Indexes/VoxelIndex";
import { CacheManager } from "../Cache/CacheManager";
import { VoxelLightData } from "./Cursor/VoxelLightData";
import { VoxelMaterialData } from "./Types/VoxelMaterial.types";
import { VoxelSubstanceData } from "./Types/VoxelSubstances.types";
import { VoxelTagIds } from "./Data/VoxelTag.types";
import { BuildTagAndPaletteData } from "./Functions/BuildTagAndPaletteData";
import { VoxelPalettesRegister } from "./Data/VoxelPalettesRegister";

export type InitVoxelDataProps = {
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
  voxels: VoxelData[];
  materials?: VoxelMaterialData[];
  substances?: VoxelSubstanceData[];
};

function GetModelData(data: InitVoxelDataProps): FinalCompiledVoxelModelData {
  if (CacheManager.cacheLoadEnabled && CacheManager.cachedData) {
    const syncData = CacheManager.cachedData.models;

    for (let i = 0; i < syncData.models.length; i++) {
      const model = syncData.models[i];
      SchemaRegister.registerModel(model.id, model.schema);
    }

    for (let i = 0; i < syncData.voxels.length; i++) {
      const voxel = syncData.voxels[i];
      SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
    }
    VoxelTagStates.load(syncData.tagState);

    return syncData;
  }

  VoxelModelManager.registerGeometry(
    cube,
    halfDownCube,
    halfSouthCube,
    halfWestCube,
    quaterCubeSouthNorth,
    quaterCubeUpDown,
    quaterCubeWestEast,
    eighthCube,
    thinPanelDown,
    thinPanelSouth,
    thinPanelWest,
    diagonalFlatPanelEastWest,
    diagonalFlatPanelWestEast,

    fencePost,
    fenceEastWest,
    fenceNorthsouth,

    chainGeometry,
    carpetGeometry,

    candlesGeometry1,
    candlesGeometry2,
    candlesGeometry3,
    candlesGeometry4,

    liquidGeometry,

    ...leverGeometry,

    ...(data.geometry || [])
  );

  VoxelModelManager.registerModels(
    simpleCube,
    orientedCube,
    simpleHalfCube,
    pillarCube,
    simpleThinPannel,

    stair,
    simpleCrossedPannel,

    chainModel,
    carpetModel,
    candlesModel,
    leverModel,

    fence,

    liquidModel,

    ...(data.models || [])
  );

  const syncData: FinalCompiledVoxelModelData = {
    geometryPalette: VoxelModelManager.geometryPalette._palette,
    geometry: [],
    models: [],
    voxels: [],
    tagState: [],
  };

  for (const voxel of data.voxels) {
    const voxelData = voxel.properties["dve_model_data"];
    if (!voxelData) continue;
    VoxelModelManager.registerVoxel(voxel.id, voxelData);
    const model = VoxelModelManager.models.get(voxelData.id)!;
    if (!model)
      throw new Error(`Voxel model with id ${voxelData.id} does not exist.`);
    model!.voxels.set(voxel.id, voxelData);
  }

  for (const [mainKey, mainGeo] of VoxelModelManager.geometry) {
    if (mainGeo.data.ogData.doNotBuildRules) {
      syncData.geometry.push({
        id: mainKey,
        nodes: mainGeo.data.nodes,
        ruleless: true,
      });
      continue;
    }
    const output = BuildRules(mainGeo, VoxelModelManager.geometryPalette);
    syncData.geometry.push({
      id: mainKey,
      nodes: mainGeo.data.nodes,
      ...output,
    });
  }

  for (const [mainKey, model] of VoxelModelManager.models) {
    const stateData = BuildStateData(model, VoxelModelManager.geometryPalette);
    model.stateData = stateData;
    SchemaRegister.registerModel(mainKey, stateData.schema);
    syncData.models.push({
      id: mainKey,
      effects: stateData.effects,
      schema: stateData.schema,
      geoLinkMap: stateData.geometryLinkStateMap,
      shapeStateMap: stateData.shapeStatePalette,
      shapeStateGeometryMap: stateData.shapeStateGeometryPalette,
      shapeStateTree: stateData.shapeStateTree,
      condiotnalStateTree: stateData.condiotnalNodeStateTree,
      condiotnalStatements: stateData.condiotnalStatements,
      condiotnalStateMap: stateData.condiotnalShapeStatePalette,
      condiotnalShapeStateMap: stateData.condiotanlStatePalette,
      condiotnalShapeStateGeometryMap: stateData.condiotanlGeometryStatePalette,
      shapeStateRelativeGeometryMap: stateData.shapeStateRelativeGeometryMap,
      relativeGeometryByteIndexMap: stateData.relativeGeometryByteIndexMap,
      condiotnalShapeStateRelativeGeometryMap:
        stateData.condiotnalShapeStateRelativeGeometryMap,
    });
  }

  /*   for (const [mainKey, geometry] of VoxelModelManager.geometry) {
    BuildGeomtryInputs(geometry);
  } */

  for (const [mainKey, model] of VoxelModelManager.models) {
    const {
      shapeStateVoxelInputs,
      conditionalShapeStateVoxelInputs,
      transparentVoxelFaceIndexes,
    } = BuildFinalInputs(model);

    for (const v in shapeStateVoxelInputs) {
      const stateData = model.voxelModData.get(v)!;
      SchemaRegister.registerVoxel(v, mainKey, stateData.modSchema);

      syncData.voxels.push({
        id: v,
        materialId:
          VoxelIndex.instance.dataMap.get(v)?.properties[
            "dve_rendered_material"
          ] || "dve_solid",
        modelId: mainKey,
        transparentFaceIndex: transparentVoxelFaceIndexes[v].data,
        modSchema: stateData.modSchema,
        modStateTree: stateData.modStateTree,
        baseGeometryInputMap: shapeStateVoxelInputs[v],
        condiotnalGeometryInputMap: conditionalShapeStateVoxelInputs[v],
      });
    }
  }
  syncData.tagState = VoxelTagStates.toJSON();

  if (CacheManager.cacheStoreEnabled) {
    CacheManager.cachedModelData = syncData;
  }

  return syncData;
}

export function InitVoxelData(data: InitVoxelDataProps): CompiledVoxelData {
  const lightData = new VoxelLightData();
  const voxelIndex = new VoxelIndex(data.voxels);
  console.warn(voxelIndex, voxelIndex.dataMap);

  const materials: VoxelMaterialData[] = [
    { id: "dve_solid", properties: {} },
    { id: "dve_flora", properties: {} },
    {
      id: "dve_transparent",
      properties: {
        dve_is_transparent: true,
      },
    },
    { id: "dve_glow", properties: {} },
    {
      id: "dve_liquid",
      properties: {
        dve_is_transparent: true,
      },
    },
    ...(data.materials || []),
  ];

  const substances: VoxelSubstanceData[] = [
    {
      id: "dve_air",
      properties: {
        dve_parent_substance: "dve_air",
        dve_is_solid: false,
        dve_is_liquid: false,
        dve_is_transparent: true,
        dve_flow_rate: 0,
      },
    },
    {
      id: "dve_solid",
      properties: {
        dve_parent_substance: "dve_solid",
        dve_is_solid: true,
        dve_is_liquid: false,
        dve_is_transparent: false,
        dve_flow_rate: 0,
      },
    },
    {
      id: "dve_glow",
      properties: {
        dve_parent_substance: "dve_solid",
        dve_is_solid: true,
        dve_is_liquid: false,
        dve_is_transparent: false,
        dve_flow_rate: 0,
      },
    },
    {
      id: "dve_translucent",
      properties: {
        dve_parent_substance: "dve_solid",
        dve_is_solid: true,
        dve_is_liquid: false,
        dve_is_transparent: true,
        dve_flow_rate: 0,
      },
    },
    {
      id: "dve_transparent",
      properties: {
        dve_parent_substance: "dve_solid",
        dve_is_solid: true,
        dve_is_liquid: false,
        dve_is_transparent: true,
        dve_flow_rate: 0,
      },
    },
    {
      id: "dve_flora",
      properties: {
        dve_parent_substance: "dve_solid",
        dve_is_solid: true,
        dve_is_liquid: false,
        dve_is_transparent: true,
        dve_flow_rate: 0,
        dve_is_wind_affected: true,
      },
    },
    {
      id: "dve_liquid",
      properties: {
        dve_parent_substance: "dve_liquid",
        dve_is_solid: false,
        dve_is_liquid: true,
        dve_is_transparent: true,
        dve_flow_rate: 1,
      },
    },
    {
      id: "dve_magma",
      properties: {
        dve_parent_substance: "dve_liquid",
        dve_is_solid: false,
        dve_is_liquid: true,
        dve_is_transparent: false,
        dve_flow_rate: 3,
      },
    },
    ...(data.substances || []),
  ];

  const voxels: VoxelData[] = [
    {
      id: "dve_air",
      properties: {
        dve_substance: "dve_air",
      },
    },
    ...data.voxels,
  ];

  const voxelData = BuildTagAndPaletteData({
    voxels,
    voxelsOverrides: {
      [VoxelTagIds.lightValue]: (value) => {
        const v = <number[]>value;
        let sl = 0;
        sl = lightData.setR(v[0], sl);
        sl = lightData.setG(v[1], sl);
        sl = lightData.setB(v[2], sl);
        return sl;
      },
    },
    substances,
    materials,
  });


  let models = GetModelData(data);

  return {
    models,
    ...voxelData,
  };
}
