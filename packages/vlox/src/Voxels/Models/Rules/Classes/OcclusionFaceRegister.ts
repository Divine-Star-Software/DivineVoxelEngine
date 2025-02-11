import { Vec3Array } from "@amodx/math";
import { Quad } from "../../../../Mesher/Geomtry/Primitives/Quad";
import { StringPalette } from "../../../../Util/StringPalette";

export class OcclusionFaceRegister {
  static faces = new StringPalette();

  static faceIndex: (
    | [
        type: 0,
        positions: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
        normals: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
      ]
    | [
        type: 1,
        positions: [Vec3Array, Vec3Array, Vec3Array],
        normals: [Vec3Array, Vec3Array, Vec3Array],
      ]
  )[] = [];

  static getQuadId([p1, p2, p3, p4]: [
    Vec3Array,
    Vec3Array,
    Vec3Array,
    Vec3Array,
  ]) {
    const [n1, n2, n3, n4] = Quad.GetQuadNormalLeftHanded(p1, p2, p3, p4);
    const quadId = `p1=${p1.join(",")},n1=${n1.join(",")},p2=${p2.join(",")},n2=${n2.join(",")},p3=${p3.join(",")},n4=${n3.join(",")},p4=${p4.join(",")},n4=${n4.join(",")}`;

    let id;
    if (!this.faces.isRegistered(quadId)) {
      id = this.faces.register(quadId);
      this.faceIndex.push([0, [p1, p2, p3, p4], [n1, n2, n3, n4]]);
    } else {
      id = this.faces.getNumberId(quadId);
    }

    return id;
  }
}
