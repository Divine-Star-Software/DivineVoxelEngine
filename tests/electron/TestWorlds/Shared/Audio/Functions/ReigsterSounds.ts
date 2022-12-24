import type { DivineAudioEngine } from "Libs/DAE/DivineAudioEngine";

export async function ReigsterSounds(DAE: DivineAudioEngine) {
 await DAE.effects.preloadReverbBuffers(["Vaneev/Block Inside"]);
 DAE.sfx.registerSFX([
  {
   path: "./assets/audio/sfx/electric-gong.wav",
   id: "explode",
   channel: "sfx",
   is3dSound: true,
   varations: [
    {
     playBackRate: 0.8,
     effects: {
      reverb: {
       builtIn: "Vaneev/Block Inside",
       level: 1.2,
      },
     },
    },
   ],
   _3dSoundData: {
    rolloffFactor: 1,
   },
  },
 ]);

 DAE.sfx.registerSFX([
  {
   path: "./assets/audio/sfx/item-pickup.wav",
   id: "place",
   channel: "sfx",
   is3dSound: true,
   _3dSoundData: {
    rolloffFactor: 1,
   },
   varations: [
    {
     playBackRate: 0.3,
    },
    {
     playBackRate: 0.5,
    },
   ],
  },
 ]);

 DAE.music.registerMusicTracks([
  {
   channel: "music",
   id: "main",
   loop: true,
   level: 0.3,
   path: "./assets/audio/music/morning-star.mp3",
  },
 ]);



 const getPathHiFi = (name: string, extension = "mp3") => {
  return `./assets/audio/sfx/hifi/${name}.${extension}`;
 };
 const getPathLoFi = (name: string, extension = "mp3") => {
  return `./assets/audio/sfx/lofi/${name}.${extension}`;
 };

 DAE.music.registerMusicTracks([
  {
   channel: "music",
   id: "dream-ambience",
   loop: true,
   level: 0.3,
   path: getPathHiFi("dream-ambience"),
  },
 ]);

 DAE.music.registerMusicTracks([
  {
   channel: "music",
   id: "dread-ambience",
   loop: true,
   level: 0.1,
   path: getPathHiFi("dread-ambience"),
  },
 ]);

 DAE.sfx.registerSFX([
  {
   path: getPathHiFi("walking-stone"),
   id: "walking-stone",
   channel: "sfx",
   is3dSound: true,
   _3dSoundData: {
    rolloffFactor: 1,
   },
  },
 ]);

 DAE.sfx.registerSFX([
  {
   path: getPathHiFi("walking-grassy-stone"),
   id: "walking-grassy-stone",
   channel: "sfx",
   is3dSound: true,
   _3dSoundData: {
    rolloffFactor: 1,
   },
  },
 ]);

 DAE.sfx.registerSFX([
  {
   path: getPathHiFi("walking-grass"),
   id: "walking-grass",
   channel: "sfx",
   is3dSound: true,
   _3dSoundData: {
    rolloffFactor: 1,
   },
  },
 ]);

 DAE.sfx.registerSFX([
  {
   path: getPathHiFi("walking-leaves"),
   id: "walking-grass",
   channel: "sfx",
   is3dSound: true,
   _3dSoundData: {
    rolloffFactor: 1,
   },
  },
 ]);

 const addVoxelSound = (id: string, pathFunction: (id: string) => string) => {
  DAE.sfx.registerSFX([
   {
    path: pathFunction(`${id}_break`),
    id: `${id}_break`,
    channel: "sfx",
    is3dSound: true,
    _3dSoundData: {
     rolloffFactor: 1,
    },
    varations: [
     {
      playBackRate: 0.9,
     },
     {
      playBackRate: 0.95,
     },
     {
      playBackRate: 1,
     },
    ],
   },
   {
    path: pathFunction(`${id}_place`),
    id: `${id}_place`,
    channel: "sfx",
    is3dSound: true,
    _3dSoundData: {
     rolloffFactor: 1,
    },
    varations: [
     {
      playBackRate: 0.9,
     },
     {
      playBackRate: 0.95,
     },
     {
      playBackRate: 1,
     },
    ],
   },
  ]);
 };
 const lofi: Record<string, boolean> = {
  //dve_dreadgrass: true,
  dve_dreadlamp: true,
  dve_dreadstone: true,
  "dve_dream-leafs": true,
  "dve_dream-log": true,
  dve_dreamgrass: true,
  dve_dreamlamp: true,
  dve_dreamstone: true,
//  dve_dreamstonepillar: true,
 };

 const hifi: Record<string, boolean> = {
 dve_dreadgrass: true,
  dve_dreamgrass: true,
  dve_dreadstonepillar: true,
   dve_dreamstonepillar: true,
  dve_liquiddreadether: true,
  dve_liquiddreamether: true,
 };

 for (const voxel of Object.keys(hifi)) {
  addVoxelSound(voxel, getPathHiFi);
 }

 for (const voxel of Object.keys(lofi)) {
  addVoxelSound(voxel, getPathLoFi);
 }

 return {
  registeredVoxesl: {
   ...hifi,
   ...lofi,
  },
 };
}
/*  const doLoFi = () => {
  const voxels = [
   "dve_dreadgrass",
   "dve_dreamgrass",
   "dve_dreadlamp",
   "dve_dreadstone",
   "dve_dream-leafs",
   "dve_dream-log",
   "dve_dreamlamp",
   "dve_dreamstonepillar",
  ];
  for (const voxel of voxels) {
   addVoxelSound(voxel, getPathLoFi);
  }
 };
 */
