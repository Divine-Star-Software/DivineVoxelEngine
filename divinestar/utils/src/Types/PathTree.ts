type PathTreeNode<T> = {
  [P in keyof T]-?: T[P] extends object ? [P] | [P, ...PathTree<T[P]>] : [P];
};

export type PathTree<T> = PathTreeNode<T>[keyof T];
