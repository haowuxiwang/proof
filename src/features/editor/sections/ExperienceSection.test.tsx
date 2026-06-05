import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import ExperienceSection from './ExperienceSection';
import { useResumeStore } from '../../../store/resumeStore';

describe('ExperienceSection', () => {
  beforeEach(() => {
    useResumeStore.getState().updateExperience([]);
  });

  it('renders empty state when no experience', () => {
    renderWithProviders(<ExperienceSection />);
    expect(screen.getByText(/暂无工作经历/i)).toBeInTheDocument();
  });

  it('renders add experience button', () => {
    renderWithProviders(<ExperienceSection />);
    expect(screen.getByRole('button', { name: /添加经历/i })).toBeInTheDocument();
  });

  it('adds a new experience', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExperienceSection />);
    await user.click(screen.getByRole('button', { name: /添加经历/i }));
    expect(useResumeStore.getState().resume.experience).toHaveLength(1);
  });

  it('renders existing experience with company and position', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([{
      id: '1', company: 'Google', position: 'Engineer', startDate: '2022-01', endDate: '2024-01', description: '', highlights: [],
    }]);
    renderWithProviders(<ExperienceSection />);
    // Card starts collapsed when company is set, expand it
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    expect(screen.getByDisplayValue('Google')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Engineer')).toBeInTheDocument();
  });

  it('allows editing company name', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([{
      id: '1', company: '', position: 'Engineer', startDate: '2024-01', endDate: '', description: '', highlights: [],
    }]);
    renderWithProviders(<ExperienceSection />);
    const companyInput = screen.getByPlaceholderText(/腾讯|Tencent/i);
    await user.type(companyInput, 'Google');
    expect(useResumeStore.getState().resume.experience[0].company).toBe('Google');
  });

  it('allows editing position', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([{
      id: '1', company: '', position: '', startDate: '2024-01', endDate: '', description: '', highlights: [],
    }]);
    renderWithProviders(<ExperienceSection />);
    // Card is expanded because company is empty
    const inputs = screen.getAllByRole('textbox');
    const positionInput = inputs[1]; // Second input is position
    await user.type(positionInput, 'Senior Dev');
    expect(useResumeStore.getState().resume.experience[0].position).toBe('Senior Dev');
  });

  it('removes an experience', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([{
      id: '1', company: 'ACME', position: 'Dev', startDate: '2024-01', endDate: '', description: '', highlights: [],
    }]);
    renderWithProviders(<ExperienceSection />);
    const deleteBtn = screen.getAllByRole('button').find(b => b.getAttribute('aria-label')?.includes('删除') || b.getAttribute('aria-label')?.includes('Delete'));
    if (deleteBtn) await user.click(deleteBtn);
    expect(useResumeStore.getState().resume.experience).toHaveLength(0);
  });

  it('renders multiple experiences', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([
      { id: '1', company: 'ACME', position: 'Dev', startDate: '2020-01', endDate: '', description: '', highlights: [] },
      { id: '2', company: 'Google', position: 'Lead', startDate: '2022-01', endDate: '', description: '', highlights: [] },
    ]);
    renderWithProviders(<ExperienceSection />);
    // Cards start collapsed, expand first one
    const headers = screen.getAllByRole('button', { expanded: false });
    await user.click(headers[0]);
    expect(screen.getByDisplayValue('ACME')).toBeInTheDocument();
  });

  it('renders tip banner', () => {
    renderWithProviders(<ExperienceSection />);
    expect(screen.getByText(/数据量化|quantify/i)).toBeInTheDocument();
  });

  it('allows editing description', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateExperience([{
      id: '1', company: '', position: '', startDate: '2024-01', endDate: '', description: '', highlights: [],
    }]);
    renderWithProviders(<ExperienceSection />);
    // Card is expanded because company is empty
    const textareas = screen.getAllByRole('textbox');
    const descInput = textareas[textareas.length - 1]; // Last textarea is description
    await user.type(descInput, 'Built amazing things');
    expect(useResumeStore.getState().resume.experience[0].description).toBe('Built amazing things');
  });
});
