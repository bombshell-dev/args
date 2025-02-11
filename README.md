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
mri               x 1,650,986 ops/sec ±0.32% (97 runs sampled)
@bomb.sh/args     x 1,407,191 ops/sec ±0.38% (99 runs sampled)
minimist          x 383,506 ops/sec ±0.28% (99 runs sampled)
node:util         x 320,953 ops/sec ±0.35% (98 runs sampled)
yargs-parser      x 31,874 ops/sec ±1.32% (92 runs sampled)
```

## Acknowledgements

This package was previously published as `ultraflag` up until `v0.3.0`, when it was renamed to `@bomb.sh/args`.
