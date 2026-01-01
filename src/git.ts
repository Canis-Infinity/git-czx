// src\git.ts

import { execa } from 'execa';
import type { Locale } from './types.js';
import { i18n } from './i18n.js';

export async function git(args: string[], inherit = true) {
  return execa('git', args, { stdio: inherit ? 'inherit' : 'pipe' });
}

export async function gitOut(args: string[]): Promise<string> {
  const res = await execa('git', args, { stdio: 'pipe' });
  return res.stdout ?? '';
}

export async function ensureGitRepo(locale: Locale): Promise<void> {
  const t = i18n(locale);
  try {
    await git(['rev-parse', '--git-dir'], false);
  } catch {
    throw new Error(t('git.notRepo'));
  }
}

export async function getStagedFiles(): Promise<string[]> {
  const out = await gitOut(['diff', '--cached', '--name-only']);
  return out
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function stageAll(): Promise<void> {
  await git(['add', '-A'], true);
}
