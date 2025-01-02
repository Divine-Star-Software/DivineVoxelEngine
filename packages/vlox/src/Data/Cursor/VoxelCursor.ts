import { VoxelCursorInterface } from "./Interfaces/VoxelCursor.interface";

export class VoxelCursor extends VoxelCursorInterface {
  ids = new Uint16Array(1);
  light = new Uint16Array(1);
  state = new Uint16Array(1);
  secondary = new Uint16Array(1);
  mod = new Uint16Array(1);

  loadIn() {}


}
