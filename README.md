# Default Setup

Default Setup is an ordinary apack pack. It contains the starter features, flow steps and content used by the official app. Its pack ID is `default-setup`.

This transfer starts from [apack d54dcff6f3](https://github.com/spankyed/apack/tree/d54dcff6f3538f02cf4ed81025e97b2b735e47f3/packages/default-setup). The official app still uses its in-tree copy until its distribution pins a published archive. Until that cutover, record fixes made to the old workspace and bring them over before publishing.

## Build and test

Use Node 24.12 or later, npm 11, and the GitHub CLI. Stage the exact toolchain in `toolchain.lock.json` before installing.

```sh
npm run toolchain
npm ci
npm run validate
npm run typecheck
npm run build
npm run facade:check
npm test
npm run archive
```

The current lock points to a verified local candidate. Until the hosted toolchain is published, use `npm run toolchain -- /path/to/staged-toolchain` with the candidate directory. This path checks the same hashes as the hosted path. All later commands use the project-local CLI, with no sibling checkout or globally installed apack required.

Use `npm run dev -- --host /path/to/apack` to work against a selected host. Use a disposable profile when testing this pack alongside the app's shipped copy, since both use the same pack ID.

## Release

The release-candidate workflow runs the pack checks and saves the ordinary archive, its checksum and the source credits for inspection. It uses the same toolchain lock as local development. Publishing the first production release requires an approved hosted toolchain, the complete redistribution inventory and an explicit publication decision.
