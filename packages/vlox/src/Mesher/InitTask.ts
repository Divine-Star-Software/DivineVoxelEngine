import { Thread, Threads } from "@amodx/threads";
import { WorldRegister } from "../World/WorldRegister";
import { WorldSpaces } from "../World/WorldSpaces";
import { MeshSection } from "./Functions/MeshSection";
import { TasksIds } from "../Tasks/TasksIds";
import { LocationData } from "../Math";
import { SetSectionMeshTask } from "../Renderer/Renderer.types";

export default function (rendererThread: Thread) {
  Threads.registerTask<LocationData>(TasksIds.BuildSection, (location) => {
    const section = MeshSection(location);
    if (!section) return;
    rendererThread.runTask<SetSectionMeshTask>(
      "set-section",
      section[0],
      section[1]
    );
  });

  Threads.registerTask<LocationData>(TasksIds.BuildSector, (location) => {
    WorldRegister.setDimension(location[0]);
    const sectorPosition = WorldSpaces.sector.getPosition(
      location[1],
      location[2],
      location[3]
    );
    const sector = WorldRegister.sectors.get(
      sectorPosition.x,
      sectorPosition.y,
      sectorPosition.z
    );
    if (!sector) {
      console.warn("Tried building a sector that does not exists.", [
        sectorPosition.x,
        sectorPosition.y,
        sectorPosition.z,
      ]);
      return;
    }
    if (sector.sections.length == 0) {
      console.warn(
        "Tried building a sector with no sections.",
        sector.position
      );
      return;
    }

    for (let i = 0; i < sector.sections.length; i++) {
      const section = sector.sections[i];
      if (!section) continue;
      const sectionMesh = MeshSection([
        location[0],
        sector.position[0],
        sector.position[1] + i * WorldSpaces.section.bounds.y,
        sector.position[2],
      ]);
      if (!sectionMesh) continue;
      rendererThread.runTask<SetSectionMeshTask>(
        "set-section",
        sectionMesh[0],
        sectionMesh[1]
      );
   
    }
  });
}
