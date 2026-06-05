import { renderWithProviders, screen } from '../../../test-utils';
import EducationPreview from './EducationPreview';
import { templates } from '../../templates/templateRegistry';
import type { Education } from '../../../types/resume';

const template = templates[0];

const education: Education[] = [
  { id: '1', school: 'MIT', major: 'Computer Science', degree: 'BS', startDate: '2016-09', endDate: '2020-06' },
  { id: '2', school: 'Stanford', major: 'AI', degree: 'MS', startDate: '2020-09', endDate: '2022-06' },
];

describe('EducationPreview', () => {
  it('returns null when education array is empty', () => {
    const { container } = renderWithProviders(
      <EducationPreview education={[]} template={template} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders school names', () => {
    renderWithProviders(<EducationPreview education={education} template={template} />);
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('Stanford')).toBeInTheDocument();
  });

  it('renders degree and major', () => {
    renderWithProviders(<EducationPreview education={education} template={template} />);
    expect(screen.getByText('BS · Computer Science')).toBeInTheDocument();
    expect(screen.getByText('MS · AI')).toBeInTheDocument();
  });

  it('renders formatted dates', () => {
    renderWithProviders(<EducationPreview education={education} template={template} />);
    expect(screen.getByText('2016.09 - 2020.06')).toBeInTheDocument();
    expect(screen.getByText('2020.09 - 2022.06')).toBeInTheDocument();
  });

  it('shows "present" for missing endDate', () => {
    const edu: Education[] = [{ id: '1', school: 'MIT', major: 'CS', degree: 'BS', startDate: '2020-09' }];
    renderWithProviders(<EducationPreview education={edu} template={template} />);
    expect(screen.getByText(/present|至今/i)).toBeInTheDocument();
  });
});
