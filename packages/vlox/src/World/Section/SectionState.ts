export enum SectionStateDefaultFlags {
  inProgress,
  logicUpdateInProgress,
}
export enum SectionStateDefaultTicks {
  displayDirty,
  logicDirty,
  propagationDirty,
}
export class SectionState {
  /**The default bit flags for sections */
  static Flags = SectionStateDefaultFlags;

  static Ticks = SectionStateDefaultTicks;
  /**A record of bit flags tht are preserved when the section is stored */
  static StoredFlags: Record<string, number> = {};
}
