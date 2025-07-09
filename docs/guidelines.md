# Code Style Guidelines

Below are a few core conventions for this project. Each rule includes a brief rationale and code examples that illustrate the preferred style.

---

## 1. Prefer Arrow Functions

Use **arrow functions** wherever possible to keep functions concise and to avoid unexpected `this` bindings.

```javascript
// ✅ Preferred
const add = (a, b) => a + b;

// 🚫 Avoid
function add(a, b) {
  return a + b;
}
```

---

## 2. Use `const`/`let` Instead of `var`

`var` has function scope and can lead to subtle bugs; always use `const` for bindings that never change and `let` for re‑assignable variables.

```javascript
// ✅ Preferred
const MAX_RETRIES = 3;
let counter = 0;

// 🚫 Avoid
var counter = 0;
```

---

## 3. Two‑Space Indentation, No Tabs

Consistent indentation increases readability.

```javascript
// ✅ Preferred
if (isReady) {
  startProcess();
}

// 🚫 Avoid (tab or 4‑space indent)
if (isReady) {
        startProcess();
}
```

---

## 4. Always Use Semicolons

Relying on automatic semicolon insertion can cause hard‑to‑spot errors.

```javascript
// ✅ Preferred
const name = 'Alice';
console.log(name);

// 🚫 Avoid
const name = 'Alice'
console.log(name)
```

---

## 5. Use Template Literals for String Interpolation

Template literals improve readability over string concatenation.

```javascript
// ✅ Preferred
const greeting = `Hello, ${userName}!`;

// 🚫 Avoid
const greeting = 'Hello, ' + userName + '!';
```

---


## 6. Function Documentation

Add basic jsdocs explaining what the function does, and what it returns, do not overcomplicate it.
The point is for developers quickly understand what is happening.
