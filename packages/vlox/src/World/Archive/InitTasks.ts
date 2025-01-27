import { Thread, Threads } from "@amodx/threads";
import { ArchivedColumnData } from "./Archive.types";
import ArchiveColumn from "./Functions/ArchiveColumn";
import { WorldRegister } from "../WorldRegister";
import ImportColumn from "./Functions/ImportColumn";
import { LocationData } from "../../Math";
import { compressBinaryObject, expandBinaryObject } from "../../Util/BinaryObject";

function runArchiveColumn(
  location: LocationData
): [ArchivedColumnData, transfers: any[]] {
  WorldRegister.setDimension(location[0]);

  const column = WorldRegister.column.get(
    location[1],
    location[2],
    location[3]
  );
  if (!column)
    throw new Error(`Column at location ${location.toString()} does not exist`);

  const archived = ArchiveColumn({
    location: location,
  });
  const transfers: any[] = [];
  if (archived.palettes.light) transfers.push(archived.palettes.light.buffer);
  if (archived.palettes.state) transfers.push(archived.palettes.state.buffer);
  if (archived.palettes.secondaryState)
    transfers.push(archived.palettes.secondaryState.buffer);
  for (const chunk of archived.chunks) {
    if (typeof chunk.buffers.id != "number")
      transfers.push(chunk.buffers.id.buffer);
    if (typeof chunk.buffers.light != "number")
      transfers.push(chunk.buffers.light.buffer);
    if (typeof chunk.buffers.state != "number")
      transfers.push(chunk.buffers.state.buffer);
    if (typeof chunk.buffers.secondary != "number")
      transfers.push(chunk.buffers.secondary.buffer);
    if (typeof chunk.buffers.mod != "number")
      transfers.push(chunk.buffers.mod.buffer);
    if (chunk.palettes.id) transfers.push(chunk.palettes.id.buffer);
    if (chunk.palettes.light) transfers.push(chunk.palettes.light.buffer);
    if (chunk.palettes.state) transfers.push(chunk.palettes.state.buffer);
    if (chunk.palettes.mod) transfers.push(chunk.palettes.mod.buffer);
    if (chunk.palettes.secondaryState)
      transfers.push(chunk.palettes.secondaryState.buffer);
    if (chunk.palettes.secondaryId)
      transfers.push(chunk.palettes.secondaryId.buffer);
  }

  return [archived, transfers] as const;
}

export default function InitTasks(props: { worldThread: Thread }) {
  Threads.registerTask<LocationData>("archive-column", async (location) => {
    return runArchiveColumn(location);
  });
  Threads.registerTask<LocationData>(
    "archive-column-binary",
    async (location) => {
      const [archived] = runArchiveColumn(location);
      const compressed = await compressBinaryObject(archived);
      return [compressed, [compressed]];
    }
  );
  Threads.registerTask<ArchivedColumnData>(
    "import-column",
    async (archived) => {
      const importedColumn = ImportColumn(archived, {});
      await props.worldThread.runTaskAsync("load-column", [
        archived.location,
        importedColumn,
      ]);
    }
  );
  Threads.registerTask<[LocationData, ArrayBuffer]>(
    "import-column-binary",
    async ([location, archived]) => {
      const archivedColumn = await expandBinaryObject(archived, true);
      const importedColumn = ImportColumn(archivedColumn, {});
      await props.worldThread.runTaskAsync("load-column", [
        location,
        importedColumn,
      ]);
    }
  );
}
