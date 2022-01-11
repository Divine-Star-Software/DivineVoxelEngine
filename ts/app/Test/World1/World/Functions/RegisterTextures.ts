import { DVEW } from "Meta/Contents/World/DVEW";

export function RegisterTexutres(DVEW: DVEW) {
 DVEW.textureManager.defineDefaultTexturePath("assets/textures");

 DVEW.textureManager.registerTexture("solid", {
  name: "Debug Texture",
  id: "debug",
  frames: 0,
 });
 DVEW.textureManager.registerTexture("solid", {
  name: "Dream Stone Textures",
  id: "dreamstone",
  frames: 0,
  varations: {
   "grassy-top": true,
   "grassy-side": true,
  },
 });
}
