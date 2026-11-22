import { expect, it } from 'vitest';
import { registration } from '#generated/pack-entry.ts';
import manifest from '../apack.json';

it('generates a registration for the declared pack', () => {
  expect(registration.id).toBe(manifest.id);
});
