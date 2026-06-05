import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test-utils';
import SingleColumnLayout from './SingleColumnLayout';
import { templates } from '../../templates/templateRegistry';

const mockResume = {
  personal: { name: 'Zhang San', title: 'Engineer', email: 'test@test.com', phone: '123', github: '', website: '', location: 'BJ', summary: 'A developer' },
  skills: [{ id: 'skill-1', category: 'Frontend', items: ['React'] }],
  experience: [{ id: '1', company: 'ACME', position: 'Dev', startDate: '2024-01', endDate: '', description: 'Work', highlights: ['Built stuff'] }],
  education: [{ id: '1', school: 'PKU', major: 'CS', degree: 'BS', startDate: '2020-09', endDate: '2024-06' }],
  projects: [{ id: '1', name: 'App', description: 'Cool app', techStack: ['React'], highlights: ['Used by many'], link: '' }],
};

describe('SingleColumnLayout', () => {
  it('renders personal info', () => {
    renderWithProviders(<SingleColumnLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('Zhang San')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders skills', () => {
    renderWithProviders(<SingleColumnLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    // React appears in both skills and projects, use getAllByText
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
  });

  it('renders experience', () => {
    renderWithProviders(<SingleColumnLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('ACME')).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();
  });

  it('renders education', () => {
    renderWithProviders(<SingleColumnLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('PKU')).toBeInTheDocument();
  });

  it('renders projects', () => {
    renderWithProviders(<SingleColumnLayout resume={mockResume} template={templates[0]} />);
    expect(screen.getByText('App')).toBeInTheDocument();
    expect(screen.getByText('Cool app')).toBeInTheDocument();
  });
});
