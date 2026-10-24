# `@bomb.sh/args`

A <1kB library for parsing CLI flags. Inspired by Deno's `std/cli` [`parseArgs`](https://github.com/denoland/std/blob/main/cli/parse_args.ts) module.

### Features

🤏 very small

🍃 very simple

🏃 very fast (beats [`node:util`](https://nodejs.org/api/util.html#utilparseargsconfig))

🔏 strongly typed

### Usage

Basic usage does not require any configuration.

```js
import { parse } from "@bomb.sh/args";

// my-cli build --bundle -rf --a value --b=value --c 1
const argv = process.argv.slice(2);
const args = parse(argv);

console.log(args);
// { _: ['build'], bundle: true, r: true, f: true, a: "value", b: "value", c: 1 }
```

Parsing can be configured to ensure arguments are coerced to specific types, which enhances type safety.

```js
const args = parse(argv, {
  default: { a: 1, b: 2, c: "value" },
  alias: { h: "help" },
  boolean: ["foo", "bar"],
  string: ["baz", "qux"],
  array: ["input"],
});
```

## Benchmarks

```
name                     hz     min     max    mean     p75     p99    p995    p999     rme  samples
mri            2,359,009.67  0.0003  0.2093  0.0004  0.0005  0.0005  0.0006  0.0008  ±0.27%  2292741   fastest
@bomb.sh/args  2,069,310.53  0.0004  1.4586  0.0005  0.0005  0.0007  0.0007  0.0015  ±0.42%  1990450
minimist         621,719.19  0.0013  0.7790  0.0017  0.0016  0.0021  0.0022  0.0086  ±0.33%   601637
node:util        467,232.42  0.0018  3.8326  0.0022  0.0022  0.0027  0.0028  0.0035  ±0.97%   456879
yargs-parser      47,744.54  0.0181  0.4379  0.0213  0.0210  0.0293  0.0373  0.1160  ±0.26%    46963   slowest
```

## Acknowledgements

This package was previously published as `ultraflag` up until `v0.3.0`, when it was renamed to `@bomb.sh/args`.
