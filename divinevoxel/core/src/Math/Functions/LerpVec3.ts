import { Vec3Array } from "Math/Types/Math.types";

const lerpedVec3: Vec3Array = [0, 0, 0];
export function LerpVec3Array(start: Vec3Array, end: Vec3Array, alpha: number) {
 lerpedVec3[0] = start[0] + alpha * (end[0] - start[0]);
 lerpedVec3[1] = start[1] + alpha * (end[1] - start[1]);
 lerpedVec3[2] = start[2] + alpha * (end[2] - start[2]);
 return lerpedVec3;
}
