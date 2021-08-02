"use strict";

const fs = require("fs");
const path = require("path");
const callerPath = require("caller-path");

/** @returns {string | undefined} */
function lookup(/** @type {string} */ dir) {
  const file = path.join(dir, "package.json");
  if (fs.existsSync(file)) return file;
  const parent = path.dirname(dir);
  if (parent !== dir) return lookup(parent);
}

/** @returns {string} */
function getVersionFromPackage() {
  const pkgPath = lookup(path.dirname(callerPath()));
  if (!pkgPath) throw new Error("Not found package.json.");
  return JSON.parse(fs.readFileSync(pkgPath)).version;
}

exports.version = async function version(config) {
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
};
