import { Rotations } from "./Mesher.types";

export type VoxelProcessData = {
 exposedFaces: number[];
 faceStates: number[];
 textureRotations: Rotations[];
 voxelData: number;
 voxelState: string;
 uvTemplate: number[];
 overlayUVTemplate: number[];
 shapeTemplate: number[];
 shapeStateTemplate: number[];
 colorTemplate: number[];
 lightTemplate: number[];
 aoTemplate: number[];
 chunkX: number;
 chunkY: number;
 chunkZ: number;
 x: number;
 y: number;
 z: number;
};
