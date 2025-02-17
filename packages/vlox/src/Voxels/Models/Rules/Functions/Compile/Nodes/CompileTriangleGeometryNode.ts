import { Vec2Array, Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../../../Math";
import { Triangle } from "../../../../../../Mesher/Geomtry/Primitives/Triangle";
import { getVertexWeights } from "./CalcFunctions";
import { TransformTriangle } from "../../../../../../Mesher/Geomtry/Transform/TransformTriangle";
import { VoxelGeometryTransform } from "../../../../../../Mesher/Geomtry/Geometry.types";
import {
  CompiledTriangleVoxelGeomtryNode,
  TriangleVoxelGometryInputs,
} from "../../../../../../Mesher/Models/Nodes/Types/TriangleVoxelGometryNodeTypes";
import { OcclusionFaceRegister } from "../../../Classes/OcclusionFaceRegister";
import { GeomtryInput } from "../../../Classes/GeomtryInput";
import { BaseVoxelTriangleData } from "../../../../VoxelModel.types";
import { closestVoxelFace } from "../../../../../../Math/UtilFunctions";

export function CompileTriangleGeometryNode(
  buildRules: boolean,
  input: GeomtryInput,
  points: [Vec3Array, Vec3Array, Vec3Array],
  node: BaseVoxelTriangleData,
  transform?: VoxelGeometryTransform
): CompiledTriangleVoxelGeomtryNode {
  const triangle = transform
    ? TransformTriangle(Triangle.Create(points), transform)
    : Triangle.Create(points);

  const normals = triangle.normals.toArray();
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


  const weights: [Vec4Array, Vec4Array, Vec4Array] = [] as any;
  const positions = triangle.positions.toVec3Array();
  for (let i = 0; i < positions.length; i++) {
    weights[i] = getVertexWeights(closestFace, ...positions[i]);
  }

  input.args.push(TriangleVoxelGometryInputs.CreateArgs());
  const argsIndex = input.args.length - 1;

  let defaultUvs: [Vec2Array, Vec2Array, Vec2Array] = [
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  if (input.isArgString(node.doubleSided)) {
    input.onInput(String(node.doubleSided!), (value) => {
      input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.DoubleSided] =
        value;
    });
  } else {
    input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.DoubleSided] =
      Boolean(node.doubleSided);
  }

  if (input.isArgString(node.rotation)) {
    input.onInput(String(node.rotation!), (value) => {
      input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.Rotation] =
        value;
      /*          args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
              defaultUvs,
              value,
              tranform
            ); */
      input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] =
        defaultUvs;
    });
  } else {
    node.rotation &&
      (input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.Rotation] =
        node.rotation as number);
  }
  if (input.isArgString(node.uv)) {
    const defaultInput =
      input.geomtry.arguments[(node.uv as string).substring(1)];

    if (defaultInput.type == "uv" && defaultInput.default) {
      /*        args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
            defaultInput.default,
            args[argsIndex][QuadVoxelGometryInputs.ArgIndexes.Rotation],
            tranform
          ); */
      input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] =
        defaultInput.default;
      defaultInput.default = defaultUvs;
    }

    input.onInput(String(node.uv!), (value) => {
      /*     args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
        value,
        args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.Rotation],
        transform
      );
 */
      input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] = value;
    });
  } else {
    /*        args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] = mapQuadUvs(
          node.uv as Vec4Array,
          args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.Rotation],
          tranform
        ); */
    input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.UVs] = node.uv;
    defaultUvs = node.uv as any;
  }
  if (input.isArgString(node.texture)) {
    input.onInput(
      String(node.texture!),
      (value) =>
        (input.args[argsIndex][TriangleVoxelGometryInputs.ArgIndexes.Texture] =
          value)
    );
  }

  return {
    type: "triangle",
    positions,
    weights,
    closestFace,
    trueFaceIndex: buildRules
      ? OcclusionFaceRegister.getTriangleId(triangle)
      : undefined,
  };
}
