import { WorldRegister } from "../../../World/WorldRegister";
import { IWGDimensions } from "../Internal/IWGDimensions";
import { IWGTools } from "../Internal/IWGTools";
/**# Save All Columns
 * ---
 * Save all columns that are loaded.
 */
export default async function SaveAllColumns() {
  const worldStorage = IWGTools.worldStorage;
  if (!worldStorage) return;
  const proms: Promise<any>[] = [];
  for (const [dimensionId] of IWGDimensions._dimensions) {
    const dimension = WorldRegister.dimensions.get(dimensionId)!;
    for (const [key, column] of dimension.columns) {
      proms.push(worldStorage.saveColumn([dimensionId, ...column.position]));
    }
  }
  await Promise.all(proms);
}
