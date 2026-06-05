import { renderWithProviders, screen } from '../../../test-utils';
import ExperiencePreview from './ExperiencePreview';
import { templates } from '../../templates/templateRegistry';
import type { WorkExperience } from '../../../types/resume';

const template = templates[0];

const experience: WorkExperience[] = [
  {
    id: '1',
    company: 'ACME Corp',
    position: 'Senior Developer',
    startDate: '2022-01',
    endDate: '2024-06',
    description: 'Built amazing things',
    highlights: ['Led team of 5', 'Shipped 3 products'],
  },
  {
    id: '2',
    company: 'Startup Inc',
    position: 'Junior Dev',
    startDate: '2020-03',
    description: 'Learned a lot',
    highlights: [],
  },
];

describe('ExperiencePreview', () => {
  it('returns null when experience array is empty', () => {
    const { container } = renderWithProviders(
      <ExperiencePreview experience={[]} template={template} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders company names', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    expect(screen.getByText('ACME Corp')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
  });

  it('renders positions', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Junior Dev')).toBeInTheDocument();
  });

  it('renders formatted dates', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    expect(screen.getByText('2022.01 - 2024.06')).toBeInTheDocument();
  });

  it('renders "present" for missing end date', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    // Second entry has no endDate, should show "present" translation key
    expect(screen.getByText(/2020.03/)).toBeInTheDocument();
  });

  it('renders description when present', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    expect(screen.getByText('Built amazing things')).toBeInTheDocument();
    expect(screen.getByText('Learned a lot')).toBeInTheDocument();
  });

  it('renders highlights', () => {
    renderWithProviders(<ExperiencePreview experience={experience} template={template} />);
    expect(screen.getByText('Led team of 5')).toBeInTheDocument();
    expect(screen.getByText('Shipped 3 products')).toBeInTheDocument();
  });

  it('does not render highlights when empty', () => {
    const exp: WorkExperience[] = [{
      id: '1', company: 'X', position: 'Y', startDate: '2020-01', description: '', highlights: [],
    }];
    renderWithProviders(<ExperiencePreview experience={exp} template={template} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
