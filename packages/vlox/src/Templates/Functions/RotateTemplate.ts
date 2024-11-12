import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { VoxelTemplate } from "../VoxelTemplate";
export type TemplateRotationAxes = "x" | "y" | "z";
export type TemplateRotationAngles = 90 | 180 | 270 | -90 | -180 | -270;

type RotationFunction = (
  angle: TemplateRotationAngles,
  x: number,
  y: number,
  z: number,
  sizeX: number,
  sizeY: number,
  sizeZ: number
) => Vec3Array;
const rotateX: RotationFunction = (angle, x, y, z, sizeX, sizeY, sizeZ) => {
  switch (angle) {
    case 90:
    case -270:
      return [x, z, sizeY - 1 - y];
    case 180:
    case -180:
      return [x, sizeY - 1 - y, sizeZ - 1 - z];
    case 270:
    case -90:
      return [x, sizeZ - 1 - z, y];
  }
};

const rotateY: RotationFunction = (angle, x, y, z, sizeX, sizeY, sizeZ) => {
  switch (angle) {
    case 90:
    case -270:
      return [sizeZ - 1 - z, y, x];
    case 180:
    case -180:
      return [sizeX - 1 - x, y, sizeZ - 1 - z];
    case 270:
    case -90:
      return [z, y, sizeX - 1 - x];
  }
};

const rotateZ: RotationFunction = (angle, x, y, z, sizeX, sizeY, sizeZ) => {
  switch (angle) {
    case 90:
    case -270:
      return [sizeY - 1 - y, x, z];
    case 180:
    case -180:
      return [sizeX - 1 - x, sizeY - 1 - y, z];
    case 270:
    case -90:
      return [y, sizeX - 1 - x, z];
  }
};

const rotateArray = (
  [sizeX, sizeY, sizeZ]: Vec3Array,
  array: ArrayLike<number>,
  angle: TemplateRotationAngles,
  axes: TemplateRotationAxes,
  index: Flat3DIndex,
  newIndex: Flat3DIndex
) => {
  const newArray = new Array(array.length);

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      for (let z = 0; z < sizeZ; z++) {
        const oldIndex = index.getIndexXYZ(x, y, z);
        let newCoords: Vec3Array;

        switch (axes) {
          case "x":
            newCoords = rotateX(angle, x, y, z, sizeX, sizeY, sizeZ);
            break;
          case "y":
            newCoords = rotateY(angle, x, y, z, sizeX, sizeY, sizeZ);
            break;
          case "z":
            newCoords = rotateZ(angle, x, y, z, sizeX, sizeY, sizeZ);
            break;
        }

        const newIndexFlat = newIndex.getIndexXYZ(...newCoords);
        newArray[newIndexFlat] = array[oldIndex];
      }
    }
  }

  for (let i = 0; i < array.length; i++) {
    (array as any)[newIndex.getIndex(newIndex.getXYZ(i))] = newArray[i];
  }
};

export default function RotateTemplate(
  template: VoxelTemplate,
  angle: TemplateRotationAngles,
  axes: TemplateRotationAxes = "y"
) {
  const [sizeX, sizeY, sizeZ] = template.size;
  const index = Flat3DIndex.GetXZYOrder();
  index.setBounds(sizeX, sizeY, sizeZ);

  let newSizeX = sizeX;
  let newSizeY = sizeY;
  let newSizeZ = sizeZ;

  if (axes === "x") {
    if (angle === 90 || angle === 270 || angle === -90 || angle === -270) {
      [newSizeY, newSizeZ] = [sizeZ, sizeY];
    }
  } else if (axes === "y") {
    if (angle === 90 || angle === 270 || angle === -90 || angle === -270) {
      [newSizeX, newSizeZ] = [sizeZ, sizeX];
    }
  } else if (axes === "z") {
    if (angle === 90 || angle === 270 || angle === -90 || angle === -270) {
      [newSizeX, newSizeY] = [sizeY, sizeX];
    }
  }

  const newIndex = Flat3DIndex.GetXZYOrder();
  newIndex.setBounds(newSizeX, newSizeY, newSizeZ);

  if (typeof template.ids === "object") {
    const ids: ArrayLike<number> = template.ids;
    rotateArray([sizeX, sizeY, sizeZ], ids, angle, axes, index, newIndex);
  }
  if (typeof template.state === "object") {
    const state: ArrayLike<number> = template.state;
    rotateArray([sizeX, sizeY, sizeZ], state, angle, axes, index, newIndex);
  }
  if (typeof template.mod === "object") {
    const mod: ArrayLike<number> = template.mod;
    rotateArray([sizeX, sizeY, sizeZ], mod, angle, axes, index, newIndex);
  }
  if (typeof template.secondary === "object") {
    const secondary: ArrayLike<number> = template.secondary;
    rotateArray([sizeX, sizeY, sizeZ], secondary, angle, axes, index, newIndex);
  }

  template.index = newIndex;
  template.size = [newSizeX, newSizeY, newSizeZ];
}
