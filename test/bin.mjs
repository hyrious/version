import { version } from "../index.mjs";

await version();

console.log("this line should never be reached if provided --version");
