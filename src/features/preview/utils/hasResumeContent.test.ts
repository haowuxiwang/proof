import { hasResumeContent } from './hasResumeContent';
import { createEmptyResume } from '../../../types/resume';
import type { ResumeData } from '../../../types/resume';

describe('hasResumeContent', () => {
  it('returns false for completely empty resume', () => {
    expect(hasResumeContent(createEmptyResume())).toBe(false);
  });

  it('returns true when personal.name is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, name: 'Alice' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when personal.title is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, title: 'Engineer' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when personal.email is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, email: 'a@b.com' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when personal.phone is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, phone: '123' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when personal.location is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, location: 'NYC' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when personal.summary is set', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      personal: { ...createEmptyResume().personal, summary: 'About me' },
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when skills exist', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      skills: [{ id: 'skill-1', category: 'Frontend', items: ['React'] }],
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when experience exists', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      experience: [{ id: '1', company: 'ACME', position: 'Dev', startDate: '2020-01', description: '', highlights: [] }],
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when education exists', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      education: [{ id: '1', school: 'MIT', major: 'CS', degree: 'BS', startDate: '2016-09', endDate: '2020-06' }],
    };
    expect(hasResumeContent(resume)).toBe(true);
  });

  it('returns true when projects exist', () => {
    const resume: ResumeData = {
      ...createEmptyResume(),
      projects: [{ id: '1', name: 'App', description: 'An app', techStack: [], highlights: [] }],
    };
    expect(hasResumeContent(resume)).toBe(true);
  });
});
