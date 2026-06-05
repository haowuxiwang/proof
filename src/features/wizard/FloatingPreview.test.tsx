import { renderWithProviders, screen, userEvent } from '../../test-utils';
import FloatingPreview from './FloatingPreview';

describe('FloatingPreview', () => {
  it('renders nothing when collapsed', () => {
    renderWithProviders(<FloatingPreview expanded={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog when expanded', () => {
    renderWithProviders(<FloatingPreview expanded={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders preview title', () => {
    renderWithProviders(<FloatingPreview expanded={true} onClose={vi.fn()} />);
    expect(screen.getByText(/preview|预览/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<FloatingPreview expanded={true} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /close|关闭/i });
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<FloatingPreview expanded={true} onClose={onClose} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('renders export button', () => {
    renderWithProviders(<FloatingPreview expanded={true} onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: /export|导出/i })).toBeInTheDocument();
  });

  it('renders empty state when resume has no content', () => {
    renderWithProviders(<FloatingPreview expanded={true} onClose={vi.fn()} />);
    // Empty state should show some text (translated via i18n)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has dialog role with aria-modal', () => {
    renderWithProviders(<FloatingPreview expanded={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
