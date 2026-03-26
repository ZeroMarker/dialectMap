# Chinese Dialect Map

**Language:** [中文](./README.md) | English | [日本語](./README.ja.md)

---

An interactive web application that visualizes Chinese dialects on a map, showcasing the rich linguistic diversity across China.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## Features

- 🗺️ **Interactive Map** - Explore dialect locations on an OpenStreetMap-powered map
- 🔍 **Search & Filter** - Search by name, English name, or region; filter by category
- 📍 **Visual Markers** - Color-coded markers for different dialect categories
- 📊 **Dialect Information** - Detailed info including description, speakers, regions, and examples
- 🎨 **Responsive Design** - Beautiful UI built with Tailwind CSS

## Dialect Categories

The app covers 9 major Chinese dialect categories:

| Category | Name | Example Dialects |
|----------|------|------------------|
| `mandarin` | Mandarin | Beijing, Chengdu, Shenyang |
| `wu` | Wu | Shanghai |
| `yue` | Yue (Cantonese) | Guangzhou |
| `min` | Min | Xiamen, Shantou |
| `hakka` | Hakka | Meizhou |
| `xiang` | Xiang | Changsha |
| `gan` | Gan | Nanchang |
| `hui` | Hui | Huizhou |
| `pinghua` | Pinghua | Guilin |

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mapping**: [Leaflet](https://leafletjs.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dialectMap

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── DialectMap.tsx    # Map component
│   ├── DialectInfoPanel.tsx  # Info panel
│   ├── Legend.tsx        # Legend
│   └── SearchFilter.tsx  # Search & filter
├── data/
│   ├── dialects.ts       # Dialect data
│   └── dialectCategories.ts  # Category definitions
└── types/
    └── dialect.ts        # Type definitions
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Adding New Dialects

Edit `src/data/dialects.ts` to add new dialect data.

## License

This project is licensed under the [MIT License](./LICENSE).

Copyright (c) 2026 Mark Chen

## Acknowledgments

- Map data © [OpenStreetMap](https://www.openstreetmap.org/) contributors
- Built with [Leaflet](https://leafletjs.com/) mapping library
