// src\cli.ts

import os from 'os';
import fs from 'fs';
import path from 'path';
import { select, input, confirm } from '@inquirer/prompts';

import type { Locale } from './types.js';
import { COMMIT_TYPES, type CommitType } from './types.js';
import {
  countChars,
  stripNewlines,
  isNonEmpty,
  normalizeIssueRef,
  detectLocaleFromEnv,
  localeLabel,
} from './utils.js';
import { ensureGitRepo, getStagedFiles, stageAll, git } from './git.js';
import { buildTemplate, type FooterKind } from './template.js';
import { i18n } from './i18n.js';

type ParsedArgs = {
  locale: Locale;
  dryRun: boolean;
  noAutoAdd: boolean;
  passthrough: string[];
};

function printHelp(locale: Locale) {
  const t = i18n(locale);

  console.log(
    [
      `${t('app.name')}`,
      '',
      t('help.title'),
      t('help.usage'),
      '',
      t('help.options.title'),
      t('help.options.lang'),
      t('help.options.dryRun'),
      t('help.options.noAdd'),
      t('help.options.help'),
      '',
      t('help.passthrough.title'),
      t('help.passthrough.ex1'),
      t('help.passthrough.ex2'),
      t('help.passthrough.ex3'),
    ].join(os.EOL)
  );
}

function parseArgs(argv: string[]): ParsedArgs {
  const out: ParsedArgs = {
    locale: detectLocaleFromEnv(),
    dryRun: false,
    noAutoAdd: false,
    passthrough: [],
  };

  const dd = argv.indexOf('--');
  const main = dd >= 0 ? argv.slice(0, dd) : argv;
  out.passthrough = dd >= 0 ? argv.slice(dd + 1) : [];

  for (let i = 0; i < main.length; i++) {
    const a = main[i];

    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--no-add') out.noAutoAdd = true;
    else if (a === '-h' || a === '--help') {
      printHelp(out.locale);
      process.exit(0);
    } else if (a === '--lang') {
      const v = main[i + 1];
      if (v === 'zh-TW' || v === 'zh-CN' || v === 'en-US') {
        out.locale = v;
        i++;
      } else {
        const t = i18n(out.locale);
        throw new Error(t('err.langNotSupported'));
      }
    }
  }

  return out;
}

function formatChoice(t: CommitType, locale: Locale): string {
  return `${t.emoji}  ${t.value.padEnd(9)} ${t.description[locale]}`;
}

function guessScopeFromFiles(files: string[]): string[] {
  const scopes = new Set<string>();
  for (const f of files) {
    if (f.includes('markdown')) scopes.add('markdown');
    if (f.includes('blog')) scopes.add('blog');
    if (f.startsWith('src/lib/')) scopes.add('lib');
    if (f.startsWith('src/app/')) scopes.add('app');
    if (f.includes('globals.css')) scopes.add('style');
    if (f === 'package.json' || f === 'package-lock.json') scopes.add('deps');
  }
  return Array.from(scopes);
}

function buildSubjectLine(
  type: string,
  emoji: string,
  scope: string,
  subject: string
): string {
  const head = scope ? `${type}(${scope}): ${emoji} ` : `${type}: ${emoji} `;
  return head + subject.trim();
}

async function ensureStaged(
  locale: Locale,
  noAutoAdd: boolean
): Promise<string[]> {
  const t = i18n(locale);

  let files = await getStagedFiles();
  if (files.length > 0) return files;

  if (noAutoAdd) throw new Error(t('err.noStaged'));

  const ok = await confirm({
    message: t('confirm.autoAdd'),
    default: true,
  });

  if (!ok) throw new Error(t('err.cancelled'));

  await stageAll();
  files = await getStagedFiles();

  if (files.length === 0) throw new Error(t('err.nothingToCommit'));

  return files;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const t = i18n(args.locale);

  await ensureGitRepo(args.locale);
  const stagedFiles = await ensureStaged(args.locale, args.noAutoAdd);

  const typePicked = await select({
    message: t('select.type', { locale: localeLabel(args.locale) }),
    choices: Object.values(COMMIT_TYPES).map((tt) => ({
      name: formatChoice(tt, args.locale),
      value: tt,
    })),
  });

  const scopeSuggestions = guessScopeFromFiles(stagedFiles);
  const scope = await input({
    message:
      scopeSuggestions.length > 0
        ? t('input.scope.suggest', { scopes: scopeSuggestions.join(', ') })
        : t('input.scope'),
    default: '',
  });

  const subjectRaw = await input({
    message: t('input.subject'),
    validate: (v) => {
      const s = stripNewlines(v);
      if (!isNonEmpty(s)) return t('validate.subject.required');
      const n = countChars(s);
      if (n > 50) return t('validate.subject.tooLong', { n });
      return true;
    },
  });

  const subject = stripNewlines(subjectRaw);
  const subjectLine = buildSubjectLine(
    typePicked.value,
    typePicked.emoji,
    scope.trim(),
    subject
  );

  const footerKind = await select<FooterKind>({
    message: t('select.footerKind'),
    choices: [
      { name: t('footerKind.none'), value: 'none' },
      { name: t('footerKind.refs'), value: 'refs' },
      { name: t('footerKind.closes'), value: 'closes' },
      { name: t('footerKind.fixes'), value: 'fixes' },
    ],
  });

  let issueRef = '';
  if (footerKind !== 'none') {
    const issueInput = await input({
      message: t('input.issue'),
      default: '',
      validate: (v) => {
        const s = v.trim();
        if (!s) return true;
        if (/^#?\d+$/.test(s)) return true;
        if (/^[A-Z][A-Z0-9_]*-\d+$/.test(s)) return true;
        return t('validate.issue.invalid');
      },
    });
    issueRef = normalizeIssueRef(issueInput);
  }

  const hasBreaking = await confirm({
    message: t('confirm.breaking'),
    default: false,
  });

  let breaking = '';
  if (hasBreaking) {
    breaking = await input({
      message: t('input.breaking'),
      default: '',
      validate: (v) => (v.trim() ? true : t('validate.breaking.required')),
    });
  }

  // ✅ 新增：詢問是否要開啟編輯器（避免沒改就關導致 abort）
  const openEditor = await confirm({
    message: t('confirm.openEditor'),
    default: false,
  });

  const tpl = buildTemplate({
    subjectLine,
    footerKind,
    issueRef,
    breaking,
    locale: args.locale,
  });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-czx-'));
  const tplPath = path.join(tmpDir, 'COMMIT_EDITMSG.tpl');
  fs.writeFileSync(tplPath, tpl, 'utf8');

  // ✅ openEditor=true：用 template 開 editor
  // ✅ openEditor=false：直接用 -m（就算不改訊息也能 commit，不會 abort）
  const commitArgs = openEditor
    ? ['commit', '--edit', '-t', tplPath, ...args.passthrough]
    : ['commit', '-m', subjectLine, ...args.passthrough];

  if (args.dryRun) {
    console.log(t('dryRun.title'));
    console.log(`${t('dryRun.locale')} ${args.locale}`);
    console.log(`${t('dryRun.command')} ${['git', ...commitArgs].join(' ')}`);

    // 只有選擇開 editor 才印模板，否則你只會看到一堆註解心情更差
    if (openEditor) {
      console.log(t('dryRun.template'));
      console.log(tpl);
    }

    console.log(t('dryRun.stagedFiles'));
    console.log(stagedFiles.map((f) => `- ${f}`).join(os.EOL));
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
    return;
  }

  await git(commitArgs, true);

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
}

main().catch((err: unknown) => {
  // 這裡不要依賴 args（可能還沒 parse 成功就爆了）
  const locale = detectLocaleFromEnv();
  const t = i18n(locale);

  const msg = err instanceof Error ? err.message : String(err);
  console.error(`${t('error.prefix')} ${msg}`);
  process.exit(1);
});
