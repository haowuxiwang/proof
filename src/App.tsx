import { lazy, Suspense, useEffect, useState, useCallback, useRef, Component, type ReactNode, type ErrorInfo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useResumeStore } from './store/resumeStore';
import type { SectionId } from './store/resumeStore';
import { steps } from './features/editor/steps';
import ProgressSteps from './features/wizard/ProgressSteps';
import WizardCard from './features/wizard/WizardCard';
import NavigationBar from './features/wizard/NavigationBar';
import { useAutoSave } from './hooks/useAutoSave';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Globe, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ProofLogo } from '@/components/ProofLogo';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy-load section components for code splitting
const PersonalSection = lazy(() => import('./features/editor/sections/PersonalSection'));
const SkillsSection = lazy(() => import('./features/editor/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./features/editor/sections/ExperienceSection'));
const EducationSection = lazy(() => import('./features/editor/sections/EducationSection'));
const ProjectsSection = lazy(() => import('./features/editor/sections/ProjectsSection'));

// Lazy-load heavy components
const FloatingPreview = lazy(() => import('./features/wizard/FloatingPreview'));

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  personal: PersonalSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  education: EducationSection,
  projects: ProjectsSection,
};

// Loading skeleton for lazy components with shimmer effect
function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-4 w-32 rounded shimmer" style={{ background: 'var(--bg-subtle)' }} />
      <div className="h-10 w-full rounded shimmer" style={{ background: 'var(--bg-subtle)' }} />
      <div className="h-10 w-full rounded shimmer" style={{ background: 'var(--bg-subtle)' }} />
      <div className="h-20 w-full rounded shimmer" style={{ background: 'var(--bg-subtle)' }} />
    </div>
  );
}

// Error Boundary
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (...args: any[]) => string;
  onReset?: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8" style={{ color: 'var(--text)' }}>
          <h2 className="text-lg font-semibold mb-2">{this.props.t('app.somethingWentWrong')}</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {this.state.error?.message}
          </p>
          <div className="flex gap-2">
            <Button onClick={() => { this.setState({ hasError: false, error: null }); }}>
              {this.props.t('app.tryAgain')}
            </Button>
            <Button variant="outline" onClick={() => { this.props.onReset?.(); this.setState({ hasError: false, error: null }); }}>
              {this.props.t('app.reset')}
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh-CN';

  const toggleLanguage = () => {
    const newLang = isZh ? 'en' : 'zh-CN';
    i18n.changeLanguage(newLang);
    localStorage.setItem('proof-lang', newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-1.5 text-xs rounded-xl"
    >
      <Globe className="w-3.5 h-3.5" />
      {isZh ? 'EN' : '中文'}
    </Button>
  );
}

function App() {
  const { t } = useTranslation();
  const loadFromLocalStorage = useResumeStore((s) => s.loadFromLocalStorage);
  const activeSection = useResumeStore((s) => s.activeSection);
  const setActiveSection = useResumeStore((s) => s.setActiveSection);

  const [direction, setDirection] = useState(1);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const prevSectionRef = useRef(activeSection);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useAutoSave(30000);

  const handleSectionChange = useCallback((newSection: SectionId) => {
    const oldIdx = steps.findIndex((s) => s.id === prevSectionRef.current);
    const newIdx = steps.findIndex((s) => s.id === newSection);
    setDirection(newIdx > oldIdx ? 1 : -1);
    prevSectionRef.current = newSection;
    setActiveSection(newSection);
  }, [setActiveSection]);

  const currentIdx = steps.findIndex((s) => s.id === activeSection);
  const step = steps[currentIdx] || steps[0];

  const SectionComponent = SECTION_COMPONENTS[activeSection] ?? PersonalSection;

  return (
    <div className="flex flex-col h-screen overflow-hidden relative bg-[var(--bg-subtle)]">
      {/* Ambient glow orbs — Linear-inspired */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--glow-violet) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Dot grid background texture */}
      <div className="absolute inset-0 bg-dot opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Grain texture for depth */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Top progress bar — subtle, breathing */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 overflow-hidden" style={{ background: 'var(--border-light)' }}>
        <motion.div
          className="h-full progress-bar-breathe"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent-glow)',
          }}
          animate={{ width: `${((currentIdx + 1) / steps.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>

      <Toaster position="bottom-right" />
      <Analytics />
      <SpeedInsights />

      {/* Header — editorial style */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-3 shrink-0"
        style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <ProofLogo size={18} className="text-neutral-800" />
          <span
            className="text-sm font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
          >
            {t('app.title')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reset button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (window.confirm(t('app.resetConfirm'))) {
                useResumeStore.getState().resetResume();
              }
            }}
            className="p-1.5 rounded-lg transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            aria-label={t('app.reset')}
            title={t('app.reset')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </motion.button>

          {/* Preview toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPreviewExpanded(!previewExpanded)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={{
              background: previewExpanded ? 'var(--accent)' : 'transparent',
              color: previewExpanded ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${previewExpanded ? 'var(--accent)' : 'var(--border)'}`,
            }}
            aria-label={previewExpanded ? t('preview.hide') : t('preview.show')}
            aria-expanded={previewExpanded}
          >
            {previewExpanded ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{t('preview.title')}</span>
          </motion.button>

          <LanguageSwitcher />

          <div className="flex items-center gap-2" aria-live="polite" aria-atomic="true">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--color-success)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              {t('app.autoSaved')}
            </span>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center overflow-y-auto px-4 sm:px-6">
        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <ProgressSteps
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </motion.div>

        {/* Section title — editorial magazine style */}
        <motion.div
          className="text-center mb-10 mt-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        >
          {/* Section counter — refined */}
          <div className="mb-5">
            <span
              className="inline-block text-[10px] font-semibold tracking-[0.25em] uppercase pb-2"
              style={{
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {String(currentIdx + 1).padStart(2, '0')} of {String(steps.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title — editorial serif */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}
          >
            {t(step.labelKey)}
          </h2>

          {/* Description — refined body */}
          <p
            className="text-sm max-w-sm mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {t(step.descKey)}
          </p>
        </motion.div>

        {/* Animated card */}
        <AnimatePresence custom={direction}>
          <WizardCard
            key={activeSection}
            direction={direction}
            sectionKey={activeSection}
          >
            {/* Section header inside card — editorial accent line */}
            <div className="mb-8">
              <div
                className="h-[2px] w-12"
                style={{ background: 'var(--accent)', opacity: 0.6 }}
              />
            </div>

            {/* Section form with lazy loading */}
            <ErrorBoundary t={t} onReset={() => useResumeStore.getState().resetResume()}>
              <Suspense fallback={<SectionSkeleton />}>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  <SectionComponent />
                </motion.div>
              </Suspense>
            </ErrorBoundary>
          </WizardCard>
        </AnimatePresence>

        {/* Navigation - sticky at bottom */}
        <div className="sticky bottom-0 w-full py-4 px-3 sm:px-4" style={{ background: 'linear-gradient(transparent, var(--bg-subtle) 20%)' }}>
          <NavigationBar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      </main>

      {/* Floating preview with lazy loading */}
      <Suspense fallback={null}>
        <FloatingPreview
          expanded={previewExpanded}
          onClose={() => setPreviewExpanded(false)}
        />
      </Suspense>
    </div>
  );
}

export default App;
