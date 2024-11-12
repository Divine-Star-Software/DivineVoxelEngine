import { OverrideBase } from "./OverrideBase";

export class OverrideManager {
  static ANY = -1;
  static AO = new OverrideBase();
  static AOFlipFace = new OverrideBase();
  static FaceExposedShapeCheck = new OverrideBase();
  static FaceExposedVoxelCheck = new OverrideBase();
  
  static FlipFace = new OverrideBase();
  static DarkenFaceUnderneath = new OverrideBase();
}
