export const MeshFaceDataByte = {
    setAnimationType(animationType, rawData) {
        return (rawData & ~(0xff << 0)) | (animationType << 0);
    },
    getAnimationType(rawData) {
        return (rawData & (0xff));
    },
};
