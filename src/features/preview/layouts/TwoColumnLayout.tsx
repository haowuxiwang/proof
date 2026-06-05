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

export default function TwoColumnLayout({ resume, template }: Props) {
  return (
    <div className="p-8" style={{ fontFamily: template.fonts.body }}>
      <ResumeHeader
        personal={resume.personal}
        colors={template.colors}
        fonts={template.fonts}
      />
      {resume.personal.summary && (
        <div className="mb-6">
          <p className="text-xs leading-relaxed" style={{ color: template.colors.text }}>
            {resume.personal.summary}
          </p>
        </div>
      )}
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-6">
          <ExperiencePreview experience={resume.experience} template={template} />
          <EducationPreview education={resume.education} template={template} />
        </div>
        <div className="space-y-6">
          <SkillsPreview skills={resume.skills} template={template} />
          <ProjectsPreview projects={resume.projects} template={template} />
        </div>
      </div>
    </div>
  );
}
