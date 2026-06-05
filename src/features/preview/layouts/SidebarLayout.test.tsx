import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test-utils';
import SidebarLayout from './SidebarLayout';
import { templates } from '../../templates/templateRegistry';

const mockResume = {
  personal: { name: 'Wang Wu', title: 'PM', email: 'w@test.com', phone: '', github: '', website: '', location: '', summary: 'A PM' },
  skills: [{ id: 'skill-1', category: 'Product', items: ['Agile'] }],
  experience: [],
  education: [],
  projects: [],
};

describe('SidebarLayout', () => {
  it('renders name in sidebar', () => {
    renderWithProviders(<SidebarLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('Wang Wu')).toBeInTheDocument();
  });

  it('renders skills in sidebar', () => {
    renderWithProviders(<SidebarLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});
