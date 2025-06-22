import { UpgradeVersionsPublishall } from "./UpgradeVersionsPublishall.js";
import { UpdateVersions } from "./UpdateVersions.js";
import { Publishall } from "./Publishall.js";
import { LinkAll } from "./Link.js";

const arags = process.argv;

const flag = arags[2];
(async () => {
  if (flag == "-update:versions") {
    UpdateVersions();
  }
  if (flag == "-link") {
    LinkAll();
  }
  if (flag == "-upgrade:versions:publish:all") {
    UpgradeVersionsPublishall();
  }
  if (flag == "-publish:all") {
    Publishall();
  }
})();

console.log(flag);
