import { Thread, Threads } from "@amodx/threads";
import { WorldRegister } from "../World/WorldRegister";
import { MeshSection } from "./Functions/MeshSection";
import { TasksIds } from "../Tasks/TasksIds";
import { LocationData } from "../Math";
import { SetSectionMeshTask } from "./Types/Mesher.types";

export default function (rendererThread: Thread) {
  Threads.registerTask<LocationData>(TasksIds.BuildSection, (location) => {
    const transfers: any[] = [];
    const section = MeshSection(location, transfers);
    if (!section) return;
    rendererThread.runTask<SetSectionMeshTask>(
      "set-section",
      section,
      transfers
    );
  });

  Threads.registerTask<LocationData>(
    TasksIds.BuildSector,
    (location, origin) => {
      const sector = WorldRegister.sectors.getAt(location);
      if (!sector) {
        console.warn("Tried building a sector that does not exists.", location);
        return;
      }

      for (let i = 0; i < sector.sections.length; i++) {
        const section = sector.sections[i];
        let [minY, maxY] = section.getMinMax();

        if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
        const t = performance.now();
        const transfers: any[] = [];

        const sectionMesh = MeshSection(
          [location[0], ...section.getPosition()],
          transfers
        );
        if (!sectionMesh) continue;
        rendererThread.runTask<SetSectionMeshTask>(
          "set-section",
          sectionMesh,
          transfers
        );
        const buildTime = performance.now() - t;


      }
    }
  );
}
