export type VoxelListData = {
 id: string;
 name: string;
 texturePath: string;
};

const getTexturePath = (id: string) => {
 return `assets/textures/${id}/default.png`;
};

export const VoxelList: VoxelListData[] = [
 {
  id: "dve_dreamstone",
  name: "Dream Stone",
  texturePath: getTexturePath("dreamstone"),
 },
 {
  id: "dve_dreadstone",
  name: "Dread Stone",
  texturePath: getTexturePath("dreadstone"),
 },
 {
  id: "dve_dreamstonepillar",
  name: "Dream Stone Pillar",
  texturePath: getTexturePath("dreamstone-pillar"),
 },
 {
  id: "dve_dreadstonepillar",
  name: "Dread Stone Pillar",
  texturePath: getTexturePath("dreadstone-pillar"),
 },
 {
  id: "dve_dreamlamp",
  name: "Dream Lamp",
  texturePath: getTexturePath("dreamlamp"),
 },
 {
  id: "dve_dreadlamp",
  name: "Dread Lamp",
  texturePath: getTexturePath("dreadlamp"),
 },
 {
  id: "dve_dreamgrass",
  name: "Dream Grass",
  texturePath: getTexturePath("dreamgrass"),
 },
 {
  id: "dve_dreadgrass",
  name: "Dread Grass",
  texturePath: getTexturePath("dreadgrass"),
 },
 {
  id: "dve_dream-log",
  name: "Dream Log",
  texturePath: getTexturePath("dream-log"),
 },
 {
  id: "dve_dream-leafs",
  name: "Dread Leafs",
  texturePath: getTexturePath("dream-leafs"),
 },
 {
  id: "dve_dreamvine",
  name: "Dread Vine",
  texturePath: getTexturePath("dream-vine"),
 },
 {
  id: "dve_liquiddreamether",
  name: "Liquid Dream Ether",
  texturePath: getTexturePath("liquid-dream-ether"),
 },
 {
  id: "dve_liquiddreadether",
  name: "Liquid Dread Ether",
  texturePath: getTexturePath("liquid-dread-ether"),
 },
 {
  id: "dve_debugbox",
  name: "Debug",
  texturePath: getTexturePath("debug"),
 },
];
