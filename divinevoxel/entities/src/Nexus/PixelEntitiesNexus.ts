import type {
  CreatePixelEntityReturn,
  CreatePixelEntityTask,
} from "Types/PixelEntities.types";

import { AnimatedPixelEntity } from "./Classes/AnimatedPixelEntity.js";

export const PixelEntitiesNexus = {
  createPixelEntity([location, data, forceRerender]: CreatePixelEntityTask) {
    const animatedEntity = new AnimatedPixelEntity(
      location,
      data,
      crypto.randomUUID(),
      forceRerender
    );
    return <CreatePixelEntityReturn>[
      animatedEntity.id,
      animatedEntity.matrix.matricies.buffer,
      animatedEntity.voxelData.buffer,
      animatedEntity.faceData.buffer,
    ];
  },
};
