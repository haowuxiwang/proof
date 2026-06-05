import { useTranslation } from 'react-i18next';
import type { WorkExperience, TemplateConfig } from '../../../types/resume';
import { formatDate } from '../utils/formatDate';
import ResumeSection from './ResumeSection';
import { getVariant } from '../utils/getVariant';

interface ExperiencePreviewProps {
  experience: WorkExperience[];
  template: TemplateConfig;
}

export default function ExperiencePreview({ experience, template }: ExperiencePreviewProps) {
  const { t } = useTranslation();
  if (experience.length === 0) return null;

  return (
    <ResumeSection
      title={t('resume.experience')}
      color={template.colors.primary}
      fontFamily={template.fonts.heading}
      variant={getVariant(template.id)}
    >
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-0.5">
              <div>
                <h3 className="text-sm font-semibold" style={{ color: template.colors.text }}>
                  {exp.position}
                </h3>
                <p className="text-xs" style={{ color: template.colors.textLight }}>
                  {exp.company}
                </p>
              </div>
              <span className="text-[11px] shrink-0 ml-4" style={{ color: template.colors.textLight }}>
                {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : t('resume.present')}
              </span>
            </div>
            {exp.description && (
              <p className="text-xs mt-1" style={{ color: template.colors.text }}>
                {exp.description}
              </p>
            )}
            {exp.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-0.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-xs flex gap-2" style={{ color: template.colors.text }}>
                    <span style={{ color: template.colors.accent }}>-</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
