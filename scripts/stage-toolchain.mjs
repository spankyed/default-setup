// Phase 0 obtains the pack author's npm packages from apack's staged publication trees.
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const checkout = process.argv[2];
if (!checkout) throw new Error('Usage: npm run toolchain -- <prepared-apack-checkout>');
const destination = resolve('.apack/toolchain');
mkdirSync(destination, { recursive: true });
const npm = process.env.npm_execpath;
for (const tree of ['apack-sdk/publish', 'apack-cli/dist/package', 'apack-testing/dist/package']) {
  const cwd = resolve(checkout, 'packages', tree);
  if (!existsSync(join(cwd, 'package.json'))) {
    throw new Error('Missing ' + cwd + '. Run npm run packages:ensure in the apack checkout.');
  }
  execFileSync(process.execPath, [npm, 'pack', '--silent', '--pack-destination', destination], { cwd, stdio: 'inherit' });
}
