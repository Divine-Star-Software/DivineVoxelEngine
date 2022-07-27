import { DimensionsVector3 } from "Math/Types/Math.types";

export type ColliderReturnData = {
    name : string,
    boundingBox : DimensionsVector3,
    position : [number,number,number]
    
}[];


export type ColliderObject = {
 id: string;
 getColliderData(x: number,y:number,z:number) : ColliderReturnData
};
