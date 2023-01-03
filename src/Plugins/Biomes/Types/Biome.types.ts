import { Vector3 } from "Meta/Util.types";

export type NoiseData = {
 offset: Vector3;
 waveLength: Vector3;
 scale: number;
};

export type BiomeData = {
 type: "noise" | "custom";
 name: string;
 range: [min: number, max: number];
 noiseData: Record<string,NoiseData>;
};

export type BiomeInitData = {
 biomeSeed : number;
 worldGenNoise: {
  name: string;
  seed: number;
 }[];
};
