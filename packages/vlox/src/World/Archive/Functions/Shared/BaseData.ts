import { WorldSpaces } from "../../../WorldSpaces";
import {
  ArchivedDataKey,
  BaseArchivedDataBase,
} from "../../Types/Archive.types";
import { EngineSettings } from "../../../../Settings/EngineSettings";
export function getCurrentDataKey(): ArchivedDataKey {
  return {
    sectorSize: { ...WorldSpaces.sector.bounds },
    sectionSize: { ...WorldSpaces.section.bounds },
    sectionIndexOrder: "YXZ",
    sectionBuffersIndexOrder: {
      id: "YXZ",
      light: "YXZ",
      level: "YXZ",
      secondary: "YXZ",
    },
  };
}

export function getBaseData(dimension: string): BaseArchivedDataBase {
  return {
    dimension,
    formatVersion: "",
    engineVersion: EngineSettings.version,
    dataKey: getCurrentDataKey(),
  };
}
