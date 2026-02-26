# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

RVMarket is a Next.js 16 (App Router) marketplace for buying/selling recreational vehicles. All data is static (hardcoded in `lib/rv-data.ts`). No database, no API routes, no auth, no environment variables needed.

### Running the app

- **Dev server**: `npm run dev` (port 3000)
- **Lint**: `npm run lint` (ESLint)
- **Build**: `npm run build`

See `README.md` for standard Next.js commands.

### Known issues

- `npm run build` fails with a pre-existing TypeScript error: `listing.deal` is used in `app/listing/[id]/page.tsx` but `deal` is not defined on the `RVListing` interface in `lib/rv-data.ts`. The dev server still works fine.
- ESLint reports pre-existing warnings/errors (unused vars, unescaped entities, setState in effect). These are in the original v0-generated code.

### Dependencies note

The `package.json` is missing `eslint`, `eslint-config-next`, and `radix-ui` as explicit dependencies. These are installed via `npm install` using the lockfile. If the lockfile gets regenerated, these packages may need to be re-added.
