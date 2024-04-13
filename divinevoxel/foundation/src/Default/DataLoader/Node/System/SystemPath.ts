import * as path from "path";
export const SystemPath = {
  _dataPath: "",
  _dataFolder: "dved",
  _folder: "test",
  _tempPath: "/",
  setFolder(folder : string) {
    this._folder = folder;
  },
  getDataPath() {
    return path.join(this._dataPath, this._dataFolder);
  },
  getDataDirectory(fileName  = "") {
    return path.join(this._dataPath, this._dataFolder, this._folder, fileName);
  },
  getDirecoty(fileName  = "") {
    return path.dirname(fileName);
  },
  getTempPath(fileName: string = "") {
    return path.join(`${this._tempPath}/${this._dataFolder}`, fileName);
  },
  $INIT() {
    this._dataPath =
      process.env.APPDATA ||
      (process.platform == "darwin"
        ? process.env.HOME + "/Library/Preferences"
        : process.env.HOME + "/.local/share");
  },
};
