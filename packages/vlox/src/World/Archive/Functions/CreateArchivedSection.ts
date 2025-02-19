import { ArchivedSectionData } from "../Archive.types";
import {
  BinaryBuffer,
  BinaryBufferTypes,
} from "../../../Util/Binary/BinaryBuffer";
import { getLightBuffer, lightSegments } from "./Shared";
import { ProcessedSection, SectorPalette } from "../Classes/ArchiveClasses";

export function CreateArchivedSection(
  archiveSection: ProcessedSection,
  sectorPalettes: SectorPalette
): ArchivedSectionData {
  const palettes: ArchivedSectionData["palettes"] = {};
  if (archiveSection.voxels.remapped)
    palettes.id = Uint16Array.from(archiveSection.palettes.voxels._palette);

  if (archiveSection.level.remapped)
    palettes.level = Uint8Array.from(archiveSection.palettes.level._palette);

  if (archiveSection.light.sun.remapped) {
    palettes.light ??= {};
    palettes.light.sun = Uint8Array.from(
      archiveSection.palettes.light.sun._palette
    );
  }
  if (archiveSection.light.red.remapped) {
    palettes.light ??= {};
    palettes.light.red = Uint8Array.from(
      archiveSection.palettes.light.red._palette
    );
  }
  if (archiveSection.light.green.remapped) {
    palettes.light ??= {};
    palettes.light.green = Uint8Array.from(
      archiveSection.palettes.light.green._palette
    );
  }
  if (archiveSection.light.blue.remapped) {
    palettes.light ??= {};
    palettes.light.blue = Uint8Array.from(
      archiveSection.palettes.light.blue._palette
    );
  }

  if (archiveSection.secondaryVoxels.remapped) {
    palettes.secondaryVoxels = Uint16Array.from(
      archiveSection.palettes.secondaryVoxels._palette
    );
  }

  const buffers: ArchivedSectionData["buffers"] = <any>{};

  //id
  if (archiveSection.voxels.allTheSame) {
    if (archiveSection.voxels.buffer[0] !== 0) {
      buffers.id = archiveSection.voxels.buffer[0];
    }
  } else if (archiveSection.voxels.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.voxels.remapped
        ? archiveSection.palettes.voxels.size
        : sectorPalettes.voxels.size
    )!;
    buffers.id = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(
        archiveSection.voxels.buffer,
        BinaryBufferTypes.ShortArray,
        type
      ).buffer,
      type,
    });
  } else {
    buffers.id = BinaryBuffer.Create({
      buffer: archiveSection.voxels.buffer.buffer,
      type: BinaryBufferTypes.ShortArray,
    });
  }

  //level
  if (archiveSection.level.allTheSame) {
    if (archiveSection.level.buffer[0] !== 0) {
      buffers.level = archiveSection.level.buffer[0];
    }
  } else if (archiveSection.level.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.level.remapped
        ? archiveSection.palettes.level.size
        : sectorPalettes.level.size
    )!;
    buffers.level = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(
        archiveSection.level.buffer,
        BinaryBufferTypes.ByteArray,
        type
      ).buffer,
      type,
    });
  } else {
    buffers.level = BinaryBuffer.Create({
      buffer: archiveSection.original.level.slice().buffer,
      type: BinaryBufferTypes.ByteArray,
    });
  }

  for (const semgnet of lightSegments) {
    if (archiveSection.light[semgnet].allTheSame) {
      if (archiveSection.light[semgnet].value !== 0) {
        buffers.light ??= {};
        buffers.light[semgnet] = archiveSection.light[semgnet].value;
      }
    } else if (archiveSection.light[semgnet].isPaletted) {
      const type = BinaryBuffer.DetermineSubByteArray(
        archiveSection.light[semgnet].remapped
          ? archiveSection.palettes.light[semgnet].size
          : sectorPalettes.light[semgnet].size
      )!;
      buffers.light ??= {};
      buffers.light[semgnet] = BinaryBuffer.Create({
        buffer: BinaryBuffer.Convert(
          archiveSection.light[semgnet].buffer,
          BinaryBufferTypes.ByteArray,
          type
        ).buffer,
        type,
      });
    } else {
      buffers.light ??= {};
      buffers.light[semgnet] = BinaryBuffer.Create({
        buffer: getLightBuffer(semgnet, archiveSection.original.light).buffer,
        type: BinaryBufferTypes.NibbleArray,
      });
    }
  }

  if (archiveSection.secondaryVoxels.allTheSame) {
    if (archiveSection.secondaryVoxels.buffer[0] !== 0) {
      buffers.secondary = archiveSection.secondaryVoxels.buffer[0];
    }
  } else if (archiveSection.secondaryVoxels.isPaletted) {
    const type = BinaryBuffer.DetermineSubByteArray(
      archiveSection.secondaryVoxels.remapped
        ? archiveSection.palettes.secondaryVoxels.size
        : sectorPalettes.voxels.size
    )!;
    buffers.secondary = BinaryBuffer.Create({
      buffer: BinaryBuffer.Convert(
        archiveSection.secondaryVoxels.buffer,
        BinaryBufferTypes.ShortArray,
        type
      ).buffer,
      type,
    });
  } else {
    buffers.secondary = BinaryBuffer.Create({
      buffer: archiveSection.secondaryVoxels.buffer.buffer,
      type: BinaryBufferTypes.ShortArray,
    });
  }

  if (archiveSection.isBuriedAllTheSame) {
    if (archiveSection.buriedValue !== 0) {
      buffers.buried = archiveSection.buriedValue;
    }
  } else {
    buffers.buried = archiveSection.original.buried.slice();
  }

  if (archiveSection.isVoxelMapAllTheSame) {
    if (archiveSection.voxelMapValue !== 0) {
      buffers.voxelMap = archiveSection.voxelMapValue;
    }
  } else {
    buffers.voxelMap = archiveSection.original.voxelMap.slice();
  }

  if (archiveSection.isDirtyMapAllTheSame) {
    if (archiveSection.dirtyMapValue !== 0) {
      buffers.dirtyMap = archiveSection.dirtyMapValue;
    }
  } else {
    buffers.dirtyMap = archiveSection.original.dirtyMap.slice();
  }

  const flags = archiveSection.original.storeFlags();
  return {
    ...(Object.keys(flags).length ? { flags } : {}),
    ...(Object.keys(palettes).length ? { palettes } : {}),
    buffers,
  };
}
