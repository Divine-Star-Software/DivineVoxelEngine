export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export interface NumberArray {
  length: number;
  [key: number]: number;
}
