# @canis/git-czx

一個互動式的 git commit 工具，支援 **多行 Commit Body**、**Emoji**，並提供 **繁體中文**、**简体中文**、**English** 三種語系。

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

在 **git 專案目錄**中執行：

```bash
czx
```

或：

```bash
git-czx
```

依照畫面提示操作即可完成一次 commit。

---

## Commit 流程

1. 選擇 Commit 類型（feat / fix / docs / …）
2. 輸入 scope（可選）
3. 輸入 subject（最多 50 字）
4. 選擇是否關聯 Issue（Refs / Closes / Fixes）
5. 是否包含 BREAKING CHANGE
6. 開啟編輯器撰寫 **完整的多行 Commit Message**

儲存並關閉編輯器後，commit 即完成。

---

## 為什麼使用 git-czx

* 📝 支援多行 Body（使用編輯器撰寫）
* 🎯 符合 Conventional Commits 規範
* 🎸 內建 Emoji
* 🌍 三種語系：zh-TW / zh-CN / en-US
* 🔒 不會修改 git 原本行為（支援透傳 git commit 參數）

---

## 語系設定（Locale）

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

若不符合支援清單，將回退至 `zh-TW`。

---

## 支援的 Commit 類型

* 🎸 feat：新功能
* 🐛 fix：修正錯誤
* ✏️ docs：文件
* 💄 style：格式調整（不影響邏輯）
* 💡 refactor：重構
* ⚡️ perf：效能優化
* 💍 test：測試
* 🤖 chore：工具 / 雜項
* 🎡 ci：CI / CD
* 🏹 release：版本發佈

---

## 常用參數

### 僅預覽，不實際 commit

```bash
czx --dry-run
```

### 不自動執行 git add

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

## 錯誤訊息

錯誤前綴會依語系顯示：

* [錯誤]（zh-TW）
* [错误]（zh-CN）
* [Error]（en-US）

---

## 範例 Commit Message

```text
feat(blog): 🎸 add markdown image zoom

# Body
- support figure caption
- add medium-zoom

Refs: #123
```

---

## 靈感來源

`@canis/git-czx` 的靈感來自 [git-cz](https://github.com/streamich/git-cz)。

本專案並非 fork，而是獨立實作（搭配部分 AI），重點在於：

* 嚴格的語系支援（zh-TW / zh-CN / en-US）
* 使用編輯器撰寫多行 Commit Body
* 更清楚、可本地化的錯誤訊息

---

## License

MIT

---

## Author

Canis Zhang
[https://iistw.com](https://iistw.com)