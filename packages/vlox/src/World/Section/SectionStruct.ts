import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { WorldSpaces } from "../WorldSpaces.js";
import { SectionStructProperties } from "./SectionStructProperties.js";
import { Section } from "./Section.js";

const SectionStateStruct = new BinaryStruct("section-tags");

export interface SectionStruct {
  [SectionStructProperties.minHeight]: number;
  [SectionStructProperties.maxHeight]: number;
  [SectionStructProperties.heightMap]: number[];
  [SectionStructProperties.dirtyMap]: number[];
}

SectionStateStruct.registerProperty(
  {
    id: SectionStructProperties.minHeight,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint8,
  },
  {
    id: SectionStructProperties.maxHeight,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint8,
  }
);

export function InitalizeSectionTags() {
  SectionStateStruct.registerProperty(
    {
      id: SectionStructProperties.heightMap,
      type: "bit-array",
      length: WorldSpaces.section.getHeight(),
    },
    {
      id: SectionStructProperties.dirtyMap,
      type: "bit-array",
      length: WorldSpaces.section.getHeight(),
    }
  );

  const initData = SectionStateStruct.init({
    indexBufferMode: "shared",
  });

  Section.StateStruct.init(initData);
}
