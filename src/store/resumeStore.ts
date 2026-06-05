import { create } from 'zustand';
import type { ResumeData, TemplateConfig } from '../types/resume';
import { createEmptyResume } from '../types/resume';
import { templates, getTemplateById } from '../features/templates/templateRegistry';

export type SectionId = 'personal' | 'skills' | 'experience' | 'education' | 'projects';

interface ResumeStore {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  updatePersonal: (personal: Partial<ResumeData['personal']>) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;

  template: TemplateConfig;
  setTemplate: (template: TemplateConfig) => void;
  updateTemplateColors: (colors: Partial<TemplateConfig['colors']>) => void;
  updateTemplateFonts: (fonts: Partial<TemplateConfig['fonts']>) => void;

  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;

  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resume: createEmptyResume(),
  setResume: (resume) => set({ resume }),
  updatePersonal: (personal) =>
    set((state) => ({
      resume: { ...state.resume, personal: { ...state.resume.personal, ...personal } },
    })),
  updateSkills: (skills) =>
    set((state) => ({ resume: { ...state.resume, skills } })),
  updateExperience: (experience) =>
    set((state) => ({ resume: { ...state.resume, experience } })),
  updateEducation: (education) =>
    set((state) => ({ resume: { ...state.resume, education } })),
  updateProjects: (projects) =>
    set((state) => ({ resume: { ...state.resume, projects } })),

  template: templates[0],
  setTemplate: (template) => set({ template }),
  updateTemplateColors: (colors) =>
    set((state) => ({
      template: { ...state.template, colors: { ...state.template.colors, ...colors } },
    })),
  updateTemplateFonts: (fonts) =>
    set((state) => ({
      template: { ...state.template, fonts: { ...state.template.fonts, ...fonts } },
    })),

  activeSection: 'personal',
  setActiveSection: (section) => set({ activeSection: section }),

  saveToLocalStorage: () => {
    try {
      const { resume, template } = get();
      localStorage.setItem('proof-resume-data', JSON.stringify(resume));
      localStorage.setItem('proof-resume-template', JSON.stringify(template));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  loadFromLocalStorage: () => {
    try {
      const resumeData = localStorage.getItem('proof-resume-data');
      const templateData = localStorage.getItem('proof-resume-template');
      if (resumeData) {
        const parsed = JSON.parse(resumeData);
        if (parsed && parsed.personal) {
          const defaults = createEmptyResume();
          set({
            resume: {
              personal: { ...defaults.personal, ...parsed.personal },
              skills: Array.isArray(parsed.skills) ? parsed.skills : defaults.skills,
              experience: Array.isArray(parsed.experience) ? parsed.experience : defaults.experience,
              education: Array.isArray(parsed.education) ? parsed.education : defaults.education,
              projects: Array.isArray(parsed.projects) ? parsed.projects : defaults.projects,
            },
          });
        }
      }
      if (templateData) {
        const parsed = JSON.parse(templateData);
        if (parsed) {
          const baseTemplate = getTemplateById(parsed.id) ?? templates[0];
          // Merge saved colors/fonts with base template to preserve user customizations
          set({
            template: {
              ...baseTemplate,
              colors: parsed.colors ? { ...baseTemplate.colors, ...parsed.colors } : baseTemplate.colors,
              fonts: parsed.fonts ? { ...baseTemplate.fonts, ...parsed.fonts } : baseTemplate.fonts,
            },
          });
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  },
  resetResume: () => {
    set({
      resume: createEmptyResume(),
      template: templates[0],
      activeSection: 'personal',
    });
    try {
      localStorage.removeItem('proof-resume-data');
      localStorage.removeItem('proof-resume-template');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
}));
