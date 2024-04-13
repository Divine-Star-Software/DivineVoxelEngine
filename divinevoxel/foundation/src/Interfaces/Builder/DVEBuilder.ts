import { Observable } from "@divinestar/utils/Observers";
import { LocationData } from "@divinevoxel/core/Math";
import { TextureRegister } from "../../Textures/TextureRegister";

export abstract class DVEBuilder {
  observers = {
    texturesRegistered: new Observable<typeof TextureRegister>(),
  };
  abstract init(): void;
  abstract buildChunk(location: LocationData, LOD: number): void;
}
