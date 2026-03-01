# Instructions for AI and New Developers

**Read before making changes.**

## 1. Coding standards (everyone must follow)

The rule **coding-standards** in `.cursor/rules/` defines general best practices:

- **Clean code**: Readable names, single responsibility, no duplication, focused files, minimal comments.
- **TypeScript**: Strict typing, no `any`, clear interfaces/types, minimal exports.
- **React**: Functional components and hooks only, correct hook usage, controlled forms, accessibility.
- **UI**: Use design tokens and existing components; remove dead code; fix lint/format issues.

Apply these in every change. AI and developers should follow this rule first.

## 2. Project context

The rule **project-context** describes this repo’s stack, roles, sidebar, CASL, and file layout. Use it to know where to add code and how features (e.g. sidebar, roles) work.

## 3. Roles and sidebar

Read **`ADMIN_SIDEBAR_AND_ROLES.md`** when you add or change sidebar items or role-based visibility. Sidebar is driven by CASL (`src/lib/ability.ts`) and menu config (`src/config/sidebar-menu.ts`). Keep them in sync.

## 4. Conventions

- Use `ConfirmDialog` for confirm/cancel; use `Dialog` for other modals.
- Use `react-hook-form` + Zod for forms; add translation keys to `src/locales/ru.json`.

Following the coding-standards rule and project-context keeps the codebase clean and consistent.
