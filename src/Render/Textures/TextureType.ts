import type { RawTexture2DArray } from "babylonjs";
import type { TextureData } from "Meta/Render/Textures/Texture.types.js";
import type { DVEMaterial } from "Render/Render/Materials/DVEMaterial";
import { DivineShader } from "../../Libs/Shaders/Classes/DivineShader.js";

class TextureRecord {
 textures: TextureData[] = [];
 textureMap: Record<string, number> = {};
 animationsMap: number[][] = [];
 animationTimes: number[][] = [];
 animations: {
  uniformIndex: number;
  overlay?: boolean;
  keys: number[];
  currentFrame: number;
  currentCount: number;
  keyCounts: number[];
 }[] = [];
 varyingID = "";
 animationUniforID = "";
 animationUniform: Float32Array = new Float32Array();
 paths: string[] = [];
 texture: RawTexture2DArray[] = [];
 textureID = "";
 constructor(
  public parentID: string,
  public id: string,
  public mode: "sampler" | "overlay",
  public attributeID: string
 ) {
  this.textureID = `${parentID}_${id}`.replace("#", "");
 }
}

export class TextureType {
 extension = "png";
 textureSegments: Map<string, TextureRecord>;
 materials: Map<string, DVEMaterial> = new Map();
 shader: DivineShader;
 constructor(public id: string) {
  const main = new TextureRecord(id, "main", "sampler", "cuv3");
  const overlay = new TextureRecord(id, "overlay", "overlay", "ocuv3");
  this.textureSegments = new Map([
   ["main", main],
   ["overlay", overlay],
  ]);
  this.shader = new DivineShader(id);
  this.shader.addTextures([
   [main.textureID, { arrayLength: 4, isArray: true, type: "sampler2DArray" }],
   [
    overlay.textureID,
    { arrayLength: 4, isArray: true, type: "sampler2DArray" },
   ],
  ]);
 }

 addTexture(data: TextureData) {
  const segment = this.textureSegments.get(
   data.segment ? data.segment : "main"
  );
  if (!segment) return false;
  segment.textures.push(data);
 }

 addToShader(shader: DivineShader) {
  const main = this.textureSegments.get("main")!;
  const overlay = this.textureSegments.get("overlay")!;
  shader.setArgumentOverride("function", "getBaseColor", {
   textureID: main.textureID,
   overlayTextureID: overlay.textureID,
   mainVarying: main.varyingID,
   overlayVarying: overlay.varyingID,
  });

  return this.shader.merge(shader, false);
 }

 addToMaterial(material: DVEMaterial) {
  const shaderMaterial = material.material!;
  for (const [key, segment] of this.textureSegments) {
   shaderMaterial.setTextureArray(segment.textureID, segment.texture);
   shaderMaterial.setFloats(
    segment.animationUniforID,
    segment.animationUniform as any
   );
  }
  this.materials.set(material.id, material);
 }

 runAnimations() {
  for (const [key, segment] of this.textureSegments) {
   for (let i = 0; i < segment.animations.length; i++) {
    const anim = segment.animations[i];
    if (anim.currentCount <= anim.keyCounts[anim.currentFrame]) {
     anim.currentCount++;
     continue;
    }
    anim.currentCount = 0;
    if (anim.currentFrame < anim.keys.length - 1) {
     anim.currentFrame++;
    } else {
     anim.currentFrame = 0;
    }
    segment.animationUniform[anim.uniformIndex] = anim.keys[anim.currentFrame];
    for (const [key, material] of this.materials) {
     material.material!.setFloats(
      segment.animationUniforID,
      segment.animationUniform as any
     );
    }
   }
  }
 }

 getTextureUVMap() {
  const segmentMap: Record<string, Record<string, number>> = {};
  for (const [key, segment] of this.textureSegments) {
   segmentMap[key] ??= {};
   segmentMap[key] = segment.textureMap;
  }
  return segmentMap;
 }
}
