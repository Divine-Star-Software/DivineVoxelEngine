import type { LocationData } from "../../Math";
import type { Vec3Array } from "@amodx/math";

export class LocationBoundTool {
  private _location: LocationData = ["main", 0, 0, 0];
  get location(): LocationData {
    this._location[0] = this.dimension;
    this._location[1] = this.x;
    this._location[2] = this.y;
    this._location[3] = this.z;
    return this._location;
  }

  dimension = "main";
  x = 0;
  y = 0;
  z = 0;

  setDimension(dimensionId: string) {
    this.dimension = dimensionId;
    //  this.location[0] = dimensionId;
    return this;
  }

  getLocation(): LocationData {
    return [this.dimension, this.x, this.y, this.z];
  }

  getXYZAsArray(): Vec3Array {
    return [this.x, this.y, this.z];
  }
  getXYZ() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }
  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setLocation(location: LocationData) {
    this.dimension = location[0];
    this.x = location[1];
    this.y = location[2];
    this.z = location[3];
    return this;
  }
}
