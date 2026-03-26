# 中国方言地图

**语言:** 中文 | [English](./README.en.md) | [日本語](./README.ja.md)

---

一个交互式 Web 应用，在地图上展示中国各地方言，呈现丰富的语言多样性。

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## 功能特点

- 🗺️ **交互式地图** - 基于 OpenStreetMap 的交互式方言地图
- 🔍 **搜索与筛选** - 按方言名称、英文名或地区搜索；按方言类别筛选
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

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **地图**: [Leaflet](https://leafletjs.com/)

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd dialectMap

# 安装依赖
npm install

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

## 添加新方言

编辑 `src/data/dialects.ts` 添加新方言数据。

## 许可证

本项目用于教育和文化保护目的。

## 致谢

- 地图数据 © [OpenStreetMap](https://www.openstreetmap.org/) 贡献者
- 使用 [Leaflet](https://leafletjs.com/) 地图库
