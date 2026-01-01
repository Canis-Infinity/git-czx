# @canis/git-czx

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
6. Open an editor to write the **full multi-line commit message**

Save and close the editor to finish the commit.

---

## Why git-czx

* 📝 Supports multi-line commit bodies (written in an editor)
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

## Error Messages

Error prefixes depend on locale:

* [錯誤] (zh-TW)
* [错误] (zh-CN)
* [Error] (en-US)

---

## Example Commit Message

```text
feat(blog): 🎸 add markdown image zoom

# Body
- support figure caption
- add medium-zoom

Refs: #123
```

---

## Inspiration

`@canis/git-czx` is inspired by [git-cz](https://github.com/streamich/git-cz).

This project is **not a fork**, but an independent implementation (with some AI assistance), focusing on:

* Strict locale support (zh-TW / zh-CN / en-US)
* Writing multi-line commit bodies in an editor
* Clear, localized error messages

---

## License

MIT

---

## Author

Canis Zhang
[https://iistw.com](https://iistw.com)