// src\template.ts

import os from 'os';
import type { Locale } from './types.js';
import { i18n } from './i18n.js';

export type FooterKind = 'none' | 'refs' | 'closes' | 'fixes';

export type TemplateInput = {
  subjectLine: string;
  footerKind: FooterKind;
  issueRef: string;
  breaking: string;
  locale: Locale;
};

export function buildTemplate(x: TemplateInput): string {
  const lines: string[] = [];
  const t = i18n(x.locale);

  // subject
  lines.push(x.subjectLine);
  lines.push('');

  // body
  lines.push(
    x.locale === 'en-US'
      ? '# Body (write what/why, multi-line)'
      : x.locale === 'zh-CN'
      ? '# Body（请写：做了什么 / 为什么）'
      : '# Body（請寫：做了什麼 / 為什麼）'
  );
  lines.push('# - ...');
  lines.push('');

  // footer
  lines.push(
    x.locale === 'en-US'
      ? '# Footer (optional)'
      : x.locale === 'zh-CN'
      ? '# Footer（选填）'
      : '# Footer（選填）'
  );

  if (x.footerKind !== 'none' && x.issueRef) {
    const key =
      x.footerKind === 'refs'
        ? 'Refs'
        : x.footerKind === 'closes'
        ? 'Closes'
        : 'Fixes';
    lines.push(`${key}: ${x.issueRef}`);
  } else {
    lines.push('# Refs: #123');
    lines.push('# Closes: #123');
    lines.push('# Fixes: #123');
  }

  if (x.breaking.trim()) {
    lines.push(`BREAKING CHANGE: ${x.breaking.trim()}`);
  } else {
    lines.push('# BREAKING CHANGE: ...');
  }

  lines.push('');
  void t;

  return lines.join(os.EOL);
}
