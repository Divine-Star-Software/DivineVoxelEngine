import type * as FileSystem from "fs";
import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
export const DVEDSystem = {
  fs: <typeof FileSystem>{},

  setFS(fs: typeof FileSystem) {
    this.fs = fs;
  },

  mkdirs(paths: string[]) {
    for (const path of paths) {
      if (!this.fs.existsSync(path)) {
        this.fs.mkdirSync(path);
      }
    }
  },

  fileExists(path: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.fs.stat(path, (error, stats) => {
        if (error || stats.size < RegionHeaderData.byteSize) {
          resolve(0);
          return;
        }
        resolve(stats.size);
      });
    });
  },

  fileExistsSync(path: string) {
    try {
      const stat = this.fs.statSync(path);
      return stat.size;
    } catch (error: any) {
      return 0;
    }
  },

  createFileSync(path: string, data: ArrayBuffer) {
    try {
      this.fs.writeFileSync(path, new Uint8Array(data));
      return true;
    } catch (error: any) {
      return false;
    }
  },

  createFile(path: string, data: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(path, new Uint8Array(data), {}, (data) => {
        if (data?.errno != 0) {
          resolve(false);
        }
      });
    });
  },

  stringToUint8Array(string: string) {
    const array = new Uint8Array(string.length);
    for (let i = 0; array.length; i++) {
      array[i] = string[i].charCodeAt(0);
    }
  },

  writeAtByteIndex(path: string, start: number, data: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      try {
        this.fs.open(path, "r+", (err, fd) => {
          if (!err) {
            this.fs.write(
              fd,
              new Uint8Array(data),
              0,
              data.byteLength,
              start,
              (err, bytesWritten, buffer) => {
                if (!err) {
                  // succesfully wrote byte to offset
                  this.fs.close(fd, () => {
                    resolve(true);
                  });
                } else {
                  resolve(false);
                }
              }
            );
            return;
          }
          console.error(err);
          resolve(false);
        });
      } catch (error: any) {
        console.error(error);
        resolve(false);
      }
    });
  },
  readAtByteIndex(
    path: string,
    start: number,
    length: number
  ): Promise<Uint8Array | false> {
    return new Promise((resolve, reject) => {
      try {
        this.fs.open(path, "r", (err, fd) => {
          if (!err) {
            const storeBuffer = Buffer.alloc(length);
            this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
              if (!err) {
                this.fs.close(fd, () => {
                  resolve(new Uint8Array(storeBuffer));
                });
              } else {
                console.error(err);
                resolve(false);
              }
            });
            return;
          }
          console.error(err);
          resolve(false);
        });
      } catch (error: any) {
        console.error(error);
        resolve(false);
      }
    });
  },
  clearSector(path: string, start: number, sectors = 1) {
    const data = Buffer.alloc(SecotrData.byteSize);
    return new Promise((resolve, reject) => {
      try {
        this.fs.open(path, "r+", (err, fd) => {
          if (!err) {
            this.fs.write(
              fd,
              new Uint8Array(data),
              0,
              data.byteLength,
              start,
              (err) => {
                if (!err) {
                  // succesfully wrote byte to offset
                  this.fs.close(fd, () => {
                    resolve(true);
                  });
                } else {
                  console.error(err);
                  resolve(false);
                }
              }
            );
            return;
          }
          console.error(err);
          resolve(false);
        });
      } catch (error: any) {
        console.error(error);
        resolve(false);
      }
    });
  },
  writeToSector(path: string, start: number, data: ArrayBuffer) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.clearSector(
          path,
          start,
          SecotrData.getSectorsNeeded(data.byteLength)
        );
        this.fs.open(path, "r+", (err, fd) => {
          if (!err) {
            this.fs.write(
              fd,
              new Uint8Array(data),
              0,
              data.byteLength,
              start,
              (err) => {
                if (!err) {
                  this.fs.close(fd, () => {
                    resolve(true);
                  });
                } else {
                  console.error(err);
                  resolve(false);
                }
              }
            );
          }
        });
      } catch (error: any) {
        console.error(error);
        resolve(false);
      }
    });
  },
  readSectors(
    path: string,
    start: number,
    length: number
  ): Promise<Uint8Array | false> {
    return new Promise((resolve, reject) => {
      try {
       
        this.fs.open(path, "r", (err, fd) => {
          if (err) {
            console.error(err);
            resolve(false);
            return;
          }
          if (!err) {
            const storeBuffer = new Uint8Array(length);
     
            this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
              if (!err) {
                this.fs.close(fd, () => {
                  resolve(storeBuffer);
                });
              } else {
                console.error(err);
                resolve(false);
                return;
              }
            });
          }
        });
      } catch (error: any) {
        console.error(error);
        resolve(false);
      }
    });
  },
};
