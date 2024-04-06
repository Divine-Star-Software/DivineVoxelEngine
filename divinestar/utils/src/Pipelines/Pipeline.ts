type SyncPipelineFunction<T> = (data: T) => T;
type AsyncPipelineFunction<T> = (data: T) => Promise<T> | T;
export type PipelineKeys = Object | string | Symbol | Function;

export class Pipeline<T extends any = {}> {
  private pipes = new Map<PipelineKeys, SyncPipelineFunction<T>>();

  constructor() {}

  regiser(key: PipelineKeys, func: SyncPipelineFunction<T>) {
    this.pipes.set(key, func);
  }

  unRegister(key: PipelineKeys) {
    this.pipes.delete(key);
  }

  pipe(data: T) {
    for (const [key, pipe] of this.pipes) {
      data = pipe(data);
    }
    return data;
  }
}
export class AsyncPipeline<T extends any = {}> {
  private pipes = new Map<PipelineKeys, AsyncPipelineFunction<T>>();

  constructor() {}

  regiser(key: PipelineKeys, func: AsyncPipelineFunction<T>) {
    this.pipes.set(key, func);
  }

  unRegister(key: PipelineKeys) {
    this.pipes.delete(key);
  }

  async pipe(data: T) {
    for (const [key, pipe] of this.pipes) {
      data = await pipe(data);
    }
    return data;
  }
}
