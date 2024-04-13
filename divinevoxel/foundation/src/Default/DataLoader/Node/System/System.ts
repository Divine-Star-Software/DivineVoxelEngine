import type * as FileSystem from "fs";
import type { DVEDSyncFile } from "../../Types/DVED.types";
import { SystemPath } from "./SystemPath.js";

export const System = {
  fs: <typeof FileSystem>{},

  $INIT(fs: typeof FileSystem) {
    this.fs = fs;
    SystemPath.$INIT();
    this.mkdirs([SystemPath.getDataPath(), SystemPath.getTempPath()]);
  },

  updateFolder(folder: string) {
    SystemPath.setFolder(folder);
    this.mkdirs([SystemPath.getDataPath()]);
  },

  mkdirs(paths: string[]) {
    for (const path of paths) {
      if (!this.fs.existsSync(path)) {
        this.fs.mkdirSync(path, { recursive: true });
      }
    }
  },

  sync: {
    createFile(path: string, size = 0, mode = 0o777) {
      try {
        System.fs.writeFileSync(path, new Uint8Array(size), { mode: mode });
        return true;
      } catch (error: any) {
        return false;
      }
    },

    createAndOpenFile(path: string, size = 0) {
      try {
        this.createFile(path, size);
        return this.openFile(path);
      } catch (error: any) {
        return false;
      }
    },

    openFile(filePath: string, showErrors = false): DVEDSyncFile | false {
      try {
        const fs = System.fs;
        let fileHandlerId = fs.openSync(filePath, "r+");
        let closed = false;
        const file = {
          getSize() {
            try {
              const stats = fs.statSync(filePath);
              return stats.size;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return 0;
            }
          },
          getPath() {
            return filePath;
          },
          clear(byteStart: number, byteLength: number) {
            try {
              return this.write(byteStart, new ArrayBuffer(byteLength));
            } catch (error: any) {
              console.error(error);
              return false;
            }
          },
          write(byteStart: number, data: ArrayBuffer) {
            try {
              fs.writeSync(
                fileHandlerId,
                new Uint8Array(data),
                0,
                data.byteLength,
                byteStart
              );
              return true;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return false;
            }
          },
          rename(newPath: string) {
            try {
              fs.renameSync(filePath, newPath);
              filePath = newPath;
              return true;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return false;
            }
          },
          move(newPath: string) {
            try {
              //   fs.unlinkSync(newPath);

              fs.renameSync(filePath, newPath);
              //  fs.unlinkSync(filePath);
              filePath = newPath;
              return true;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return false;
            }
          },
          reOpen() {
            try {
              fs.closeSync(fileHandlerId);
              fileHandlerId = fs.openSync(filePath, "r+");
              closed = false;
              return true;
            } catch (error: any) {
              return false;
            }
          },
          delete() {
            try {
              fs.closeSync(fileHandlerId);
              fs.unlinkSync(filePath);
              closed = true;
              return true;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return false;
            }
          },
          read(byteStart: number, byteLength: number) {
            try {
              const buffer = new ArrayBuffer(byteLength);
              fs.readSync(fileHandlerId, new Uint8Array(buffer), {
                length: byteLength,
                offset: 0,
                position: byteStart,
              });
              return buffer;
            } catch (error: any) {
              if (showErrors) {
                console.error(error);
              }
              return false;
            }
          },
          close() {
            if (closed) return;
            closed = true;
            fs.closeSync(fileHandlerId);
          },
        };
        return file;
      } catch (error: any) {
        if (showErrors) {
          console.error(error);
        }
        return false;
      }
    },
  },
};
