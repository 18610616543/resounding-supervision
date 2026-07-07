# resounding-supervision · 情感陪伴机器人

> 面向个人用户的情感陪伴 AI 机器人，提供智能体管理与情感聊天交互两大核心体验。
>
> 仓库地址：[https://github.com/18610616543/resounding-supervision](https://github.com/18610616543/resounding-supervision)

---

## 核心功能

### 管理控制台

- **智能体管理**：创建、编辑、删除、保存 AI 角色。每个智能体可独立配置性别、语言、语音角色和人格
- **人格配置双分支**：预设模式（10 种男女预设人格，支持多选自由融合）+ 自定义模式（自由编写系统提示词）
- **AI 提示词润色**：5 维度评分（身份定义/内容丰富度/语言风格/安全约束/结构清晰度），自动生成优化建议
- **实时人格预览**：即时分析人格特征，生成特征标签、人格描述和模拟对话示例
- **分享码系统**：一键生成/导入人格配置分享码，内置社区推荐码
- **用户认证**：注册、登录、记住密码，演示账号 demo@resounding-supervision.ai
- **数据备份**：一键导出/导入 JSON 格式全量备份

### 情感聊天交互

- **多维情感识别**：基于关键词层级权重算法，情感分类 + 强度计算
- **智能对话回复**：按情感强度分档匹配，支持上下文感知和情感趋势检测
- **语音交互**：Web Speech API（TTS 语音合成 + ASR 语音识别）
- **角色动画系统**：表情切换、呼吸动画、抖动弹跳等多级动画反馈
- **主动陪伴模式**：渐进式无操作检测，按时间段和兴趣标签生成智能话题

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | HTML5 + CSS3 + 原生 JavaScript（ES6+） |
| 存储 | localStorage |
| 语音 | Web Speech API（TTS + ASR） |
| 部署 | 纯静态页面，双击即用 |

---

## 快速开始

``bash
git clone https://github.com/18610616543/resounding-supervision.git
cd resounding-supervision
start index.html
``

> 无需安装任何依赖，双击 HTML 文件即可运行。推荐 Chrome 或 Edge。

---

## 项目结构

``
resounding-supervision/
├── index.html                       # 管理控制台
├── resounding-supervision.html      # 情感聊天交互
├── css/
│   └── style.css                    # 样式表
├── js/
│   └── app.js                       # 核心逻辑
├── README.md
├── LICENSE
└── CONTRIBUTING.md
``

---

## 团队

| 姓名 | 学号 | 班级 | GitHub | 角色 |
|------|------|------|--------|------|
| 组长 | | | | 项目架构 + DevOps + 版本发布 |
| 成员B | | | | 智能体管理 + 认证系统 |
| 成员C | | | | 人格配置系统 |
| 成员D | | | | 对话系统 + 情感分析 |
| 成员E | | | | 分享系统 + 测试 |

---

## 许可证

本项目采用 [MIT License](LICENSE)。
