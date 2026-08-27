# Atlas MF

**Pulse** — an incident response dashboard built as an Nx monorepo using Webpack
Module Federation. One host app (`shell`) composes three independently
built/deployed micro-frontends (`boards`, `reports`, `settings`) at runtime.

## Architecture

All four apps are sibling top-level folders in the repo (`shell/`, `boards/`,
`reports/`, `settings/`) — `shell` is the runtime host, not a parent directory.

```
shell     (host)   routes: /, /boards, /reports, /settings
boards    (remote) exposes "Module" → incident kanban board (drag & drop)
reports   (remote) exposes "Module" → uptime/deploy/incident charts
settings  (remote) exposes "Module" → alert channels & thresholds

libs/shared-ui      design system consumed by all four apps (Button, Card,
                     Input, StatusDot, StatCard, theme) + Tailwind tokens
```

- Each remote exposes `./Module` from `src/remote-entry.ts` and is lazy-loaded
  by `shell` via `React.lazy(() => import('boards/Module'))` etc.
  (`shell/src/app/app.tsx`).
- Federation wiring lives in each project's `module-federation.config.ts`;
  `shell`'s lists the three remote names, each remote's just declares its own
  `name` and `exposes`.
- All apps consume `@atlas-mf/shared-ui` (`libs/shared-ui`) for UI primitives
  and the shared theme/token CSS, so a design change there propagates
  everywhere without duplicating components per app.

## Stack

React 19 · TypeScript · Nx 23 · Webpack 5 + `@module-federation/enhanced` ·
Tailwind CSS 4 · Radix UI primitives · `@dnd-kit` (board drag & drop) ·
Recharts (reports) · Jest + Testing Library · Cypress (e2e) · ESLint + Prettier.

## Projects

| Project           | Type       | Purpose                                      |
| ------------------ | ---------- | --------------------------------------------- |
| `shell`            | app (host) | Nav, routing, landing page, mounts remotes    |
| `boards`           | app (remote) | Kanban board for incidents (add/drag cards) |
| `reports`          | app (remote) | Ops charts: uptime, deploy velocity, trends |
| `settings`         | app (remote) | Notification channels & alert thresholds    |
| `libs/shared-ui`   | lib        | Shared components, `cn` helper, theme, tokens |

## Getting started

```sh
npm install
npx nx serve shell     # runs shell + all its remotes together
```

Open the printed shell URL (Nx module-federation dev-mode wires the remotes'
dev servers automatically — no manual port juggling needed).

## Common tasks

```sh
npx nx build shell          # production build (bundles/serves remotes per config)
npx nx test <project>       # unit tests (Jest)
npx nx e2e <project>-e2e    # Cypress e2e, if configured
npx nx lint <project>
npx nx show project shell   # list all available targets for a project
npx nx graph                # visualize the project/dependency graph
```

Run any target for every project with `npx nx run-many -t <target>`.

## Repo layout notes

- `.nx/`, `tmp/`, `**/dist`, `**/out-tsc` are Nx build/cache output — not
  committed logic, safe to ignore when reading the codebase.
- Design tokens and Tailwind theme live in `libs/shared-ui/src/tokens.css`;
  app-level `styles.css` files import Tailwind and rely on those tokens.
