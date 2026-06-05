import type { ResumeData, TemplateConfig } from '../../../types/resume';
import ResumeHeader from '../shared/ResumeHeader';
import SkillsPreview from '../shared/SkillsPreview';
import ExperiencePreview from '../shared/ExperiencePreview';
import EducationPreview from '../shared/EducationPreview';
import ProjectsPreview from '../shared/ProjectsPreview';

interface Props {
  resume: ResumeData;
  template: TemplateConfig;
}

export default function SingleColumnLayout({ resume, template }: Props) {
  const isClassic = template.id === 'classic';

  return (
    <div
      className={isClassic ? 'p-10' : 'p-8'}
      style={{ fontFamily: template.fonts.body }}
    >
      <ResumeHeader
        personal={resume.personal}
        colors={template.colors}
        fonts={template.fonts}
        centered={isClassic}
      />
      {resume.personal.summary && (
        <div className={isClassic ? 'mb-7' : 'mb-5'}>
          <p
            className={isClassic ? 'text-sm leading-relaxed' : 'text-xs leading-relaxed'}
            style={{ color: template.colors.text }}
          >
            {resume.personal.summary}
          </p>
        </div>
      )}
      <SkillsPreview skills={resume.skills} template={template} />
      <ExperiencePreview experience={resume.experience} template={template} />
      <EducationPreview education={resume.education} template={template} />
      <ProjectsPreview projects={resume.projects} template={template} />
    </div>
  );
}
