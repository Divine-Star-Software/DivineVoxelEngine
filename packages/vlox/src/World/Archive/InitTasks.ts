import { Thread, Threads } from "@amodx/threads";
import { ArchivedSectorData } from "./Archive.types";
import ArchiveSector from "./Functions/ArchiveSector";
import { WorldRegister } from "../WorldRegister";
import ImportSector from "./Functions/ImportSector";
import { LocationData } from "../../Math";
import {
  compressBinaryObject,
  expandBinaryObject,
} from "../../Util/BinaryObject";
import { BinaryBufferData } from "Util/Binary/BinaryBuffer";

function runArchiveSector(
  location: LocationData
): [ArchivedSectorData, transfers: any[]] {
  const sector = WorldRegister.sectors.get(
    location[0],
    location[1],
    location[2],
    location[3]
  );
  if (!sector)
    throw new Error(`Sector at location ${location.toString()} does not exist`);

  const archived = ArchiveSector({
    location: location,
  });
  const transfers: any[] = [];
  // if (archived.palettes.light) transfers.push(archived.palettes.light.buffer);
  if (archived.palettes.state) transfers.push(archived.palettes.state.buffer);
  if (archived.palettes.secondaryState)
    transfers.push(archived.palettes.secondaryState.buffer);
  for (const section of archived.sections) {
    if (typeof section == "string") continue;
    if (ArrayBuffer.isView((section.buffers.id as BinaryBufferData)?.buffer))
      transfers.push((section.buffers.id as any).buffer);
    if (ArrayBuffer.isView((section.buffers.state as BinaryBufferData)?.buffer))
      transfers.push((section.buffers.state as any).buffer);

    if (ArrayBuffer.isView((section.buffers.mod as BinaryBufferData)?.buffer))
      transfers.push((section.buffers.mod as any).buffer);

    if (ArrayBuffer.isView((section.buffers.state as BinaryBufferData)?.buffer))
      transfers.push((section.buffers.state as any).buffer);

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
    //   if (section.palettes.light) transfers.push(section.palettes.light.buffer);
    if (section.palettes.state) transfers.push(section.palettes.state.buffer);
    if (section.palettes.mod) transfers.push(section.palettes.mod.buffer);
    if (section.palettes.secondaryState)
      transfers.push(section.palettes.secondaryState.buffer);
    if (section.palettes.secondaryId)
      transfers.push(section.palettes.secondaryId.buffer);
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
      await props.worldThread.runTaskAsync("load-sector", [
        archived.location,
        importedSector,
      ]);
    }
  );
  Threads.registerTask<[LocationData, ArrayBuffer]>(
    "import-sector-binary",
    async ([location, archived]) => {
      const archivedSector = await expandBinaryObject(archived, true);
      const importedSector = ImportSector(archivedSector, {});
      await props.worldThread.runTaskAsync("load-sector", [
        location,
        importedSector,
      ]);
    }
  );
}
