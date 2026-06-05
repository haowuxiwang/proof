import type { ResumeData } from '../../types/resume';
import type { SectionId } from '../../store/resumeStore';

export function isSectionComplete(id: SectionId, resume: ResumeData): boolean {
  switch (id) {
    case 'personal':
      return Boolean(resume.personal.name.trim() && resume.personal.email.trim());
    case 'skills':
      return resume.skills.length > 0 && resume.skills.some((s) => s.category.trim() !== '' && s.items.length > 0);
    case 'experience':
      return resume.experience.length > 0 && resume.experience.some((e) => e.company.trim() !== '' || e.position.trim() !== '');
    case 'education':
      return resume.education.length > 0 && resume.education.some((e) => e.school.trim() !== '');
    case 'projects':
      return resume.projects.length > 0 && resume.projects.some((p) => p.name.trim() !== '');
    default:
      return false;
  }
}
