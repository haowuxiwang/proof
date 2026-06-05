import { renderWithProviders, screen, userEvent } from '../../test-utils';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  const onSectionChange = vi.fn();

  beforeEach(() => {
    onSectionChange.mockClear();
  });

  it('renders prev and save buttons', () => {
    renderWithProviders(
      <NavigationBar activeSection="skills" onSectionChange={onSectionChange} />
    );
    // Prev button has ChevronLeft icon
    expect(screen.getByRole('button', { name: /prev|上一步/i })).toBeInTheDocument();
    // Save button
    expect(screen.getByRole('button', { name: /save|保存/i })).toBeInTheDocument();
  });

  it('renders next button when not on last step', () => {
    renderWithProviders(
      <NavigationBar activeSection="personal" onSectionChange={onSectionChange} />
    );
    expect(screen.getByRole('button', { name: /next|下一步/i })).toBeInTheDocument();
  });

  it('disables prev button on first step', () => {
    renderWithProviders(
      <NavigationBar activeSection="personal" onSectionChange={onSectionChange} />
    );
    const prevBtn = screen.getByRole('button', { name: /prev|上一步/i });
    expect(prevBtn).toBeDisabled();
  });

  it('enables prev button on non-first step', () => {
    renderWithProviders(
      <NavigationBar activeSection="skills" onSectionChange={onSectionChange} />
    );
    const prevBtn = screen.getByRole('button', { name: /prev|上一步/i });
    expect(prevBtn).not.toBeDisabled();
  });

  it('hides next button on last step', () => {
    renderWithProviders(
      <NavigationBar activeSection="projects" onSectionChange={onSectionChange} />
    );
    expect(screen.queryByRole('button', { name: /next|下一步/i })).not.toBeInTheDocument();
  });

  it('calls onSectionChange with next section when next is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <NavigationBar activeSection="personal" onSectionChange={onSectionChange} />
    );

    await user.click(screen.getByRole('button', { name: /next|下一步/i }));
    expect(onSectionChange).toHaveBeenCalledWith('skills');
  });

  it('calls onSectionChange with prev section when prev is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <NavigationBar activeSection="skills" onSectionChange={onSectionChange} />
    );

    await user.click(screen.getByRole('button', { name: /prev|上一步/i }));
    expect(onSectionChange).toHaveBeenCalledWith('personal');
  });
});
