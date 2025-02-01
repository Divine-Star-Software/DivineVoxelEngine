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
  if (archived.palettes.light) transfers.push(archived.palettes.light.buffer);
  if (archived.palettes.state) transfers.push(archived.palettes.state.buffer);
  if (archived.palettes.secondaryState)
    transfers.push(archived.palettes.secondaryState.buffer);
  for (const section of archived.sections) {
    if (typeof section.buffers.id != "number")
      transfers.push(section.buffers.id.buffer);
    if (typeof section.buffers.light != "number")
      transfers.push(section.buffers.light.buffer);
    if (typeof section.buffers.state != "number")
      transfers.push(section.buffers.state.buffer);
    if (typeof section.buffers.secondary != "number")
      transfers.push(section.buffers.secondary.buffer);
    if (typeof section.buffers.mod != "number")
      transfers.push(section.buffers.mod.buffer);
    if (section.palettes.id) transfers.push(section.palettes.id.buffer);
    if (section.palettes.light) transfers.push(section.palettes.light.buffer);
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
      const compressed = await compressBinaryObject(archived);
      return [compressed, [compressed]];
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
