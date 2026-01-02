# @canis22788/git-czx

[![npm version](https://img.shields.io/npm/v/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![npm downloads](https://img.shields.io/npm/dm/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![node](https://img.shields.io/node/v/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![license](https://img.shields.io/npm/l/@canis22788/git-czx?style=flat-square)](https://github.com/Canis-Infinity/git-czx/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Canis-Infinity/git-czx?style=flat-square)](https://github.com/Canis-Infinity/git-czx)

An interactive git commit tool that supports **multi-line commit bodies**, **Emoji**, and provides **Traditional Chinese**, **Simplified Chinese**, and **English** locales.

📘 Other languages:
- [繁體中文](./README.zh-TW.md)
- [简体中文](./README.zh-CN.md)

---

## Installation

```bash
npm install -g @canis/git-czx
````

After installation, two commands are available (they behave the same):

```bash
czx
git-czx
```

---

## Quick Start

Run in a **git project directory**:

```bash
czx
```

or:

```bash
git-czx
```

Follow the prompts to complete a commit.

---

## Commit Flow

1. Select commit type (feat / fix / docs / …)
2. Enter scope (optional)
3. Enter subject (max 50 characters)
4. Choose issue association (Refs / Closes / Fixes)
5. Specify whether it includes a BREAKING CHANGE
6. **Choose whether to open an editor to edit the full commit message**

### Editor behavior

* If you **choose to open the editor**:

  * An editor opens with a commit message template
  * You can write a **multi-line body**, footer, and breaking change details
  * Save and close the editor to finish the commit

* If you **choose NOT to open the editor**:

  * The commit is created **directly using the subject line**
  * No editor is opened
  * The commit still succeeds even if no further changes are made

This avoids Git aborting the commit when an editor is opened but no changes are made.

---

## Why git-czx

* 📝 Supports multi-line commit bodies (optional editor)
* 🎯 Follows the Conventional Commits specification
* 🎸 Built-in Emoji support
* 🌍 Three locales: zh-TW / zh-CN / en-US
* 🔒 Does not modify git behavior (supports passthrough git commit arguments)

---

## Locale Settings

### Manual

```bash
czx --lang zh-TW
czx --lang zh-CN
czx --lang en-US
```

### Auto-detection order

1. CZ_LANG
2. LANG
3. LC_ALL
4. LC_MESSAGES

If none match, it falls back to `zh-TW`.

---

## Supported Commit Types

* 🎸 feat: new feature
* 🐛 fix: bug fix
* ✏️ docs: documentation
* 💄 style: formatting (no logic change)
* 💡 refactor: code refactoring
* ⚡️ perf: performance improvement
* 💍 test: tests
* 🤖 chore: tools / misc
* 🎡 ci: CI / CD
* 🏹 release: release

---

## Common Options

### Preview only (no actual commit)

```bash
czx --dry-run
```

### Disable automatic git add

```bash
czx --no-add
```

### Pass git commit options through

```bash
czx -- --no-verify
czx -- -S
czx -- --signoff
```

---

## Example Commit Message (with editor)

```text
feat(blog): 🎸 add markdown image zoom

# Body
- support figure caption
- add medium-zoom

Refs: #123
```

## Example Commit Message (without editor)

```text
fix(deps): 🐛 change the name of this package
```

---

## License

MIT

---

## Author

Canis Zhang
[https://iistw.com](https://iistw.com)
