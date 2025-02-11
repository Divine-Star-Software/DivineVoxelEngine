import { Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { QuadVerticies } from "../../../Geomtry/Geometry.types";
import { VoxelBoxGeometryNode } from "../../../../Voxels/Models/VoxelModel.types";
import { Quad } from "../../../Geomtry/Primitives/Quad";
import {
  BoxVoxelGometryArgs,
  BoxVoxelGometryInputs,
} from "../../../../Voxels/Models/Input/BoxVoxelGometryInputs";
import { GeoemtryNode } from "../GeometryNode";
import {
  getInterpolationValue,
  shouldCauseFlip,
} from "../../Common/Calc/CalcConstants";
import { VoxelRelativeCubeIndexPositionMap } from "../../../../Voxels/Models/Indexing/VoxelRelativeCubeIndex";
import { GetBoxGeometryNodeData } from "../../Common/BoxGeometryNode";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";
import {
  addVoxelQuad,
  VoxelGeometryBuilder,
} from "../../../Geomtry/VoxelGeometryBuilder";
import { VoxelModelConstructorRegister } from "../../../Models/VoxelModelConstructorRegister";

const ArgIndexes = BoxVoxelGometryInputs.ArgIndexes;

export class BoxVoxelGometryNode extends GeoemtryNode<
  VoxelBoxGeometryNode,
  BoxVoxelGometryArgs
> {
  quads: Record<VoxelFaces, Quad>;
  quadBounds: [Vec3Array, Vec3Array][] = [];
  vertexWeights: Record<
    VoxelFaces,
    [Vec4Array, Vec4Array, Vec4Array, Vec4Array]
  >;
  faceIndexes: number[] = [];

  _wasAOShaded = false;
  lightData = new VoxelLightData();

  init(): void {
    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;
    const { quads, vertexWeights, quadBounds } = GetBoxGeometryNodeData(
      this.data.points,
      this.transform
    );
    this.quads = quads;
    this.vertexWeights = vertexWeights;
    this.quadBounds = quadBounds;
  }

  isExposed(face: VoxelFaces) {
    const trueFaceIndex = this.faceIndexes[face];
    const faceIndexes =
      VoxelModelConstructorRegister.faceCullMap![trueFaceIndex];
    if (!faceIndexes) return true;

    const builder = this.builder;
    for (let i = 0; i < faceIndexes.length; i++) {
      const directionIndex = faceIndexes[i];
      const p = VoxelRelativeCubeIndexPositionMap[directionIndex];
      const hashed = this.builder.space.getHash(
        builder.nVoxel,
        builder.position.x + p[0],
        builder.position.y + p[1],
        builder.position.z + p[2]
      );
      if (this.builder.space.foundHash[hashed] < 2) continue;
      const constructor = this.builder.space.getConstructor(hashed)!;
      const offsetBaseGometry = this.builder.space.getGeomtry(hashed);

      if (offsetBaseGometry) {
        for (let i = 0; i < offsetBaseGometry.length; i++) {
          const geoId = offsetBaseGometry[i];

          if (VoxelModelConstructorRegister.rulesless[geoId]) continue;

          if (
            VoxelModelConstructorRegister.faceCullIndex.getValue(
              geoId,
              directionIndex,
              trueFaceIndex
            ) == 1 /* &&
            !constructor.isShapeStateFaceTransparent(
              this.builder.space.modCache[hashed],
              this.builder.space.stateCache[hashed],
              geoId,
              faceIndex
            ) */
          ) {
            return false;
          }
        }
      }

      const offsetConditonalGeometry =
        this.builder.space.getConditionalGeomtry(hashed);

      if (offsetConditonalGeometry) {
        for (let i = 0; i < offsetConditonalGeometry.length; i++) {
          const cond = offsetConditonalGeometry[i];
          for (let k = 0; k < cond.length; k++) {
            const geoId = cond[k];
            if (VoxelModelConstructorRegister.rulesless[geoId]) continue;
            if (
              VoxelModelConstructorRegister.faceCullIndex.getValue(
                geoId,
                directionIndex,
                trueFaceIndex
              ) == 1 /*  &&
              !constructor.isCondtionalStateFaceTransparent(
                this.builder.space.modCache[hashed],
                this.builder.space.stateCache[hashed],
                geoId,
                faceIndex
              ) */
            )
              return false;
          }
        }
      }
    }

    return true;
  }

  determineShading(face: VoxelFaces) {
    const tool = this.builder;
    const trueFaceIndex = this.faceIndexes[face];

    const lightData = tool.lightData[face];
    const noAO =
      this.builder.voxel.isLightSource() || this.builder.voxel.noAO();

    const worldLight = this.builder.vars.light;
    const worldAO = this.builder.vars.ao;

    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldAO.vertices[v] = 0;

      worldLight.vertices[v] = getInterpolationValue(
        lightData as Vec4Array,
        this.vertexWeights[face][v]
      );

      if (noAO) continue;

      const aoIndexes =
        VoxelModelConstructorRegister.vertexHitMap![trueFaceIndex][v];


      if (!aoIndexes) continue;

      for (let i = 0; i < aoIndexes.length; i++) {
        const directionIndex = aoIndexes[i];
        const p = VoxelRelativeCubeIndexPositionMap[directionIndex];

        const hashed = this.builder.space.getHash(
          tool.nVoxel,
          tool.position.x + p[0],
          tool.position.y + p[1],
          tool.position.z + p[2]
        );

        if (
          this.builder.space.foundHash[hashed] < 2 ||
          this.builder.space.noCastAO[hashed] === 1
        )
          continue;
        const baseGeo = this.builder.space.getGeomtry(hashed);
        const conditonalGeo = this.builder.space.getConditionalGeomtry(hashed);
  
        if (!baseGeo && !conditonalGeo) continue;

        let length = 0;
        let shaded = false;
        if (baseGeo) {
          length = baseGeo.length;
          for (let geoIndex = 0; geoIndex < length; geoIndex++) {
            if (
              VoxelModelConstructorRegister.aoIndex.getValue(
                baseGeo[geoIndex],
                directionIndex,
                trueFaceIndex,
                v
              )
            ) {
              this._wasAOShaded = true;
              worldAO.vertices[v]++;
              if (worldAO.vertices[v] >= 3) {
                shaded = true;
                break;
              }
            }
          }
        }
        if (!conditonalGeo || shaded) continue;
        length = conditonalGeo.length;

        for (
          let condtionsIndex = 0;
          condtionsIndex < length;
          condtionsIndex++
        ) {
          const condiotnalength = conditonalGeo[condtionsIndex].length;
          for (let geoIndex = 0; geoIndex < condiotnalength; geoIndex++) {
      
            if (

              VoxelModelConstructorRegister.aoIndex.getValue(
                conditonalGeo[condtionsIndex][geoIndex],
                directionIndex,
                trueFaceIndex,
                v
              )
            ) {
              this._wasAOShaded = true;
              worldAO.vertices[v]++;
              if (worldAO.vertices[v] >= 3) {
                shaded = true;
                break;
              }
            }
          }
        }
      }
    }
  }
  shouldFlip() {
    return false;
    const worldAO = this.builder.vars.ao;
    if (
      shouldCauseFlip(
        worldAO.vertices[0],
        worldAO.vertices[1],
        worldAO.vertices[2],
        worldAO.vertices[3]
      ) &&
      this._wasAOShaded
    )
      return true;
    if (this._wasAOShaded) return false;
    const worldLight = this.builder.vars.light;
    return (
      shouldCauseFlip(
        this.lightData.getS(worldLight.vertices[0]),
        this.lightData.getS(worldLight.vertices[1]),
        this.lightData.getS(worldLight.vertices[2]),
        this.lightData.getS(worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        this.lightData.sumRGB(worldLight.vertices[0]),
        this.lightData.sumRGB(worldLight.vertices[1]),
        this.lightData.sumRGB(worldLight.vertices[2]),
        this.lightData.sumRGB(worldLight.vertices[3])
      )
    );
  }

  add(args: BoxVoxelGometryArgs) {
    let added = false;
    const tool = this.builder;

    for (let face = 0 as VoxelFaces; face < 6; face++) {
      if (args[face][ArgIndexes.Enabled] && this.isExposed(face)) {
        added = true;
        const quad = this.quads[face];

        tool.calculateFaceData(face);
        this.determineShading(face);
        const faceArgs = args[face];

        quad.flip = this.shouldFlip() || faceArgs[ArgIndexes.Fliped];

        tool.vars.textureIndex = faceArgs[ArgIndexes.Texture];

        const uvs = faceArgs[ArgIndexes.UVs];
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
        addVoxelQuad(tool, this.builder.origin, quad);

        tool.updateBounds(this.quadBounds[face]);
      }
    }

    this.builder.vars.ao.setAll(0);
    this.builder.vars.light.setAll(0);
    this._wasAOShaded = false;
    return added;
  }
}
