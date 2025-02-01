import { Vec3Array } from "@amodx/math";
import { LocationData } from "../../Math";
import { $2dMooreNeighborhood } from "../../Math/CardinalNeighbors";
import { SectionHeightMap } from "../Section/SectionHeightMap";
import { WorldRegister } from "../WorldRegister";
import { WorldSpaces } from "../WorldSpaces";

export class SectorHeightMap {
  static getRelative(location: LocationData) {
    location = [...location];
    const sectionWidth = WorldSpaces.section.bounds.x;
    const sectionDepth = WorldSpaces.section.bounds.z;
    let maxHeight = -Infinity;
    const [dimension, x, y, z] = location;
    for (const check of $2dMooreNeighborhood) {
      location[1] = check[0] * sectionWidth + x;
      location[3] = check[1] * sectionDepth + z;
      const height = this.getAbsolute(location);
      if (height > maxHeight) {
        maxHeight = height;
      }
    }
    return maxHeight;
  }
  static getAbsolute(location: LocationData) {
    const sector = WorldRegister.sectors.get(
      location[0],
      location[1],
      location[2],
      location[3]
    );
    if (!sector) return WorldSpaces.world.bounds.MinY;
    if (sector.sections.length == 0) return WorldSpaces.world.bounds.MinY;
    let maxHeight = WorldSpaces.world.bounds.MinY;
    const positon: Vec3Array = [location[1], location[2], location[3]];
    let y = positon[1];
    for (let i = 0; i < sector.sections.length; i++) {
      const section = sector.sections[i];
      if (!section) continue;

      SectionHeightMap.setSection(section);

      const sectionPOS = y + i * WorldSpaces.section.bounds.y;

      let [sectionMin, sectionMax] = SectionHeightMap.getMinMax();
      if (Math.abs(sectionMax) == Infinity) continue;
      sectionMax = sectionPOS + sectionMax;
      if (maxHeight < sectionMax) {
        maxHeight = sectionMax;
      }
    }

    return maxHeight + 1;
  }
}
