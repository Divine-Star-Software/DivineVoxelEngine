export class AsyncHook<T, K> {
    _onRun: ((data: T) => Promise<K | false>)[] = [];
    async run(data: T): Promise<K | false> {
     let returnData: any = false;
     for (const run of this._onRun) {
      returnData = await run(data);
     }
     return returnData;
    }
    addToRun(run: (data: T) => Promise<K | false>) {
     this._onRun.push(run);
    }
   }
   