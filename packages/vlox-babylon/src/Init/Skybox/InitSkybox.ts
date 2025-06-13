import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { SkyboxShader } from "../../Shaders/Code/SkyboxShader";
import { DVEBRShaderStore } from "../../Shaders/DVEBRShaderStore";
import { DVEBabylonRenderer } from "Renderer/DVEBabylonRenderer";

export function InitSkybox({ renderer }: { renderer: DVEBabylonRenderer }) {
  DVEBRShaderStore.storeShader(
    "dve_skybox",
    "vertex",
    SkyboxShader.GetVertex()
  );

  DVEBRShaderStore.storeShader(
    "dve_skybox",
    "frag",
    SkyboxShader.GetFragment()
  );

  const skyboxMat = new ShaderMaterial(
    "skybox",
    renderer.scene,
    "dve_skybox",
    {
      uniforms: ["world", "viewProjection", "worldOrigin", "cameraPosition"],
      attributes: ["position", "normal"],
      uniformBuffers: ["SceneOptions"],
      needAlphaBlending: false,
      needAlphaTesting: false,
    },
    false
  );

  const renderDistance = 250;
  const skybox = CreateSphere(
    "skyBox",
    { diameterX: renderDistance, diameterZ: renderDistance, diameterY: renderDistance },
    renderer.scene
  );
  skybox.renderingGroupId = 0;
  skybox.infiniteDistance = true;
  skyboxMat.sideOrientation = 0;
  skyboxMat.backFaceCulling = true;
  skybox.material = skyboxMat;
  skyboxMat.disableDepthWrite = true;
  skyboxMat.setUniformBuffer(
    "SceneOptions",
    renderer.voxelScene.options.ubo.buffer
  );
  return skybox;
}
