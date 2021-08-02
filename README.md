## @hyrious/version

### Usage

```js
import { version } from "@hyrious/version";
version();
// if process.argv.includes('--version'), print version and exit
```

```bash
node ./bin.js --version
0.1.0
```

**Configuration**

```js
import { version } from "@hyrious/version";
// manually set version number instead of infering from package.json.
version("0.1.0");
// get version number from another place, you can use async function here.
version(() => JSON.parse(fs.readFileSync(__dirname + "/package.json", "utf8")).version);
```

### License

MIT @ [hyrious](https://github.com/hyrious)
