import { UpdateVersions } from "./UpdateVersions.js";
import { loadJson } from "./Functions/Files.js";
import { runCommand } from "./Functions/RunCommand.js";

export async function Publishall() {
  const mainPackage = await loadJson<
    {
      workspaces: string[];
    } & PackageJsonType
  >("../../package.json");

  await UpdateVersions();
  for (const workspace of mainPackage.workspaces) {
    const path = `../../${workspace}`;
    await runCommand(`npm publish ${path}`);
  }
}
