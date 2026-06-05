import { useTranslation } from 'react-i18next';
import type { Education, TemplateConfig } from '../../../types/resume';
import { formatDate } from '../utils/formatDate';
import ResumeSection from './ResumeSection';
import { getVariant } from '../utils/getVariant';

interface EducationPreviewProps {
  education: Education[];
  template: TemplateConfig;
}

export default function EducationPreview({ education, template }: EducationPreviewProps) {
  const { t } = useTranslation();
  if (education.length === 0) return null;

  return (
    <ResumeSection
      title={t('resume.education')}
      color={template.colors.primary}
      fontFamily={template.fonts.heading}
      variant={getVariant(template.id)}
    >
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: template.colors.text }}>
                {edu.school}
              </h3>
              <p className="text-xs" style={{ color: template.colors.textLight }}>
                {edu.degree} · {edu.major}
              </p>
            </div>
            <span className="text-[11px] shrink-0 ml-4" style={{ color: template.colors.textLight }}>
              {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : t('resume.present')}
            </span>
          </div>
        ))}
      </div>
    </ResumeSection>
  );
}
