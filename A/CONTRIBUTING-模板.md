# resounding-supervision 贡献指南

感谢你为 resounding-supervision 项目做出贡献！请花2分钟阅读以下规范。

仓库地址：[https://github.com/18610616543/resounding-supervision](https://github.com/18610616543/resounding-supervision)

---

## 行为准则

- 尊重每一位贡献者
- 代码审查对事不对人
- 帮助他人比指责问题更重要

---

## 如何贡献

### 提交 Issue

发现 Bug 或想提新功能？请创建 Issue：

**Bug 报告格式**：
```
标题：[Bug] 简短描述

复现步骤：
1. 打开 xxx 页面
2. 执行 xxx 操作
3. 观察到的错误：xxx

期望行为：xxx
浏览器版本：Chrome 1xx / Edge 1xx
```

**功能请求格式**：
```
标题：[Feature] 简短描述

想要实现什么功能？
为什么需要这个功能？
```

### 提交 Pull Request

1. **Fork 本仓库**到你的 GitHub 账号
2. **Clone 到本地**：`git clone https://github.com/18610616543/resounding-supervision.git`
3. **创建 feature 分支**：`git checkout -b feature/功能描述`
4. **编写代码并提交**：
   ```bash
   git add 修改的文件
   git commit -m "做了什么修改"
   ```
5. **Push 到你的 fork**：`git push origin feature/功能描述`
6. **在 GitHub 上创建 Pull Request**，选择 `main` 分支

### PR 规范

- **标题格式**：`[对应Issue编号] 简要描述`，如 `[#3] 补充预设人格对话示例`
- **描述必须包含**：
  - 修改了什么文件
  - 为什么要修改
  - 如何验证修改有效
- 一个 PR 只解决一个问题，不要混入无关改动

---

## 分支策略

```
main          ← 稳定版本，受保护，不可直接推送
  ↑
feature/xxx   ← 所有人从这里分支出去开发，通过 PR 合入 main
```

---

## Code Review 流程

1. PR 作者提交后，在 PR 中 @ 指定 Reviewer
2. Reviewer 在半天内完成审查，意见类型：
   - **建议修改**：指出具体的代码问题，附修改建议
   - **提问**：对不明确的逻辑提出疑问
   - **认可**：`LGTM`（Looks Good To Me），同意合并
3. PR 作者根据意见修改并 push 新 commit
4. Reviewer 二次确认后，PR 作者自行 merge
5. 合并后删除 feature 分支

---

## 代码风格

- HTML：使用语义化标签，2空格缩进
- CSS：使用 CSS 变量（定义在 `:root`），类名用中划线 `kebab-case`
- JavaScript：使用 ES6+ 语法，函数使用 `const` 声明，字符串使用单引号
- 遇到不确定的，参考已有代码风格即可

---

## 运行与测试

本项目为纯静态页面，无需构建：

```
# 直接打开
start index.html        # 管理控制台
start resounding-supervision.html    # 情感聊天
```

修改代码后刷新浏览器即可看到效果。提交 PR 前请确保：
- 核心功能流程正常（创建→编辑→保存→删除）
- 控制台无 JavaScript 报错
