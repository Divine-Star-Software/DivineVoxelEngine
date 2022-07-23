export declare const DVEPH: {
    math: {
        visitAll: (startPoint: import("../Meta/Util.types.js").Position3Matrix, endPoint: import("../Meta/Util.types.js").Position3Matrix, visitor?: (x: number, y: number, z: number) => boolean) => number[];
        getVector3(x: number, y: number, z: number): import("../Math/Classes/Vector3.js").Vector3;
        getPlane(pv1: import("../Math/Classes/Vector3.js").Vector3, pv2: import("../Math/Classes/Vector3.js").Vector3, pv3: import("../Math/Classes/Vector3.js").Vector3, pv4: import("../Math/Classes/Vector3.js").Vector3): import("../Math/Classes/Plane.js").Plane;
        getSimpleBoundingBox(origin: import("../Math/Classes/Vector3.js").Vector3, dimensions: import("../Math/Types/Math.types.js").DimensionsVector3): import("../Math/Classes/SimpleBoundingBox.js").SimpleBoundingBox;
        getBoundingBox(data: import("../Math/Classes/BoundingBox.js").BoundingBoxData): import("../Math/Classes/BoundingBox.js").BoundingBox;
        convertToOriginGridSpace(position: number[]): number[];
    };
};
export declare type DivineVoxelEnginePhysics = typeof DVEPH;
