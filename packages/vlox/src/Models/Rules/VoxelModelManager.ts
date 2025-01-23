import { StringPalette } from "../../Util/StringPalette";
import {
  VoxelGeometryData,
  VoxelGeometryLinkData,
  VoxelModelConstructorData,
  VoxelModelData,
} from "../VoxelModel.types";
import { VoxelRuleGeometry } from "./Classes/VoxelRulesGeometry";
import { VoxelRulesModoel } from "./Classes/VoxelRulesModel";
const addGeo = (
  modelId: string,
  stateId: string,
  nodes: VoxelGeometryLinkData[]
) => {
  const registred: [string, string][] = [];

  for (const geoLinkNode of nodes) {
    const geo = VoxelModelManager.geometry.get(geoLinkNode.geometryId);
    if (!geo)
      throw new Error(`Geometry ${geoLinkNode.geometryId} is not registered.`);
    const newId = getGeometryLinkId(geoLinkNode);

    if (VoxelModelManager.geometry.has(newId)) continue;
    registred.push([stateId, newId]);
    if (!VoxelModelManager.geometryPalette.isRegistered(newId))
      VoxelModelManager.geometryPalette.register(newId);
    const newData = structuredClone(geo.data);
    newData.nodes = newData.nodes.map((_) => ({
      ..._,
      tranform: {
        ...(geoLinkNode.position ? { position: geoLinkNode.position } : {}),
        ...(geoLinkNode.scale ? { scale: geoLinkNode.scale } : {}),
        ...(geoLinkNode.rotation ? { rotation: geoLinkNode.rotation } : {}),
        ...(geoLinkNode.rotationPivot
          ? { rotationPivot: geoLinkNode.rotationPivot }
          : {}),
        ...(geoLinkNode.flip ? { flip: geoLinkNode.flip } : {}),
      },
    }));

    VoxelModelManager.geometry.set(
      newId,
      new VoxelRuleGeometry(newId, newData)
    );
    continue;
  }

  return registred;
};
const getGeometryLinkId = (node: VoxelGeometryLinkData) => {
  return `${node.geometryId}${
    node.position ? `-p${node.position.toString()}` : ""
  }${node.rotation ? `-r${node.rotation.toString()}` : ""}${
    node.scale ? `-s${node.scale.toString()}` : ""
  }`.trim();
};

export class VoxelModelManager {
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

      this.geometry.set(
        geo.id,
        new VoxelRuleGeometry(geo.id, {
          ogData: geo,
          id: geo.id,
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
      for (const stateId in model.shapeStatesNodes) {
        const nodes = model.shapeStatesNodes[stateId];
        addGeo(model.id, stateId, nodes).forEach((_) =>
          rulesModel.registerShapeState(..._)
        );
      }
      for (const stateId in model.shapeStatesConditonalNodes) {
        const nodes = model.shapeStatesConditonalNodes[stateId];
        addGeo(model.id, stateId, nodes).forEach((_) =>
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
