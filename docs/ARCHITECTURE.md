# Vocabuddy 技术架构说明

**版本**：1.0.0  
**状态**：Draft，可进入项目初始化  
**平台**：响应式 Web 应用  
**目标**：支持 Vocabuddy 首版 P0：个人学习闭环、跨母语好友互选单词和基础进度对比。

---

## 1. 架构结论

Vocabuddy 采用单仓库、模块化全栈 Web 架构：

- 前端：Next.js + TypeScript + React。
- UI：Tailwind CSS + 自有组件层。
- 后端：Next.js Route Handlers，按领域拆分服务模块。
- 数据库：PostgreSQL。
- ORM：Prisma。
- 认证：邮箱密码认证，服务端会话 Cookie。
- 内容服务：自建核心词库优先，外部词典/翻译/发音 API 作为补充。
- 部署：先支持单个 Web 服务部署，数据库和 Web 服务分离。
- 测试：Vitest/同类单元测试 + Playwright 端到端测试。

首版不做原生 App、Web 离线同步、复杂微服务和完整内容管理后台。

## 2. 技术选型与理由

| 领域 | 选择 | 理由 |
|---|---|---|
| Web 框架 | Next.js App Router | 同时承载页面、服务端渲染和 API，适合空项目快速启动 |
| 类型系统 | TypeScript | 降低多语言内容、学习状态和 API 数据结构错误 |
| UI | React + Tailwind CSS | 快速构建响应式界面，便于 AI 工具和团队协作 |
| 数据库 | PostgreSQL | 关系数据、权限和学习记录稳定可靠 |
| ORM | Prisma | 类型安全、迁移清晰，适合快速迭代数据模型 |
| 认证 | 服务端 Cookie Session | 不把长期凭据暴露给前端，便于权限控制 |
| API | REST/JSON | 与 PRD 中 API 路径一致，容易调试和交接 |
| 测试 | 单元测试 + Playwright | 覆盖算法、权限和真实浏览器流程 |
| 部署 | Web 服务 + 托管 PostgreSQL | 首版运维简单，后续可拆分服务 |

默认不引入状态管理大框架、微服务、消息队列和复杂缓存。只有出现明确性能或一致性需求时再增加。

## 3. 系统边界

```text
浏览器
  │
  ├── Next.js 页面层
  │     ├── 登录/注册
  │     ├── 引导与学习计划
  │     ├── 今日学习/复习/测验
  │     ├── 生词本/统计
  │     └── 好友/推荐任务
  │
  ├── Next.js API 层
  │     ├── Auth
  │     ├── User & Preferences
  │     ├── Learning Plans
  │     ├── Words & Wordbook
  │     ├── Review & Quiz
  │     └── Friends & Gift Tasks
  │
  ├── Domain Services
  │     ├── LearningPlanService
  │     ├── DailySessionService
  │     ├── ReviewScheduler
  │     ├── ForecastService
  │     ├── GiftTaskService
  │     └── ContentService
  │
  ├── PostgreSQL
  │
  └── 外部内容服务
        ├── 词典 API
        ├── 翻译 API
        └── 发音/音频服务
```

## 4. 目录结构

```text
Vocabuddy/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (onboarding)/
│   │   ├── language/page.tsx
│   │   ├── goal/page.tsx
│   │   ├── assessment/page.tsx
│   │   └── plan/page.tsx
│   ├── (app)/
│   │   ├── home/page.tsx
│   │   ├── learn/[sessionId]/page.tsx
│   │   ├── review/page.tsx
│   │   ├── quiz/[sessionId]/page.tsx
│   │   ├── wordbook/page.tsx
│   │   ├── words/[id]/page.tsx
│   │   ├── plan/page.tsx
│   │   ├── friends/page.tsx
│   │   ├── friends/[id]/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── stats/page.tsx
│   │   └── settings/page.tsx
│   └── api/v1/
│       ├── auth/
│       ├── me/
│       ├── plans/
│       ├── study-sessions/
│       ├── quiz-sessions/
│       ├── words/
│       ├── wordbook/
│       ├── friends/
│       └── gift-tasks/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── learning/
│   ├── features/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── learning/
│   │   ├── wordbook/
│   │   ├── friends/
│   │   └── gift-tasks/
│   ├── server/
│   │   ├── auth/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── permissions/
│   │   └── integrations/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── env.ts
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   └── validation.ts
│   └── i18n/
│       ├── zh-CN.json
│       ├── en.json
│       └── mn-Cyrl.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── content/
│   ├── seed/
│   └── schemas/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
├── .env.example
├── package.json
└── README.md
```

## 5. 数据模型

### 5.1 User

- `id`
- `email`
- `username`，唯一
- `passwordHash`
- `nativeLanguageCode`
- `timezone`
- `createdAt`
- `updatedAt`
- `deletedAt`

### 5.2 LearningPlan

- `id`
- `userId`
- `nativeLanguageCode`
- `targetLanguageCode`
- `goalCode`
- `currentLevel`
- `targetLevel`
- `dailyNewWordCount`
- `dailyReviewLimit`
- `startDate`
- `status`
- `createdAt`
- `updatedAt`

约束：首发只允许以下语言方向：

- `zh-CN → en`
- `zh-CN → mn-Cyrl`
- `mn-Cyrl → zh-CN`
- `mn-Cyrl → en`

### 5.3 Word

保存目标语言本身，不保存某一个用户的解释内容。

- `id`
- `languageCode`
- `term`
- `normalizedTerm`
- `partOfSpeech`
- `phonetic`
- `audioUrl`
- `level`
- `topicIds` 或关联表
- `source`
- `reviewStatus`

### 5.4 WordLocalization

按解释语言保存本地化内容。

- `id`
- `wordId`
- `explanationLanguageCode`
- `definitions`
- `examples`
- `collocations`
- `usageNotes`
- `wordForms`
- `source`
- `version`
- `reviewStatus`

### 5.5 UserWordState

- `id`
- `userId`
- `wordId`
- `learningPlanId`
- `status`
- `masteryLevel`，0–5
- `correctCount`
- `incorrectCount`
- `lastReviewedAt`
- `nextReviewAt`
- `addedSource`：system、manual、gift_task
- `createdAt`
- `updatedAt`

唯一约束：`userId + wordId + learningPlanId`。

### 5.6 StudySession 与 ReviewAttempt

`StudySession` 表示一次今日学习、复习或测验会话。`ReviewAttempt` 表示每一道题或每次复习操作。

必须记录：

- 用户
- 学习计划
- 单词
- 题型
- 用户答案
- 是否正确
- 回答耗时
- 发生时间
- 幂等键

### 5.7 Friendship

- `id`
- `requesterId`
- `receiverId`
- `status`：pending、accepted、rejected、blocked、removed
- `createdAt`
- `updatedAt`

服务端必须保证一对用户之间不能存在重复有效好友关系。

### 5.8 GiftTask 与 GiftTaskItem

`GiftTask`：

- 创建者
- 接收者
- 标题
- 原始语言
- 推荐理由原文
- 推荐理由译文
- 翻译服务和版本
- 状态：pending、partially_accepted、accepted、rejected、expired
- 创建时间和建议完成时间

`GiftTaskItem`：

- 系统词条 ID，可为空
- 自定义词文本，可为空
- 匹配后的词条 ID，可为空
- 接受状态：pending、accepted、skipped
- 内容状态：complete、needs_completion、invalid

## 6. 领域服务规则

### 6.1 DailySessionService

生成今日任务时按以下顺序组合：

1. 到期复习词。
2. 已接受但尚未学习的好友推荐词。
3. 系统新词。
4. 用户主动加入的历史词。

生成过程必须去重，并遵守每日新词数和复习上限。

### 6.2 ReviewScheduler

使用 0–5 级掌握度：

| 掌握度 | 默认复习间隔 |
|---:|---:|
| 0 | 当天重新出现 |
| 1 | 1 天 |
| 2 | 3 天 |
| 3 | 7 天 |
| 4 | 14 天 |
| 5 | 30 天 |

答对提升一级，答错降低一级或两级。所有更新必须事务化，重复提交不能重复计分。

### 6.3 ForecastService

预测依据：

- 目标等级所需有效掌握词量。
- 近 7 日新词完成率。
- 近 7 日复习完成率。
- 近 7 日测验正确率。
- 当前掌握度分布。

没有足够真实数据时，使用配置化默认完成率，并在界面说明“基于默认估计”。

### 6.4 ContentService

内容读取顺序：

1. 自建核心词库。
2. 数据库中已缓存的外部内容。
3. 外部词典/发音/翻译服务。
4. 外部服务失败时返回部分内容和可理解提示。

不得让外部 API 直接成为学习流程的唯一依赖。

## 7. API 设计约束

- 所有 API 路径使用 `/api/v1`。
- 所有请求和响应使用 JSON。
- 所有错误返回统一结构：`code`、`message`、`details`、`requestId`。
- 所有写操作支持幂等键或服务端去重。
- 所有资源按当前登录用户进行权限过滤。
- 好友数据只能返回被允许展示的字段。
- 接收者确认 `GiftTaskItem` 后，服务端才创建 `UserWordState`。
- 接口不得接收客户端传入的 `userId` 作为权限依据，用户身份必须来自会话。

### 示例：创建好友推荐任务

`POST /api/v1/gift-tasks`

```json
{
  "receiverId": "user-id",
  "title": "工作中常用的表达",
  "sourceLanguageCode": "mn-Cyrl",
  "items": [
    { "wordId": "word-id", "note": "这个词在工作沟通中很常见" },
    { "customTerm": "custom phrase", "note": "建议你了解这个表达" }
  ]
}
```

服务端必须验证：

- 创建者和接收者已成为好友。
- 推荐者确实可以访问该词条。
- 词条目标语言等于接收者学习计划的目标语言。
- 自定义词长度和频率合法。

## 8. 身份与权限

角色只有两类：

- 普通用户。
- 系统管理员，首版仅为后续预留，不开放管理后台。

普通用户可以：

- 读写自己的学习计划、生词本和答题记录。
- 查看自己被授权的好友数据。
- 创建好友推荐任务，但不能写入好友学习状态。
- 接受或拒绝发给自己的推荐任务。

## 9. 测试策略

### 单元测试

- 语言方向白名单。
- 掌握度和复习日期计算。
- 每日任务去重和数量限制。
- 学习预测。
- 推荐任务权限。
- 推荐任务接受后创建用户词状态。
- 自定义词校验。
- 语言本地化选择。

### 集成测试

- 注册、登录和会话恢复。
- 创建学习计划。
- 生成今日任务。
- 完成答题并更新掌握度。
- 创建推荐任务、逐词接受和进入生词本。
- 删除好友后回收权限。
- 外部内容 API 超时后的降级。

### E2E 测试

- 中文母语者学习英文。
- 中文母语者学习西里尔蒙古文。
- 西里尔蒙古文母语者学习中文。
- 西里尔蒙古文母语者学习英文。
- 两个不同母语用户互相推荐单词。
- 用户修改母语后查看同一词条。
- 网络失败后重试，不重复计分。

## 10. 环境变量

```env
DATABASE_URL=
SESSION_SECRET=
APP_URL=http://localhost:3000

DICTIONARY_API_URL=
DICTIONARY_API_KEY=
TRANSLATION_API_URL=
TRANSLATION_API_KEY=
PRONUNCIATION_API_URL=
PRONUNCIATION_API_KEY=
```

所有密钥只能存在于环境变量或部署平台 Secret 中，不得提交到 Git。

## 11. 开发顺序

### Milestone 1：项目基础

- 初始化 Next.js、TypeScript、Tailwind 和 Prisma。
- 配置环境变量校验。
- 配置 PostgreSQL 连接。
- 建立统一错误、日志和 API 响应结构。
- 建立国际化资源目录。
- 建立测试和 lint 命令。

### Milestone 2：认证与学习画像

- 注册、登录、退出和密码重置。
- 主要母语和目标语言设置。
- 语言方向白名单。
- 学习目的、水平和计划。

### Milestone 3：个人学习闭环

- 词库导入和单词详情。
- 今日任务。
- 生词本。
- 简单间隔复习。
- 测验。
- 基础统计和预测。

### Milestone 4：好友推荐

- 好友请求和隐私设置。
- 词库选词。
- 自定义词。
- 推荐理由翻译缓存。
- 接收者逐词确认。
- 基础好友进度对比。

### Milestone 5：验证与发布

- 四个语言方向的 E2E 测试。
- 内容质量抽检。
- 权限和隐私测试。
- 性能测试。
- 小规模灰度发布。

## 12. 首版完成定义

只有同时满足以下条件，才视为首版完成：

- 四个语言方向均有可学习的核心词条。
- 用户能够注册、设置母语、创建计划并完成一次学习。
- 复习和测验能够更新用户-单词掌握度。
- 预测页面能显示可解释的预计范围。
- 两个不同母语用户能够互加好友、互相推荐单词并确认进入生词本。
- 好友不能越权修改对方数据。
- Web 网络异常时不会重复计分或丢失已确认的结果。
- 关键单元、集成和 E2E 测试通过。
