
// src\types.ts

export type Locale = 'zh-TW' | 'zh-CN' | 'en-US';

export type CommitTypeKey =
  | 'chore'
  | 'ci'
  | 'docs'
  | 'feat'
  | 'fix'
  | 'perf'
  | 'refactor'
  | 'release'
  | 'style'
  | 'test';

export type CommitType = {
  value: CommitTypeKey;
  emoji: string;
  description: Record<Locale, string>;
};

export const COMMIT_TYPES: Record<CommitTypeKey, CommitType> = {
  chore: {
    value: 'chore',
    emoji: '🤖',
    description: {
      'zh-TW': '建置流程、工具或輔助設定調整（不影響功能）',
      'zh-CN': '构建流程、工具或辅助配置调整（不影响功能）',
      'en-US': 'Build process or auxiliary tool changes',
    },
  },
  ci: {
    value: 'ci',
    emoji: '🎡',
    description: {
      'zh-TW': 'CI / CD 相關設定或流程調整',
      'zh-CN': 'CI / CD 相关配置或流程调整',
      'en-US': 'CI related changes',
    },
  },
  docs: {
    value: 'docs',
    emoji: '✏️',
    description: {
      'zh-TW': '文件新增或修改（README、說明文件等）',
      'zh-CN': '文档新增或修改（README、说明文档等）',
      'en-US': 'Documentation only changes',
    },
  },
  feat: {
    value: 'feat',
    emoji: '🎸',
    description: {
      'zh-TW': '新增或修改功能（對使用者有行為變化）',
      'zh-CN': '新增或修改功能（对用户有行为变化）',
      'en-US': 'A new feature',
    },
  },
  fix: {
    value: 'fix',
    emoji: '🐛',
    description: {
      'zh-TW': '修正錯誤或非預期行為',
      'zh-CN': '修复错误或非预期行为',
      'en-US': 'A bug fix',
    },
  },
  perf: {
    value: 'perf',
    emoji: '⚡️',
    description: {
      'zh-TW': '效能優化（不改變既有功能行為）',
      'zh-CN': '性能优化（不改变既有功能行为）',
      'en-US': 'A code change that improves performance',
    },
  },
  refactor: {
    value: 'refactor',
    emoji: '💡',
    description: {
      'zh-TW': '重構或優化程式碼結構（非修 Bug、非新功能）',
      'zh-CN': '重构或优化代码结构（非修 Bug、非新增功能）',
      'en-US': 'A code change that neither fixes a bug nor adds a feature',
    },
  },
  release: {
    value: 'release',
    emoji: '🏹',
    description: {
      'zh-TW': '版本釋出或發佈相關提交',
      'zh-CN': '版本发布相关提交',
      'en-US': 'Create a release commit',
    },
  },
  style: {
    value: 'style',
    emoji: '💄',
    description: {
      'zh-TW': '程式碼風格調整（排版、空白、格式，不影響邏輯）',
      'zh-CN': '代码风格调整（排版、空白、格式，不影响逻辑）',
      'en-US': 'Markup, white-space, formatting, missing semi-colons...',
    },
  },
  test: {
    value: 'test',
    emoji: '💍',
    description: {
      'zh-TW': '新增或調整測試（單元測試、整合測試等）',
      'zh-CN': '新增或调整测试（单元测试、集成测试等）',
      'en-US': 'Adding missing tests',
    },
  },
};
