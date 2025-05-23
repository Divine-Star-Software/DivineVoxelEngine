import { BinaryBuffer } from "../../../Util/Binary/BinaryBuffer";
import {
  ArchivedVoxelTemplateBuffersExportdJSONData,
  ArchivedVoxelTemplateData,
  ArchivedVoxelTemplateExportedJSONData,
  ArchivedVoxelTemplatePaletteDataExportedJSONData,
} from "../ArchivedVoxelTemplate.types";

export default async function ExportArchiedTemplateJSON(
  templateData: ArchivedVoxelTemplateData
): Promise<ArchivedVoxelTemplateExportedJSONData> {
  const buffers: ArchivedVoxelTemplateBuffersExportdJSONData = {
    ids: templateData.buffers.ids
      ? await BinaryBuffer.ToJSON(templateData.buffers.ids, true)
      : undefined,
    secondary: templateData.buffers.secondary
      ? await BinaryBuffer.ToJSON(templateData.buffers.secondary, true)
      : undefined,
    level: templateData.buffers.level
      ? await BinaryBuffer.ToJSON(templateData.buffers.level, true)
      : undefined,
  };

  const palettes: ArchivedVoxelTemplatePaletteDataExportedJSONData = {
    id: templateData.palettes.id,
    modSchemaPaette: templateData.palettes.modSchemaPaette,
    stateSchemaPalette: templateData.palettes.stateSchemaPalette,
    secondary: await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        type: 16,
        buffer: templateData.palettes.secondary.buffer,
      })
    ),
    level: await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        type: 8,
        buffer: templateData.palettes.level.buffer,
      })
    ),
    voxelPalette: await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        type: 16,
        buffer: templateData.palettes.voxelPalette.buffer,
      })
    ),
  };

  return {
    vloxVersion: templateData.vloxVersion,
    version: templateData.version,
    bounds: templateData.bounds,
    type: templateData.type,
    buffers,
    palettes,
  };
}
