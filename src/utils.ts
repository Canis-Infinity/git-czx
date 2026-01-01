// src\utils.ts

import type { Locale } from './types.js';

export function countChars(s: string): number {
  return Array.from(s).length;
}

export function stripNewlines(s: string): string {
  return s.replace(/\r?\n/g, ' ').trim();
}

export function isNonEmpty(s: string): boolean {
  return s.trim().length > 0;
}

export function normalizeIssueRef(input: string): string {
  const v = input.trim();
  if (!v) return '';
  if (/^#?\d+$/.test(v)) return v.startsWith('#') ? v : `#${v}`;
  return v;
}

export function detectLocaleFromEnv(): Locale {
  const candidates = [
    process.env.CZ_LANG,
    process.env.LANG,
    process.env.LC_ALL,
    process.env.LC_MESSAGES,
  ];

  for (const v of candidates) {
    if (!v) continue;
    const s = v.trim();
    if (s === 'zh-TW' || s === 'zh-CN' || s === 'en-US') return s;
  }

  // 嚴格：只認三種，其他一律回預設
  return 'en-US';
}

export function localeLabel(locale: Locale): string {
  if (locale === 'zh-TW') return '繁中';
  if (locale === 'zh-CN') return '简中';
  return 'English';
}
