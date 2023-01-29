import { Distance3D } from "./Distance3d.js";
export function Vec3ArrayDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = Distance3D(a[0], a[1], a[2], origion[0], origion[1], origion[2]);
        const bDistance = Distance3D(b[0], b[1], b[2], origion[0], origion[1], origion[2]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}
export function LocationDataDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = Distance3D(a[1], a[2], a[3], origion[1], origion[2], origion[3]);
        const bDistance = Distance3D(b[1], b[2], b[3], origion[1], origion[2], origion[3]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}
