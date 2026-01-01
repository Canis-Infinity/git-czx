// src\i18n.ts

import type { Locale } from './types.js';

/**
 * i18n keys (keep grouped & ordered for maintainability)
 */
export type I18nKey =
  // error
  | 'error.prefix'
  // app
  | 'app.name'
  // help
  | 'help.title'
  | 'help.usage'
  | 'help.options.title'
  | 'help.options.lang'
  | 'help.options.dryRun'
  | 'help.options.noAdd'
  | 'help.options.help'
  | 'help.passthrough.title'
  | 'help.passthrough.ex1'
  | 'help.passthrough.ex2'
  | 'help.passthrough.ex3'
  // git / errors
  | 'git.notRepo'
  | 'err.langNotSupported'
  | 'err.noStaged'
  | 'err.cancelled'
  | 'err.nothingToCommit'
  // confirm
  | 'confirm.autoAdd'
  | 'confirm.breaking'
  // select
  | 'select.type'
  | 'select.footerKind'
  // input
  | 'input.scope.suggest'
  | 'input.scope'
  | 'input.subject'
  | 'input.issue'
  | 'input.breaking'
  // validate
  | 'validate.subject.required'
  | 'validate.subject.tooLong'
  | 'validate.issue.invalid'
  | 'validate.breaking.required'
  // footer kind labels
  | 'footerKind.none'
  | 'footerKind.refs'
  | 'footerKind.closes'
  | 'footerKind.fixes'
  // dry-run
  | 'dryRun.title'
  | 'dryRun.locale'
  | 'dryRun.command'
  | 'dryRun.template'
  | 'dryRun.stagedFiles';

export type Params = Record<string, string | number>;

type I18nTable = Record<I18nKey, string>;
type Dict = Record<Locale, I18nTable>;

// ==============================
// Shared constants (same for all locales)
// ==============================
const APP_NAME = 'git-czx / czx';

const HELP_USAGE =
  '  czx [--lang zh-TW|zh-CN|en-US] [--dry-run] [--no-add] [-- <git commit args...>]';

const PASSTHROUGH_EX1 = '  czx -- --no-verify';
const PASSTHROUGH_EX2 = '  czx -- -S';
const PASSTHROUGH_EX3 = '  czx -- --signoff';

const FOOTER_REFS = 'Refs: #123';
const FOOTER_CLOSES = 'Closes: #123';
const FOOTER_FIXES = 'Fixes: #123';

const DRYRUN_TITLE = '=== git-czx dry-run ===';
const DRYRUN_LOCALE = 'Locale:';
const DRYRUN_COMMAND = 'Command:';
const DRYRUN_TEMPLATE = '--- Template ---';
const DRYRUN_STAGED = '--- Staged files ---';

// Base (keys that are identical across locales)
const BASE_COMMON = {
  'app.name': APP_NAME,

  'help.usage': HELP_USAGE,
  'help.passthrough.ex1': PASSTHROUGH_EX1,
  'help.passthrough.ex2': PASSTHROUGH_EX2,
  'help.passthrough.ex3': PASSTHROUGH_EX3,

  'footerKind.refs': FOOTER_REFS,
  'footerKind.closes': FOOTER_CLOSES,
  'footerKind.fixes': FOOTER_FIXES,

  'dryRun.title': DRYRUN_TITLE,
  'dryRun.locale': DRYRUN_LOCALE,
  'dryRun.command': DRYRUN_COMMAND,
  'dryRun.template': DRYRUN_TEMPLATE,
  'dryRun.stagedFiles': DRYRUN_STAGED,
} as const;

// ==============================
// Locale tables
// ==============================
const ZH_TW: I18nTable = {
  // error
  'error.prefix': '[錯誤]',

  // app
  ...BASE_COMMON,

  // help
  'help.title': '用法：',
  'help.options.title': '選項：',
  'help.options.lang':
    '  --lang     只支援：zh-TW / zh-CN / en-US（大小寫需完全相符）',
  'help.options.dryRun':
    '  --dry-run  不真的 commit，只印出模板與將執行的 git 指令',
  'help.options.noAdd':
    '  --no-add   若沒有 staged 變更，不自動執行 git add -A',
  'help.options.help': '  -h, --help 顯示說明',
  'help.passthrough.title': '透傳範例：',

  // git / errors
  'git.notRepo': '這裡不是 git repo（找不到 .git）',
  'err.langNotSupported':
    '--lang 只支援 zh-TW / zh-CN / en-US（大小寫需完全相符）',
  'err.noStaged':
    '目前沒有已 stage 的變更（請先 git add 再執行，或不要加 --no-add）',
  'err.cancelled': '已取消（請先 git add 再重試）',
  'err.nothingToCommit': '沒有可 commit 的變更',

  // confirm
  'confirm.autoAdd': '目前沒有已 stage 的變更，要先自動執行 `git add -A` 嗎？',
  'confirm.breaking': '是否包含重大更改（BREAKING CHANGE）？',

  // select
  'select.type': '請選擇您要 Commit 的類型(必選) [{locale}]：',
  'select.footerKind': 'Footer（Issue 關聯）要用哪種？',

  // input
  'input.scope.suggest': 'scope（可選，建議：{scopes}）：',
  'input.scope': 'scope（可選）：',
  'input.subject': 'subject（50 字內、不可換行）：',
  'input.issue': 'Issue（例：123 / #123 / JIRA-123，可留空略過）：',
  'input.breaking': '簡短描述重大更改（會寫進 BREAKING CHANGE: ...）：',

  // validate
  'validate.subject.required': 'subject 不能空白',
  'validate.subject.tooLong': '太長了（{n}/50）',
  'validate.issue.invalid': '格式不正確（例：123 / #123 / JIRA-123）',
  'validate.breaking.required': '不能空白（或選否）',

  // footer kind labels
  'footerKind.none': '（無）不填',
};

const ZH_CN: I18nTable = {
  // error
  'error.prefix': '[错误]',

  // app
  ...BASE_COMMON,

  // help
  'help.title': '用法：',
  'help.options.title': '选项：',
  'help.options.lang':
    '  --lang     只支持：zh-TW / zh-CN / en-US（大小写需完全相符）',
  'help.options.dryRun':
    '  --dry-run  不真的 commit，只打印模板与将执行的 git 指令',
  'help.options.noAdd':
    '  --no-add   若没有 staged 变更，不自动执行 git add -A',
  'help.options.help': '  -h, --help 显示说明',
  'help.passthrough.title': '透传示例：',

  // git / errors
  'git.notRepo': '这里不是 git repo（找不到 .git）',
  'err.langNotSupported':
    '--lang 只支持 zh-TW / zh-CN / en-US（大小写需完全相符）',
  'err.noStaged':
    '当前没有已 stage 的变更（请先 git add 再执行，或不要加 --no-add）',
  'err.cancelled': '已取消（请先 git add 再重试）',
  'err.nothingToCommit': '没有可 commit 的变更',

  // confirm
  'confirm.autoAdd': '当前没有已 stage 的变更，要先自动执行 `git add -A` 吗？',
  'confirm.breaking': '是否包含重大更改（BREAKING CHANGE）？',

  // select
  'select.type': '请选择你要 Commit 的类型(必选) [{locale}]：',
  'select.footerKind': 'Footer（Issue 关联）要用哪种？',

  // input
  'input.scope.suggest': 'scope（可选，建议：{scopes}）：',
  'input.scope': 'scope（可选）：',
  'input.subject': 'subject（50 字内、不可换行）：',
  'input.issue': 'Issue（例：123 / #123 / JIRA-123，可留空略过）：',
  'input.breaking': '简短描述重大更改（会写进 BREAKING CHANGE: ...）：',

  // validate
  'validate.subject.required': 'subject 不能为空',
  'validate.subject.tooLong': '太长了（{n}/50）',
  'validate.issue.invalid': '格式不正确（例：123 / #123 / JIRA-123）',
  'validate.breaking.required': '不能为空（或选否）',

  // footer kind labels
  'footerKind.none': '（无）不填',
};

const EN_US: I18nTable = {
  // error
  'error.prefix': '[Error]',

  // app
  ...BASE_COMMON,

  // help
  'help.title': 'Usage:',
  'help.options.title': 'Options:',
  'help.options.lang':
    '  --lang     supported: zh-TW / zh-CN / en-US (case-sensitive)',
  'help.options.dryRun':
    '  --dry-run  do not commit; print template and the git command to run',
  'help.options.noAdd':
    '  --no-add   if nothing is staged, do not auto-run git add -A',
  'help.options.help': '  -h, --help show help',
  'help.passthrough.title': 'Passthrough examples:',

  // git / errors
  'git.notRepo': 'Not a git repo (cannot find .git)',
  'err.langNotSupported':
    '--lang supports only zh-TW / zh-CN / en-US (case-sensitive)',
  'err.noStaged': 'No staged changes (run git add first, or remove --no-add)',
  'err.cancelled': 'Cancelled (stage changes and try again)',
  'err.nothingToCommit': 'Nothing to commit',

  // confirm
  'confirm.autoAdd': 'No staged changes. Auto-run `git add -A` first?',
  'confirm.breaking': 'Contains BREAKING CHANGE?',

  // select
  'select.type': 'Select commit type (required) [{locale}]:',
  'select.footerKind': 'Footer (issue linkage):',

  // input
  'input.scope.suggest': 'scope (optional, suggested: {scopes}):',
  'input.scope': 'scope (optional):',
  'input.subject': 'subject (<= 50 chars, single line):',
  'input.issue': 'Issue (e.g. 123 / #123 / JIRA-123, optional):',
  'input.breaking':
    'Describe breaking change (will be in BREAKING CHANGE: ...):',

  // validate
  'validate.subject.required': 'subject cannot be empty',
  'validate.subject.tooLong': 'too long ({n}/50)',
  'validate.issue.invalid': 'Invalid format (e.g. 123 / #123 / JIRA-123)',
  'validate.breaking.required': 'cannot be empty (or answer No)',

  // footer kind labels
  'footerKind.none': '(none)',
};

const DICT: Dict = {
  'zh-TW': ZH_TW,
  'zh-CN': ZH_CN,
  'en-US': EN_US,
};

// ==============================
// formatter
// ==============================
function format(s: string, params?: Params): string {
  if (!params) return s;
  return s.replace(/\{(\w+)\}/g, (_, k: string) =>
    String(params[k] ?? `{${k}}`)
  );
}

export function i18n(locale: Locale) {
  const table = DICT[locale] ?? DICT['zh-TW'];
  return (key: I18nKey, params?: Params) => format(table[key], params);
}
