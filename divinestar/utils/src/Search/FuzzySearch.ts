export class FuzzySearch {
  private static _process(input: string): string[] {
    input = input.trim().toLowerCase().replace(/[_#]/g, " ");
    return input.split(/\s+/);
  }

  private static _compareBool(
    string: string,
    compare: string,
    ratio = 0.5
  ): boolean {
    string = string.toLowerCase();
    compare = compare.toLowerCase();
    if (string.includes(compare)) return true;

    let matches = 0;
    for (let char of compare) {
      if (string.includes(char)) matches += 1;
      else matches -= 1;
    }
    return matches / string.length >= ratio || compare === "";
  }
  private static _compareNumber(string: string, compare: string): number {
    string = string.toLowerCase();
    compare = compare.toLowerCase();
    if (string === compare) return 1; // Exact match

    let matches = 0;
    for (let char of compare) {
      if (string.includes(char)) matches += 1;
      else matches -= 1;
    }
    // Return a normalized score between 0 and 1
    return Math.max(0, matches / Math.max(string.length, compare.length));
  }

  private static _processStrings(strings: string[]): string[] {
    return strings.flatMap((s) => this._process(s));
  }

  static fuzzyHas(haystack: string[], needle: string[]): boolean {
    haystack = this._processStrings(haystack);
    needle = this._processStrings(needle);

    for (let node of haystack) {
      for (let search of needle) {
        if (
          node === search ||
          node.includes(search) ||
          this._compareBool(search, node)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  static fuzzySearch(haystack: string[], needle: string[]): string[] {
    haystack = this._processStrings(haystack);
    needle = this._processStrings(needle);

    const matches: string[] = [];
    for (let node of haystack) {
      for (let search of needle) {
        if (
          node === search ||
          node.includes(search) ||
          this._compareBool(search, node)
        ) {
          matches.push(node);
        }
      }
    }
    return matches;
  }

  static fuzzyCloseMatch(
    haystack: string[],
    needle: string[],
    overallRatio = 0.5
  ): boolean {
    haystack = this._processStrings(haystack);
    needle = this._processStrings(needle);

    let totalScore = 0;
    let comparisons = 0;

    for (let node of haystack) {
      for (let search of needle) {
        const score = this._compareNumber(node, search);
        totalScore += score;
        comparisons += 1;
      }
    }

    if (comparisons === 0) return false; // Avoid division by zero

    // Calculate the average score and compare with the overallRatio threshold
    const averageScore = totalScore / comparisons;
    return averageScore >= overallRatio;
  }
}
