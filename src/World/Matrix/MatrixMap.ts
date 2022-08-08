export const MatrixMap = {
 shapeMap: <Record<string, number>>{},

 __shapeMapSet: false,

 isReady() {
  return this.__shapeMapSet;
 },

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  console.log(shapeMap);
  this.__shapeMapSet = true;
 },

 flush() {
  (this as any).shapeMap = null;
 },
};
