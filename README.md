# Default Setup

Action, prompt, flow, and library DSL source for [AgentBuddy](https://github.com/spankyed/AgentBuddy). TypeScript source files are compiled into JSON artifacts that AgentBuddy loads at runtime.

## Prerequisites

- Node.js >= 23.0.0
- `npm install`

## Project Structure

```
default-setup/
  build/              # Compiler infrastructure (esbuild + TS AST extraction)
  defs/               # Auto-generated type definitions (synced from AgentBuddy API)
  docs/               # Authoring guides (WRITING-ACTIONS.md, WRITING-PROMPTS.md)
  src/
    actions/          # Action source files
    prompts/          # Prompt template source files
    flows/            # Flow DSL files
    library/          # Markdown docs compiled to JSON
    faqs/             # FAQ markdown files
    services/         # Service type stubs
    default-settings.ts  # Default settings source
    types.ts          # Shared type re-exports for authoring
    _examples/        # Reference examples (excluded from compilation)
  dist/               # Compiled JSON output (gitignored)
```

## Commands

```bash
npm run compile           # Compile all targets (actions, prompts, flows, library, notes)
npm run compile:actions   # Compile actions only
npm run compile:prompts   # Compile prompts only
npm run compile:flows     # Compile flows only
npm run compile:library   # Compile library markdown only
npm run typecheck         # Type-check all source files
npm run pipeline          # Full pipeline (compile all)
```

## Authoring

### Actions

Export `meta: ActionMeta` and `async function action(params, services, z, flowId)`.

```ts
import type { ActionMeta, Services, Z } from '../types'

export const meta: ActionMeta = { /* ... */ }
export async function action(params: any, services: Services, z: Z, flowId: string) { /* ... */ }
```

See `docs/WRITING-ACTIONS.md` for the full reference.

### Prompts

Export `meta: PromptMeta` and `function template(params, usePrompt)` (synchronous, returns a string).

```ts
import type { PromptMeta } from '../types'

export const meta: PromptMeta = { /* ... */ }
export function template(params: any, usePrompt: any) { /* ... */ }
```

See `docs/WRITING-PROMPTS.md` for the full reference.

### Flows

Default-export a `FlowDSL` object. Flows are dynamically imported (not bundled).

```ts
import type { FlowDSL } from './types'
export default { /* ... */ } satisfies FlowDSL
```

### Helpers

Any `.ts` file without `export const meta` is auto-detected as a helper and inlined into consumers at compile time via esbuild.

## Compiler Rules

- **No bare package imports** (`lodash`, `fs`, `zod`, etc.) — blocked by esbuild plugin
- **No Node.js globals**: `require()`, `process`, `__dirname`, `__filename`, `Buffer`, `global`
- `import type` is fine (stripped before bundling)
- Relative imports are allowed for helpers

## Importing into AgentBuddy

After compiling, import `dist/` via **AgentBuddy Settings → Import Setup Pack**.

## Syncing from AgentBuddy

Type definitions in `defs/` and source in `src/` are synced from the AgentBuddy monorepo:

```bash
# Run from the AgentBuddy repo root
npm run sync:external --workspace @app/default-setup
```
