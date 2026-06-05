import type { ResumeData } from '../../../types/resume';

export function hasResumeContent(resume: ResumeData): boolean {
  return !!(
    resume.personal.name.trim() ||
    resume.personal.title.trim() ||
    resume.personal.email.trim() ||
    resume.personal.phone.trim() ||
    resume.personal.location.trim() ||
    resume.personal.summary.trim() ||
    resume.skills.length > 0 ||
    resume.experience.length > 0 ||
    resume.education.length > 0 ||
    resume.projects.length > 0
  );
}
