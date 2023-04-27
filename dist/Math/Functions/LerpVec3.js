const lerpedVec3 = [0, 0, 0];
export function LerpVec3Array(start, end, alpha) {
    lerpedVec3[0] = start[0] + alpha * (end[0] - start[0]);
    lerpedVec3[1] = start[1] + alpha * (end[1] - start[1]);
    lerpedVec3[2] = start[2] + alpha * (end[2] - start[2]);
    return lerpedVec3;
}
