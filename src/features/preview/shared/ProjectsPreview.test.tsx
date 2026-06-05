import { renderWithProviders, screen } from '../../../test-utils';
import ProjectsPreview from './ProjectsPreview';
import { templates } from '../../templates/templateRegistry';
import type { Project } from '../../../types/resume';

const template = templates[0];

const projects: Project[] = [
  {
    id: '1',
    name: 'My App',
    description: 'A cool app',
    techStack: ['React', 'TypeScript'],
    highlights: ['1000 users', 'Featured on HN'],
    link: 'https://myapp.com',
  },
  {
    id: '2',
    name: 'CLI Tool',
    description: '',
    techStack: [],
    highlights: [],
    link: '',
  },
];

describe('ProjectsPreview', () => {
  it('returns null when projects array is empty', () => {
    const { container } = renderWithProviders(
      <ProjectsPreview projects={[]} template={template} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders project names', () => {
    renderWithProviders(<ProjectsPreview projects={projects} template={template} />);
    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('CLI Tool')).toBeInTheDocument();
  });

  it('renders description when present', () => {
    renderWithProviders(<ProjectsPreview projects={projects} template={template} />);
    expect(screen.getByText('A cool app')).toBeInTheDocument();
  });

  it('does not render empty description paragraph', () => {
    const proj: Project[] = [{ id: '1', name: 'NoDesc', description: '', techStack: [], highlights: [], link: '' }];
    const { container } = renderWithProviders(<ProjectsPreview projects={proj} template={template} />);
    const paragraphs = container.querySelectorAll('p');
    // No description paragraph should be rendered
    paragraphs.forEach((p) => {
      expect(p.textContent).not.toBe('');
    });
  });

  it('renders tech stack tags', () => {
    renderWithProviders(<ProjectsPreview projects={projects} template={template} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders highlights', () => {
    renderWithProviders(<ProjectsPreview projects={projects} template={template} />);
    expect(screen.getByText('1000 users')).toBeInTheDocument();
    expect(screen.getByText('Featured on HN')).toBeInTheDocument();
  });

  it('renders link when present', () => {
    const proj: Project[] = [{ ...projects[0], link: 'https://myapp.com' }];
    renderWithProviders(<ProjectsPreview projects={proj} template={template} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://myapp.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('prepends https to link without protocol', () => {
    const proj: Project[] = [{ ...projects[0], link: 'myapp.com' }];
    renderWithProviders(<ProjectsPreview projects={proj} template={template} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://myapp.com');
  });

  it('does not render link when empty', () => {
    const proj: Project[] = [{ ...projects[0], link: '' }];
    renderWithProviders(<ProjectsPreview projects={proj} template={template} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
