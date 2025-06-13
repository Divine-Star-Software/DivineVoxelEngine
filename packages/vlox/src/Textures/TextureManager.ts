import { WorkItemProgress } from "../Util/WorkItemProgress.js";
import { CompiledTexture } from "./Classes/CompiledTexture.js";
import {
  BuildTextureData,
  BuildTextureDataProps,
} from "./Functions/BuildTextureData.js";
import type { TextureData } from "./Texture.types";
const missingTexture: TextureData = {
  id: "dve_missing",
  base64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAEsGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjE2IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTYiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIxNiIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMTYiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLzEiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLzEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDItMDRUMTM6MjY6MzYtMDU6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDItMDRUMTM6MjY6MzYtMDU6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgUGhvdG8gMS4xMC42IgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAyLTA0VDEzOjI2OjM2LTA1OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz6QxtZwAAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kb9LQlEUxz9qYfQDAyMaGiSsKcMMpJYGoyyoBjPIatHnr0Dt8Z4R0Rq0CgVRS7+G+gtqDZqDoCiCaK61qKXkdZ4KSuS5nHs+93vvOdx7LljDGSWrN3ghm8troWDAtRBZdNnfsGLDSSe9UUVXZ+YmwtS1rwcsZrzzmLXqn/vXWuIJXQFLk/Coomp54Unh6fW8avKucIeSjsaFz4X7Nbmg8L2px8r8anKqzD8ma+HQGFjbhV2pGo7VsJLWssLyctzZzJpSuY/5ktZEbn5OYo94NzohggRwMcU4Y/gZZERmPx58DMiKOvneUv4sq5KryKyygcYKKdLk6Rd1TaonJCZFT8jIsGH2/29f9eSQr1y9NQCNL4bx0Qv2HSgWDOP72DCKJ2B7hqtcNX/1CIY/RS9UNfchOLbg4rqqxfbgchu6ntSoFi1JNnFrMgnvZ9AWAectNC+Ve1bZ5/QRwpvyVTewfwB9ct6x/AtRCWfcDyqUNQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACRJREFUKJFjPMWAHZjhEGfCIY4TjGogBjDiksAVP4PQD8NBAwBeSgHpmKHwOgAAAABJRU5ErkJggg==",
};
export class TextureManager {
  static _textureTypes = new Map<string, TextureData[]>();
  static _compiledTextures = new Map<string, CompiledTexture>();
  static registerTexture(textureData: TextureData[]) {
    for (const texture of textureData) {
      const typeId = texture.type || "dve_voxel";
      let type = this._textureTypes.get(typeId);
      if (!type) {
        type = [missingTexture];
        this._textureTypes.set(typeId, type);
      }
      type.push(texture);
    }
  }
  static getTexture(id: string) {
    const type = this._compiledTextures.get(id);
    if (!type) throw new Error(`Compiled texture with id ${id} does not exist`);
    return type;
  }

  static async compiledTextures(
    props: Omit<BuildTextureDataProps, "textures" | "type"> = {},
    progress = new WorkItemProgress()
  ) {
    for (const [type, data] of this._textureTypes) {
      progress.setStatus(`Building Texture Type ${type}`);
      progress.setWorkLoad(data.length);
      const compiled = await BuildTextureData(
        {
          type,
          textures: data,
          ...props,
        },
        progress
      );
      this._compiledTextures.set(type, compiled);
    }
  }
}
