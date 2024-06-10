import { VolumeDimensions  } from "@divinevoxel/core/Math/";

export type ColliderReturnData = {
    name : string,
    boundingBox : VolumeDimensions ,
    position : [number,number,number]
    
}[];

export type ColliderObject = {
 id: string;
 getColliderData(x: number,y:number,z:number) : ColliderReturnData
};


export type CollisionData = { h: number; nx: number; ny: number; nz: number }