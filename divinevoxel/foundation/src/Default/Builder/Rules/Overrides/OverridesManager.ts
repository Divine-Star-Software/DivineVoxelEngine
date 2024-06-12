import { FaceDataOverride, OverrideTypes } from "../../Types/Override.types";
import { OverrideBase } from "./OverrideBase";

export class OverrideManager {
  static ANY = -1;
  static AO = new OverrideBase();
  static AOFlipFace = new OverrideBase();
  static CullFace = new OverrideBase();
  static FlipFace = new OverrideBase();
  static DarkenFaceUnderneath = new OverrideBase();
}
