import { useTranslation } from 'react-i18next';
import { useResumeStore } from '../../store/resumeStore';
import type { SectionId } from '../../store/resumeStore';
import { Button } from '@/components/ui/button';
import { steps } from '../editor/steps';
import {
  ChevronLeft,
  ChevronRight,
  Save,
} from 'lucide-react';

interface NavigationBarProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
}

export default function NavigationBar({
  activeSection,
  onSectionChange,
}: NavigationBarProps) {
  const { t } = useTranslation();
  const saveToLocalStorage = useResumeStore((s) => s.saveToLocalStorage);

  const currentIdx = steps.findIndex((s) => s.id === activeSection);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === steps.length - 1;

  const goNext = () => {
    if (!isLast) onSectionChange(steps[currentIdx + 1].id);
  };
  const goPrev = () => {
    if (!isFirst) onSectionChange(steps[currentIdx - 1].id);
  };

  return (
    <div className="w-full max-w-full sm:max-w-[720px] mx-auto">
      <div className="flex items-center justify-between gap-3 h-10 transition-all duration-200">
        {/* Left: Prev */}
        <Button
          variant="outline"
          size="sm"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-1 rounded-xl h-10 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('wizard.prev')}</span>
        </Button>

        {/* Right: Save + Next */}
        <div className="flex items-center gap-2 h-10 transition-all duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={saveToLocalStorage}
            className="gap-1.5 rounded-xl h-10 transition-all duration-200"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('actions.save')}</span>
          </Button>

          {!isLast && (
            <Button
              size="sm"
              onClick={goNext}
              className="gap-1 rounded-xl h-10 transition-all duration-200"
            >
              {t('wizard.next')}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
