import { Traverse } from "../Objects/Traverse.js";

export interface PathObject {
  [key: string]: any;
  getPath<T>(path: string[]): T | null;
  setPath(path: string[], value: any): void;
}

export class PathObject {
  getPath<T>(path: string[]): T | null {
    let current = this;
    for (const key of path) {
      current = current[key];
    }
    return current ? (current as any) : null;
  }
  setPath(path: string[], value: any) {
    let current = this;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
    }
    current[path[path.length - 1]] = value;
    return value;
  }
  traverse(run: (key: string, data: any) => void|null) {
    Traverse(this, (key, data, depth) => {
      if (depth == 0) {
        if (key == "setPath" || key == "traverse" || key == "getPath") return;
        return run(key,data);
      }
    });
  }
}

export const createPathObject = (): PathObject => {
  return new PathObject();
};
