export enum SectorStateDefaultBitFlags {
  isWorldGenDone,
  isWorldDecorDone,
  isWorldPropagationDone,
  isWorldSunDone,
  displayDirty,
  logicDirty,
  stored,
  inProgress,

}

export enum SectorStateDefaultTimeStamps {
  lastSaveTimestamp,
}

export class SectorState {
  /**The default bit flags for secotrs */
  static Flags = SectorStateDefaultBitFlags;
  /**An array of bit flags tht are preserved when the sector is stored */
  static StoredFlags: Record<string, number> = {
    dve_is_world_gen_done: SectorStateDefaultBitFlags.isWorldGenDone,
    dve_is_world_decoration_done: SectorStateDefaultBitFlags.isWorldDecorDone,
    dve_is_world_progation_done:
      SectorStateDefaultBitFlags.isWorldPropagationDone,
    dve_is_world_sun_done: SectorStateDefaultBitFlags.isWorldSunDone,
  };
  /**The default  timestamps for secotrs */
  static TimeStamps = SectorStateDefaultTimeStamps;
  /**An array of bit timestamps tht are preserved when the sector is stored */
  static StoredTimeStamps: Record<string, number> = {};
}
