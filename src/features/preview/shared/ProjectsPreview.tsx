import { useTranslation } from 'react-i18next';
import type { Project, TemplateConfig } from '../../../types/resume';
import ResumeSection from './ResumeSection';
import { getVariant } from '../utils/getVariant';

interface ProjectsPreviewProps {
  projects: Project[];
  template: TemplateConfig;
}

export default function ProjectsPreview({ projects, template }: ProjectsPreviewProps) {
  const { t } = useTranslation();
  if (projects.length === 0) return null;

  return (
    <ResumeSection
      title={t('resume.projects')}
      color={template.colors.primary}
      fontFamily={template.fonts.heading}
      variant={getVariant(template.id)}
    >
      <div className="space-y-4">
        {projects.map((proj) => (
          <div key={proj.id}>
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="text-sm font-semibold" style={{ color: template.colors.text }}>
                {proj.name}
              </h3>
              {proj.link && (
                <a
                  href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] shrink-0 ml-4 hover:underline"
                  style={{ color: template.colors.primary }}
                >
                  {t('resume.link')}
                </a>
              )}
            </div>
            {proj.description && (
              <p className="text-xs mt-0.5" style={{ color: template.colors.text }}>
                {proj.description}
              </p>
            )}
            {proj.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {proj.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: `${template.colors.accent}12`,
                      color: template.colors.primary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {proj.highlights.length > 0 && (
              <ul className="mt-1.5 space-y-0.5">
                {proj.highlights.map((h, i) => (
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
