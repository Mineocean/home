<h1 align="center">Mineocean Home</h1>

<p align="center">
  <strong>暗黑极简 · 垂直居中 · 一键部署</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-4fc08d?style=flat-square&logo=vue.js&logoColor=fff" alt="Vue" />
  <img src="https://img.shields.io/badge/Vite-7.3-646cff?style=flat-square&logo=vite&logoColor=fff" alt="Vite" />
  <img src="https://img.shields.io/badge/Element Plus-2.14-409eff?style=flat-square&logo=element&logoColor=fff" alt="Element Plus" />
  <img src="https://img.shields.io/badge/PWA-Enabled-5a0fc8?style=flat-square&logo=pwa&logoColor=fff" alt="PWA" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

<br />

基于 **Vue 3 + Vite 7** 的轻量级暗黑风格个人主页，开箱即用，一键部署到 Vercel 或任何静态托管平台。

---

## 功能

| 功能 | 说明 |
|---|---|
| 暗黑极简主题 | 纯黑背景 + 细边框卡片 + 三级灰度文字 |
| 垂直居中布局 | 头像 + 名称 + 社交 + 链接，一屏展示 |
| 随机壁纸 | WebP 渐进式加载，占位图 → 高清淡入，PWA 缓存 |
| Hitokoto 一言 | 随机句子 API，支持失败兜底 |
| 实时时钟 | 日期 + 时间 + 打字机效果名称 |
| 社交 & 网站链接 | JSON 配置，图标 + 分隔线模块化 |
| 移动端适配 | 720px 响应式断点，自动切换布局 |
| PWA 离线支持 | Service Worker + 自动更新通知 |
| 哀悼模式 | 特定纪念日自动灰度滤镜 |

---

## 快速开始

> 依赖 Node.js >= 18.0.0，npm >= 9.0.0

```bash
# 1. 复制配置文件
cp .env.example .env

# 2. 安装依赖
npm install

# 3. 本地开发预览
npm run dev
```

浏览器访问 `http://localhost:3000` 即可预览。

---

## 配置指南

### 统一配置入口

所有可配置项集中在以下位置：

| 文件 | 用途 |
|---|---|
| `.env` | 站点名称、作者、图标、建站日期、ICP 备案等 |
| `src/assets/siteLinks.json` | 网站链接列表 |
| `src/assets/socialLinks.json` | 社交图标链接 |

### 站点基础信息（.env）

```bash
VITE_SITE_NAME     = "清海の主页"              # 名称
VITE_SITE_AUTHOR   = "清海"                    # 作者
VITE_SITE_KEYWORDS = "清海,个人主页"            # 关键词
VITE_SITE_DES      = "一个默默无闻的主页"       # 站点简介
VITE_SITE_URL      = "misakaoi.top"            # 站点地址
VITE_SITE_LOGO     = "/images/icon/favicon.ico" # 站点图标
VITE_SITE_MAIN_LOGO = "/images/icon/logo.png"   # 主页 Logo
VITE_SITE_START    = "2026-01-17"              # 建站日期
VITE_SITE_ICP      = ""                        # ICP 备案号
```

### 网站链接与社交链接

`src/assets/siteLinks.json`：

```json
[
  { "icon": "Blog", "name": "博客", "link": "https://example.com" }
]
```

`src/assets/socialLinks.json`：

```json
[
  {
    "name": "Github",
    "icon": "/images/icon/github.png",
    "tip": "去 Github 看看",
    "url": "https://github.com/Mineocean"
  }
]
```

### 背景壁纸

- 壁纸放置于 `public/images/`，命名为 `background1.jpg` ~ `background10.jpg`
- WebP 版本由 `scripts/convert-images.mjs` 自动生成
- 站点图标放置于 `public/images/icon/`

### 字体

默认字体 [LXGW ZhenKai / 霞鹜臻楷](https://github.com/lxgw/LxgwZhenKai)，开源中文字体，已内置在 `public/font/`。

---

## 本地构建与测试

```bash
npm run lint    # 代码检查
npm run build   # 生产构建
npm run preview # 本地预览构建产物
```

---

## 部署

### Vercel（推荐）

1. Clone 本仓库到本地
2. 在 [Vercel](https://vercel.com) 新建项目并导入仓库
3. 配置构建参数：
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 在 Environment Variables 中添加 `.env` 同名配置项
5. 点击 Deploy 完成部署

### Docker

```bash
docker-compose up -d
```

服务将在 `http://localhost:12445` 启动。

---

## 项目结构

```
src/
├── api/index.js              # Hitokoto 一言 API
├── App.vue                   # 主布局（垂直居中）
├── assets/                   # siteLinks.json, socialLinks.json
├── components/
│   ├── Background.vue        # 壁纸渐进式加载
│   ├── Footer.vue            # 脚注
│   ├── Loading.vue           # 加载动画
│   ├── NameModule.vue        # 头像 + 时钟 + 打字机名称 + 一言
│   └── SocialLinksModule.vue # 社交图标 + 网站链接
├── main.js                   # 入口
├── store/index.js            # Pinia 状态管理
├── style/                    # 全局样式
└── utils/                    # 工具函数
```

---

## License

[MIT](LICENSE)
