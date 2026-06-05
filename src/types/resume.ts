// Resume data model

export interface PersonalInfo {
  name: string;
  title: string;           // Job title / positioning
  phone: string;
  email: string;
  github?: string;
  website?: string;
  location: string;
  summary: string;         // Professional summary
}

export interface SkillCategory {
  id: string;              // Unique identifier
  category: string;        // Skill category name
  items: string[];         // Specific skills
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;        // Empty = present
  description: string;
  highlights: string[];    // Key achievements
}

export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  link?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
}

// Template configuration
export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textLight: string;
  background: string;
}

export interface TemplateFonts {
  heading: string;
  body: string;
}

export type TemplateLayout = 'single-column' | 'two-column' | 'sidebar';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  colors: TemplateColors;
  fonts: TemplateFonts;
  layout: TemplateLayout;
}

// Default empty resume data
export const createEmptyResume = (): ResumeData => ({
  personal: {
    name: '',
    title: '',
    phone: '',
    email: '',
    github: '',
    website: '',
    location: '',
    summary: '',
  },
  skills: [],
  experience: [],
  education: [],
  projects: [],
});

// Generate unique ID with fallback for non-secure contexts
export const generateId = (): string => {
  try {
    return crypto.randomUUID();
  } catch {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
};
