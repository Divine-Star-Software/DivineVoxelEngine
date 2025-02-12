import { VoxelFaceNameArray } from "../../../Math";
import { StringPalette } from "../../../Util/StringPalette";
import {
  VoxelGeometryData,
  VoxelGeometryLinkData,
  VoxelModelConstructorData,
  VoxelModelData,
} from "../VoxelModel.types";
import { VoxelRuleGeometry } from "./Classes/VoxelRulesGeometry";
import { VoxelRulesModoel } from "./Classes/VoxelRulesModel";
import { Vec2Array, Vec4Array } from "@amodx/math";
import { QuadUVData } from "../../../Mesher/Geomtry/Geometry.types";
const addGeo = (
  model: VoxelModelData,
  stateId: string,
  nodes: VoxelGeometryLinkData[]
) => {
  const registred: [string, string][] = [];

  for (const geoLinkNode of nodes) {
    const geo = VoxelModelRuleBuilderRegister.geometry.get(
      geoLinkNode.geometryId
    );
    if (!geo)
      throw new Error(`Geometry ${geoLinkNode.geometryId} is not registered.`);
    const newId = getGeometryLinkId(geoLinkNode);

    if (VoxelModelRuleBuilderRegister.geometry.has(newId)) continue;
    registred.push([stateId, newId]);
    if (!VoxelModelRuleBuilderRegister.geometryPalette.isRegistered(newId))
      VoxelModelRuleBuilderRegister.geometryPalette.register(newId);
    const newData = structuredClone(geo.data);
    newData.cullingProcedure = geoLinkNode?.cullingProcedure
      ? geoLinkNode?.cullingProcedure
      : newData.cullingProcedure;
    for (const node of newData.nodes) {
      node.tranform = {
        ...(geoLinkNode.position ? { position: geoLinkNode.position } : {}),
        ...(geoLinkNode.scale ? { scale: geoLinkNode.scale } : {}),
        ...(geoLinkNode.rotation ? { rotation: geoLinkNode.rotation } : {}),
        ...(geoLinkNode.rotationPivot
          ? { rotationPivot: geoLinkNode.rotationPivot }
          : {}),
        ...(geoLinkNode.flip ? { flip: geoLinkNode.flip } : {}),
      };
    }

    VoxelModelRuleBuilderRegister.geometry.set(
      newId,
      new VoxelRuleGeometry(newId, newData)
    );
    continue;
  }

  return registred;
};
const getGeometryLinkId = (node: VoxelGeometryLinkData) => {
  return `${node.geometryId}${node.cullingProcedure ? JSON.stringify(node.cullingProcedure) : " "}${
    node.position ? `-p${node.position.toString()}` : ""
  }${node.rotation ? `-r${node.rotation.toString()}` : ""}${
    node.scale ? `-s${node.scale.toString()}` : ""
  }`.trim();
};

export class VoxelModelRuleBuilderRegister {
  static geometryPalette = new StringPalette();
  static getGeometryLinkId = getGeometryLinkId;
  static voxels = new Map<
    string,
    { id: string; data: VoxelModelConstructorData }[]
  >();
  static geometry = new Map<string, VoxelRuleGeometry>();
  static models = new Map<string, VoxelRulesModoel>();

  static registerGeometry(...geometry: VoxelGeometryData[]) {
    for (const geo of geometry) {
      if (!this.geometryPalette.isRegistered(geo.id))
        this.geometryPalette.register(geo.id);

      const divisor = geo.divisor ? geo.divisor : false;
      if (divisor) {
        for (const node of geo.nodes) {
          if (node.type == "box") {
            let d = node.divisor ? node.divisor : divisor;
            node.points[0][0] /= d[0];
            node.points[0][1] /= d[1];
            node.points[0][2] /= d[2];
            node.points[1][0] /= d[0];
            node.points[1][1] /= d[1];
            node.points[1][2] /= d[2];
            for (const faceName of VoxelFaceNameArray) {
              const data = node.faces[faceName];
              if (Array.isArray(data.uv)) {
                data.uv[0] /= d[0];
                data.uv[1] /= d[1];
                data.uv[2] /= d[0];
                data.uv[3] /= d[1];
              }
            }
          }
          if (node.type == "quad") {
            let d = node.divisor ? node.divisor : divisor;
            for (let i = 0; i < 4; i++) {
              const point = node.points[i];
              point[0] /= d[0];
              point[1] /= d[1];
              point[2] /= d[2];
            }
            if (Array.isArray(node.uv)) {
              if (Array.isArray(node.uv[0])) {
                let uvs = node.uv as any;
                for (let i = 0; i < node.uv.length; i++) {
                  uvs[i][0] /= d[0];
                  uvs[i][1] /= d[1];
                }
              } else {
                let uvs = node.uv as Vec4Array;
                uvs[0] /= d[0];
                uvs[1] /= d[1];
                uvs[2] /= d[0];
                uvs[3] /= d[1];
              }
            }
          }
          if (node.type == "triangle") {
            let d = node.divisor ? node.divisor : divisor;
            for (let i = 0; i < 4; i++) {
              const point = node.points[i];
              point[0] /= d[0];
              point[1] /= d[1];
              point[2] /= d[2];
            }
            if (Array.isArray(node.uv)) {
              if (Array.isArray(node.uv[0])) {
                let uvs = node.uv as Vec2Array[];
                for (let i = 0; i < node.uv.length; i++) {
                  uvs[i][0] /= d[0];
                  uvs[i][1] /= d[1];
                }
              } 
            }
          }
        }
      }

      this.geometry.set(
        geo.id,
        new VoxelRuleGeometry(geo.id, {
          ogData: geo,
          id: geo.id,
          cullingProcedure: geo.cullingProcedure
            ? geo.cullingProcedure
            : { type: "default" },
          nodes: geo.nodes.map((node) => ({
            node,
            tranform: {},
          })),
        })
      );
    }
  }

  static getGeomtryFromLink(link: VoxelGeometryLinkData) {
    return this.geometry.get(getGeometryLinkId(link));
  }

  static registerModels(...models: VoxelModelData[]) {
    for (const model of models) {
      const rulesModel = new VoxelRulesModoel(model);
      this.models.set(model.id, rulesModel);
      const divisor = model.divisor ? model.divisor : null;
      if (divisor) {
        for (const stateId in model.stateNodes) {
          const nodes = model.stateNodes[stateId];
          for (const node of nodes) {
            const d = "divisor" in node ? node.divisor! : divisor;
            if (node.position) {
              node.position[0] /= d[0];
              node.position[1] /= d[1];
              node.position[2] /= d[2];
            }
            if (node.rotationPivot) {
              node.rotationPivot[0] /= d[0];
              node.rotationPivot[1] /= d[1];
              node.rotationPivot[2] /= d[2];
            }
          }
        }
        for (const stateId in model.conditonalNodes) {
          const nodes = model.conditonalNodes[stateId];
          for (const node of nodes) {
            const d = "divisor" in node ? node.divisor! : divisor;
            if (node.position) {
              node.position[0] /= d[0];
              node.position[1] /= d[1];
              node.position[2] /= d[2];
            }
            if (node.rotationPivot) {
              node.rotationPivot[0] /= d[0];
              node.rotationPivot[1] /= d[1];
              node.rotationPivot[2] /= d[2];
            }
          }
        }
        if (model.effects) {
          for (const effect of model.effects) {
            if (effect.type == "fx-points") {
              for (const state in effect.values) {
                for (const point of effect.values[state]) {
                  point[0] /= divisor[0];
                  point[1] /= divisor[1];
                  point[2] /= divisor[2];
                }
              }
            }
          }
        }
      }

      for (const stateId in model.stateNodes) {
        const nodes = model.stateNodes[stateId];
        addGeo(model, stateId, nodes).forEach((_) =>
          rulesModel.registerShapeState(..._)
        );
      }
      for (const stateId in model.conditonalNodes) {
        const nodes = model.conditonalNodes[stateId];
        addGeo(model, stateId, nodes).forEach((_) =>
          rulesModel.registerCondiotnalNode(..._)
        );
      }
    }
  }

  static registerVoxel(id: string, data: VoxelModelConstructorData) {
    let voxelModels = this.voxels.get(data.id);
    if (!voxelModels) {
      voxelModels = [];
      this.voxels.set(data.id, voxelModels);
    }
    voxelModels.push({ id, data });
  }
}
