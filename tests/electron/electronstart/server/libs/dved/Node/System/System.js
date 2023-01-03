"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
exports.System = {
    fs: {},
    $INIT: function (fs) {
        this.fs = fs;
    },
    openFile: function (path, showErrors) {
        if (showErrors === void 0) { showErrors = false; }
        try {
            var fileHandlerId_1 = this.fs.openSync(path, "r+");
            var fs_1 = this.fs;
            return {
                getSize: function () {
                    try {
                        var stats = fs_1.statSync(path);
                        return stats.size;
                    }
                    catch (error) {
                        if (showErrors) {
                            console.error(error);
                        }
                        return 0;
                    }
                },
                clear: function (byteStart, byteLength) {
                    try {
                        return this.write(byteStart, new ArrayBuffer(byteLength));
                    }
                    catch (error) {
                        //     console.error(error);
                        return false;
                    }
                },
                write: function (byteStart, data) {
                    try {
                        fs_1.writeSync(fileHandlerId_1, new Uint8Array(data), 0, data.byteLength, byteStart);
                        return true;
                    }
                    catch (error) {
                        if (showErrors) {
                            console.error(error);
                        }
                        return false;
                    }
                },
                read: function (byteStart, byteLength) {
                    try {
                        var buffer = new ArrayBuffer(byteLength);
                        fs_1.readSync(fileHandlerId_1, new Uint8Array(buffer), {
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
                close: function () {
                    fs_1.closeSync(fileHandlerId_1);
                },
            };
        }
        catch (error) {
            if (showErrors) {
                console.error(error);
            }
            return false;
        }
    },
};
