import { DVEBabylonRenderer } from "@divinevoxel/vlox-babylon/Renderer/DVEBabylonRenderer";
import { GUI } from "dat.gui";

export function SceneDebug(gui: GUI, renderer: DVEBabylonRenderer) {
  const sceneUBO = renderer.voxelScene.options.ubo;
  const sceneOptions = renderer.voxelScene.options;

  const folder = gui.addFolder("Scene Options");

  const colors = {
    sky: {
      r: sceneUBO.skyColor.r * 255,
      g: sceneUBO.skyColor.g * 255,
      b: sceneUBO.skyColor.b * 255,
    },
    fog: {
      r: sceneUBO.fogColor.r * 255,
      g: sceneUBO.fogColor.g * 255,
      b: sceneUBO.fogColor.b * 255,
    },
  };
  const fogFolder = folder.addFolder("Fog");
  fogFolder.addColor(colors, "fog").onChange((color) => {
    sceneUBO.setFogColor(color.r / 255, color.g / 255, color.b / 255);
  });
  fogFolder.add(sceneOptions.fog, "density", 0, 1);
  fogFolder.add(sceneOptions.fog, "heightFactor", 0, 1);
  fogFolder.add(sceneOptions.fog, "start", 0, 500, 5);
  fogFolder.add(sceneOptions.fog, "skyShade");
  fogFolder.add(sceneOptions.fog, "mode", {
    Off: 0,
    Exp: 1,
    Volumetric: 2,
    Animated: 3,
  });

  const skyFolder = folder.addFolder("Sky");
  skyFolder.addColor(colors, "sky").onChange((color) => {
    sceneUBO.setSkyColor(color.r / 255, color.g / 255, color.b / 255);
  });
  skyFolder.add(sceneOptions.sky, "horizon", 0, 256, 1);
  skyFolder.add(sceneOptions.sky, "horizonEnd", 0, 256, 1);
  skyFolder.add(sceneOptions.sky, "startBlend", 0, 256, 1);
  skyFolder.add(sceneOptions.sky, "endBlend", 0, 256, 1);

  const shadingFolder = folder.addFolder("Shading");
  shadingFolder.add(sceneOptions.shade, "doSun");
  shadingFolder.add(sceneOptions.shade, "doRGB");
  shadingFolder.add(sceneOptions.shade, "doAO");
  shadingFolder.add(sceneOptions.shade, "doColor");

  const levelsFolder = folder.addFolder("Light Levels");
  levelsFolder.add(sceneOptions.levels, "sunLevel", 0, 1, 0.01);
  levelsFolder.add(sceneOptions.levels, "baseLevel", 0, 1, 0.01);

  folder.open();
}
