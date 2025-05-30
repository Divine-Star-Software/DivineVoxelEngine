import { LocationData } from "../../Math";
import { SectionSnapShot } from "./SectionSnapShot";
import { BoundingBox } from "@amodx/math/Geomtry/Bounds/BoundingBox";
import { WorldSpaces } from "../WorldSpaces";
import { Vector3Like } from "@amodx/math";

export class SnapShots {
  static _readyCache: SectionSnapShot[] = [];
  static _pendingCache: SectionSnapShot[] = [];

  private static bounds = new BoundingBox();

  static getSnapShotBounds(
    x: number,
    y: number,
    z: number
  ): Readonly<BoundingBox> {
    this.bounds.setMinMax(
      WorldSpaces.section.transformPosition(
        Vector3Like.Subtract({ x, y, z }, WorldSpaces.section.bounds)
      ),
      WorldSpaces.section.transformPosition(
        Vector3Like.Add({ x, y, z }, WorldSpaces.section.bounds)
      )
    );
    return this.bounds;
  }

  static createSnapShot(location: LocationData) {
    let snapShot = this._readyCache.length
      ? this._readyCache.shift()!
      : new SectionSnapShot();
    snapShot.setLocation(location);
    snapShot.storeSnapShot();
    return snapShot;
  }

  static transferSnapShot(snapShot: SectionSnapShot) {
    this._pendingCache.push(snapShot);
  }
}
