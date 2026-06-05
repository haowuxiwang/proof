import type { TemplateConfig } from '../../types/resume';

export const templates: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless serif typography with centered layout',
    colors: {
      primary: '#1e3a5f',
      secondary: '#2a5a8c',
      accent: '#3b82f6',
      text: '#1e293b',
      textLight: '#64748b',
      background: '#ffffff',
    },
    fonts: {
      heading: '"DM Serif Display", Georgia, serif',
      body: '"DM Sans", system-ui, sans-serif',
    },
    layout: 'single-column',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean sans-serif with generous whitespace',
    colors: {
      primary: '#111111',
      secondary: '#333333',
      accent: '#555555',
      text: '#111111',
      textLight: '#777777',
      background: '#ffffff',
    },
    fonts: {
      heading: '"Inter", "DM Sans", system-ui, sans-serif',
      body: '"Inter", "DM Sans", system-ui, sans-serif',
    },
    layout: 'single-column',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold two-column with indigo accents',
    colors: {
      primary: '#3b5bdb',
      secondary: '#5c7cfa',
      accent: '#748ffc',
      text: '#1a1a2e',
      textLight: '#6b7280',
      background: '#ffffff',
    },
    fonts: {
      heading: '"Plus Jakarta Sans", "DM Sans", system-ui, sans-serif',
      body: '"DM Sans", system-ui, sans-serif',
    },
    layout: 'two-column',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional sidebar with gold accents',
    colors: {
      primary: '#1a1a2e',
      secondary: '#2d2d44',
      accent: '#d4a574',
      text: '#1a1a2e',
      textLight: '#6b7280',
      background: '#ffffff',
    },
    fonts: {
      heading: '"Playfair Display", Georgia, serif',
      body: '"Lora", Georgia, serif',
    },
    layout: 'sidebar',
  },
];

export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templates.find((t) => t.id === id);
};
