import { DirectionNames } from "Meta/Util.types";
import { Rotations } from "./Mesher.types";

export type CustomShapeType = {
 id: string;
 //Whether or not the shape can cause AO to occur on other shapes
 causeAO: boolean;
 //Whether or not any faces can be culled
 alwaysVisible: boolean;
 components: {
  dimensions: [number, number, number];
  transform: [number, number, number, number];
  faces: Record<
   Partial<DirectionNames>,
   {
    lightMode: "shade" | "max";
    AO: [number, number, number, number];
    light?: [number, number, number, number];
    transform?: [number, number, number, number];
    uvs: {
     r: Rotations;
     ws: number;
     we: number;
     hs: number;
     he: number;
     //relative index for textures
     textureIndex: number;
    };
   }
  >;
 }[];
};
