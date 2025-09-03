# CONTRIBUTING.md

Welcome! This document outlines how to contribute to this project efficiently and consistently using the tools and workflows we’ve adopted. It is also referenced by our AI development agents to reduce duplication and enforce shared standards.


## 📦 Project Overview

To document


## 📁 Project Structure

To document

### Key Frontend Directories

To document

## 🧱 Development Environment

We use **[VSCode Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)** exclusively. This ensures environment parity across all contributors.

### Pre-requisite

1. Docker
2. VS Code
3. Local authentication setup to communicate with remote repository

### Setup

1. Open the repo in VSCode.
2. You’ll be prompted to reopen in a Dev Container — click “Reopen in Container.”
3. Required versions of `node` and `npm` will be installed automatically via:
   - `engines` key in `package.json`
   - `.nvmrc` file
4. The container will automatically install all required npm dependencies and setup git pre-commit hooks.

If you face issues pushing your commits to remote, please refer to the [official documentation](https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials) to learn how to share Git credentials with your container

> ⚠️ No local installations or non-containerized workflows are supported.

---

## 🌱 Branching Strategy

All feature development and fixes should happen on a dedicated branch named after the associated GitHub issue. Use this format:

```
<type>/<issue-number>-short-description
```

Examples:

- `feature/42-user-profile-form`
- `fix/108-button-alignment`
- `chore/91-update-deps`

### Tips

- Use the same type keywords as [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat`, `fix`, `chore`, etc.
- Always create a **GitHub Issue first** and reference it in your branch and PR.


## ✏️ Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

### Format

```
<type>(optional scope): short description

[optional body]
[optional footer]
```

Examples:

- `feat(auth): add login form`
- `fix(button): align icon and label correctly`
- `chore: update Prettier config`

> 💡 Pre-commit hooks will lint commit messages and reject non-conforming ones.


## 🧾 Changelog Policy

All **Pull Requests must include a `CHANGELOG.md` entry** following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

- Add under the `## [Unreleased]` section and applicable subsection: `Added`, `Changed`, `Fixed`, etc.
- Reference the GitHub issue number.

Example:

```markdown
### Added

- Added user profile form component (#42)
```

## 🔬 Testing Guidelines

All PRs must include relevant tests:

### Frontend

- ✅ Unit tests for logic-heavy components and utilities
- ✅ Component tests using **Storybook** stories
- ✅ Accessibility checks when applicable

### Backend

- ✅ Unit tests for business logic
- ✅ Integration tests for service boundaries

### E2E Tests

- ❌ Not required on PR
- ✅ Owned and managed by QA

**Note:** If your PR addresses a bug, include a test spec that reproduces the issue and verifies the fix to help prevent future regressions.


## ✅ Pull Requests

### Requirements

- Must reference a GitHub issue in title and description
- Must include:
  - Relevant tests
  - A `CHANGELOG.md` entry
  - A clear description of what and why

### CI Checks (GitHub Actions)

- ✅ Linting (ESLint)
- ✅ Formatting (Prettier)
- ✅ TypeScript build
- ✅ Test suite (excluding e2e)

### Proposed Process

1. Create a release branch from `main`, e.g., `release/2025-07-31`
2. Finalize the `CHANGELOG.md` entries
3. Bump version number in `package.json`
4. Open a PR from the release branch to `main`
5. Once merged:
   - Tag the release
   - Merge `main` → `dev` (if using dev/main split)
   - Trigger deployment (automated or manual)

## 📋 Ticket Guidelines

We use **GitHub Issues** and **GitHub Projects** to manage all work.

### Workflow

- A new GitHub Projects board is created or each project
- We use **T-shirt sizing** for estimation (to be explained / documented)
- Issues may be:
  - **Parent/child** (epic/feature)
  - Standalone tasks or bugs

### Writing Good Tickets

- Use **User Story** format when applicable:

  ```
  As a [role], I want [capability] so that [value].
  ```

- Include:
  - **Acceptance criteria**
  - **Platform-specific notes** (e.g., mobile/desktop/web)
  - For bugs:
    - What was expected vs actual
    - Steps to reproduce
    - Environment info


## 🧱 Architectural Decisions

To document

## 🎨 Frontend Best Practices

### Code Organization & Exports

- **Prefer named exports over default exports** for better IDE support and refactoring
- **Include `index.ts` files** as the public API for modules to control available imports
- **Use barrel exports** to simplify import statements
- **Exception:** Default exports are allowed in config files (`.config.*`), test files (`.spec.*`, `.test.*`), and Storybook files (`.stories.*`) where they're conventionally required

```typescript
// ❌ Avoid default exports
export default function Button() { ... }

// ✅ Prefer named exports
export function Button() { ... }

// ✅ Use index.ts as public API
// components/button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// ✅ Exception: Default exports allowed in config files
// eslint.config.mjs
export default defineConfig([...]);
```

### Function Declarations

- **Use `function` declarations at the top level** for better hoisting and debugging
- **Use arrow functions inside main functions** for callbacks and inline functions

```typescript
// ✅ Top-level function declaration
export function handleUserLogin(credentials: LoginCredentials) {
  // ✅ Arrow functions for callbacks/inline functions
  const validateInput = (field: string) => field.trim().length > 0;

  return credentials.fields.every(validateInput);
}

// ❌ Avoid arrow functions at top level
export const handleUserLogin = (credentials: LoginCredentials) => { ... }
```

**Note:** These coding standards are enforced automatically using ESLint rules configured in `eslint.config.mjs`.

### Semantic HTML & Accessibility

- **Prefer semantic HTML elements over generic `<div>` tags** for better accessibility and SEO
- **Use appropriate ARIA attributes** when semantic elements aren't available
- **Structure content hierarchically** with proper heading levels (h1, h2, h3, etc.)
- **Adhere to W3C ARIA APG** [best practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs) when building UI

```jsx
// ❌ Avoid excessive div usage
function UserProfile() {
  return (
    <div>
      <div>User Profile</div>
      <div>
        <div>Name: John Doe</div>
        <div>Email: john@example.com</div>
      </div>
      <div>
        <div>Edit Profile</div>
        <div>Delete Account</div>
      </div>
    </div>
  );
}

// ✅ Use semantic HTML elements
function UserProfile() {
  return (
    <section>
      <header>
        <h1>User Profile</h1>
      </header>
      <main>
        <dl>
          <dt>Name:</dt>
          <dd>John Doe</dd>
          <dt>Email:</dt>
          <dd>john@example.com</dd>
        </dl>
      </main>
      <nav>
        <button type="button">Edit Profile</button>
        <button type="button">Delete Account</button>
      </nav>
    </section>
  );
}
```

**Common semantic elements to prefer:**

- `<main>`, `<section>`, `<article>`, `<aside>` for content structure
- `<header>`, `<footer>`, `<nav>` for page/section organization
- `<h1>`-`<h6>` for headings and content hierarchy
- `<p>`, `<ul>`, `<ol>`, `<dl>` for text and lists
- `<button>`, `<a>`, `<form>`, `<input>` for interactive elements
- `<figure>`, `<figcaption>` for images with captions
- `<time>`, `<address>`, `<details>`, `<summary>` for specific content types

### Additional Guidelines

To document

## 🔧 Backend Best Practices

To document


## 🧪 QA Strategy

To document

## ⚙️ DevOps Guidelines

To document