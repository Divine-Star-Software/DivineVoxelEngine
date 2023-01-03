import type * as FileSystem from "fs";

export const System = {
  fs: <typeof FileSystem>{},

  $INIT(fs: typeof FileSystem) {
    this.fs = fs;
  },

  openFile(path: string, showErrors = false) {
    try {
      const fileHandlerId = this.fs.openSync(path, "r+");
      const fs = this.fs;
      return {
        getSize() {
          try {
            const stats = fs.statSync(path);
            return stats.size;
          } catch (error: any) {
            if (showErrors) {
              console.error(error);
            }
            return 0;
          }
        },
        clear(byteStart: number, byteLength: number) {
          try {
            return this.write(byteStart, new ArrayBuffer(byteLength));
          } catch (error: any) {
            //     console.error(error);
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
          fs.closeSync(fileHandlerId);
        },
      };
    } catch (error: any) {
      if (showErrors) {
        console.error(error);
      }
      return false;
    }
  },
};
