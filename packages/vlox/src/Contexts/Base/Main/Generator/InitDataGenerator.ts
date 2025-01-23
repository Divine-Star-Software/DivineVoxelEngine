import { DataSyncData } from "../../Remote/Sync/DataSync.types";
import { VoxelDataGenerator } from "./Segments/VoxelDataGenerator";
import { SubstanceDataGenerator } from "./Segments/SubstanceDataGenerator";
import { DataGeneratorData } from "./DataGenerator.types";
import { VoxelData } from "../../../../Voxels/Voxel.types";
import { VoxelSubstanceData } from "../../../../Voxels/VoxelSubstances.types";
import { VoxelStructBuilder } from "../../../../Data/Structs/Builder/VoxelStructBuilder";
import { SubstanceStructBuilder } from "../../../../Data/Structs/Builder/SubstanceStructBuilder";
import { VoxelStruct } from "../../../../Data/Structs/VoxelStruct";
import { SubstanceStruct } from "../../../../Data/Structs/SubstanceStruct";
import { LightData } from "../../../../Voxels/LightData";
import { InitalizeChunkTags } from "../../../../Data/Structs/ChunkStruct.js";
import { InitalizeColumnTags } from "../../../../Data/Structs/ColumnStruct.js";
import { InitalizeRegionTags } from "../../../../Data/Structs/RegionStruct.js";
import { EngineSettings } from "../../../../Settings/EngineSettings";
import { VoxelStructIds } from "../../../../Voxels/Voxel.types";
import { WorldRegister } from "../../../../Data/World/WorldRegister";
import { MappedDataRegister } from "../../../../Data/Register/MappedDataRegister";
import { MaterialPalette } from "../../../../Data/Palettes/MaterialPalette";
import { VoxelMaterialData } from "Voxels";
import { MaterialDataGenerator } from "./Segments/MaterialDataGenerator";
import { Chunk, Column, Region } from "../../../../Data/World/Classes";
export default function InitDataGenerator(
  data: DataGeneratorData
): DataSyncData {
  const register = new WorldRegister();
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
  MaterialDataGenerator.generate(materials);

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
  SubstanceDataGenerator.generate(substances);

  const voxels: VoxelData[] = [
    {
      id: "dve_air",
      properties: {
        dve_substance: "dve_air",
      },
    },
    {
      id: "dve_barrier",
      properties: {
        dve_substance: "dve_air",
      },
    },
    ...data.voxels,
  ];
  VoxelDataGenerator.overrides.set(VoxelStructIds.lightValue, (tags, value) => {
    const v = <number[]>value;
    let sl = 0;
    sl = LightData.setR(v[0], sl);
    sl = LightData.setG(v[1], sl);
    sl = LightData.setB(v[2], sl);
    tags.setProperty(VoxelStructIds.lightValue, sl);
  });
  VoxelDataGenerator.overrides.set(
    VoxelStructIds.renderedMaterial,
    (tags, value) => {
      tags.setProperty(
        VoxelStructIds.renderedMaterial,
        MaterialDataGenerator.palette._map[value as string]
      );
    }
  );

  VoxelDataGenerator.overrides.set(VoxelStructIds.substance, (tags, value) => {
    tags.setProperty(
      VoxelStructIds.substance,
      SubstanceDataGenerator.palette._map[value as string]
    );
  });

  VoxelDataGenerator.generate(voxels);

  InitalizeChunkTags();
  InitalizeColumnTags();
  InitalizeRegionTags();

  const voxelMaps = VoxelStructBuilder.getMaps();
  const voxelStringMaps = MappedDataRegister.stringMaps.getSegment("voxel");
  for (const key in voxelMaps.stringMaps) {
    voxelStringMaps.add(key, voxelMaps.stringMaps[key]);
  }
  const voxelObjectMaps = MappedDataRegister.objectMaps.getSegment("voxel");
  for (const key in voxelMaps.objectMaps) {
    voxelObjectMaps.add(key, voxelMaps.objectMaps[key]);
  }
  const substanceMaps = SubstanceStructBuilder.getMaps();

  const substanceStringMaps =
    MappedDataRegister.stringMaps.getSegment("substance");
  for (const key in substanceMaps.stringMaps) {
    substanceStringMaps.add(key, substanceMaps.stringMaps[key]);
  }
  const substanceObjectMaps =
    MappedDataRegister.objectMaps.getSegment("substance");
  for (const key in substanceMaps.objectMaps) {
    substanceObjectMaps.add(key, substanceMaps.objectMaps[key]);
  }
  return {
    settings: EngineSettings.settings,
    threads: data.threads,
    modelData: data.voxelModels,
    materials: {
      palette: MaterialPalette.palette._palette,
    },
    worldData: {
      chunkStruct: Chunk.StateStruct.structData,
      columnStruct: Column.StateStruct.structData,
      regionStruct: Region.StateStruct.structData,
    },
    voxel: {
      palette: VoxelDataGenerator.palette._palette,
      nameToIdMap: VoxelDataGenerator.nameToIdMap,
      idToNameMap: VoxelDataGenerator.idToNameMap,
      ...voxelMaps,
      struct: VoxelStruct.initData,
      index: VoxelStruct.voxelIndex,
    },
    substance: {
      palette: SubstanceDataGenerator.palette._palette,
      ...substanceMaps,
      struct: SubstanceStruct.initData,
    },
  };
}
