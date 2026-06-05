import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import ExpandableCard from './ExpandableCard';

describe('ExpandableCard', () => {
  it('renders title', () => {
    renderWithProviders(
      <ExpandableCard title="My Card">Content</ExpandableCard>
    );
    expect(screen.getByText('My Card')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    renderWithProviders(
      <ExpandableCard title="My Card" subtitle="Subtitle text">Content</ExpandableCard>
    );
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('renders children when expanded by default', () => {
    renderWithProviders(
      <ExpandableCard title="My Card" defaultExpanded>Inner content</ExpandableCard>
    );
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('does not render children when collapsed by default', () => {
    renderWithProviders(
      <ExpandableCard title="My Card">Inner content</ExpandableCard>
    );
    expect(screen.queryByText('Inner content')).not.toBeInTheDocument();
  });

  it('toggles expanded on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ExpandableCard title="My Card">Inner content</ExpandableCard>
    );

    // Initially collapsed
    expect(screen.queryByText('Inner content')).not.toBeInTheDocument();

    // Click to expand
    await user.click(screen.getByText('My Card'));
    expect(screen.getByText('Inner content')).toBeInTheDocument();

    // Click to collapse
    await user.click(screen.getByText('My Card'));
    expect(screen.queryByText('Inner content')).not.toBeInTheDocument();
  });

  it('toggles expanded on Enter key', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ExpandableCard title="My Card">Inner content</ExpandableCard>
    );

    const header = screen.getByRole('button');
    header.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('toggles expanded on Space key', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ExpandableCard title="My Card">Inner content</ExpandableCard>
    );

    const header = screen.getByRole('button');
    header.focus();
    await user.keyboard(' ');
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <ExpandableCard title="My Card" onDelete={onDelete}>Content</ExpandableCard>
    );

    const deleteBtn = screen.getByRole('button', { name: /delete|删除/i });
    await user.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not render delete button when onDelete is not provided', () => {
    renderWithProviders(
      <ExpandableCard title="My Card">Content</ExpandableCard>
    );
    expect(screen.queryByRole('button', { name: /delete|删除/i })).not.toBeInTheDocument();
  });

  it('shows check icon when isComplete is true', () => {
    const { container } = renderWithProviders(
      <ExpandableCard title="My Card" isComplete>Content</ExpandableCard>
    );
    // The Check icon from lucide renders as an svg
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('shows untitled fallback when title is empty', () => {
    renderWithProviders(
      <ExpandableCard title="">Content</ExpandableCard>
    );
    // Should render the i18n fallback for untitled
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has correct aria-expanded attribute', () => {
    renderWithProviders(
      <ExpandableCard title="My Card">Content</ExpandableCard>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('has correct aria-expanded when expanded', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ExpandableCard title="My Card">Content</ExpandableCard>
    );

    await user.click(screen.getByText('My Card'));
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
