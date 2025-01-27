export class ColumnState {
  isLoaded = true;
  isGenerated = true;


  genAlldone = true;
  allLoaded = true;
  nWorldGenAllDone = true;
  nDecorAllDone = true;
  nSunAllDone = true;
  nPropagtionAllDone = true;
  resset() {
    this.isLoaded = true;
    this.isGenerated = true;
    this.genAlldone = true;
    this.allLoaded = true;
    this.nWorldGenAllDone = true;
    this.nDecorAllDone = true;
    this.nSunAllDone = true;
    this.nPropagtionAllDone = true;
  }
}
