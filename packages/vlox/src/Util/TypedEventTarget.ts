export class TypedEventTarget<
  T extends Record<string, any>,
> extends EventTarget {
  createEventListener<K extends keyof T>(
    type: K,
    listener: ((event: CustomEvent<T[K]>) => void) | EventListenerObject | null
  ): ((event: CustomEvent<T[K]>) => void) | EventListenerObject | null {
    return listener;
  }
  addEventListener<K extends keyof T>(
    type: K,
    listener: ((event: CustomEvent<T[K]>) => void) | EventListenerObject | null,
    options?: AddEventListenerOptions
  ) {
    super.addEventListener(type as string, listener as EventListener, options);
  }

  removeEventListener<K extends keyof T>(
    type: K,
    listener: ((event: CustomEvent<T[K]>) => void) | EventListenerObject | null
  ) {
    super.removeEventListener(type as string, listener as EventListener);
  }

  dispatch<K extends keyof T>(type: K, detail: T[K]) {
    super.dispatchEvent(new CustomEvent<T[K]>(type as string, { detail }));
    return true;
  }
}
