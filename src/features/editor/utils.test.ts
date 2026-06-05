import { isSectionComplete } from './utils';
import { createEmptyResume } from '../../types/resume';
import type { ResumeData } from '../../types/resume';
import type { SectionId } from '../../store/resumeStore';

describe('isSectionComplete', () => {
  const empty = createEmptyResume();

  describe('personal', () => {
    it('returns false for empty personal info', () => {
      expect(isSectionComplete('personal', empty)).toBe(false);
    });

    it('returns false with only name', () => {
      const resume: ResumeData = {
        ...empty,
        personal: { ...empty.personal, name: 'Alice' },
      };
      expect(isSectionComplete('personal', resume)).toBe(false);
    });

    it('returns false with only email', () => {
      const resume: ResumeData = {
        ...empty,
        personal: { ...empty.personal, email: 'a@b.com' },
      };
      expect(isSectionComplete('personal', resume)).toBe(false);
    });

    it('returns true with both name and email', () => {
      const resume: ResumeData = {
        ...empty,
        personal: { ...empty.personal, name: 'Alice', email: 'a@b.com' },
      };
      expect(isSectionComplete('personal', resume)).toBe(true);
    });

    it('returns false for whitespace-only personal name', () => {
      const resume: ResumeData = {
        ...empty,
        personal: { ...empty.personal, name: '   ', email: 'a@b.com' },
      };
      expect(isSectionComplete('personal', resume)).toBe(false);
    });
  });

  describe('skills', () => {
    it('returns false for empty skills', () => {
      expect(isSectionComplete('skills', empty)).toBe(false);
    });

    it('returns false for category with no items', () => {
      const resume: ResumeData = {
        ...empty,
        skills: [{ id: 'skill-1', category: 'Frontend', items: [] }],
      };
      expect(isSectionComplete('skills', resume)).toBe(false);
    });

    it('returns true for category with items', () => {
      const resume: ResumeData = {
        ...empty,
        skills: [{ id: 'skill-2', category: 'Frontend', items: ['React'] }],
      };
      expect(isSectionComplete('skills', resume)).toBe(true);
    });

    it('returns false for skills with empty category name', () => {
      const resume: ResumeData = {
        ...empty,
        skills: [{ id: 's1', category: '', items: ['React'] }],
      };
      expect(isSectionComplete('skills', resume)).toBe(false);
    });
  });

  describe('experience', () => {
    it('returns false for empty experience', () => {
      expect(isSectionComplete('experience', empty)).toBe(false);
    });

    it('returns true when experience exists', () => {
      const resume: ResumeData = {
        ...empty,
        experience: [{ id: '1', company: 'ACME', position: 'Dev', startDate: '2020-01', description: '', highlights: [] }],
      };
      expect(isSectionComplete('experience', resume)).toBe(true);
    });

    it('returns false for empty experience card (no company or position)', () => {
      const resume: ResumeData = {
        ...empty,
        experience: [{ id: '1', company: '', position: '', startDate: '', description: '', highlights: [] }],
      };
      expect(isSectionComplete('experience', resume)).toBe(false);
    });
  });

  describe('education', () => {
    it('returns false for empty education', () => {
      expect(isSectionComplete('education', empty)).toBe(false);
    });

    it('returns true when education exists', () => {
      const resume: ResumeData = {
        ...empty,
        education: [{ id: '1', school: 'MIT', major: 'CS', degree: 'BS', startDate: '2016-09', endDate: '2020-06' }],
      };
      expect(isSectionComplete('education', resume)).toBe(true);
    });
  });

  describe('projects', () => {
    it('returns false for empty projects', () => {
      expect(isSectionComplete('projects', empty)).toBe(false);
    });

    it('returns true when projects exists', () => {
      const resume: ResumeData = {
        ...empty,
        projects: [{ id: '1', name: 'App', description: 'An app', techStack: [], highlights: [] }],
      };
      expect(isSectionComplete('projects', resume)).toBe(true);
    });
  });

  it('returns false for unknown section id', () => {
    expect(isSectionComplete('unknown' as SectionId, empty)).toBe(false);
  });
});
