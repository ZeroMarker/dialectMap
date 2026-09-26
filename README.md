# 中国方言地图

**语言:** 中文 | [English](./README.en.md) | [日本語](./README.ja.md)

---

一个交互式 Web 应用，在地图上展示中国各地方言，呈现丰富的语言多样性。

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## 功能特点

- 🗺️ **交互式地图** - 基于 OpenStreetMap 的交互式方言地图
- 🔍 **搜索与筛选** - 按方言名称、英文名、地区或语言特点搜索，支持空格分隔的多关键词；按方言类别筛选
- 📋 **方言浏览** - 完整地点列表、实时结果计数、空结果提示和一键清除筛选
- ⌨️ **便捷操作** - 地图复位、选中标记高亮、Esc 关闭详情和移动端详情面板
- 📍 **可视化标记** - 不同颜色的标记代表不同的方言类别
- 📊 **方言信息** - 详细信息包括描述、使用人数、分布地区、发音示例
- 🎨 **响应式设计** - 使用 Tailwind CSS 构建的美观界面

## 方言类别

涵盖 9 大方言区：

| 类别 | 名称 | 代表方言 |
|------|------|----------|
| `mandarin` | 官话 | 北京话、成都话、沈阳话 |
| `wu` | 吴语 | 上海话 |
| `yue` | 粤语 | 广州话 |
| `min` | 闽语 | 厦门话、汕头话 |
| `hakka` | 客家话 | 梅州话 |
| `xiang` | 湘语 | 长沙话 |
| `gan` | 赣语 | 南昌话 |
| `hui` | 徽语 | 徽州话 |
| `pinghua` | 平话 | 桂林话 |

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **地图**: [Leaflet](https://leafletjs.com/)

## 快速开始

### 环境要求

- Node.js 20.9+
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd dialectMap

# 安装依赖
npm ci

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/
│   ├── globals.css       # 全局样式
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 主页面
├── components/
│   ├── DialectMap.tsx    # 地图组件
│   ├── DialectInfoPanel.tsx  # 信息面板
│   ├── Legend.tsx        # 图例
│   └── SearchFilter.tsx  # 搜索筛选
├── data/
│   ├── dialects.ts       # 方言数据
│   └── dialectCategories.ts  # 类别定义
└── types/
    └── dialect.ts        # 类型定义
```

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 运行代码检查 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm test` | 搜索筛选和数据结构测试 |
| `npm run test:e2e` | 浏览器回归测试（首次运行先执行 `npx playwright install chromium`） |

GitHub Actions 会在 `main` 推送和 pull request 中自动执行上述检查。

## 数据说明

地图标记仅表示代表地点，不表示方言的地理分布边界。现有使用人数缺少统计年份、来源和统一口径，部分条目可能描述整个方言群体，不能直接用于人口比较；发音示例仅为文字展示，不提供语音播放。新增资料应核实分类、地点、统计口径与转写方式，并记录来源。

构建使用系统字体，不依赖 Google Fonts 下载；地图底图仍需访问 OpenStreetMap，加载失败时会显示重试入口；方言列表不依赖底图。浏览器测试使用本地模拟底图请求，覆盖键盘焦点、手机与平板布局，以及底图失败与重试。

## 添加新方言

编辑 `src/data/dialects.ts` 添加新方言数据。

## 许可证

本项目采用 [MIT 许可证](./LICENSE)。

Copyright (c) 2026 Mark Chen

## 致谢

- 地图数据 © [OpenStreetMap](https://www.openstreetmap.org/) 贡献者
- 使用 [Leaflet](https://leafletjs.com/) 地图库
