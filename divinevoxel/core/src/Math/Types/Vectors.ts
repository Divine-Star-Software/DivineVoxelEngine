import { Vec3Array } from "./Math.types";

export class Vector3Like {
  static Create(x = 0, y = 0, z = 0): Vector3Like {
    return new Vector3Like(x, y, z);
  }

  static Add(v1: Vector3Like, v2: Vector3Like): Vector3Like {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
  }

  static AddScalar(v: Vector3Like, scalar: number): Vector3Like {
    return { x: v.x + scalar, y: v.y + scalar, z: v.z + scalar };
  }

  static Subtract(v1: Vector3Like, v2: Vector3Like): Vector3Like {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
  }

  static SubtractScalar(v: Vector3Like, scalar: number): Vector3Like {
    return { x: v.x - scalar, y: v.y - scalar, z: v.z - scalar };
  }

  static Multiply(v1: Vector3Like, v2: Vector3Like): Vector3Like {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z };
  }

  static MultiplyScalar(v: Vector3Like, scalar: number): Vector3Like {
    return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar };
  }

  static Divide(v1: Vector3Like, v2: Vector3Like): Vector3Like {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z };
  }

  static DivideScalar(v: Vector3Like, scalar: number): Vector3Like {
    return { x: v.x / scalar, y: v.y / scalar, z: v.z / scalar };
  }

  static Dot(v1: Vector3Like, v2: Vector3Like): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static Cross(v1: Vector3Like, v2: Vector3Like): Vector3Like {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  static Length(v: Vector3Like): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  static Normalize(v: Vector3Like): Vector3Like {
    const len = Vector3Like.Length(v);
    if (len === 0) return { x: 0, y: 0, z: 0 };
    return { x: v.x / len, y: v.y / len, z: v.z / len };
  }

  static Distance(v1: Vector3Like, v2: Vector3Like): number {
    return Vector3Like.Length(Vector3Like.Subtract(v1, v2));
  }

  static Lerp(v1: Vector3Like, v2: Vector3Like, t: number): Vector3Like {
    return {
      x: v1.x + t * (v2.x - v1.x),
      y: v1.y + t * (v2.y - v1.y),
      z: v1.z + t * (v2.z - v1.z),
    };
  }

  static Negate(v: Vector3Like): Vector3Like {
    return { x: -v.x, y: -v.y, z: -v.z };
  }

  static Equals(v1: Vector3Like, v2: Vector3Like): boolean {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
  }

  static Clone(v: Vector3Like): Vector3Like {
    return { x: v.x, y: v.y, z: v.z };
  }

  static ToArray(v: Vector3Like): Vec3Array {
    return [v.x, v.y, v.z];
  }

  private constructor(public x: number, public y: number, public z: number) {}
}

export type Vector2Like = { x: number; y: number };
