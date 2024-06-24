import { DVENodeMeshAttributes } from "Interfaces/Render/Nodes/DVERenderNode.types";
import type { LocationData } from "Math/index.js";
export type SetChunkMeshTask = [
 location: LocationData,
 meshes: (ChunkMeshData | RemoveChunkTasks)[],
priority:number
];

export type ChunkMeshData = [
 substanceType: string,
 meshData : [
  location: LocationData,
   attributes: DVENodeMeshAttributes
 ]
];


type RemoveChunkTasks = [
 substanceType: string,
 removeFlag: false
];

export type RemoveChunkMeshTasks = [
 location: LocationData,
 substanceType: string
];

export type RemoveChunksOutsideDistance = [
 location: LocationData,
 distance: number
];
