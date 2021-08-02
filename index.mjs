import fs from "fs";
import url from "url";
import path from "path";
import callerPath from "caller-path";

/** @returns {string | undefined} */
function lookup(/** @type {string} */ dir) {
  const file = path.join(dir, "package.json");
  if (fs.existsSync(file)) return file;
  const parent = path.dirname(dir);
  if (parent !== dir) return lookup(parent);
}

/** @returns {string} */
function getVersionFromPackage() {
  const pkgPath = lookup(path.dirname(url.fileURLToPath(callerPath({ depth: 1 }))));
  if (!pkgPath) throw new Error("Not found package.json.");
  return JSON.parse(fs.readFileSync(pkgPath)).version;
}

export async function version(config) {
  if (process.argv.includes("--version")) {
    if (typeof config === "string") {
      console.log(config);
    } else if (typeof config === "function") {
      console.log(await config());
    } else {
      console.log(getVersionFromPackage());
    }
    process.exit(0);
  }
}
