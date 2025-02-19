import { Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../../../Math";
import { Quad } from "../../../../../../Mesher/Geomtry/Primitives/Quad";
import { getQuadWeights, mapQuadUvs } from "./CalcFunctions";
import { TransformQuad } from "../../../../../../Mesher/Geomtry/Transform/TransformQuad";
import { VoxelGeometryTransform } from "../../../../../../Mesher/Geomtry/Geometry.types";
import {
  CompiledQuadVoxelGeomtryNode,
  QuadVoxelGometryInputs,
} from "../../../../../../Mesher/Models/Nodes/Types/QuadVoxelGometryNodeTypes";
import { OcclusionFaceRegister } from "../../../Classes/OcclusionFaceRegister";
import { GeomtryInput } from "Voxels/Models/Rules/Classes/GeomtryInput";
import { BaseVoxelQuadData } from "Voxels/Models/VoxelModel.types";
import { closestVoxelFace } from "../../../../../../Math/UtilFunctions";

export function CompileQuadGeometryNode(
  buildRules: boolean,
  input: GeomtryInput,
  points: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
  node: BaseVoxelQuadData,
  transform: VoxelGeometryTransform = {}
): CompiledQuadVoxelGeomtryNode {
  const quad = transform
    ? TransformQuad(Quad.Create(points), transform)
    : Quad.Create(points);

  const normals = quad.normals.toArray();
  const averageNormal: Vec3Array = [0, 0, 0];

  for (let i = 0; i < normals.length; i++) {
    averageNormal[0] += normals[i].x;
    averageNormal[1] += normals[i].y;
    averageNormal[2] += normals[i].z;
  }
  averageNormal[0] /= normals.length;
  averageNormal[1] /= normals.length;
  averageNormal[2] /= normals.length;

  // Normalize the average normal
  const magnitude = Math.sqrt(
    averageNormal[0] * averageNormal[0] +
      averageNormal[1] * averageNormal[1] +
      averageNormal[2] * averageNormal[2]
  );
  if (magnitude !== 0) {
    averageNormal[0] /= magnitude;
    averageNormal[1] /= magnitude;
    averageNormal[2] /= magnitude;
  }

  const closestFace = closestVoxelFace(averageNormal);

  const weights = getQuadWeights(quad, closestFace);
  const positions = quad.positions.toVec3Array();

  input.args.push(QuadVoxelGometryInputs.CreateArgs());
  const argsIndex = input.args.length - 1;
  let defaultUvs: Vec4Array = [0, 0, 1, 1];
  if (input.isArgString(node.enabled)) {
    input.onInput(
      String(node.enabled!),
      (value) =>
        (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Enabled] =
          value)
    );
  } else {
    node.enabled !== undefined &&
      (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Enabled] =
        node.enabled as boolean);
  }

  if (input.isArgString(node.doubleSided)) {
    input.onInput(
      String(node.doubleSided!),
      (value) =>
        (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.DoubleSided] =
          value)
    );
  } else {
    node.doubleSided !== undefined &&
      (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.DoubleSided] =
        node.doubleSided as boolean);
  }
  if (input.isArgString(node.rotation)) {
    input.onInput(String(node.rotation!), (value) => {
      input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation] = value;

      input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
        defaultUvs,
        value,
        transform
      );
    });
  } else {
    node.rotation &&
      (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation] =
        node.rotation as number);
  }
  if (input.isArgString(node.uv)) {
    const defaultInput =
      input.geomtry.arguments[(node.uv as string).substring(1)];

    if (defaultInput.type == "box-uv" && defaultInput.default) {
      input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
        defaultInput.default,
        input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
        transform
      );
      defaultUvs = defaultInput.default;
    }

    input.onInput(String(node.uv!), (value) => {
      input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
        value,
        input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
        transform
      );
    });
  } else {
    input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
      node.uv as Vec4Array,
      input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
      transform
    );
    defaultUvs = node.uv as Vec4Array;
  }
  if (input.isArgString(node.texture)) {
    input.onInput(
      String(node.texture!),
      (value) =>
        (input.args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Texture] =
          value)
    );
  }

  return {
    type: "quad",
    positions,
    weights,
    closestFace,
    trueFaceIndex: buildRules
      ? OcclusionFaceRegister.getQuadId(quad)
      : undefined,
  };
}
