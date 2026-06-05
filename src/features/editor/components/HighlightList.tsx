import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface HighlightListProps {
  highlights: string[];
  onChange: (highlights: string[]) => void;
}

export default function HighlightList({ highlights, onChange }: HighlightListProps) {
  const { t } = useTranslation();
  const add = () => {
    // Don't add empty items if the last one is empty
    if (highlights.length > 0 && highlights[highlights.length - 1].trim() === '') return;
    onChange([...highlights, '']);
  };
  const update = (index: number, value: string) => {
    const next = [...highlights];
    next[index] = value;
    onChange(next);
  };
  const remove = (index: number) => onChange(highlights.filter((_, i) => i !== index));

  return (
    <div>
      <label className="label-field">{t('form.keyAchievements')}</label>
      <div className="space-y-2">
        {highlights.map((h, i) => (
          <div key={i} className="flex gap-2 items-start animate-fade-in">
            <input
              className="input-field flex-1"
              value={h}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
              placeholder={`${t('form.keyAchievements')} ${i + 1}`}
            />
            <button
              className="btn-icon danger shrink-0 mt-1"
              aria-label={t('resume.delete')}
              onClick={() => remove(i)}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="mt-2 gap-1 text-xs" onClick={add}>
        <Plus className="w-3 h-3" />
        {t('buttons.addAchievement')}
      </Button>
    </div>
  );
}
