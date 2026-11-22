# Default Setup

This repository will own the starter pack shipped with apack. Phase 0 establishes its manifest, local CLI, tests, and archive build. The app still ships the implementation in `packages/default-setup` in the apack repository. Both use the ID `default-setup`. Use a disposable profile for experiments with this scaffold.

## Build from a clean checkout

Use Node 24.12 or later and npm 11. Phase 0 uses the staged npm packages from an apack checkout. The lockfile was generated with apack commit `19adecce0dea21a81412bcd35528af85a29d36b9`. Prepare that checkout with `npm ci` and `npm run packages:ensure`, then run these commands here. The checkout can be anywhere.

```sh
npm run toolchain -- /path/to/apack
npm ci
npm run validate
npm run typecheck
npm test
npm run build
npm run facade:check
npm run archive
```

The first command creates three local npm tarballs in `.apack/toolchain/`. The lockfile checks their integrity. All subsequent commands use the installed project-local toolchain. The build writes `dist/`. The archive command writes an installable pack and its checksum under `.apack/archives/`.

## Extraction plan

1. Establish an installable pack with an empty feature set in this repository. Keep the pre-pack implementation in Git history at `482bc73`.
2. Make the desktop build consume verified release layouts. Prove it with the existing starter, a different pack ID, and an empty selection. Exercise offline startup, replacement, and upgrades.
3. Provide immutable, independently retrievable toolchain packages and enable clean-runner CI. Port features, content, tests, and redistribution notices from the current in-app pack. Compare behavior in isolated host profiles.
4. Publish the first complete starter release, pin its archive and digest in the app, and validate packaged builds on the shipping platforms before removing the monorepo copy.

A Phase 0 archive exercises the release format. The first release intended for app distribution comes after feature migration and acceptance.
