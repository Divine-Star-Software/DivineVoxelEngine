import type { DivineVoxelEngineRender } from "../../../out/Render/DivineVoxelEngineRender.js";
export function RegisterTexutres(DVER: DivineVoxelEngineRender) {
 DVER.textures.defineDefaultTexturePath("assets/textures");

 DVER.textures.registerTexture([
  {
   type: "#dve_solid",
   id: "debug",
   frames: 0,
   variations: {
    top: { frames: 0 },
    bottom: { frames: 0 },
    north: { frames: 0 },
    south: { frames: 0 },
    east: { frames: 0 },
    west: { frames: 0 },
   },
  },
  {
   type: "Item",
   id: "debug",
   frames: 0,
  },
  {
   type: "Item",
   id: "dream-vine",
   frames: 0,
  },
  {
   type: "#dve_solid",
   id: "light-debug",
   frames: 0,
   variations: {
    "light-level-0": { frames: 0 },
    "light-level-1": { frames: 0 },
    "light-level-2": { frames: 0 },
    "light-level-3": { frames: 0 },
    "light-level-4": { frames: 0 },
    "light-level-5": { frames: 0 },
    "light-level-6": { frames: 0 },
    "light-level-7": { frames: 0 },
    "light-level-8": { frames: 0 },
    "light-level-9": { frames: 0 },
    "light-level-10": { frames: 0 },
    "light-level-11": { frames: 0 },
    "light-level-12": { frames: 0 },
    "light-level-13": { frames: 0 },
    "light-level-14": { frames: 0 },
    "light-level-15": { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "dreamstone",
   frames: 0,
   variations: {
    "grassy-top": { frames: 0 },
    "grassy-side": { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "dreadstone",
   frames: 0,
   variations: {
    "grassy-top": { frames: 0 },
    "grassy-side": { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "data-holder",
   frames: 0,
   variations: {
    front: { frames: 0 },
   },
  },
  {
   type: "#dve_flora",
   id: "dreamgrassblock",
   frames: 0,
   variations: {
    "grassy-top": { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "dreamstone-pillar",
   frames: 0,
   variations: {
    "side-bottom": { frames: 0 },
    "side-top": { frames: 0 },
    top: { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "dreadstone-pillar",
   frames: 0,
   variations: {
    "side-bottom": { frames: 0 },
    "side-top": { frames: 0 },
    top: { frames: 0 },
   },
  },
  {
   type: "#dve_solid",
   id: "dreamlamp",
   frames: 0,
  },
  {
   type: "#dve_solid",
   id: "dreadlamp",
   frames: 0,
  },
  {
   type: "#dve_solid",
   id: "dream-log",
   frames: 0,
  },
  {
   type: "#dve_flora",
   id: "dreamgrass",
   frames: 0,
  },
  {
   type: "#dve_flora",
   id: "dreadgrass",
   frames: 0,
  },
  {
   type: "#dve_flora",
   id: "dream-vine",
   frames: 0,
  },
  {
   type: "#dve_flora",
   id: "dream-leafs",
   frames: 0,
  },
  {
   type: "#dve_liquid",
   id: "liquid-dream-ether",
   frames: 0,
   variations: {
    still: {
     frames: 6,
     animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
     globalFrameTime: 2,
    },
   },
  },
  {
   type: "#dve_liquid",
   id: "liquid-dread-ether",
   frames: 0,
   variations: {
    still: {
     frames: 6,
     animKeys: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2],
     globalFrameTime: 2,
    },
   },
  },
  {
   type: "#dve_liquid",
   id: "foam",
   frames: 0,
   variations: {
    bottom: { frames: 0 },
    top: { frames: 0 },
    left: { frames: 0 },
    right: { frames: 0 },
    cbl: { frames: 0 },
    cblbr: { frames: 0 },
    cblbrtl: { frames: 0 },
    cblbrtr: { frames: 0 },
    cbltltr: { frames: 0 },
    cbr: { frames: 0 },
    cbrtl: { frames: 0 },
    cbrtltr: { frames: 0 },
    cbrtr: { frames: 0 },
    ctl: { frames: 0 },
    ctlbr: { frames: 0 },
    ctltr: { frames: 0 },
    ctr: { frames: 0 },
    lb: { frames: 0 },
    lr: { frames: 0 },
    lrb: { frames: 0 },
    lrbt: { frames: 0 },
    lrt: { frames: 0 },
    lt: { frames: 0 },
    ltb: { frames: 0 },
    rb: { frames: 0 },
    rt: { frames: 0 },
    rtb: { frames: 0 },
    tb: { frames: 0 },
   },

   segment: "overlay",
  },
 ]);
}
