import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";
import { MooreNeighborhood2D } from "../../Math/CardinalNeighbors";
import { WorldRegister } from "../WorldRegister";
import { WorldSpaces } from "../WorldSpaces";

export class SectorHeightMap {
  static getRelative(location: LocationData) {
    location = [...location];
    const sectionWidth = WorldSpaces.section.bounds.x;
    const sectionDepth = WorldSpaces.section.bounds.z;
    let maxHeight = -Infinity;
    const [dimension, x, y, z] = location;
    for (const check of MooreNeighborhood2D) {
      location[1] = check[0] * sectionWidth + x;
      location[3] = check[1] * sectionDepth + z;
      const height = this.getAbsolute(...location);
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    return maxHeight;
  }
  static getAbsolute(dimension: number, x: number, sy: number, z: number) {
    const sector = WorldRegister.sectors.get(dimension, x, sy, z);
    if (!sector) return WorldSpaces.world.bounds.MinY;
    if (sector.sections.length == 0) return WorldSpaces.world.bounds.MinY;
    let maxHeight = WorldSpaces.world.bounds.MinY;
    const positon: Vec3Array = [x, sy, z];
    let y = positon[1];
    for (let i = 0; i < sector.sections.length; i++) {
      const section = sector.sections[i];
      if (!section) continue;

      const sectionPOS = section.getPosition();

      let [sectionMin, sectionMax] = section.getMinMax();
      if (Math.abs(sectionMax) == Infinity) continue;
      sectionMax = sectionPOS[1] + sectionMax;
      if (maxHeight < sectionMax) {
        maxHeight = sectionMax;
      }
    }

    return maxHeight + 1;
  }
}
