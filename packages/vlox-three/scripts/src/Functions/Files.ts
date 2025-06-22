import fs from "fs/promises";
export const loadJson = async <T extends any>(path: string): Promise<T> => {
    const raw = await fs.readFile(path, {
      encoding: "utf8",
    });
    return JSON.parse(raw)! as T;
  };
  
 export const writeJson = async (path: string, data: any) => {
    await fs.writeFile(path, JSON.stringify(data, null, 1));
  };