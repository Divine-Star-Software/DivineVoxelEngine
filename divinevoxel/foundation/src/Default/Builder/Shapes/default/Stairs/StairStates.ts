/*
export const StairStates = {
 normal: {
  bottom: {
   north: 0,
   south: 1,
   east: 2,
   west: 3,
  },
  top: {
   north: 4,
   south: 5,
   east: 6,
   west: 7,
  },
 },
 connected: {
  bottom: {
   northEast: 8,
   northWest: 9,
   southEast: 10,
   southWest: 11,
  },
  top: {
   northEast: 12,
   northWest: 13,
   southEast: 14,
   southWest: 15,
  },
 },
};
*/
export enum StairStates {
  BottomNorth,
  BottomSouth,
  BottomEast,
  BottomWest,
  TopNorth,
  TopSouth,
  TopEast,
  TopWest,
  BottomNorthEast,
  BottomNorthWest,
  BottomSouthEast,
  BottomSouthWest,
  TopNorthEast,
  TopNorthWest,
  TopSouthEast,
  TopSouthWest,
}

export const StairStatesArray: StairStates[] = [
  StairStates.BottomNorth,
  StairStates.BottomSouth,
  StairStates.BottomEast,
  StairStates.BottomWest,
  StairStates.TopNorth,
  StairStates.TopSouth,
  StairStates.TopEast,
  StairStates.TopWest,
  StairStates.BottomNorthEast,
  StairStates.BottomNorthWest,
  StairStates.BottomSouthEast,
  StairStates.BottomSouthWest,
  StairStates.TopNorthEast,
  StairStates.TopNorthWest,
  StairStates.TopSouthEast,
  StairStates.TopSouthWest,
];
