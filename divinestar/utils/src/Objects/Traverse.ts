export function Traverse(
  read: any,
  run: (key: string, data: any, depth: number) => null | void,
  maxDepth = Infinity
) {
  const travserse = (read: any, depth: number) => {
    if (depth > maxDepth) return;
    for (const key in read) {
      if (read[key] === undefined) continue;
      const readData = read[key];
      const ran = run(key, readData, depth);
      if (ran === null) break;
      if (typeof readData == "object") {
        travserse(readData, depth + 1);
        continue;
      }
    }
  };

  travserse(read, 0);
}
