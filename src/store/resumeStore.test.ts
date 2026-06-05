import { describe, it, expect, beforeEach } from 'vitest';
import { useResumeStore } from './resumeStore';

describe('resumeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useResumeStore.setState({
      resume: useResumeStore.getState().resume,
      template: useResumeStore.getState().template,
      activeSection: 'personal',
    });
  });

  it('has correct initial state', () => {
    const { resume, template, activeSection } = useResumeStore.getState();
    expect(resume.personal.name).toBe('');
    expect(resume.skills).toEqual([]);
    expect(resume.experience).toEqual([]);
    expect(resume.education).toEqual([]);
    expect(resume.projects).toEqual([]);
    expect(template.id).toBe('classic');
    expect(activeSection).toBe('personal');
  });

  it('updates personal info', () => {
    useResumeStore.getState().updatePersonal({ name: 'Zhang San', email: 'test@example.com' });
    const { personal } = useResumeStore.getState().resume;
    expect(personal.name).toBe('Zhang San');
    expect(personal.email).toBe('test@example.com');
  });

  it('updates skills', () => {
    const skills = [{ id: 'skill-1', category: 'Frontend', items: ['React', 'TypeScript'] }];
    useResumeStore.getState().updateSkills(skills);
    expect(useResumeStore.getState().resume.skills).toEqual(skills);
  });

  it('adds and updates experience', () => {
    const exp = [{ id: '1', company: 'ACME', position: 'Engineer', startDate: '2024-01', endDate: '', description: '', highlights: [] }];
    useResumeStore.getState().updateExperience(exp);
    expect(useResumeStore.getState().resume.experience).toHaveLength(1);
    expect(useResumeStore.getState().resume.experience[0].company).toBe('ACME');
  });

  it('adds and updates education', () => {
    const edu = [{ id: '1', school: 'PKU', major: 'CS', degree: 'BS', startDate: '2020-09', endDate: '2024-06' }];
    useResumeStore.getState().updateEducation(edu);
    expect(useResumeStore.getState().resume.education).toHaveLength(1);
  });

  it('adds and updates projects', () => {
    const proj = [{ id: '1', name: 'My App', description: 'A cool app', techStack: ['React'], highlights: [], link: '' }];
    useResumeStore.getState().updateProjects(proj);
    expect(useResumeStore.getState().resume.projects).toHaveLength(1);
  });

  it('switches template', () => {
    const newTemplate = { ...useResumeStore.getState().template, id: 'minimal' };
    useResumeStore.getState().setTemplate(newTemplate);
    expect(useResumeStore.getState().template.id).toBe('minimal');
  });

  it('updates template colors', () => {
    useResumeStore.getState().updateTemplateColors({ primary: '#ff0000' });
    expect(useResumeStore.getState().template.colors.primary).toBe('#ff0000');
  });

  it('updates template fonts', () => {
    useResumeStore.getState().updateTemplateFonts({ heading: 'Arial' });
    expect(useResumeStore.getState().template.fonts.heading).toBe('Arial');
  });

  it('sets active section', () => {
    useResumeStore.getState().setActiveSection('experience');
    expect(useResumeStore.getState().activeSection).toBe('experience');
  });

  it('saves to and loads from localStorage', () => {
    useResumeStore.getState().updatePersonal({ name: 'Test User' });
    useResumeStore.getState().saveToLocalStorage();

    // Create a fresh store state
    useResumeStore.setState({
      resume: useResumeStore.getState().resume,
      template: useResumeStore.getState().template,
    });

    const saved = localStorage.getItem('proof-resume-data');
    expect(saved).toBeTruthy();
    const parsed = JSON.parse(saved!);
    expect(parsed.personal.name).toBe('Test User');
  });

  it('loads from localStorage', () => {
    const mockData = {
      personal: { name: 'Loaded User', title: 'Dev', phone: '', email: '', github: '', website: '', location: '', summary: '' },
      skills: [],
      experience: [],
      education: [],
      projects: [],
    };
    localStorage.setItem('proof-resume-data', JSON.stringify(mockData));

    useResumeStore.getState().loadFromLocalStorage();
    expect(useResumeStore.getState().resume.personal.name).toBe('Loaded User');
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem('proof-resume-data', 'invalid json');
    expect(() => useResumeStore.getState().loadFromLocalStorage()).not.toThrow();
  });

  it('replaces entire resume with setResume', () => {
    const newResume = {
      personal: { name: 'New', title: 'Dev', phone: '', email: '', github: '', website: '', location: '', summary: '' },
      skills: [{ id: 'skill-2', category: 'Test', items: ['A'] }],
      experience: [],
      education: [],
      projects: [],
    };
    useResumeStore.getState().setResume(newResume);
    expect(useResumeStore.getState().resume.personal.name).toBe('New');
    expect(useResumeStore.getState().resume.skills).toHaveLength(1);
  });

  it('resetResume clears localStorage and resets state', () => {
    useResumeStore.getState().updatePersonal({ name: 'To Reset' });
    useResumeStore.getState().saveToLocalStorage();
    expect(localStorage.getItem('proof-resume-data')).toBeTruthy();

    useResumeStore.getState().resetResume();
    expect(localStorage.getItem('proof-resume-data')).toBeNull();
    expect(useResumeStore.getState().resume.personal.name).toBe('');
  });

  it('loadFromLocalStorage merges missing fields with defaults', () => {
    // Simulate partial data (missing some fields)
    const partialData = {
      personal: { name: 'Partial' },
      skills: [],
    };
    localStorage.setItem('proof-resume-data', JSON.stringify(partialData));

    useResumeStore.getState().loadFromLocalStorage();
    const { personal } = useResumeStore.getState().resume;
    expect(personal.name).toBe('Partial');
    // Missing fields should be filled with defaults
    expect(personal.email).toBe('');
    expect(personal.title).toBe('');
  });

  it('loadFromLocalStorage handles non-array skills gracefully', () => {
    const badData = {
      personal: { name: 'Test' },
      skills: 'not an array',
      experience: 'not an array',
    };
    localStorage.setItem('proof-resume-data', JSON.stringify(badData));

    useResumeStore.getState().loadFromLocalStorage();
    expect(useResumeStore.getState().resume.skills).toEqual([]);
    expect(useResumeStore.getState().resume.experience).toEqual([]);
  });

  it('saves and loads template to localStorage', () => {
    const { template } = useResumeStore.getState();
    useResumeStore.getState().saveToLocalStorage();

    const savedTemplate = localStorage.getItem('proof-resume-template');
    expect(savedTemplate).toBeTruthy();
    expect(JSON.parse(savedTemplate!).id).toBe(template.id);
  });

  it('updatePersonal merges with existing data', () => {
    useResumeStore.getState().updatePersonal({ name: 'Alice' });
    useResumeStore.getState().updatePersonal({ email: 'alice@test.com' });
    const { personal } = useResumeStore.getState().resume;
    expect(personal.name).toBe('Alice');
    expect(personal.email).toBe('alice@test.com');
  });

  it('updateTemplateColors merges with existing colors', () => {
    useResumeStore.getState().updateTemplateColors({ primary: '#ff0000' });
    useResumeStore.getState().updateTemplateColors({ accent: '#00ff00' });
    const { colors } = useResumeStore.getState().template;
    expect(colors.primary).toBe('#ff0000');
    expect(colors.accent).toBe('#00ff00');
    // Other colors should remain unchanged
    expect(colors.background).toBeTruthy();
  });

  it('updateTemplateFonts merges with existing fonts', () => {
    useResumeStore.getState().updateTemplateFonts({ heading: 'Arial' });
    useResumeStore.getState().updateTemplateFonts({ body: 'Helvetica' });
    const { fonts } = useResumeStore.getState().template;
    expect(fonts.heading).toBe('Arial');
    expect(fonts.body).toBe('Helvetica');
  });

  it('setActiveSection changes active section', () => {
    useResumeStore.getState().setActiveSection('skills');
    expect(useResumeStore.getState().activeSection).toBe('skills');
    useResumeStore.getState().setActiveSection('projects');
    expect(useResumeStore.getState().activeSection).toBe('projects');
  });

  it('handles empty localStorage gracefully', () => {
    localStorage.removeItem('proof-resume-data');
    expect(() => useResumeStore.getState().loadFromLocalStorage()).not.toThrow();
  });

  it('loads template from localStorage with valid data', () => {
    const mockTemplate = {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean sans-serif',
      colors: { primary: '#111', secondary: '#333', accent: '#555', text: '#111', textLight: '#777', background: '#fff' },
      fonts: { heading: 'Inter', body: 'Inter' },
      layout: 'single-column',
    };
    localStorage.setItem('proof-resume-template', JSON.stringify(mockTemplate));
    useResumeStore.getState().loadFromLocalStorage();
    expect(useResumeStore.getState().template.id).toBe('minimal');
  });

  it('falls back to classic template for unknown id', () => {
    const mockTemplate = { id: 'nonexistent', colors: { primary: '#000' } };
    localStorage.setItem('proof-resume-template', JSON.stringify(mockTemplate));
    useResumeStore.getState().loadFromLocalStorage();
    expect(useResumeStore.getState().template.id).toBe('classic');
  });

  it('handles missing colors in template gracefully', () => {
    localStorage.setItem('proof-resume-template', JSON.stringify({ id: 'classic' }));
    expect(() => useResumeStore.getState().loadFromLocalStorage()).not.toThrow();
  });
});
