import type { SetSectionMeshTask } from "../Types/Mesher.types";
//tools
import { MeshSectionBase } from "./Base/MeshSectionBase";
import { SectionSnapShot } from "../../World/SnapShot/SectionSnapShot";
import { SectionSnapshotCursor } from "../../World/SnapShot/SectionSnapShotCursor";

let snapShotCursor: SectionSnapshotCursor;
export function MeshSectionSnapShot(
  snapShot: SectionSnapShot,
  transfers: any[] = []
): SetSectionMeshTask | null {
  if (!snapShotCursor) snapShotCursor = new SectionSnapshotCursor();
  const location = snapShot.location;
  snapShotCursor.setSectionSnapShot(snapShot);
  const sectionCursor = snapShotCursor.getCenteralCursor();
  if (!sectionCursor) return null;
  return MeshSectionBase(snapShotCursor, sectionCursor, location, transfers);
}
