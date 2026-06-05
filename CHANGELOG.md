# Changelog

## [1.1.0] - 2026-06-05

### Added
- Editorial/magazine typography style with Playfair Display serif font for display headings
- Arrow key navigation between wizard steps (keyboard accessibility)
- `aria-pressed` on active nav items, `aria-hidden` on decorative elements
- `focus-visible` ring styles for keyboard navigation
- Education section "至今" (present) date support in Chinese locale
- ErrorBoundary component with reset capability
- Empty export guard prevents crash when exporting with no resume content

### Fixed
- SkillsSection duplicate React key by appending array index
- FormField `maxLength` attribute now properly enforced on inputs
- `resetResume` store action clears localStorage before resetting state
- `isSectionComplete` accuracy for all 5 sections (no longer returns false positives)
- ErrorBoundary catches render errors and provides reset action instead of white screen
- ProgressSteps keyboard navigation (left/right arrow keys cycle through steps)
- Dead i18n translation keys removed from locale files
- Language preference persists across page reloads

### Changed
- App-wide display font switched from DM Serif Display to Playfair Display
- WizardCard animation optimized: reduced motion distance, faster spring transitions
- Test coverage improved from 63% to 80%+ across all modules
- Total test count: 277 tests across 37 test files

---

## [1.0.0] - 2026-06-04

### Added
- Dark mode with Linear-inspired design
- Bento Grid template selector with 3D tilt effect
- Ambient glow background effects
- Custom SVG logo with gradient fill
- Theme toggle with localStorage persistence
- Animated list transitions (auto-animate)
- BorderBeam and Spotlight magic UI components
- Vercel Analytics and Speed Insights integration
- Gzip/Brotli compression for production builds
- Comprehensive i18n (Chinese/English) with 100+ translation keys
- Reset all data feature
- Section completion tracking

### Fixed
- FormField glow overlay blocking input interaction
- SkillsSection wrong aria-label (`form.projectName` → `form.skillCategory`)
- `crypto.randomUUID()` crash in non-secure contexts (added fallback)
- `isSectionComplete` type safety (`string` → `SectionId`)
- `<html lang>` not updating on language switch
- Export dialog `onOpenChange` type error
- sonner/next-themes broken integration

### Changed
- Page number styling (lighter, more subtle)
- Section divider styling (blue-to-purple gradient)
- Input focus styles (removed aggressive glow)
- Placeholder text styling (consistent `text-neutral-400`)
- Logo redesign (minimalist geometric overlapping rectangles)
- NavigationBar simplified (removed step counter, preview moved to header)
- Section components use AnimatedList for smooth transitions
- Template fonts loaded via `<link>` instead of CSS `@import`

### Removed
- Dead code: PreviewPanel, TextGenerateEffect, Toast, deprecated hooks
- Unused dependencies: next-themes, 5 Radix UI packages
- Hardcoded data: all placeholders now use i18n keys
- Import/Export JSON functionality (simplified UX)
- Sample data loading feature
- CustomizerPanel (template customization removed)

### Security
- Template validation on localStorage load
- Resume data shape validation on import
- try-catch on localStorage save operations

---

## [0.1.0] - 2026-06-01

### Added
- Initial release
- 5-section wizard editor (Personal, Skills, Experience, Education, Projects)
- 3 layout templates (Single Column, Two Column, Sidebar)
- PDF/HTML/PNG export
- Auto-save to localStorage
- Basic i18n (Chinese/English)
