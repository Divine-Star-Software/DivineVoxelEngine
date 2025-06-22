import { loadJson, writeJson } from "./Functions/Files.js";

export async function UpdateVersions() {
  const mainPackage = await loadJson<
    {
      workspaces: string[];
    } & PackageJsonType
  >("../../package.json");

  const packages: Record<string, PackageJsonType> = {};
  const packagePaths: Record<string, string> = {};
  for (const workspace of mainPackage.workspaces) {
    const path = `../../${workspace.replace("dist", "")}`;
    const packageJson = await loadJson<PackageJsonType>(`${path}/package.json`);
    packages[packageJson.name] = packageJson;
    packagePaths[packageJson.name] = path;
  }

  for (const pid in packages) {
    const packageData = packages[pid];
    for (const dependcie in packageData.dependencies) {
      if (mainPackage.dependencies[dependcie]) {
        packageData.dependencies[dependcie] =
          mainPackage.dependencies[dependcie];
        continue;
      }
      if (mainPackage.devDependencies[dependcie]) {
        packageData.devDependencies[dependcie] =
          mainPackage.devDependencies[dependcie];
        continue;
      }
      if (packages[dependcie]) {
        packageData.dependencies[dependcie] = `^${packages[dependcie].version}`;
        continue;
      }
    }

    await writeJson(
      `${packagePaths[packageData.name]}/package.json`,
      packageData
    );
  }
}
