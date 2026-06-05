import { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onChange, placeholder }: TagInputProps) {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t('resume.addSkill');
  const inputId = useId();
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const remove = (tag: string) => {
    onChange(tags.filter((item) => item !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    }
  };

  return (
    <div>
      <label htmlFor={inputId} className="label-field">{t('form.techStack')}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
            <button
              className="badge-remove"
              aria-label={`${t('resume.delete')} ${tag}`}
              onClick={() => remove(tag)}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          id={inputId}
          className="input-field flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={defaultPlaceholder}
        />
        <button className="btn-ghost shrink-0" onClick={add} aria-label={t('resume.addSkill')}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
