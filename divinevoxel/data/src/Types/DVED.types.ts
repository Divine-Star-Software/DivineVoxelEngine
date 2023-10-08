export type DVEDDataTypes = "world-data" | "rich-data" | "entities" | "dbo";

export type DVEDSyncFile = {
  getSize(): number;
  clear(byteStart: number, byteLength: number): boolean;
  write(byteStart: number, data: ArrayBuffer): boolean;
  read(byteStart: number, byteLength: number): ArrayBuffer | false;
  close(): void;
  rename(newPath: string): boolean;
  move(newPath: string): boolean;
  reOpen(): boolean;
  getPath(): string;
  delete(): boolean;
};


console.log("what the fuck")