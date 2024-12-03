import type { RawVoxelData } from "@divinevoxel/vlox/Data/Types/VoxelData.types.js"
import {
  BuildNodeMesh,
  SetNodeMesh,
} from "@divinevoxel/vlox/Mesher/Tasks/BuidlerTasks.types.js";
import {
  DivineVoxelEngineRender as DVER,
  DivineVoxelEngineRender,
} from "@divinevoxel/vlox/Contexts/Render/DivineVoxelEngineRender.js";
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager.js";
import { LocationBoundTool } from "@divinevoxel/vlox/Tools/Classes/LocationBoundTool.js";
import type { ConstructorTextureData } from "@divinevoxel/vlox/Textures/Constructor.types.js";

import { DataTool } from "@divinevoxel/vlox/Tools/Data/DataTool.js";
import { EntityTool } from "./EntityTool.js";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer.js";
import { PaintVoxelData } from "@divinevoxel/vlox/Data/Types/WorldData.types.js";

import type { Mesh } from "@babylonjs/core";
import { LocationData } from "@divinevoxel/vlox/Math/index.js";
import { Vec3Array } from "@amodx/math";
import { TextureBuilder } from "@divinevoxel/vlox/Textures/TextureBuilder.js";

export class NodeMeshTool {
  dimension = "main";
  constructor() {
    this.voxel.dataTool.setMode(DataTool.Modes.VOXEL_DATA);
  }
  texture = {
    buildMesh: async (
      location: LocationData,
      textureIdData: ConstructorTextureData,
      rawTextureData: Uint8ClampedArray | null | undefined,
      onDone: (mesh: Mesh | false) => void
    ) => {
      const textureId = TextureManager.getTextureIndex(textureIdData);
      if (!textureId) return onDone(false);

      const textureData = TextureManager.getTextureData(textureIdData);
      if (!textureData) throw new Error(`${textureIdData} does not exist`);

      if (!rawTextureData) {
        rawTextureData = await TextureBuilder.getRawData(
          TextureManager.getTexturePath(
            textureIdData[0],
            textureIdData[1],
            textureIdData[2] || "default"
          )
        );
      }

      if (!rawTextureData) {
        throw new Error(
          `Could not find raw texture data for texture ${textureIdData.toString()}`
        );
      }

      DVER.instance.threads.construcotrs.runPromiseTasks<BuildNodeMesh>(
        "build-node-mesh",
        [
          location,
          "#dve_node_texture",
          {
            textureId: textureId,
            textureData: rawTextureData,
          },
        ],
        [],
        (data: SetNodeMesh | false) => {
          if (!data) return onDone(false);
          const mesh = DVEBabylonRenderer.instance.nodes.meshes
            .get("#dve_node_texture")
            .createMesh([data[0][1], data[0][2], data[0][3]], data[1]);
          if (!mesh) return onDone(false);

          mesh._mesh.unfreezeWorldMatrix();

          (mesh._mesh as any).type = "node";
          mesh._mesh.parent =
            DVEBabylonRenderer.instance.foManager.getActiveNode()?._node ||
            null;
          onDone(mesh._mesh);
        }
      );
    },

    buildMeshAsync: (
      location: Vec3Array,
      textureIdData: ConstructorTextureData,
      textureData: Uint8ClampedArray | null = null
    ) => {
      return new Promise<Mesh | false>((resolve) => {
        this.texture.buildMesh(
          [this.dimension, ...location] as LocationData,
          textureIdData,
          textureData,
          (data) => {
            resolve(data);
          }
        );
      });
    },

    buildEntityTool: (
      location: Vec3Array,
      textureIdData: ConstructorTextureData,
      textureData: Uint8ClampedArray,
      onDone: (mesh: EntityTool | false) => void
    ) => {
      this.texture.buildMesh(
        [this.dimension, ...location] as LocationData,
        textureIdData,
        textureData,
        (mesh) => {
          if (!mesh) return onDone(false);
          onDone(new EntityTool(mesh));
        }
      );
    },

    buildEntityToolAsync(
      location: Vec3Array,
      textureIdData: ConstructorTextureData,
      textureData: Uint8ClampedArray
    ) {
      return new Promise<EntityTool | false>((resolve) => {
        this.buildEntityTool(location, textureIdData, textureData, (data) => {
          resolve(data);
        });
      });
    },
  };
  voxel = {
    dataTool: new DataTool(),

    buildMesh: (
      location: Vec3Array,
      voxelData: RawVoxelData | Partial<PaintVoxelData>,
      onDone: (mesh: Mesh | false) => void
    ) => {
      if (!Array.isArray(voxelData)) {
        voxelData = DataTool.VoxelDataToRaw(PaintVoxelData.Create(voxelData));
      }

      DVER.instance.threads.construcotrs.runPromiseTasks<BuildNodeMesh>(
        "build-node-mesh",
        [
          [this.dimension, ...location] as LocationData,
          "#dve_node_voxel",
          voxelData,
        ],
        [],
        (data: SetNodeMesh | false) => {
          if (!data) return onDone(false);

          if (Array.isArray(voxelData)) {
            this.voxel.dataTool.loadInRaw(voxelData);
          } else {
            this.voxel.dataTool.loadInData(voxelData);
          }

          const mesh = DVEBabylonRenderer.instance.nodes.meshes
            .get(this.voxel.dataTool.getSubstnaceData().getRendered())
            .createMesh([data[0][1], data[0][2], data[0][3]], data[1]);
          if (!mesh) return onDone(false);

          mesh._mesh.unfreezeWorldMatrix();
          (mesh._mesh as any).type = "node";
          mesh._mesh.parent =
            DVEBabylonRenderer.instance.foManager.getActiveNode()?._node ||
            null;
          onDone(mesh._mesh);
        }
      );
    },

    buildMeshAsync(
      location: Vec3Array,
      voxelData: RawVoxelData | Partial<PaintVoxelData>
    ): Promise<Mesh | false> {
      return new Promise((resolve) => {
        this.buildMesh(location, voxelData, (data) => {
          resolve(data);
        });
      });
    },

    buildEntityTool: (
      location: Vec3Array,
      voxelData: RawVoxelData | Partial<PaintVoxelData>,
      onDone: (mesh: EntityTool | false) => void
    ) => {
      this.voxel.buildMesh(location, voxelData, (mesh) => {
        if (!mesh) return onDone(false);
        onDone(new EntityTool(mesh));
      });
    },

    buildEntityToolAsync: (
      location: Vec3Array,
      voxelData: RawVoxelData | Partial<PaintVoxelData>
    ): Promise<EntityTool | false> => {
      return new Promise((resolve) => {
        this.voxel.buildEntityTool(location, voxelData, (data) => {
          resolve(data);
        });
      });
    },
  };
}
