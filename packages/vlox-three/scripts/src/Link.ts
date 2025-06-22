import { UpdateVersions } from "./UpdateVersions.js";
import { loadJson, writeJson } from "./Functions/Files.js";
import { runCommand } from "./Functions/RunCommand.js";

const includedScopes = ["@amodx","@babylonjs"];

export async function LinkAll() {
  const mainPackage = await loadJson<
    {
      workspaces: string[];
    } & PackageJsonType
  >("../../package.json");

  let linkCommand = `cd ../../ ; npm link `;

  for (const d in mainPackage.dependencies) {
    if (includedScopes.some((_) => d.includes(_))) {
      linkCommand += `${d} `;
    }
  }

  console.log(linkCommand);
  runCommand(linkCommand);
}
