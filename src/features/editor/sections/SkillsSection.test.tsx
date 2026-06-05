import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import SkillsSection from './SkillsSection';
import { useResumeStore } from '../../../store/resumeStore';

describe('SkillsSection', () => {
  beforeEach(() => {
    useResumeStore.getState().updateSkills([]);
  });

  it('renders add category button', () => {
    renderWithProviders(<SkillsSection />);
    expect(screen.getByRole('button', { name: /添加分类/i })).toBeInTheDocument();
  });

  it('adds a category', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsSection />);
    await user.click(screen.getByRole('button', { name: /添加分类/i }));
    expect(useResumeStore.getState().resume.skills).toHaveLength(1);
  });

  it('renders existing categories', () => {
    useResumeStore.getState().updateSkills([
      { id: 'skill-1', category: 'Frontend', items: ['React', 'Vue'] },
      { id: 'skill-2', category: 'Backend', items: ['Node.js'] },
    ]);
    renderWithProviders(<SkillsSection />);
    expect(screen.getByDisplayValue('Frontend')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Backend')).toBeInTheDocument();
  });

  it('shows skill count badge', () => {
    useResumeStore.getState().updateSkills([
      { id: 'skill-3', category: 'Frontend', items: ['React', 'Vue', 'Angular'] },
    ]);
    renderWithProviders(<SkillsSection />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('allows editing category name', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-4', category: '', items: [] }]);
    renderWithProviders(<SkillsSection />);

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Languages');
    expect(useResumeStore.getState().resume.skills[0].category).toBe('Languages');
  });

  it('removes a category', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-5', category: 'Temp', items: [] }]);
    renderWithProviders(<SkillsSection />);

    const deleteBtn = screen.getByRole('button', { name: /删除|delete/i });
    await user.click(deleteBtn);
    expect(useResumeStore.getState().resume.skills).toHaveLength(0);
  });

  it('expands category on click to show skill input', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-6', category: 'Frontend', items: ['React'] }]);
    renderWithProviders(<SkillsSection />);

    // Click the card header to expand
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);

    // Should now see the skill input and the existing skill
    expect(screen.getByDisplayValue('Frontend')).toBeInTheDocument();
  });

  it('adds a skill via Enter key', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-9', category: 'Frontend', items: [] }]);
    renderWithProviders(<SkillsSection />);

    // Expand the category
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);

    // Type in the skill input and press Enter
    const skillInput = screen.getByLabelText(/添加技能|add.*skill/i);
    await user.type(skillInput, 'TypeScript{Enter}');
    expect(useResumeStore.getState().resume.skills[0].items).toContain('TypeScript');
  });

  it('does not add empty skill', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-10', category: 'Frontend', items: [] }]);
    renderWithProviders(<SkillsSection />);

    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);

    const skillInput = screen.getByLabelText(/添加技能|add.*skill/i);
    await user.type(skillInput, '{Enter}');
    expect(useResumeStore.getState().resume.skills[0].items).toHaveLength(0);
  });

  it('removes a skill by clicking its badge', async () => {
    const user = userEvent.setup();
    useResumeStore.getState().updateSkills([{ id: 'skill-8', category: 'Frontend', items: ['React', 'Vue'] }]);
    renderWithProviders(<SkillsSection />);

    // Expand
    const header = screen.getByRole('button', { expanded: false });
    await user.click(header);

    // Click the React badge to remove it
    const badge = screen.getByLabelText(/删除.*React|delete.*React/i);
    await user.click(badge);
    expect(useResumeStore.getState().resume.skills[0].items).not.toContain('React');
    expect(useResumeStore.getState().resume.skills[0].items).toContain('Vue');
  });

  it('adds multiple categories', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SkillsSection />);

    await user.click(screen.getByRole('button', { name: /添加分类/i }));
    await user.click(screen.getByRole('button', { name: /添加分类/i }));
    await user.click(screen.getByRole('button', { name: /添加分类/i }));
    expect(useResumeStore.getState().resume.skills).toHaveLength(3);
  });
});
