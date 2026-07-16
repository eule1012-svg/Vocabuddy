# Vocabuddy

Vocabuddy 是一个支持中文、英文、西里尔蒙古文的个性化网页端背单词工具。

首期支持 4 个语言方向：

- 中文 → 英文
- 中文 → 西里尔蒙古文
- 西里尔蒙古文 → 中文
- 西里尔蒙古文 → 英文

产品核心是：母语优先解释、每日学习闭环、间隔复习、测验，以及跨母语好友互相推荐单词。

## 文档

- [产品需求文档](docs/PRD.md)
- [技术架构文档](docs/ARCHITECTURE.md)

## 当前开发状态

已完成：

- 产品需求和 MVP 边界。
- Web 技术架构。
- Next.js + TypeScript + Tailwind 项目初始化。
- Vocabuddy 首页视觉壳层。
- Prisma 数据库 schema。
- 首发语言方向白名单。
- 健康检查接口：`GET /api/health`。

正在进行：

- 注册、登录和会话管理。
- 母语与目标语言设置。
- 学习计划和词库基础能力。

## 本地开发

要求：Node.js 20.11+。当前项目使用 Prisma 6，兼容现有 Node 环境。

```bash
npm install
cp .env.example .env
npm run dev
```

打开 <http://localhost:3000>。

## 常用命令

```bash
npm run lint
npm run build
npm run db:validate
npm run db:generate
npm run db:format
npm run db:push
```

`db:push` 需要可连接的 PostgreSQL 数据库。首版 Web 不提供离线学习。

## 环境变量

复制 `.env.example` 为 `.env`，填写 PostgreSQL、会话密钥以及后续接入的词典、翻译和发音服务密钥。`.env` 不得提交到 Git。
