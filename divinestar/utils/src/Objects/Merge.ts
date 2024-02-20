export function MregePartial(write: any, read: any) {
  const travserse = (write: any, read: any) => {
    for (const key in read) {
      if (write[key] === undefined) continue;
      const readData = read[key];
      const writeData = write[key];
      if (typeof writeData == "object") {
        travserse(writeData, readData);
        continue;
      }
      write[key] = read[key];
    }
  };

  travserse(write, read);

  return write;
}
