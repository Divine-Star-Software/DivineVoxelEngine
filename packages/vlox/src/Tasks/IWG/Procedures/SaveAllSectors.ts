import { WorldRegister } from "../../../World/WorldRegister";
import { IWGDimensions } from "../Internal/IWGDimensions";
import { IWGTools } from "../Internal/IWGTools";
/**# Save All Sectors
 * ---
 * Save all sectors that are loaded.
 */
export default async function SaveAllSectors() {
  const worldStorage = IWGTools.worldStorage;
  if (!worldStorage) return;
  const proms: Promise<any>[] = [];
  for (const [dimensionId] of IWGDimensions._dimensions) {
    const dimension = WorldRegister.dimensions.get(dimensionId)!;
    for (const [key, sector] of dimension.sectors) {
      proms.push(worldStorage.saveSector([dimensionId, ...sector.position]));
    }
  }
  await Promise.all(proms);
}
