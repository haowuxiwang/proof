import { useTranslation } from 'react-i18next';
import type { ResumeData, TemplateConfig } from '../../../types/resume';
import ExperiencePreview from '../shared/ExperiencePreview';
import EducationPreview from '../shared/EducationPreview';
import ProjectsPreview from '../shared/ProjectsPreview';

interface Props {
  resume: ResumeData;
  template: TemplateConfig;
}

export default function SidebarLayout({ resume, template }: Props) {
  const { t } = useTranslation();
  const { personal, skills, experience, education, projects } = resume;

  return (
    <div className="flex min-h-[800px]" style={{ fontFamily: template.fonts.body }}>
      {/* Sidebar */}
      <div
        className="w-[35%] p-8"
        style={{
          background: template.colors.primary,
          color: 'white',
        }}
      >
        <div className="mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: template.fonts.heading }}
          >
            {personal.name || t('resume.yourName')}
          </h1>
          <p className="text-sm opacity-80">{personal.title || t('resume.jobTitle')}</p>
        </div>

        <div className="mb-8">
          <h3
            className="text-[10px] font-semibold uppercase tracking-wider mb-3 opacity-50"
            style={{ letterSpacing: '0.15em' }}
          >
            {t('resume.contact')}
          </h3>
          <div className="space-y-2 text-xs opacity-90">
            {personal.email && <div className="break-all">{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.github && <div className="break-all">{personal.github}</div>}
            {personal.website && <div className="break-all">{personal.website}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h3
              className="text-[10px] font-semibold uppercase tracking-wider mb-3 opacity-50"
              style={{ letterSpacing: '0.15em' }}
            >
              {t('resume.skills')}
            </h3>
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <div key={i}>
                  <h4 className="text-xs font-medium mb-1">{skill.category}</h4>
                  <p className="text-[11px] opacity-70 leading-relaxed">{skill.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {personal.summary && (
          <div className="mb-7">
            <h2
              className="text-sm font-semibold pb-2 mb-4 uppercase tracking-wider"
              style={{
                color: template.colors.primary,
                fontFamily: template.fonts.heading,
                borderBottom: `2px solid ${template.colors.accent}`,
                letterSpacing: '0.1em',
              }}
            >
              {t('resume.about')}
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{ color: template.colors.text }}
            >
              {personal.summary}
            </p>
          </div>
        )}
        <ExperiencePreview experience={experience} template={template} />
        <EducationPreview education={education} template={template} />
        <ProjectsPreview projects={projects} template={template} />
      </div>
    </div>
  );
}
