export const WeightedRandom = {
  getIndex(data: RandomWeights<any>, n = Math.random()) {
    if (data.length <= 1) return 0;
    const weights: number[] = [];
    let cumaltive = 0;
    for (const [id, weight] of data) {
      cumaltive += weight;
      weights.push(cumaltive);
    }
    const pick = (n * cumaltive) >> 0;
    let i = 0;
    for (const w of weights) {
      if (pick <= w) {
        break;
      }
      i++;
    }
    return i;
  },
  getValue(data: RandomWeights<any>, n = Math.random()) {
    const index = this.getIndex(data, n);
    return data[index][0];
  },
};

export type RandomWeights<T> = [data: T, weight: number][];
