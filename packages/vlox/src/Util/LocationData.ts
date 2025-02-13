import { BinaryTaskType } from "@amodx/threads";
import { LocationData } from "Math";
const tempLocation: LocationData = [0, 0, 0, 0];
export function getLocationData(
  view: DataView,
  location: LocationData = tempLocation
): LocationData {
  location[0] = view.getUint32(BinaryTaskType.HeaderSize);
  location[1] = view.getInt32(BinaryTaskType.HeaderSize + 4);
  location[2] = view.getInt32(BinaryTaskType.HeaderSize + 8);
  location[3] = view.getInt32(BinaryTaskType.HeaderSize + 12);
  return location;
}
export function setLocationData(view: DataView, location: LocationData) {
  view.setUint32(BinaryTaskType.HeaderSize, location[0]);
  view.setInt32(BinaryTaskType.HeaderSize + 4, location[1]);
  view.setInt32(BinaryTaskType.HeaderSize + 8, location[2]);
  view.setInt32(BinaryTaskType.HeaderSize + 12, location[3]);
  return view;
}
