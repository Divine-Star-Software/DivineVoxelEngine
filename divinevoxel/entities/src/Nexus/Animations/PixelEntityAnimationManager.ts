import { AnimatedPixelEntityType } from "../Classes/AnimatedPixelEntityType.js";
import { PixelEntityData } from "Types/PixelEntityData.types.js";

export const PixelEntityAnimationManager = {
  pixelEntitiesTypeIndex: new Map<string, AnimatedPixelEntityType>(),

  addEntityType(entity: AnimatedPixelEntityType) {
    this.pixelEntitiesTypeIndex.set(entity.data.id, entity);
  },

  getEntityType(data: PixelEntityData, reRender?: boolean) {
    let type = this.pixelEntitiesTypeIndex.get(data.id);
    if (!type) {
      type = new AnimatedPixelEntityType(data);
      this.pixelEntitiesTypeIndex.set(data.id, type);
    }
    if (reRender) type._render(data);
    return type;
  },

  destroyEntity(id: string) {
    for (const [key, type] of this.pixelEntitiesTypeIndex) {
      type.removeEntity(id);
    }
  },

  destroyEntityType(id: string) {
    let type = this.pixelEntitiesTypeIndex.get(id);
    if (!type) return;
    this.pixelEntitiesTypeIndex.delete(id);
  },

  runAnimation() {
    for (const [index, type] of this.pixelEntitiesTypeIndex) {
      type.runAnimations();
    }
  },
};

setInterval(() => {
  PixelEntityAnimationManager.runAnimation();
}, 50);
