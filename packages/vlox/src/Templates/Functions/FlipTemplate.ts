import { Flat3DIndex, Vec3Array } from "@amodx/math";
import { VoxelTemplate } from "../VoxelTemplate";
export type TemplateFlipDirections = "x" | "z" | "y";

const flipArray = (
  [sizeX, sizeY, sizeZ]: Vec3Array,
  array: ArrayLike<number>,
  direction: TemplateFlipDirections,
  index: Flat3DIndex
) => {
  const newArray = new Array(array.length);

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      for (let z = 0; z < sizeZ; z++) {
        const oldIndex = index.getIndexXYZ(x, y, z);

        let newCoords: Vec3Array = [x, y, z];

        if (direction === "x") {
          newCoords[0] = sizeX - 1 - x;
        } else if (direction === "y") {
          newCoords[1] = sizeY - 1 - y;
        } else if (direction === "z") {
          newCoords[2] = sizeZ - 1 - z;
        }

        const newIndexFlat = index.getIndexXYZ(...newCoords);
        newArray[newIndexFlat] = array[oldIndex];
      }
    }
  }

  for (let i = 0; i < array.length; i++) {
    (array as any)[i] = newArray[i];
  }
};

export default function FlipTemplate(
  template: VoxelTemplate,
  direction: TemplateFlipDirections
) {
  const [sizeX, sizeY, sizeZ] = template.size;
  const index = Flat3DIndex.GetXZYOrder();
  index.setBounds(sizeX, sizeY, sizeZ);

  if (typeof template.ids === "object") {
    const ids: ArrayLike<number> = template.ids;
    flipArray([sizeX, sizeY, sizeZ], ids, direction, index);
  }
  if (typeof template.state === "object") {
    const state: ArrayLike<number> = template.state;
    flipArray([sizeX, sizeY, sizeZ], state, direction, index);
  }
  if (typeof template.mod === "object") {
    const mod: ArrayLike<number> = template.mod;
    flipArray([sizeX, sizeY, sizeZ], mod, direction, index);
  }
  if (typeof template.secondary === "object") {
    const secondary: ArrayLike<number> = template.secondary;
    flipArray([sizeX, sizeY, sizeZ], secondary, direction, index);
  }
}
