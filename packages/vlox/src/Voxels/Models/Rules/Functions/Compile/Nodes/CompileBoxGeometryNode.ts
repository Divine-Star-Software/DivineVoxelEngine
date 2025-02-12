import { VoxelFaceNameMap, VoxelFaces } from "../../../../../../Math";
import { VoxelGeometryTransform } from "../../../../../../Mesher/Geomtry/Geometry.types";
import { TransformBox } from "../../../../../../Mesher/Geomtry/Transform/TransformBox";
import { CompiledQuadVoxelGeomtryNode } from "Mesher/Models/Nodes/Types/QuadVoxelGometryNodeTypes";
import { CompileQuadGeometryNode } from "./CompileQuadGeometryNode";
import { GeomtryInput } from "../../../../../../Voxels/Models/Rules/Classes/GeomtryInput";
import { VoxelBoxGeometryNode } from "Voxels/Models/VoxelModel.types";
import { Box } from "../../../../../../Mesher/Geomtry/Shapes/Box";

export function CompileBoxGeometryNode(
  buildRules: boolean,
  input: GeomtryInput,
  data: VoxelBoxGeometryNode,
  transform: VoxelGeometryTransform
): CompiledQuadVoxelGeomtryNode[] {
  // const quads: Quad[] = [];

  const box = Box.Create(data.points);

  TransformBox(box, transform);

  const compiled: CompiledQuadVoxelGeomtryNode[] = [];

  for (let i = 0 as VoxelFaces; i < 6; i++) {
    compiled.push(
      CompileQuadGeometryNode(
        buildRules,
        input,
        box.quads[i].positions.toVec3Array(),
        data.faces[VoxelFaceNameMap[i]]
      )
    );
  }

  return compiled;
}
