import { Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { Quad } from "../../../Geomtry/Primitives/Quad";
import { addVoxelQuad } from "../../../Geomtry/VoxelGeometryBuilder";
import { GeoemtryNode } from "../GeometryNode";
import {
  CompiledQuadVoxelGeomtryNode,
  QuadVoxelGometryArgs,
  QuadVoxelGometryInputs,
} from "../Types/QuadVoxelGometryNodeTypes";
import { GetTexture } from "../../Common/GetTexture";
import { CullRulledFace } from "../../Common/Faces/CullRulledFace";
import { ShadeRulledFace } from "../../Common/Faces/ShadeRulledFace";
import { ShadeRulelessFace } from "../../Common/Faces/ShadeRulelessFace";

const ArgIndexes = QuadVoxelGometryInputs.ArgIndexes;

export class QuadVoxelGometryNode extends GeoemtryNode<
  CompiledQuadVoxelGeomtryNode,
  QuadVoxelGometryArgs
> {
  quad: Quad;
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array];
  closestFace: VoxelFaces;

  trueFaceIndex?: number;

  init() {
    this.quad = Quad.Create(this.data.positions);
    this.vertexWeights = this.data.weights;
    this.closestFace = this.data.closestFace;
    if (this.data.trueFaceIndex !== undefined)
      this.trueFaceIndex = this.data.trueFaceIndex;
  }

  add(args: QuadVoxelGometryArgs) {
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
          4
        )
      : ShadeRulelessFace(
          this.builder,
          this.builder.lightData[this.closestFace],
          this.vertexWeights,
          4
        );
    const quad = this.quad;

    quad.doubleSided = args[ArgIndexes.DoubleSided];
    const uvs = args[ArgIndexes.UVs];
    //1
    quad.uvs.vertices[0].x = uvs[0][0];
    quad.uvs.vertices[0].y = uvs[0][1];
    //2
    quad.uvs.vertices[1].x = uvs[1][0];
    quad.uvs.vertices[1].y = uvs[1][1];
    //3
    quad.uvs.vertices[2].x = uvs[2][0];
    quad.uvs.vertices[2].y = uvs[2][1];
    //4
    quad.uvs.vertices[3].x = uvs[3][0];
    quad.uvs.vertices[3].y = uvs[3][1];

    GetTexture(builder, args[ArgIndexes.Texture], this.closestFace, quad);
    addVoxelQuad(builder, quad);

    builder.updateBounds(quad.bounds);
    builder.vars.light.setAll(0);
    builder.vars.ao.setAll(0);

    return true;
  }
}
