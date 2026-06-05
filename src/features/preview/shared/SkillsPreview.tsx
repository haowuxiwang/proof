import { useTranslation } from 'react-i18next';
import type { SkillCategory, TemplateConfig } from '../../../types/resume';
import ResumeSection from './ResumeSection';
import { getVariant } from '../utils/getVariant';

interface SkillsPreviewProps {
  skills: SkillCategory[];
  template: TemplateConfig;
  compact?: boolean;
}

export default function SkillsPreview({ skills, template, compact }: SkillsPreviewProps) {
  const { t } = useTranslation();
  if (skills.length === 0) return null;

  const content = (
    <div className="grid grid-cols-2 gap-3">
      {skills.map((skill, i) => (
        <div key={i}>
          <h3 className="text-xs font-semibold mb-0.5" style={{ color: template.colors.text }}>
            {skill.category}
          </h3>
          <p className="text-xs" style={{ color: template.colors.textLight }}>
            {skill.items.join(' · ')}
          </p>
        </div>
      ))}
    </div>
  );

  if (compact) return content;

  return (
    <ResumeSection
      title={t('resume.skills')}
      color={template.colors.primary}
      fontFamily={template.fonts.heading}
      variant={getVariant(template.id)}
    >
      {content}
    </ResumeSection>
  );
}
