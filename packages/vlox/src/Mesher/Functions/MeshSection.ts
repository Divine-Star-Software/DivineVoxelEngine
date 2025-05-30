import { LocationData } from "../../Math";
import type { SetSectionMeshTask } from "../Types/Mesher.types";
//tools
import { WorldCursor } from "../../World/Cursor/WorldCursor.js";
import { SectionCursor } from "../../World/Cursor/SectionCursor.js";
import { WorldRegister } from "../../World/WorldRegister.js";
import { MeshSectionBase } from "./Base/MeshSectionBase";

const sectionCursor = new SectionCursor();
const worldCursor = new WorldCursor();
export function MeshSection(
  location: LocationData,
  transfers: any[] = []
): SetSectionMeshTask | null {
  const sector = WorldRegister.sectors.getAt(location);
  if (!sector) return null;
  worldCursor.setFocalPoint(...location);
  sectionCursor.loadSection(...location);

  return MeshSectionBase(worldCursor, sectionCursor, location, transfers);
}
