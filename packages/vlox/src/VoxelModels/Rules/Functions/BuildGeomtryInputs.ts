import { Observable } from "@amodx/core/Observers";
import { BoxVoxelGometryInputs } from "../../Input/BoxVoxelGometryInputs";
import { VoxelRuleGeometry } from "../Classes/VoxelRulesGeometry";
import { VoxelFaceNameArray, VoxelFaceNameRecord } from "../../../Math";
import { TextureManager } from "../../../Textures/TextureManager";
import { Matrix2x2Like, Mat2Array, Vec4Array, AMath } from "@amodx/math";
import { QuadUVData } from "@amodx/meshing/Geometry.types";
import { QuadVoxelGometryInputs } from "../../Input/QuadVoxelGometryInputs";
import { VoxelGeometryTransform } from "../../../VoxelData/VoxelSyncData";

const isArgString = (data: any) => {
  if (typeof data !== "string") return false;
  return data[0] == "@";
};

const rotationMatrix = new Map<number, Mat2Array>();

const mapQuadUvs = (
  uvs: Vec4Array,
  rotation: number = 0,
  transform: VoxelGeometryTransform
): QuadUVData => {
  if (transform.lockUVs == true) {
    let rotM = rotationMatrix.get(rotation);

    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    return [
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[3]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[3]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[0], uvs[1]]),
      Matrix2x2Like.ApplyMatrixArray(rotM, [uvs[2], uvs[1]]),
    ];
  }

  let u0 = uvs[0];
  let v0 = uvs[1];
  let u1 = uvs[2];
  let v1 = uvs[3];

  if (transform.flip) {
    if (transform.flip[0] === 1) {
      [u0, u1] = [u1, u0];
    }
    if (transform.flip[1] === 1) {
      [v0, v1] = [v1, v0];
    }
  }

  let quadUVs: QuadUVData = [
    [u1, v1],
    [u0, v1],
    [u0, v0],
    [u1, v0],
  ];

  if (rotation !== 0) {
    let rotM = rotationMatrix.get(rotation);
    if (!rotM) {
      rotM = Matrix2x2Like.Rotation(AMath.DegreesToRadians(rotation));
      rotationMatrix.set(rotation, rotM);
    }

    const centerU = (u0 + u1) / 2;
    const centerV = (v0 + v1) / 2;
    quadUVs = quadUVs.map(([u, v]) => {
      let x = u - centerU;
      let y = v - centerV;
      [x, y] = Matrix2x2Like.ApplyMatrixArray(rotM, [x, y]);
      x += centerU;
      y += centerV;
      return [x, y];
    }) as QuadUVData;
  }

  return quadUVs;
};

export function BuildGeomtryInputs(geomtry: VoxelRuleGeometry) {
  const inputObservers = new Map<string, Observable<any>>();

  const getInputObserver = (id: string) => {
    let obs = inputObservers.get(id);
    if (!obs) {
      obs = new Observable<any>();
      inputObservers.set(id, obs);
    }
    return obs;
  };

  let faceTransparentIndex: boolean[] = [];
  let faceCount = 0;
  let args: any[] = [];
  for (const prcoessedNode of geomtry.data.nodes) {
    const { node, tranform } = prcoessedNode;
    if (node.type == "custom") {
      const newArgs: any = {};
      args.push(newArgs);
      const argsIndex = args.length - 1;
      for (const input in node.inputs) {
        const value = node.inputs[input];
        if (isArgString(value)) {
          args[argsIndex][input] = null;
          getInputObserver(value!).subscribe((value) => {
            args[argsIndex][input] = value;

            console.warn("set the value", value, args[argsIndex][input]);
          });
        } else {
          args[argsIndex][input] = value;
        }
      }
    }
    if (node.type == "box") {
      const newArgs = BoxVoxelGometryInputs.CreateArgs();
      args.push(newArgs);
      const argsIndex = args.length - 1;

      for (const face of VoxelFaceNameArray) {
        const relativeFaceCount = faceCount;
        const faceIndex = VoxelFaceNameRecord[face];

        const faceData = node.faces[face];
        let defaultUvs: Vec4Array = [0, 0, 1, 1];
        if (isArgString(faceData.enabled)) {
          getInputObserver(String(faceData.enabled!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Enabled
              ] = value)
          );
        }
        if (isArgString(faceData.flip)) {
          getInputObserver(String(faceData.flip!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Fliped
              ] = value)
          );
        }
        if (isArgString(faceData.transparent)) {
          getInputObserver(String(faceData.transparent!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Transparent
            ] = value;

            faceTransparentIndex[relativeFaceCount + faceIndex] =
              Boolean(value);
          });
        } else {
          args[argsIndex][VoxelFaceNameRecord[face]][
            BoxVoxelGometryInputs.ArgIndexes.Transparent
          ] = Boolean(faceData.transparent);
          faceTransparentIndex[relativeFaceCount + faceIndex] = Boolean(
            faceData.transparent
          );
        }
        if (isArgString(faceData.rotation)) {
          getInputObserver(String(faceData.rotation!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ] = value;

            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(defaultUvs, value, tranform);
          });
        } else {
          faceData.rotation &&
            (args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ] = faceData.rotation as number);
        }
        if (isArgString(faceData.uv)) {
          const defaultInput =
            geomtry.data.ogData.arguments[(faceData.uv as string).substring(1)];

          if (defaultInput.type == "box-uv" && defaultInput.default) {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(
              defaultInput.default,
              args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Rotation
              ],
              tranform
            );
            defaultUvs = defaultInput.default;
          }

          getInputObserver(String(faceData.uv!)).subscribe((value) => {
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.UVs
            ] = mapQuadUvs(
              value,
              args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Rotation
              ],
              tranform
            );
          });
        } else {
          args[argsIndex][VoxelFaceNameRecord[face]][
            BoxVoxelGometryInputs.ArgIndexes.UVs
          ] = mapQuadUvs(
            faceData.uv as Vec4Array,
            args[argsIndex][VoxelFaceNameRecord[face]][
              BoxVoxelGometryInputs.ArgIndexes.Rotation
            ],
            tranform
          );
          defaultUvs = faceData.uv as Vec4Array;
        }
        if (isArgString(faceData.texture)) {
          getInputObserver(String(faceData.texture!)).subscribe(
            (value) =>
              (args[argsIndex][VoxelFaceNameRecord[face]][
                BoxVoxelGometryInputs.ArgIndexes.Texture
              ] = value)
          );
        }
      }
      faceCount += 6;
    }
    if (node.type == "quad") {
      const newArgs = QuadVoxelGometryInputs.CreateArgs();
      args.push(newArgs);
      const argsIndex = args.length - 1;

      const relativeFaceCount = faceCount;

      let defaultUvs: Vec4Array = [0, 0, 1, 1];

      if (isArgString(node.transparent)) {
        getInputObserver(String(node.transparent!)).subscribe((value) => {
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Transparent] =
            value;

          faceTransparentIndex[relativeFaceCount] = Boolean(value);
        });
      } else {
        args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Transparent] =
          Boolean(node.transparent);
        faceTransparentIndex[relativeFaceCount] = Boolean(node.transparent);
      }

      if (isArgString(node.doubleSided)) {
        getInputObserver(String(node.doubleSided!)).subscribe((value) => {
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.DoubleSided] =
            value;
        });
      } else {
        args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.DoubleSided] =
          Boolean(node.doubleSided);
      }

      if (isArgString(node.textureRotation)) {
        getInputObserver(String(node.textureRotation!)).subscribe((value) => {
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation] = value;

          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
            defaultUvs,
            value,
            tranform
          );
        });
      } else {
        node.textureRotation &&
          (args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation] =
            node.textureRotation as number);
      }
      if (isArgString(node.uv)) {
        const defaultInput =
          geomtry.data.ogData.arguments[(node.uv as string).substring(1)];

        if (defaultInput.type == "box-uv" && defaultInput.default) {
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
            defaultInput.default,
            args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
            tranform
          );
          defaultUvs = defaultInput.default;
        }

        getInputObserver(String(node.uv!)).subscribe((value) => {
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
            value,
            args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
            tranform
          );
        });
      } else {
        args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
          node.uv as Vec4Array,
          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
          tranform
        );
        defaultUvs = node.uv as Vec4Array;
      }
      if (isArgString(node.texture)) {
        getInputObserver(String(node.texture!)).subscribe(
          (value) =>
            (args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Texture] = value)
        );
      }

      faceCount++;
    }
  }

  const originalTransparentIndex = structuredClone(faceTransparentIndex);
  const orginalArgs = structuredClone(args);

  const finalGeoInputs = {
    faceTransparentIndex,
    cloneArgs() {
      return structuredClone(args);
    },
    resetDefaults() {
      args = structuredClone(orginalArgs);
      faceTransparentIndex = structuredClone(originalTransparentIndex);
      this.faceTransparentIndex = faceTransparentIndex;
    },
  } as Record<string, any> & {
    faceTransparentIndex: boolean[];
    cloneArgs(): any[];
    resetDefaults(): void;
  };

  for (const arg in geomtry.data.ogData.arguments) {
    const argKey = `@${arg}`;
    if (!inputObservers.has(argKey)) continue;
    const obs = inputObservers.get(argKey)!;
    const data = geomtry.data.ogData.arguments[arg];
    Object.defineProperty(finalGeoInputs, argKey, {
      set(value) {
        if (data.type == "texture") {
          value = TextureManager.getTextureIndex(value);
        }
        obs.notify(value);
      },
    });
  }

  return finalGeoInputs;
}
