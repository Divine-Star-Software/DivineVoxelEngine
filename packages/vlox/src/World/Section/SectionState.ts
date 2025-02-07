export enum SectionStateDefaultFlags {
  isDirty,
  inProgress,
}
export class SectionState {
  /**The default bit flags for sections */
  static Flags = SectionStateDefaultFlags;
  /**A record of bit flags tht are preserved when the section is stored */
  static StoredFlags: Record<string,number> = {};
}
