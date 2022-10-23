export const MeshFaceDataByte = {
 setAnimationType(animationType: number, rawData: number) {
  return (rawData & ~(0xff << 0)) | (animationType << 0);
 },
 getAnimationType( rawData: number) {
    return (rawData & (0xff));
 },
};
