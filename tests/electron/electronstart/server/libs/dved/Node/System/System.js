"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const SystemPath_js_1 = require("./SystemPath.js");
exports.System = {
    fs: {},
    $INIT(fs) {
        this.fs = fs;
        SystemPath_js_1.SystemPath.$INIT();
        this.mkdirs([SystemPath_js_1.SystemPath.getDataPath(), SystemPath_js_1.SystemPath.getTempPath()]);
    },
    updateFolder(folder) {
        SystemPath_js_1.SystemPath.setFolder(folder);
        this.mkdirs([SystemPath_js_1.SystemPath.getDataPath()]);
    },
    mkdirs(paths) {
        for (const path of paths) {
            if (!this.fs.existsSync(path)) {
                this.fs.mkdirSync(path, { recursive: true });
            }
        }
    },
    sync: {
        createFile(path, size = 0, mode = 0o777) {
            try {
                exports.System.fs.writeFileSync(path, new Uint8Array(size), { mode: mode });
                return true;
            }
            catch (error) {
                return false;
            }
        },
        createAndOpenFile(path, size = 0) {
            try {
                this.createFile(path, size);
                return this.openFile(path);
            }
            catch (error) {
                return false;
            }
        },
        openFile(filePath, showErrors = false) {
            try {
                const fs = exports.System.fs;
                let fileHandlerId = fs.openSync(filePath, "r+");
                let closed = false;
                const file = {
                    getSize() {
                        try {
                            const stats = fs.statSync(filePath);
                            return stats.size;
                        }
                        catch (error) {
                            if (showErrors) {
                                console.error(error);
                            }
                            return 0;
                        }
                    },
                    getPath() {
                        return filePath;
                    },
                    clear(byteStart, byteLength) {
                        try {
                            return this.write(byteStart, new ArrayBuffer(byteLength));
                        }
                        catch (error) {
                            console.error(error);
                            return false;
                        }
                    },
                    write(byteStart, data) {
                        try {
                            fs.writeSync(fileHandlerId, new Uint8Array(data), 0, data.byteLength, byteStart);
                            return true;
                        }
                        catch (error) {
                            if (showErrors) {
                                console.error(error);
                            }
                            return false;
                        }
                    },
                    rename(newPath) {
                        try {
                            fs.renameSync(filePath, newPath);
                            filePath = newPath;
                            return true;
                        }
                        catch (error) {
                            if (showErrors) {
                                console.error(error);
                            }
                            return false;
                        }
                    },
                    move(newPath) {
                        try {
                            //   fs.unlinkSync(newPath);
                            fs.renameSync(filePath, newPath);
                            //  fs.unlinkSync(filePath);
                            filePath = newPath;
                            return true;
                        }
                        catch (error) {
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
                        }
                        catch (error) {
                            return false;
                        }
                    },
                    delete() {
                        try {
                            fs.closeSync(fileHandlerId);
                            fs.unlinkSync(filePath);
                            closed = true;
                            return true;
                        }
                        catch (error) {
                            if (showErrors) {
                                console.error(error);
                            }
                            return false;
                        }
                    },
                    read(byteStart, byteLength) {
                        try {
                            const buffer = new ArrayBuffer(byteLength);
                            fs.readSync(fileHandlerId, new Uint8Array(buffer), {
                                length: byteLength,
                                offset: 0,
                                position: byteStart,
                            });
                            return buffer;
                        }
                        catch (error) {
                            if (showErrors) {
                                console.error(error);
                            }
                            return false;
                        }
                    },
                    close() {
                        if (closed)
                            return;
                        closed = true;
                        fs.closeSync(fileHandlerId);
                    },
                };
                return file;
            }
            catch (error) {
                if (showErrors) {
                    console.error(error);
                }
                return false;
            }
        },
    },
};
