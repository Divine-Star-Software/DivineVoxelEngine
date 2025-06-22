// scripts/init-lib.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const libPath = process.argv[2];
const distPath = `${libPath}/dist`;
const scope = process.argv[3];
console.log(distPath, scope);
if (!libPath || !scope) {
  console.error("Usage: npm run init:lib -- <dist-path> <scope>");
  process.exit(1);
}
fs.mkdirSync(distPath, { recursive: true });

try {
  execSync(`npm run build`, {
    cwd: libPath,
    stdio: "inherit",
  });
} catch (error) {
  console.error(error);
}

// Patch package.json
const pkgPath = path.join(distPath, "package.json");
console.log(pkgPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
delete pkg.dependencies;
delete pkg.devDependencies;
delete pkg.peerDependencies;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`Cleaned dependencies from ${pkgPath}`);

execSync(`npm init -y --scope ${scope} -w ${distPath}`, { stdio: "inherit" });
