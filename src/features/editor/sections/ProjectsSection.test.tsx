import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import ProjectsSection from './ProjectsSection';
import { useResumeStore } from '../../../store/resumeStore';

describe('ProjectsSection', () => {
  beforeEach(() => {
    useResumeStore.getState().updateProjects([]);
  });

  it('renders empty state when no projects', () => {
    renderWithProviders(<ProjectsSection />);
    expect(screen.getByText(/暂无项目经验/i)).toBeInTheDocument();
  });

  it('renders add project button', () => {
    renderWithProviders(<ProjectsSection />);
    expect(screen.getByRole('button', { name: /添加项目/i })).toBeInTheDocument();
  });

  it('adds a new project', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectsSection />);
    await user.click(screen.getByRole('button', { name: /添加项目/i }));
    expect(useResumeStore.getState().resume.projects).toHaveLength(1);
  });

  it('renders existing project after expanding', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateProjects([{
      id: '1', name: 'My App', description: 'A cool app', techStack: ['React'], highlights: [], link: '',
    }]);
    renderWithProviders(<ProjectsSection />);
    // Card starts collapsed when name is set, expand it
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    expect(screen.getByDisplayValue('My App')).toBeInTheDocument();
  });

  it('allows editing project name', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateProjects([{
      id: '1', name: '', description: '', techStack: [], highlights: [], link: '',
    }]);
    renderWithProviders(<ProjectsSection />);
    const nameInput = screen.getByPlaceholderText(/项目名称|Project|任务管理/i);
    await user.type(nameInput, 'CLI Tool');
    expect(useResumeStore.getState().resume.projects[0].name).toBe('CLI Tool');
  });

  it('removes a project', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateProjects([{
      id: '1', name: 'Temp', description: '', techStack: [], highlights: [], link: '',
    }]);
    renderWithProviders(<ProjectsSection />);
    const deleteBtn = screen.getAllByRole('button').find(b => b.getAttribute('aria-label')?.includes('删除') || b.getAttribute('aria-label')?.includes('Delete'));
    if (deleteBtn) await user.click(deleteBtn);
    expect(useResumeStore.getState().resume.projects).toHaveLength(0);
  });

  it('renders tech stack tags after expanding', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateProjects([{
      id: '1', name: 'App', description: '', techStack: ['React', 'TypeScript'], highlights: [], link: '',
    }]);
    renderWithProviders(<ProjectsSection />);
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders tip banner', () => {
    renderWithProviders(<ProjectsSection />);
    expect(screen.getByText(/描述项目|describe.*project/i)).toBeInTheDocument();
  });

  it('renders multiple projects', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateProjects([
      { id: '1', name: 'App A', description: '', techStack: [], highlights: [], link: '' },
      { id: '2', name: 'App B', description: '', techStack: [], highlights: [], link: '' },
    ]);
    renderWithProviders(<ProjectsSection />);
    // Cards start collapsed, expand first one
    const headers = screen.getAllByRole('button', { expanded: false });
    await user.click(headers[0]);
    expect(screen.getByDisplayValue('App A')).toBeInTheDocument();
  });
});
