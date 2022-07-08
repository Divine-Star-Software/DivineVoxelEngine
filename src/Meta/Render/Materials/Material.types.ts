import { EngineSettingsData } from "Meta/index";

export type MaterialCreateData = {
 settings: EngineSettingsData;
 scene: BABYLON.Scene;
 texture: BABYLON.RawTexture2DArray;
 animations: number[][];
 animationTimes: number[][];
 overlayTexture: BABYLON.RawTexture2DArray;
 overlayAnimations: number[][];
 overlayAnimationTimes: number[][];
};
