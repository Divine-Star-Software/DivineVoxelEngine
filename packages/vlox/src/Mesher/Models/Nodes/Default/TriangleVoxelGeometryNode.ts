import { Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { addVoxelTriangle } from "../../../Geomtry/VoxelGeometryBuilder";
import { GeoemtryNode } from "../GeometryNode";
import { GetTexture } from "../../Common/GetTexture";
import {
  CompiledTriangleVoxelGeomtryNode,
  TriangleVoxelGometryArgs,
  TriangleVoxelGometryInputs,
} from "../Types/TriangleVoxelGometryNodeTypes";
import { Triangle } from "../../../Geomtry/Primitives/Triangle";
import { CullRulledFace } from "../../Common/Faces/CullRulledFace";
import { ShadeRulledFace } from "../../Common/Faces/ShadeRulledFace";
import { ShadeRulelessFace } from "../../Common/Faces/ShadeRulelessFace";

const ArgIndexes = TriangleVoxelGometryInputs.ArgIndexes;

export class TriangleVoxelGeometryNode extends GeoemtryNode<
  CompiledTriangleVoxelGeomtryNode,
  TriangleVoxelGometryArgs
> {
  triangle: Triangle;
  vertexWeights: Vec4Array[];
  closestFace: VoxelFaces;
  trueFaceIndex?: number;

  init() {
    this.triangle = Triangle.Create(this.data.positions);
    this.vertexWeights = this.data.weights;
    this.closestFace = this.data.closestFace;
    if (this.data.trueFaceIndex !== undefined)
      this.trueFaceIndex = this.data.trueFaceIndex;
  }

  add(args: TriangleVoxelGometryArgs) {
    if (!args[ArgIndexes.Enabled]) return false;
    if (
      this.trueFaceIndex !== undefined &&
      !CullRulledFace(this.builder, this.trueFaceIndex)
    )
      return false;
    const builder = this.builder;
    builder.calculateFaceData(this.closestFace);

    this.trueFaceIndex !== undefined
      ? ShadeRulledFace(
          this.builder,
          this.trueFaceIndex,
          this.builder.lightData[this.closestFace],
          this.vertexWeights,
          3
        )
      : ShadeRulelessFace(
          this.builder,
          this.builder.lightData[this.closestFace],
          this.vertexWeights,
          3
        );
    const tri = this.triangle;

    tri.doubleSided = args[ArgIndexes.DoubleSided];
    const uvs = args[ArgIndexes.UVs];
    //1
    tri.uvs.vertices[0].x = uvs[0][0];
    tri.uvs.vertices[0].y = uvs[0][1];
    //2
    tri.uvs.vertices[1].x = uvs[1][0];
    tri.uvs.vertices[1].y = uvs[1][1];
    //3
    tri.uvs.vertices[2].x = uvs[2][0];
    tri.uvs.vertices[2].y = uvs[2][1];

    GetTexture(builder, args[ArgIndexes.Texture], this.closestFace, tri);
    addVoxelTriangle(builder, tri);

    builder.updateBounds(tri.bounds);
    builder.vars.light.setAll(0);
    builder.vars.ao.setAll(0);

    return true;
  }
}
