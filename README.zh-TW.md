# @canis22788/git-czx

一個互動式的 git commit 工具，支援 **多行 Commit Body**、**Emoji**，並提供 **繁體中文 / 简体中文 / English** 三種語系。

📘 其他語言：
- [English](./README.md)
- [简体中文](./README.zh-CN.md)

---

## 安裝

```bash
npm install -g @canis/git-czx
````

安裝完成後，會有兩個指令可用（功能完全相同）：

```bash
czx
git-czx
```

---

## 快速開始

在 **git 專案目錄** 裡執行：

```bash
czx
```

或：

```bash
git-czx
```

照著提示操作即可完成一次 commit。

---

## Commit 流程

1. 選擇 Commit 類型（feat / fix / docs / …）
2. 輸入 scope（可選）
3. 輸入 subject（最長 50 字）
4. 選擇 Issue 關聯方式（Refs / Closes / Fixes）
5. 是否包含 BREAKING CHANGE
6. **選擇是否要打開編輯器來編輯完整的 Commit Message**

### 編輯器行為說明

* **選擇打開編輯器**：

  * 會開啟編輯器並載入 Commit Message 模板
  * 可撰寫 **多行 Body、Footer、BREAKING CHANGE**
  * 儲存並關閉後完成 commit

* **選擇不打開編輯器**：

  * 直接使用 subject 建立 commit
  * 不會開啟編輯器
  * 即使沒有額外修改內容，commit 也會成功

這個設計可避免「編輯器沒改內容就關掉，Git 直接 abort commit」的老問題。

---

## 為什麼用 git-czx

* 📝 支援多行 Commit Body（可選是否開啟編輯器）
* 🎯 遵循 Conventional Commits 規範
* 🎸 內建 Emoji 支援
* 🌍 三種語系：zh-TW / zh-CN / en-US
* 🔒 不魔改 git 行為（完整支援 git commit 參數透傳）

---

## 語系設定

### 手動指定

```bash
czx --lang zh-TW
czx --lang zh-CN
czx --lang en-US
```

### 自動偵測順序

1. CZ_LANG
2. LANG
3. LC_ALL
4. LC_MESSAGES

若皆未符合，預設使用 `zh-TW`。

---

## 支援的 Commit 類型

* 🎸 feat：新功能
* 🐛 fix：修 bug
* ✏️ docs：文件
* 💄 style：格式調整（不影響邏輯）
* 💡 refactor：重構
* ⚡️ perf：效能優化
* 💍 test：測試
* 🤖 chore：工具 / 雜項
* 🎡 ci：CI / CD
* 🏹 release：發版

---

## 常用選項

### 僅預覽（不真的 commit）

```bash
czx --dry-run
```

### 停用自動 git add

```bash
czx --no-add
```

### 透傳 git commit 參數

```bash
czx -- --no-verify
czx -- -S
czx -- --signoff
```

---

## Commit 範例（使用編輯器）

```text
feat(blog): 🎸 新增 Markdown 圖片放大

# Body
- 支援 figure caption
- 加入 medium-zoom

Refs: #123
```

## Commit 範例（不開編輯器）

```text
fix(deps): 🐛 套件名稱修正
```

---

## 授權

MIT

---

## 作者

Canis Zhang
[https://iistw.com](https://iistw.com)