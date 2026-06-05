# Proof — Resume Builder

A modern, privacy-first resume builder with real-time preview, editorial design, and multi-format export.

## Features

- **Editorial Design** — Magazine-inspired typography with Playfair Display serif headings and DM Sans body text
- **Real-time Preview** — See changes instantly as you type
- **4 Professional Templates** — Classic, Minimal, Modern, Executive
- **Multi-format Export** — PDF, HTML, PNG
- **Dark Mode** — Linear-inspired dark theme with ambient glow
- **Bilingual** — Full Chinese/English support with persistent language preference
- **Accessibility** — Keyboard navigation, ARIA attributes, focus-visible styles
- **Privacy First** — All data stored locally in your browser
- **Auto-save** — Automatic saving every 30 seconds

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
cd resume-generator
npm install
npm run dev
```

Visit http://localhost:5173

### Build for Production

```bash
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run all tests once |
| `npm run test:coverage` | Run tests with coverage report |

## Testing

```bash
npm run test:run        # Run all tests
npm run test:coverage   # With coverage report
```

- **277 tests** across 37 test files
- **80%+ coverage** across all modules
- Testing Library + Vitest + jsdom

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Components | shadcn/ui (Button, Dialog, Badge, Select, Tabs, etc.) |
| State | Zustand |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Export | html2pdf.js (PDF), html-to-image (PNG) |
| i18n | i18next + react-i18next |
| Testing | Vitest + Testing Library |
| Analytics | Vercel Analytics, Speed Insights |

## Project Structure

```
src/
├── components/ui/          # shadcn/ui base components
├── features/
│   ├── editor/             # Resume editor
│   │   ├── sections/       # Form sections (Personal, Skills, Experience, Education, Projects)
│   │   └── components/     # Shared form components (ExpandableCard, FormField, TagInput, etc.)
│   ├── preview/            # Resume preview
│   │   ├── layouts/        # Layout components (SingleColumn, TwoColumn, Sidebar)
│   │   ├── shared/         # Shared preview components
│   │   └── utils/          # formatDate, hasResumeContent, getVariant
│   ├── templates/          # Template registry and selector
│   ├── wizard/             # Navigation, progress steps, floating preview
│   └── export/             # Export dialog (PDF/HTML/PNG)
├── hooks/                  # Custom hooks (useAutoSave, useAnimateOnMount)
├── store/                  # Zustand store with localStorage persistence
├── types/                  # TypeScript types
├── i18n/                   # i18next setup + locale files (zh-CN, en)
├── index.css               # Design system (CSS custom properties)
├── App.tsx                 # Main app
└── main.tsx                # Entry point
```

## Design System

The UI uses a bright professional theme defined via CSS custom properties in `src/index.css`:

- **Display font**: Playfair Display (editorial serif)
- **Body font**: DM Sans (clean sans-serif)
- **Accent**: Bright blue `#3b82f6`
- **Surfaces**: White/light with subtle gray variants

## Deployment

### Vercel

1. Push to GitHub
2. Connect repository at vercel.com
3. Automatic deployment on every push

```bash
# Build command
npm run build

# Output directory
dist
```

## Privacy

Your resume data is stored only in your browser's localStorage. It is never uploaded to any server. You can:
- Export data as JSON at any time
- Clear browser data to delete everything
- Use the app completely offline after first load

## License

Open source, free to use.

---

Built with care for job seekers everywhere.
