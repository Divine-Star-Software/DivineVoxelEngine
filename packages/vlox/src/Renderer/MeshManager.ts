import {
  RemoveChunkMeshTasks,
  SetChunkMeshTask,
} from "../Contexts/Render/Tasks/RenderTasks.types.js";
import { MeshRegister } from "./MeshRegister.js"
import { LocationData } from "../Math/index.js";

import { DivineVoxelEngineRender } from "../Contexts/Render/DivineVoxelEngineRender.js";
import { Square, Circle } from "@amodx/math/Shapes";
import { Vector2Like } from "@amodx/math";
import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { VoxelEffectRegister } from "../Voxels/Effects/VoxelEffectRegister.js";
const added = new Set<string>();
export class MeshManager {
  static runningUpdate = false;
  private static columnSquare = new Square(Vector2Like.Create(1, 1), 16);
  private static renderCircle = new Circle(Vector2Like.Create(0.1, 1), 10);
  static removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = MeshRegister.dimensions.get(dimesnionId);
    if (!dimension) return;

    this.columnSquare.sideLength = WorldSpaces.column._bounds.x;
    this.renderCircle.radius = radius;
    this.renderCircle.center.x = origion[1];
    this.renderCircle.center.y = origion[3];

    dimension.forEach((region) => {
      region.columns.forEach((column) => {
        const location = column.location;
        this.columnSquare.center.x = location[1];
        this.columnSquare.center.y = location[3];

        if (
          !Circle.IsSquareInsideOrTouchingCircle(
            this.columnSquare,
            this.renderCircle
          )
        ) {
          this.removeColumn(location);
        }
      });
    });
  }

  static remove(data: RemoveChunkMeshTasks) {
    const [location, substance] = data;
    const mesh = MeshRegister.chunk.removeMesh(location, substance);
    if (!mesh) return false;
    mesh.dispose();
  }

  static update(data: SetChunkMeshTask) {
    const [location, chunks, effects] = data;
    let i = chunks.length;
    let chunk = MeshRegister.chunk.get(location);
    if (!chunk) {
      chunk = MeshRegister.chunk.add(location);
    }

    added.clear();
    for (const [id, points] of effects) {
      added.add(id);
      if (!chunk.effects.has(id)) {
        const EffectClass = VoxelEffectRegister.get(id);
        const newEffect = new EffectClass(chunk);
        newEffect.init();
        newEffect.setPoints(points);
        chunk.effects.set(id, newEffect);
      } else {
        const effect = chunk.effects.get(id)!;
        effect.setPoints(points);
      }
    }
    for (const [key, effect] of chunk.effects) {
      if (!added.has(key)) {
        effect.dispose();
        chunk.effects.delete(key);
      }
    }

    if (data[1][0] == 0) {
      DivineVoxelEngineRender.instance.renderer.chunkMeshes.updateVertexData(
        chunk,
        [location[1], location[2], location[3]],
        data[1]
      );
    }
  }
  static removeColumn(data: LocationData) {
    const column = MeshRegister.column.remove(data);
    if (!column) return false;
    for (const [key, chunk] of column.chunks) {
      chunk.dispose();
    }
  }
}
