import { StringPalette } from "../../Util/StringPalette";
export class SubstancePalette {
  static palette: StringPalette;
  static setPalette(palette: string[]) {
    this.palette = new StringPalette(palette);
  }
  static id = {
    stringFromNumber: (id: number) => this.palette.getStringId(id),
    numberFromString: (id: string) => this.palette.getNumberId(id),
  };
}
