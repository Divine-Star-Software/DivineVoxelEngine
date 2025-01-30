import type { Vec3Array } from "@amodx/math";

export class GeometryNormals {
  static subtract(v1: Vec3Array, v2: Vec3Array): Vec3Array {
    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
  }

  static cross(v1: Vec3Array, v2: Vec3Array): Vec3Array {
    return [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0],
    ];
  }

  static scale(v: Vec3Array, scaleFactor: number): Vec3Array {
    return [v[0] * scaleFactor, v[1] * scaleFactor, v[2] * scaleFactor];
  }

  static add(v1: Vec3Array, v2: Vec3Array): Vec3Array {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
  }

  static normalize(v: Vec3Array): Vec3Array {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return length > 0
      ? [v[0] / length, v[1] / length, v[2] / length]
      : [0, 0, 0];
  }

  static getTriangleNormals(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array
  ): Vec3Array {
    const a = this.subtract(p2, p1);
    const b = this.subtract(p3, p1);
    const substract = this.cross(a, b);
    const normal = this.scale(substract, -1);
    return this.normalize(normal);
  }
  static getQuadNormal(
    p1: Vec3Array,
    p2: Vec3Array,
    p3: Vec3Array,
    p4: Vec3Array
  ): [n1: Vec3Array, n2: Vec3Array, n3: Vec3Array, n4: Vec3Array] {
    const vectorA1: Vec3Array = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
    const vectorA2: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    const normalA = this.normalize(this.cross(vectorA1, vectorA2));
    const vectorB1: Vec3Array = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];
    const vectorB2: Vec3Array = [p4[0] - p1[0], p4[1] - p1[1], p4[2] - p1[2]];
    const normalB = this.normalize(this.cross(vectorB1, vectorB2));
    const n1 = this.normalize([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n2 = normalA;
    const n3 = this.normalize([
      (normalA[0] + normalB[0]) / 2,
      (normalA[1] + normalB[1]) / 2,
      (normalA[2] + normalB[2]) / 2,
    ]);
    const n4 = normalB;

    return [n1, n2, n3, n4];
  }
}
