# 中国語方言マップ

**言語:** [中文](./README.md) | [English](./README.en.md) | 日本語

---

中国の方言を地図上で可視化するインタラクティブな Web アプリケーションです。

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## 機能

- 🗺️ **インタラクティブマップ** - OpenStreetMap 搭載の対話型地図で方言の位置を確認
- 🔍 **検索・フィルタ** - 名前、英語名、地域で検索；カテゴリ別に絞り込み
- 📍 **カラーマーカー** - 方言カテゴリ別に色分けされたマーカー
- 📊 **方言情報** - 説明、話者数、分布地域、発音例を詳細表示
- 🎨 **レスポンシブデザイン** - Tailwind CSS による美しい UI

## 方言カテゴリ

9 つの主要な中国語方言を網羅：

| カテゴリ | 名称 | 代表例 |
|----------|------|--------|
| `mandarin` | 官話 | 北京語、成都語、瀋陽語 |
| `wu` | 呉語 | 上海語 |
| `yue` | 粤語（広東語） | 広州語 |
| `min` | 閩語 | 廈門語、汕头語 |
| `hakka` | 客家語 | 梅州語 |
| `xiang` | 湘語 | 長沙語 |
| `gan` | 贛語 | 南昌語 |
| `hui` | 徽語 | 徽州語 |
| `pinghua` | 平話 | 桂林語 |

## 技術スタック

- **フレームワーク**: [Next.js 14](https://nextjs.org/) (App Router)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **マッピング**: [Leaflet](https://leafletjs.com/)

## はじめ方

### 前提条件

- Node.js 18+
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd dialectMap

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く

## プロジェクト構造

```
src/
├── app/
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # メインページ
├── components/
│   ├── DialectMap.tsx    # 地図コンポーネント
│   ├── DialectInfoPanel.tsx  # 情報パネル
│   ├── Legend.tsx        # 凡例
│   └── SearchFilter.tsx  # 検索・フィルタ
├── data/
│   ├── dialects.ts       # 方言データ
│   └── dialectCategories.ts  # カテゴリ定義
└── types/
    └── dialect.ts        # 型定義
```

## 利用可能なコマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクションビルド |
| `npm start` | プロダクションサーバーを起動 |
| `npm run lint` | ESLint を実行 |

## 新しい方言の追加

`src/data/dialects.ts` を編集して新しい方言データを追加します。

## ライセンス

このプロジェクトは [MIT ライセンス](./LICENSE) の下で提供されています。

Copyright (c) 2026 Mark Chen

## 謝辞

- 地図データ © [OpenStreetMap](https://www.openstreetmap.org/) 貢献者
- [Leaflet](https://leafletjs.com/) 地図ライブラリを使用
