

https://github.com/user-attachments/assets/6f331f23-8bcf-4a71-a7f7-90a91bdb0b14

# Atlas MF

**Atlas MF**: an incident response dashboard built as an Nx monorepo using Webpack
Module Federation. One host app (`shell`) composes three independently
built/deployed micro-frontends (`boards`, `reports`, `settings`) at runtime.

## Architecture

All four apps are sibling top-level folders in the repo (`shell/`, `boards/`,
`reports/`, `settings/`); `shell` is the runtime host, not a parent directory.

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
  `shell`'s lists the three remote names; each remote's just declares its own
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
dev servers automatically, no manual port juggling needed).

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

## Architecture FAQ

**Why Module Federation?**
The three areas (boards, reports, settings) have different owners, release
cadences, and dependency footprints (`@dnd-kit` only matters to boards,
Recharts only to reports). MF lets each build and deploy on its own timeline
while the user still sees one app at one URL. The alternatives were a single
bundle (one slow build, one deploy, every change risks everything) or
iframes/separate SPAs (lost shared routing, auth, design system, and a janky
UX). MF keeps a single runtime and shared React tree without coupling the
build.

**How do the remotes communicate?**
They don't talk to each other directly. `shell` owns routing
(`react-router-dom`) and renders one remote per route
(`shell/src/app/app.tsx`). Cross-cutting concerns go through shared singletons
in `@atlas-mf/shared-ui` (e.g. the theme context in
`libs/shared-ui/src/lib/theme.ts`). If remotes needed to share state we'd add
a shared store module to `shared-ui`; today they're independent leaves under a
common host.

**How do you handle shared dependencies?**
`@nx/module-federation` auto-shares every dependency in `package.json` across
host and remotes. `react` / `react-dom` are shared as singletons, so there's
one React instance and one hooks dispatcher across the whole federated tree —
without that, hooks and context break at the remote boundary. Version skew
falls back to loading a second copy rather than crashing. No manual `shared`
config in `module-federation.config.ts` because the Nx defaults already do the
right thing here.

**What happens when a remote is unavailable?**
Right now: the `React.lazy(() => import('boards/Module'))` promise rejects and,
because the `<Suspense>` in `app.tsx` has no error boundary, that route fails
to render. Other routes keep working since remotes load lazily and
independently. Hardening this means wrapping each remote route in an error
boundary with a retry/fallback panel — a known gap, not a solved problem.

**How do you deploy the individual micro-frontends?**
The architecture supports independent deploys: each remote is a separate build,
and `shell` can point at an external URL via the tuple syntax
(`remotes: [['boards', 'https://...']]`, see `shell/module-federation.config.ts`).
This repo ships all four together in one container for simplicity — the
`Dockerfile` runs `shell:serve-static:production` (builds shell + all remotes,
serves ports 4200–4203) and `deploy/k8s.yaml` runs it as a single pod
(`replicas: 1`). Splitting into four independently deployed services is a
config change (per-remote images + public URLs), not a rewrite.

**What are the trade-offs?**
Wins: independent builds/deploys, team autonomy, per-area dependency isolation,
one runtime and one design system. Costs: shared-dependency version discipline
(singletons must line up), harder end-to-end debugging across the remote
boundary, extra failure modes (a remote can 404 at runtime — see above),
build-time coupling to remote URLs, and more moving parts in CI/CD than a
monolith. Worth it when teams and release cadences actually diverge;
over-engineering when they don't.

## Repo layout notes

- `.nx/`, `tmp/`, `**/dist`, `**/out-tsc` are Nx build/cache output, not
  committed logic; safe to ignore when reading the codebase.
- Design tokens and Tailwind theme live in `libs/shared-ui/src/tokens.css`;
  app-level `styles.css` files import Tailwind and rely on those tokens.
