import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import EducationSection from './EducationSection';
import { useResumeStore } from '../../../store/resumeStore';

describe('EducationSection', () => {
  beforeEach(() => {
    useResumeStore.getState().updateEducation([]);
  });

  it('renders empty state when no education', () => {
    renderWithProviders(<EducationSection />);
    expect(screen.getByText(/暂无教育经历/i)).toBeInTheDocument();
  });

  it('renders add education button', () => {
    renderWithProviders(<EducationSection />);
    expect(screen.getByRole('button', { name: /添加教育/i })).toBeInTheDocument();
  });

  it('adds a new education', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EducationSection />);
    await user.click(screen.getByRole('button', { name: /添加教育/i }));
    expect(useResumeStore.getState().resume.education).toHaveLength(1);
  });

  it('renders existing education after expanding', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: 'MIT', major: 'CS', degree: 'BS', startDate: '2016-09', endDate: '2020-06',
    }]);
    renderWithProviders(<EducationSection />);
    // Card starts collapsed when school is set, expand it
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    expect(screen.getByDisplayValue('MIT')).toBeInTheDocument();
  });

  it('allows editing school name', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: '', major: '', degree: '', startDate: '', endDate: '',
    }]);
    renderWithProviders(<EducationSection />);
    const schoolInput = screen.getByPlaceholderText(/学校|School|清华/i);
    await user.type(schoolInput, 'Stanford');
    expect(useResumeStore.getState().resume.education[0].school).toBe('Stanford');
  });

  it('removes an education', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: 'MIT', major: 'CS', degree: 'BS', startDate: '2016-09', endDate: '2020-06',
    }]);
    renderWithProviders(<EducationSection />);
    const deleteBtn = screen.getAllByRole('button').find(b => b.getAttribute('aria-label')?.includes('删除') || b.getAttribute('aria-label')?.includes('Delete'));
    if (deleteBtn) await user.click(deleteBtn);
    expect(useResumeStore.getState().resume.education).toHaveLength(0);
  });

  it('renders degree and major fields after expanding', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: 'MIT', major: 'Computer Science', degree: 'BS', startDate: '2016-09', endDate: '2020-06',
    }]);
    renderWithProviders(<EducationSection />);
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    expect(screen.getByDisplayValue('Computer Science')).toBeInTheDocument();
    expect(screen.getByDisplayValue('BS')).toBeInTheDocument();
  });

  it('allows editing school in expanded card', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: '', major: 'CS', degree: 'BS', startDate: '2016-09', endDate: '2020-06',
    }]);
    renderWithProviders(<EducationSection />);
    // Card is expanded because school is empty
    const schoolInput = screen.getByPlaceholderText(/学校|School|清华/i);
    await user.type(schoolInput, 'PKU');
    expect(useResumeStore.getState().resume.education[0].school).toBe('PKU');
  });

  it('allows editing degree after expanding', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateEducation([{
      id: '1', school: 'MIT', major: 'CS', degree: '', startDate: '2016-09', endDate: '2020-06',
    }]);
    renderWithProviders(<EducationSection />);
    // Expand the card
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    // Edit degree
    const inputs = screen.getAllByRole('textbox');
    const degreeInput = inputs[1]; // Second input is degree
    await user.type(degreeInput, 'MS');
    expect(useResumeStore.getState().resume.education[0].degree).toBe('MS');
  });
});
