import { renderWithProviders, screen, userEvent } from '../../test-utils';
import ProgressSteps from './ProgressSteps';

describe('ProgressSteps', () => {
  const onSectionChange = vi.fn();

  beforeEach(() => {
    onSectionChange.mockClear();
  });

  it('renders 5 step buttons', () => {
    renderWithProviders(
      <ProgressSteps activeSection="personal" onSectionChange={onSectionChange} />
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(5);
  });

  it('marks the active section as selected', () => {
    renderWithProviders(
      <ProgressSteps activeSection="skills" onSectionChange={onSectionChange} />
    );
    const tabs = screen.getAllByRole('tab');
    const activeTab = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    expect(activeTab).toBeDefined();
  });

  it('calls onSectionChange when a step is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ProgressSteps activeSection="personal" onSectionChange={onSectionChange} />
    );

    const tabs = screen.getAllByRole('tab');
    await user.click(tabs[2]); // Click 3rd step
    expect(onSectionChange).toHaveBeenCalled();
  });

  it('has tablist role with label', () => {
    renderWithProviders(
      <ProgressSteps activeSection="personal" onSectionChange={onSectionChange} />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
