简体中文 | [English](./README_EN.md)

# Mineocean Home

这是一个基于 Vue + Vite 的轻量级个人主页模板，适合快速部署到 Vercel 或其他静态托管平台。

## 致谢

感谢 [imsyy/home](https://github.com/imsyy/home) 提供的原始设计与灵感支持，本仓库在此基础上进行整理与维护。
感谢 Copilot 对本项目代码整理与文档完善所做的工作。

## 功能

- [x] 载入动画
- [x] 站点简介
- [x] Hitokoto 一言
- [x] 日期与时间
- [x] 时光进度条
- [x] 移动端适配
- [x] 自定义网站与社交链接
- [x] 模块化配置与统一入口

## 快速开始

> 本项目依赖 Node.js 环境，请确保本地已安装。

- Node.js >= 18.0.0
- npm >= 9.0.0

```bash
# 1. 复制配置文件
cp .env.example .env

# 2. 安装依赖
npm install

# 3. 本地开发预览
npm run dev
```

## 本地构建与测试

> 构建前务必确保 `.env` 已创建，否则 `index.html` 中的占位符会导致构建失败。

```bash
# 代码检查
npm run lint

# 构建
npm run build

# 本地预览构建结果
npm run preview
```

## 配置指南

### 统一配置入口

所有可配置项集中在以下位置：

- `.env`：站点基础信息与展示开关
- `src/assets/siteLinks.json`：网站链接
- `src/assets/socialLinks.json`：社交链接

> 保留 Hitokoto 一言模块，其余功能可以按需增删，并保持在上述配置入口中统一维护。

### 站点基础信息（.env）

```bash
# 站点信息
VITE_SITE_NAME = "清海の主页"        # 名称
VITE_SITE_AUTHOR = "清海"            # 作者
VITE_SITE_KEYWORDS = "清海,个人主页"  # 关键词
VITE_SITE_DES = "一个默默无闻的主页" # 站点简介
VITE_SITE_URL = "misakaoi.top"       # 站点地址
VITE_SITE_LOGO = "/images/icon/favicon.ico"  # 站点图标
VITE_SITE_MAIN_LOGO = "/images/icon/logo.png" # 主页 Logo
```

### 建站日期与备案

```bash
VITE_SITE_START = "2020-10-24"  # 建站日期，支持 YYYY 或 YYYY-MM-DD
VITE_SITE_ICP = "豫ICP备2022018134号-1" # ICP 备案号，可留空
```

### 网站链接与社交链接

- 网站链接：`src/assets/siteLinks.json`
- 社交链接：`src/assets/socialLinks.json`

示例：

```json
{
  "icon": "Blog",
  "name": "博客",
  "link": "https://example.com"
}
```

> 图标可在 [xicons](https://www.xicons.org) 中挑选，并在 `src/components/Links.vue` 内引入。

### 背景与图标

- 背景图：放置于 `public/images`，命名为 `background1.jpg`、`background2.jpg` ...
- 站点图标：放置于 `public/images/icon`

### 字体

默认字体使用 [LXGW ZhenKai / 霞鹜臻楷](https://github.com/lxgw/LxgwZhenKai)。

## Vercel 部署

1. Fork 本仓库到你的 GitHub
2. 在 Vercel 新建项目并导入该仓库
3. 配置构建参数：
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 在 Environment Variables 中添加 `.env` 同名配置项
5. 点击 Deploy 完成部署

## License

本项目遵循仓库中的 MIT 许可协议。
