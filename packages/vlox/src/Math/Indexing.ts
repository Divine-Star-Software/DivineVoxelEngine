import { Vec3Array, Vector3Like } from "@amodx/math";


export type IndexOrderingTypes =  "XYZ" | "XZY" | "YXZ";

export function CubeHashVec3Array(
  positionX: number,
  positionY: number,
  positionZ: number,
  xPower2: number,
  yPower2: number,
  zPower2: number,
  positionRef: Vec3Array = [0, 0, 0]
) {
  positionRef[0] = (positionX >> xPower2) << xPower2;
  positionRef[1] = (positionY >> yPower2) << yPower2;
  positionRef[2] = (positionZ >> zPower2) << zPower2;
  return positionRef;
}
export function CubeHashVec3(
  positionX: number,
  positionY: number,
  positionZ: number,
  xPower2: number,
  yPower2: number,
  zPower2: number,
  positionRef = Vector3Like.Create()
) {
  positionRef.x = (positionX >> xPower2) << xPower2;
  positionRef.y = (positionY >> yPower2) << yPower2;
  positionRef.z = (positionZ >> zPower2) << zPower2;
  return positionRef;
}

/**
 * YXZ order
 */

export function GetYXZOrderArrayPositionVec3Array(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef: Vec3Array = [0, 0, 0]
) {
  positionRef[1] = Math.floor(index / (boundsX * boundsZ));
  positionRef[0] = Math.floor((index % (boundsX * boundsZ)) / boundsZ);
  positionRef[2] = index % boundsZ;
  return positionRef;
}

export function GetYXZOrderArrayPositionVec3(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef = Vector3Like.Create()
) {
  positionRef.y = Math.floor(index / (boundsX * boundsZ));
  positionRef.x = Math.floor((index % (boundsX * boundsZ)) / boundsZ);
  positionRef.z = index % boundsZ;
  return positionRef;
}

export function GetYXZOrderArrayIndex(
  positionX: number,
  positionY: number,
  positionZ: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number
) {
  return Math.floor(positionZ + boundsZ * (positionX + boundsX * positionY));
}

/**
 * XYZ order
 */

export function GetXYZOrderArrayPositionVec3Array(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef: Vec3Array = [0, 0, 0]
) {
  positionRef[2] = index / (boundsX * boundsY);
  positionRef[1] = (index % (boundsX * boundsY)) / boundsX;
  positionRef[0] = index % boundsX;
  return positionRef;
}
export function GetXYZOrderArrayPositionVec3(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef = Vector3Like.Create()
) {
  positionRef.z = index / (boundsX * boundsY);
  positionRef.y = (index % (boundsX * boundsY)) / boundsX;
  positionRef.x = index % boundsX;
  return positionRef;
}

export function GetXYZOrderArrayIndex(
  positionX: number,
  positionY: number,
  positionZ: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number
) {
  return positionX + positionY * boundsX + positionZ * boundsX * boundsY;
}

export function GetXZYOrderArrayPositionVec3Array(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef: Vec3Array = [0, 0, 0]
) {
  positionRef[1] = index / (boundsX * boundsY);
  positionRef[2] = (index % (boundsX * boundsY)) / boundsX;
  positionRef[0] = index % boundsX;
  return positionRef;
}

/**
 * XZY order
 */

export function GetXZYOrderArrayPositionVec3(
  index: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number,
  positionRef = Vector3Like.Create()
) {
  positionRef.y = index / (boundsX * boundsY);
  positionRef.z = (index % (boundsX * boundsY)) / boundsX;
  positionRef.x = index % boundsX;
  return positionRef;
}

export function GetXZYOrderArrayIndex(
  positionX: number,
  positionY: number,
  positionZ: number,
  boundsX: number,
  boundsY: number,
  boundsZ: number
) {
  return positionX + positionY * boundsX + positionZ * boundsX * boundsZ;
}
