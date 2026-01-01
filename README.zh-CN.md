# @canis/git-czx

一个交互式的 git commit 工具，支持 **多行 Commit Body**、**Emoji**，并提供 **繁体中文**、**简体中文**、**English** 三种语言。

📘 其他语言：
- [English](./README.md)
- [繁體中文](./README.zh-TW.md)

---

## 安装

```bash
npm install -g @canis/git-czx
````

安装完成后，会提供两个命令（功能完全相同）：

```bash
czx
git-czx
```

---

## 快速开始

在 **git 项目目录**中执行：

```bash
czx
```

或：

```bash
git-czx
```

按照提示操作即可完成一次 commit。

---

## Commit 流程

1. 选择 Commit 类型（feat / fix / docs / …）
2. 输入 scope（可选）
3. 输入 subject（最多 50 个字符）
4. 选择是否关联 Issue（Refs / Closes / Fixes）
5. 是否包含 BREAKING CHANGE
6. 打开编辑器，编写 **完整的多行 Commit Message**

保存并关闭编辑器后，commit 即完成。

---

## 为什么使用 git-czx

* 📝 支持多行 Body（通过编辑器编写）
* 🎯 遵循 Conventional Commits 规范
* 🎸 内置 Emoji
* 🌍 三种语言：zh-TW / zh-CN / en-US
* 🔒 不会修改 git 原有行为（支持透传 git commit 参数）

---

## 语言设置（Locale）

### 手动指定

```bash
czx --lang zh-TW
czx --lang zh-CN
czx --lang en-US
```

### 自动检测顺序

1. CZ_LANG
2. LANG
3. LC_ALL
4. LC_MESSAGES

若不匹配支持列表，将回退至 `zh-TW`。

---

## 支持的 Commit 类型

* 🎸 feat：新功能
* 🐛 fix：修复错误
* ✏️ docs：文档
* 💄 style：格式调整（不影响逻辑）
* 💡 refactor：重构
* ⚡️ perf：性能优化
* 💍 test：测试
* 🤖 chore：工具 / 杂项
* 🎡 ci：CI / CD
* 🏹 release：版本发布

---

## 常用参数

### 仅预览，不实际 commit

```bash
czx --dry-run
```

### 禁用自动 git add

```bash
czx --no-add
```

### 透传 git commit 参数

```bash
czx -- --no-verify
czx -- -S
czx -- --signoff
```

---

## 错误信息

错误前缀会根据语言显示：

* [錯誤]（zh-TW）
* [错误]（zh-CN）
* [Error]（en-US）

---

## 示例 Commit Message

```text
feat(blog): 🎸 add markdown image zoom

# Body
- support figure caption
- add medium-zoom

Refs: #123
```

---

## 灵感来源

`@canis/git-czx` 的灵感来自 [git-cz](https://github.com/streamich/git-cz)。

本项目并非 fork，而是独立实现（结合部分 AI），重点包括：

* 严格的语言支持（zh-TW / zh-CN / en-US）
* 使用编辑器编写多行 Commit Body
* 更清晰、可本地化的错误信息

---

## License

MIT

---

## Author

Canis Zhang
[https://iistw.com](https://iistw.com)
