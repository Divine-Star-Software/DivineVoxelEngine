export enum SectorStateFlags {
  isWorldGenDone,
  isWorldDecorDone,
  isWorldPropagationDone,
  isWorldSunDone,
  isDirty,
  isStored,
  persistent,
}

export enum SectorTimestampFlags {
  lastSaveTimestamp,
  lastAnalyzerUpdateTimestamp,
}
