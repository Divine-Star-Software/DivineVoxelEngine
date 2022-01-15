import { DVEW } from "../../out/Meta/World/DVEW";

export function RegisterTexutres(DVEW: DVEW) {
 DVEW.textureManager.defineDefaultTexturePath("assets/textures");

 DVEW.textureManager.registerTexture("solid", {
  name: "Debug Texture",
  id: "debug",
  frames: 0,
  varations: {
   top: { frames: 0 },
   bottom: { frames: 0 },
   north: { frames: 0 },
   south: { frames: 0 },
   east: { frames: 0 },
   west: { frames: 0 },
  },
 });

 DVEW.textureManager.registerTexture("solid", {
  name: "Dream Stone Textures",
  id: "dreamstone",
  frames: 0,
  varations: {
   "grassy-top": { frames: 0 },
   "grassy-side": { frames: 0 },
  },
 });

 DVEW.textureManager.registerTexture("solid", {
  name: "Dream Stone Pillar",
  id: "dreamstone-pillar",
  frames: 0,
  varations: {
   "side-bottom": { frames: 0 },
   "side-top": { frames: 0 },
   top: { frames: 0 },
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
  varations: {
   still: {
    frames: 6,
    animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
    globalFrameTime: 2,
   },
  },
 });

}
