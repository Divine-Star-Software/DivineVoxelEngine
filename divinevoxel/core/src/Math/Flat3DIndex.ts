import { Vec3Array } from "./Types/Math.types";

export class Flat3DIndex {
  position = {
    x: 0,
    y: 0,
    z: 0,
  };
  bounds = {
    x: 0,
    y: 0,
    z: 0,
  };

  getIndex([x, y, z]: Vec3Array) {
    return  z + x * this.bounds.z + y * this.bounds.z * this.bounds.x;
  }

  getXYZ(index: number): { x: number; y: number; z: number } {
    this.position.y = index % this.bounds.y >> 0;
    this.position.x = (index / this.bounds.y) % this.bounds.x >> 0;
    this.position.z = (index / (this.bounds.x * this.bounds.z)) >> 0;

    return this.position;
  }

  setBounds(x: number, y: number, z: number) {
    this.bounds.x = x;
    this.bounds.y = y;
    this.bounds.z = z;
  }
}
