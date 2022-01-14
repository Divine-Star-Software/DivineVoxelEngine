import { DVEW } from "../../out/Meta/World/DVEW";

export function RegisterTexutres(DVEW: DVEW) {
 DVEW.textureManager.defineDefaultTexturePath("assets/textures");

 DVEW.textureManager.registerTexture("solid", {
  name: "Debug Texture",
  id: "debug",
  frames: 0,
  varations: {
   top: true,
   bottom: true,
   north: true,
   south: true,
   east: true,
   west: true,
  },
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

 DVEW.textureManager.registerTexture("solid", {
  name: "Dream Stone Pillar",
  id: "dreamstone-pillar",
  frames: 0,
  varations: {
   "side-bottom": true,
   "side-top": true,
   top: true,
  },
 });

 DVEW.textureManager.registerTexture("flora", {
  name: "Dream Grass Texture",
  id: "dreamgrass",
  frames: 0,
 });

 DVEW.textureManager.registerTexture("fluid", {
  name: "Liquid Dream Ether Texture",
  id: "liquid-dream-ether",
  frames: 0,
 });
}
