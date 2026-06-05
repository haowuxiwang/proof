import { renderWithProviders, screen } from '../../../test-utils';
import SkillsPreview from './SkillsPreview';
import { templates } from '../../templates/templateRegistry';
import type { SkillCategory } from '../../../types/resume';

const template = templates[0];

const skills: SkillCategory[] = [
  { id: 'skill-1', category: 'Frontend', items: ['React', 'TypeScript'] },
  { id: 'skill-2', category: 'Backend', items: ['Node.js'] },
];

describe('SkillsPreview', () => {
  it('returns null when skills array is empty', () => {
    const { container } = renderWithProviders(
      <SkillsPreview skills={[]} template={template} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders skill categories', () => {
    renderWithProviders(<SkillsPreview skills={skills} template={template} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('renders skill items joined with dot separator', () => {
    renderWithProviders(<SkillsPreview skills={skills} template={template} />);
    expect(screen.getByText('React · TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders in compact mode without section wrapper', () => {
    renderWithProviders(<SkillsPreview skills={skills} template={template} compact />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    // Compact mode should not have the ResumeSection heading
    expect(screen.queryByText('resume.skills')).not.toBeInTheDocument();
  });

  it('renders with ResumeSection wrapper in normal mode', () => {
    renderWithProviders(<SkillsPreview skills={skills} template={template} />);
    // The section title comes from i18n
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
});
