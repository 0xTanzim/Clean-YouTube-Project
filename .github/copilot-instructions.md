# 🤖 GitHub Copilot Instructions for Vite + React Projects

## ✅ PRIME DIRECTIVE

> **Copilot must assist with clean, scalable, and maintainable code aligned with the Vite + React Architecture Rules.**

- Work file-by-file. Avoid proposing sweeping, multi-file edits.
- Prioritize **clarity**, **separation of concerns**, and **developer intent**.
- Annotate edits with what, why, and where.

---

## 📋 USAGE PATTERNS

### 🔄 Complex File Edit Protocol

Use this structure when suggesting edits to large or complex files:

```txt
Editing: src/features/products/ProductPage.tsx
Changes:
  1. Extract `ProductHero` into a dumb component.
  2. Move fetch logic to `useProduct` hook.
  3. Add accessibility props to interactive elements.
  4. Cleanup: convert inline logic to pure helpers.
```

### ✍️ Copilot Usage Tips

- Add inline comments to guide Copilot:

```tsx
// COPILOT: Create a reusable ProductHero that shows title, image, and rating.
```

- Use Copilot Chat to clarify structure:

```txt
@workspace What does SummaryCard do? Is it a smart or dumb component?
```

---

## 🧠 ARCHITECTURE RULES SUMMARY

> _Your Vite + React project must adhere to the following component design and folder organization rules._

### 1️⃣ Code Quality Principles

- ❌ Avoid: dead code, inline spaghetti, excessive JSX nesting.
- ✅ Embrace: type safety, separation of concerns, clean naming.

### 2️⃣ Vite-Specific Guidelines

- Use `import.meta.env` for all env variables.
- Avoid heavy top-level imports to speed up HMR.
- Optimize build with plugins like `vite-plugin-svgr`, `vite-plugin-compression`.

### 3️⃣ Component Patterns

- Split UI and logic:

  - **Dumb (UI)** → Stateless, reusable, props-driven.
  - **Smart (Logic)** → Hooks, state, side effects.

Example page:

```tsx
<ProductPage>
  <Header />
  <Hero />
  <Summary />
  <Details />
  <Reviews />
  <Footer />
</ProductPage>
```

### 4️⃣ Create Component When:

| Condition        | Example       | Priority |
| ---------------- | ------------- | -------- |
| Reused >2 places | CTA, Button   | ⭐⭐⭐   |
| Has logic/state  | Filters, Tabs | ⭐⭐⭐⭐ |
| >100 LOC JSX     | Large tree    | ⭐⭐     |

---

## 🧩 PROJECT STRUCTURE

```
/src
  /features
    /products
      ProductPage.tsx
      /components
      /hooks
      /services
  /components/ui
  /components/layout
  /hooks
  /services
  /types
  /lib
  /constants
  /data
```

---

## ✨ Best Practices

- 🧹 Extract long trees: `Header`, `CardBody`, `Section`, etc.
- 🎯 Prefer `composition` over deep nesting.
- 🛡️ Add `<ErrorBoundary>` and local fallback UIs.
- 📐 Fully typed components using interfaces/types.
- ♿ Ensure accessibility (aria-labels, tab support, focus states).

---

## 🧪 TypeScript + Performance

- Avoid `any`; prefer `unknown` + type guards.
- Use generics:

```ts
type Result<T> = { data: T; error?: string };
```

- Lazy-load heavy components with `React.lazy` and `Suspense`.
- Optimize renders with `React.memo`, `useMemo`, `useCallback`.

---
