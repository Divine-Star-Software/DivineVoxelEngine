import { BinaryBuffer } from "../../../Util/BinaryBuffer/BinaryBuffer";
import type {
  ArchivedVoxelTemplateData,
  ArchivedVoxelTemplateExportedJSONData,
} from "../ArchivedVoxelTemplate.types";

export default async function ImportArchivedTemplateJSON(
  jsonData: ArchivedVoxelTemplateExportedJSONData
): Promise<ArchivedVoxelTemplateData> {
  const buffers: ArchivedVoxelTemplateData["buffers"] = {
    ids: jsonData.buffers.ids
      ? await BinaryBuffer.FromJSON(jsonData.buffers.ids)
      : undefined,
    level: jsonData.buffers.level
      ? await BinaryBuffer.FromJSON(jsonData.buffers.level)
      : undefined,
    secondary: jsonData.buffers.secondary
      ? await BinaryBuffer.FromJSON(jsonData.buffers.secondary)
      : undefined,
  };
  const palettes: ArchivedVoxelTemplateData["palettes"] = {
    voxels: jsonData.palettes.voxels,
    stateSchemas: jsonData.palettes.stateSchemas,
    voxelPalette: await BinaryBuffer.FromJSON(jsonData.palettes.voxelPalette),
  };

  if (jsonData.palettes.secondary) {
    palettes.secondary = await BinaryBuffer.FromJSON(
      jsonData.palettes.secondary
    );
  }

  if (jsonData.palettes.level) {
    palettes.level = await BinaryBuffer.FromJSON(jsonData.palettes.level);
  }

  const data: ArchivedVoxelTemplateData = {
    engineVersion: jsonData.engineVersion,
    formatVersion: jsonData.formatVersion,
    dataKey: jsonData.dataKey,
    type: jsonData.type,
    position: jsonData.position,
    bounds: jsonData.bounds,
    buffers,
    palettes,
  };
  console.warn("IMPORT TEMPLATE", data, jsonData);
  return data;
}
