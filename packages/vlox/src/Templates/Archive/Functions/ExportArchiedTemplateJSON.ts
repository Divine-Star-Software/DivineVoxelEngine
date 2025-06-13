import {
  BinaryBuffer,
  BinaryBufferFormat,
} from "../../../Util/BinaryBuffer/index";
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
    voxels: templateData.palettes.voxels,
    stateSchemas: templateData.palettes.stateSchemas,
    voxelPalette: await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        format: BinaryBufferFormat.Uint16,
        buffer: templateData.palettes.voxelPalette.buffer,
      })
    ),
  };

  if (templateData.palettes.secondary) {
    palettes.secondary = await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        format: BinaryBufferFormat.Uint16,
        buffer: templateData.palettes.secondary.buffer,
      })
    );
  }

  if (templateData.palettes.level) {
    palettes.level = await BinaryBuffer.ToJSON(
      BinaryBuffer.Create({
        format: BinaryBufferFormat.Uint8,
        buffer: templateData.palettes.level.buffer,
      })
    );
  }
  return {
    engineVersion: templateData.engineVersion,
    formatVersion: templateData.formatVersion,
    dataKey: templateData.dataKey,
    position: templateData.position,
    bounds: templateData.bounds,
    type: templateData.type,
    buffers,
    palettes,
  };
}
