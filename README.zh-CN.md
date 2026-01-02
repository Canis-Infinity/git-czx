# @canis22788/git-czx

[![npm version](https://img.shields.io/npm/v/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![npm downloads](https://img.shields.io/npm/dm/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![node](https://img.shields.io/node/v/@canis22788/git-czx?style=flat-square)](https://www.npmjs.com/package/@canis22788/git-czx)
[![license](https://img.shields.io/npm/l/@canis22788/git-czx?style=flat-square)](https://github.com/Canis-Infinity/git-czx/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Canis-Infinity/git-czx?style=flat-square)](https://github.com/Canis-Infinity/git-czx)

一个交互式的 git commit 工具，支持 **多行 Commit Body**、**Emoji**，并提供 **繁体中文 / 简体中文 / English** 三种语言。

📘 其他语言：
- [English](./README.md)
- [繁體中文](./README.zh-TW.md)

---

## 安装

```bash
npm install -g @canis/git-czx
````

安装完成后，会有两个命令可用（功能完全相同）：

```bash
czx
git-czx
```

---

## 快速开始

在 **git 项目目录** 中执行：

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
3. 输入 subject（最长 50 字）
4. 选择 Issue 关联方式（Refs / Closes / Fixes）
5. 是否包含 BREAKING CHANGE
6. **选择是否打开编辑器来编辑完整的 Commit Message**

### 编辑器行为说明

* **选择打开编辑器**：

  * 会打开编辑器并载入 Commit Message 模板
  * 可编写 **多行 Body、Footer、BREAKING CHANGE**
  * 保存并关闭后完成 commit

* **选择不打开编辑器**：

  * 直接使用 subject 创建 commit
  * 不会打开编辑器
  * 即使没有额外修改内容，commit 也能成功

该设计用于避免「编辑器未修改直接关闭，Git 中止 commit」的问题。

---

## 为什么选择 git-czx

* 📝 支持多行 Commit Body（是否打开编辑器可选）
* 🎯 遵循 Conventional Commits 规范
* 🎸 内置 Emoji 支持
* 🌍 三种语言：zh-TW / zh-CN / en-US
* 🔒 不修改 git 原生行为（完整支持 git commit 参数透传）

---

## 语言设置

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

若均未匹配，默认使用 `zh-TW`。

---

## 支持的 Commit 类型

* 🎸 feat：新功能
* 🐛 fix：修复 bug
* ✏️ docs：文档
* 💄 style：格式调整（不影响逻辑）
* 💡 refactor：重构
* ⚡️ perf：性能优化
* 💍 test：测试
* 🤖 chore：工具 / 杂项
* 🎡 ci：CI / CD
* 🏹 release：发布

---

## 常用选项

### 仅预览（不真正 commit）

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

## Commit 示例（使用编辑器）

```text
feat(blog): 🎸 新增 Markdown 图片放大

# Body
- 支持 figure caption
- 加入 medium-zoom

Refs: #123
```

## Commit 示例（不打开编辑器）

```text
fix(deps): 🐛 修正包名称
```

---

## 许可证

MIT

---

## 作者

Canis Zhang
[https://iistw.com](https://iistw.com)