import { Thread, Threads } from "@amodx/threads";
import { ArchivedSectorData } from "./Types/index";
import ArchiveSector from "./Functions/Sector/ArchiveSector";
import { WorldRegister } from "../WorldRegister";
import ImportSector from "./Functions/Sector/ImportSector";
import { LocationData } from "../../Math";
import {
  compressBinaryObject,
  expandBinaryObject,
} from "../../Util/BinaryObject";
import { BinaryBufferData } from "../../Util/BinaryBuffer/index";

function runArchiveSector(
  location: LocationData
): [ArchivedSectorData, transfers: any[]] {
  const sector = WorldRegister.sectors.get(...location);
  if (!sector) {
    console.warn(
      [...location],
      WorldRegister._dimensions.get(0)!.sectors,
      sector
    );

    throw new Error(`Sector at location ${location.toString()} does not exist`);
  }

  const archived = ArchiveSector({
    location,
  });
  const transfers: any[] = [];

  for (const section of archived.sections) {
    if (typeof section == "string") continue;
    if (ArrayBuffer.isView((section.buffers.id as BinaryBufferData)?.buffer))
      transfers.push((section.buffers.id as any).buffer);

    if (
      ArrayBuffer.isView(
        (section.buffers.light?.sun as BinaryBufferData)?.buffer
      )
    )
      transfers.push((section.buffers.light?.sun as any).buffer);

    if (
      ArrayBuffer.isView(
        (section.buffers.light?.red as BinaryBufferData)?.buffer
      )
    )
      transfers.push((section.buffers.light?.red as any).buffer);
    if (
      ArrayBuffer.isView(
        (section.buffers.light?.green as BinaryBufferData)?.buffer
      )
    )
      transfers.push((section.buffers.light?.green as any).buffer);
    if (
      ArrayBuffer.isView(
        (section.buffers.light?.blue as BinaryBufferData)?.buffer
      )
    )
      transfers.push((section.buffers.light?.blue as any).buffer);

    if (
      ArrayBuffer.isView(
        (section.buffers.secondary as BinaryBufferData)?.buffer
      )
    )
      transfers.push((section.buffers.secondary as any).buffer);

    if (!section.palettes) continue;
    if (section.palettes.id) transfers.push(section.palettes.id.buffer);
  }

  return [archived, transfers] as const;
}

export default function InitTasks(props: { worldThread: Thread }) {
  Threads.registerTask<LocationData>("archive-sector", async (location) => {
    return runArchiveSector(location);
  });
  Threads.registerTask<LocationData>(
    "archive-sector-binary",
    async (location) => {
      const [archived] = runArchiveSector(location);
      try {
        const compressed = await compressBinaryObject(archived);
        return [compressed, [compressed]];
      } catch (error) {
        console.log(archived);
        console.error(error);
      }
      return [null, []];
    }
  );
  Threads.registerTask<ArchivedSectorData>(
    "import-sector",
    async (archived) => {
      const importedSector = ImportSector(archived, {});
      props.worldThread.runTask(
        "load-sector",
        [
          [
            WorldRegister.dimensions._dimensionMap.get(archived.dimension) || 0,
            archived.position.x,
            archived.position.y,
            archived.position.z,
          ],
          importedSector.buffer,
        ],
        importedSector.buffer instanceof ArrayBuffer
          ? [importedSector.buffer]
          : []
      );
    }
  );
  Threads.registerTask<[LocationData, ArrayBuffer]>(
    "import-sector-binary",
    async ([location, archived]) => {
      const archivedSector = await expandBinaryObject(archived, true);
      const importedSector = ImportSector(archivedSector, {});
      props.worldThread.runTask(
        "load-sector",
        [location, importedSector.buffer],
        importedSector.buffer instanceof ArrayBuffer
          ? [importedSector.buffer]
          : []
      );
    }
  );
}
