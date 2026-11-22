import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [localDirectory, ...extra] = process.argv.slice(2);
if (extra.length) throw new Error('Usage: npm run toolchain -- [verified-toolchain-directory]');

const root = fileURLToPath(new URL('..', import.meta.url));
const lock = JSON.parse(readFileSync(join(root, 'toolchain.lock.json'), 'utf8'));
const destination = join(root, '.apack', 'toolchain', lock.tag);
const scratch = mkdtempSync(join(tmpdir(), 'default-setup-toolchain-'));
const files = Object.values(lock.packages);

try {
  if (localDirectory) {
    for (const { file } of files) copyFileSync(join(resolve(localDirectory), file), join(scratch, file));
  } else {
    execFileSync('gh', ['release', 'download', lock.tag, '--repo', 'spankyed/apack', '--dir', scratch,
      ...files.flatMap(({ file }) => ['--pattern', file])], { stdio: 'inherit' });
  }
  for (const { file, sha256 } of files) {
    const actual = createHash('sha256').update(readFileSync(join(scratch, file))).digest('hex');
    if (actual !== sha256) throw new Error(`Toolchain checksum mismatch for ${file}`);
  }
  mkdirSync(destination, { recursive: true });
  for (const { file } of files) copyFileSync(join(scratch, file), join(destination, file));
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
