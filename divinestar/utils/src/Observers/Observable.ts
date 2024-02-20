type ObservableFunction<T> = (data: T) => void;
type ObserverKeys = Object | string | Symbol | Function;
export class Observable<T = void> {
  observers = new Map<ObserverKeys, ObservableFunction<T>>();
  onceObservers: Function[] = [];
  constructor() {}

  subscribe(key: ObserverKeys, func: ObservableFunction<T>) {
    this.observers.set(key, func);
  }

  subscribeOnce(func: ObservableFunction<T>) {
    this.onceObservers.push(func);
  }

  unsubscribe(key: ObserverKeys) {
    this.observers.delete(key);
  }

  /**# notify
   * ---
   * Run each callback function.
   * @param data
   */
  notify(data: T) {
    this.observers.forEach((observer) => observer(data));
    while (this.onceObservers.length) {
      const observer = this.onceObservers.shift()!;
      observer(data);
    }
  }

  /**# notifyAsync
   * ---
   * Run each callback function with async/await.
   * @param data
   */
  async notifyAsync(data: T) {
    this.observers.forEach((observer) => observer(data));
    while (this.onceObservers.length) {
      const observer = this.onceObservers.shift()!;
      await observer(data);
    }
  }
}
