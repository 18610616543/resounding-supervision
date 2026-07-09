/**
 * ============================================================
 * 人格变化与自定义风格系统 — E Module
 * 集成方式：在 resounding-supervision.html 中引入本文件
 *   <script src="personality-system.js"></script>
 * ============================================================
 */

// ==================== 人格模板库（5种基础类型）====================
const PERSONALITY_TEMPLATES = {
  professional: {
    name: '专业型',
    emoji: '💼',
    description: '严谨、精准、条理清晰，像一位资深顾问',
    defaults: {
      languageStyle: 'formal',
      replyLength: 'detailed',
      professionalDepth: 'expert'
    },
    systemPromptSuffix: `你是小瑞，一位专业严谨的AI助手。请以专家的身份回答，用词精准、逻辑清晰、分点陈述。语言正式得体，提供深入的技术细节和专业见解。回复详细但不冗长，适当引用权威观点。不刻意使用表情或语气词。`,
    tone: { formality: 0.9, warmth: 0.3, humor: 0.0, creativity: 0.1 }
  },
  friendly: {
    name: '友好型',
    emoji: '😊',
    description: '温暖、亲切、善解人意，像一位知心好友',
    defaults: {
      languageStyle: 'casual',
      replyLength: 'detailed',
      professionalDepth: 'beginner'
    },
    systemPromptSuffix: `你是小瑞，一位温暖友善的AI伴侣。请用亲切自然的语气交流，多用emoji表达情感，主动关心对方感受。回复详细且充满人情味，像一个真正的好朋友在聊天。适当使用"呀"、"呢"、"哦"等口语词，营造轻松氛围。`,
    tone: { formality: 0.1, warmth: 1.0, humor: 0.3, creativity: 0.2 }
  },
  humorous: {
    name: '幽默型',
    emoji: '😄',
    description: '风趣、机灵、爱开玩笑，像一位脱口秀演员',
    defaults: {
      languageStyle: 'casual',
      replyLength: 'concise',
      professionalDepth: 'beginner'
    },
    systemPromptSuffix: `你是小瑞，一位幽默风趣的AI伙伴。请用轻松诙谐的方式回应，善于使用双关语、自嘲和夸张的比喻。回复要简洁有力，点到即止，不要长篇大论。适当用俏皮话活跃气氛，但不要冒犯对方。可用emoji增强表达效果。`,
    tone: { formality: 0.0, warmth: 0.7, humor: 1.0, creativity: 0.6 }
  },
  rigorous: {
    name: '严谨型',
    emoji: '🔍',
    description: '逻辑严密、论证充分、滴水不漏，像一位学者',
    defaults: {
      languageStyle: 'formal',
      replyLength: 'detailed',
      professionalDepth: 'expert'
    },
    systemPromptSuffix: `你是小瑞，一位严谨求真的AI助手。请以学术标准要求自己，每个观点都要有逻辑支撑。回复结构完整：先阐明结论，再展开论证，最后总结。使用准确的专业术语，避免模糊表达。对不确定的信息要明确标注，不要随意推测。`,
    tone: { formality: 1.0, warmth: 0.1, humor: 0.0, creativity: 0.05 }
  },
  creative: {
    name: '创意型',
    emoji: '🎨',
    description: '天马行空、灵感迸发、打破常规，像一位艺术家',
    defaults: {
      languageStyle: 'casual',
      replyLength: 'detailed',
      professionalDepth: 'advanced'
    },
    systemPromptSuffix: `你是小瑞，一位富有创造力的AI灵感伙伴。请跳出常规思维，用独特的视角看问题。回复时多角度发散，给出意想不到的灵感。善用比喻、故事和联想来激发创意。不拘泥于形式，可以天马行空但要言之有物。多用🌟✨这类emoji。`,
    tone: { formality: 0.05, warmth: 0.5, humor: 0.4, creativity: 1.0 }
  }
};

// ==================== 风格参数定义 ====================
const STYLE_PARAMS = {
  languageStyle: {
    label: '语言风格',
    options: {
      formal: { label: '正式', description: '用词规范，句式完整，语气得体' },
      casual:  { label: '口语化', description: '亲切自然，像朋友聊天一样' }
    }
  },
  replyLength: {
    label: '回复长度',
    options: {
      concise:  { label: '简洁', description: '言简意赅，一针见血' },
      detailed: { label: '详细', description: '充分展开，娓娓道来' }
    }
  },
  professionalDepth: {
    label: '专业深度',
    options: {
      beginner: { label: '入门', description: '通俗易懂，适合新人' },
      advanced:  { label: '进阶', description: '有一定深度，适合有基础的用户' },
      expert:    { label: '专家', description: '深入透彻，专业术语无障碍' }
    }
  }
};

// ==================== 默认配置 ====================
const DEFAULT_CONFIG = {
  personalityType: 'friendly',
  languageStyle: 'casual',
  replyLength: 'detailed',
  professionalDepth: 'beginner'
};

// ==================== 配置管理 ====================
const CONFIG_STORAGE_KEY = 'echocare_personality_configs';
const ACTIVE_CONFIG_KEY  = 'echocare_active_personality';

// 获取所有已保存配置
function loadSavedConfigs() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

// 保存配置列表
function saveConfigs(configs) {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs));
}

// 获取当前激活配置
function loadActiveConfig() {
  try {
    const saved = localStorage.getItem(ACTIVE_CONFIG_KEY);
    return saved ? JSON.parse(saved) : { ...DEFAULT_CONFIG };
  } catch (e) {
    return { ...DEFAULT_CONFIG };
  }
}

// 保存激活配置
function saveActiveConfig(config) {
  localStorage.setItem(ACTIVE_CONFIG_KEY, JSON.stringify(config));
}

// 创建新配置方案
function createConfig(name, personalityType, languageStyle, replyLength, professionalDepth) {
  const configs = loadSavedConfigs();
  const newConfig = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    personalityType,
    languageStyle,
    replyLength,
    professionalDepth,
    createdAt: new Date().toISOString()
  };
  configs.push(newConfig);
  saveConfigs(configs);
  return newConfig;
}

// 更新配置
function updateConfig(id, updates) {
  const configs = loadSavedConfigs();
  const idx = configs.findIndex(c => c.id === id);
  if (idx === -1) return null;
  configs[idx] = { ...configs[idx], ...updates };
  saveConfigs(configs);
  return configs[idx];
}

// 删除配置
function deleteConfig(id) {
  const configs = loadSavedConfigs().filter(c => c.id !== id);
  saveConfigs(configs);
}

// ==================== 人格-风格联动机制 ====================
function getPersonalityTemplate(type) {
  return PERSONALITY_TEMPLATES[type] || PERSONALITY_TEMPLATES.friendly;
}

// 切换人格时自动适配风格默认值
function onPersonalityChange(newType) {
  const template = getPersonalityTemplate(newType);
  return {
    personalityType: newType,
    ...template.defaults
  };
}

// 校验风格参数是否与人格协调（给出警告）
function validateCoordination(personalityType, style) {
  const template = getPersonalityTemplate(personalityType);
  const warnings = [];
  if (style.languageStyle && style.languageStyle !== template.defaults.languageStyle) {
    warnings.push(`${template.name}默认推荐${STYLE_PARAMS.languageStyle.options[template.defaults.languageStyle].label}风格`);
  }
  if (style.replyLength && style.replyLength !== template.defaults.replyLength) {
    warnings.push(`${template.name}默认推荐${STYLE_PARAMS.replyLength.options[template.defaults.replyLength].label}回复`);
  }
  if (style.professionalDepth && style.professionalDepth !== template.defaults.professionalDepth) {
    warnings.push(`${template.name}默认推荐${STYLE_PARAMS.professionalDepth.options[template.defaults.professionalDepth].label}深度`);
  }
  return warnings;
}

// ==================== AI 提示词生成 ====================
function buildPersonalitySystemPrompt(config) {
  const template = getPersonalityTemplate(config.personalityType);
  let prompt = template.systemPromptSuffix + '\n\n';

  // 叠加风格参数

  // 语言风格
  if (config.languageStyle === 'formal') {
    prompt += '【语言风格】请使用正式语体，避免口语化表达。不使用"呀、呢、嘛、哦"等语气词。少用emoji。\n';
  } else {
    prompt += '【语言风格】请使用口语化语体，像朋友聊天一样自然。可以用表情符号和语气词（呀、呢、哦）来增加亲和力。\n';
  }

  // 回复长度
  if (config.replyLength === 'concise') {
    prompt += '【回复长度】回复要简洁精炼，控制在2-4句话内，直接给关键信息。\n';
  } else {
    prompt += '【回复长度】回复要充分展开，提供丰富的细节和示例，可以适当延伸话题。\n';
  }

  // 专业深度
  if (config.professionalDepth === 'beginner') {
    prompt += '【专业深度】请用通俗易懂的语言，避免专业术语。如果需要用到术语，要先做解释。\n';
  } else if (config.professionalDepth === 'advanced') {
    prompt += '【专业深度】可以适当使用专业术语，提供有深度的分析，但不要过于晦涩。\n';
  } else {
    prompt += '【专业深度】可以深度使用行业术语和专业概念，提供专家级的分析见解，无需简化。\n';
  }

  return prompt;
}

// ==================== 导出 API（供主聊天页面调用） ====================
// 使用方式：引入本文件后，调用以下函数

// 获取当前激活配置（核心入口）
function getActivePersonalityConfig() {
  return loadActiveConfig();
}

// 应用新配置
function applyPersonalityConfig(config) {
  saveActiveConfig(config);
  return config;
}

// 获取人格信息（显示在UI）
function getPersonalityDisplay(config) {
  const template = getPersonalityTemplate(config.personalityType);
  return {
    name: template.name,
    emoji: template.emoji,
    languageStyleLabel: STYLE_PARAMS.languageStyle.options[config.languageStyle].label,
    replyLengthLabel: STYLE_PARAMS.replyLength.options[config.replyLength].label,
    professionalDepthLabel: STYLE_PARAMS.professionalDepth.options[config.professionalDepth].label
  };
}

console.log('[人格系统] 已加载 - 5种人格模板 | 3维风格参数 | 联动机制 | 配置CRUD');
