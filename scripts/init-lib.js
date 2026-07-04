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


execSync(`npm init -y --scope ${scope} -w ${distPath}`, { stdio: "inherit" });
