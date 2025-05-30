import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
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
    id: jsonData.palettes.id,
    modSchemaPaette: jsonData.palettes.modSchemaPaette,
    stateSchemaPalette: jsonData.palettes.stateSchemaPalette,
    secondary: await BinaryBuffer.FromJSON(jsonData.palettes.secondary),
    level: await BinaryBuffer.FromJSON(jsonData.palettes.level),
    voxelPalette: await BinaryBuffer.FromJSON(jsonData.palettes.voxelPalette),
  };

  const data: ArchivedVoxelTemplateData = {
    version: jsonData.version,
    vloxVersion: jsonData.vloxVersion,
    type: jsonData.type,
    position: jsonData.position,
    bounds: jsonData.bounds,
    buffers,
    palettes,
  };
  console.warn("IMPORT TEMPLATE", data, jsonData);
  return data;
}
