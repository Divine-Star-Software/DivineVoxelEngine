class GeomtryStats {
  /**The total geomtry faces */
  faces = 0;
}

class PaletteStats {
  /**The final voxel palette id size. */
  paletteSize = 0;
}

/**
 * Stores data from the results of the engine building data and other things.
 */
export class EngineStats {
  /** Stats to do with the vlox model system. */
  static geomtry = new GeomtryStats();
  /** Stats to do with the vloxel palette system. */
  static palette = new PaletteStats();

  static log() {
    let output = "DVE Stats\n";

    //geomtry
    output += "Geomtry\n";
    output += `Faces: ${this.geomtry.faces}\n`;

    //palettes
    output += "Palette\n";
    output += `Paltte Size: ${this.palette.paletteSize}\n`;

    return output;
  }
}
