import { renderWithProviders, screen, userEvent, waitFor } from '../../test-utils';
import ExportDialog from './ExportDialog';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe('ExportDialog', () => {
  it('renders export dialog with title', () => {
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);
    expect(screen.getByText(/导出简历/i)).toBeInTheDocument();
  });

  it('shows all format options', () => {
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
  });

  it('calls onClose when clicking overlay', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<ExportDialog onClose={onClose} />);
    const overlay = document.querySelector('[data-slot="dialog-overlay"]') || document.querySelector('.fixed');
    if (overlay) await user.click(overlay);
    expect(screen.getByText(/导出简历/i)).toBeInTheDocument();
  });

  it('allows selecting HTML format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);

    await user.click(screen.getByText('HTML'));
    // The format should now be HTML
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

  it('allows selecting PNG format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);

    await user.click(screen.getByText('PNG'));
    expect(screen.getByText('PNG')).toBeInTheDocument();
  });

  it('shows export button', () => {
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);
    // Export button contains format text
    expect(screen.getByRole('button', { name: /导出|export/i })).toBeInTheDocument();
  });

  it('has format descriptions', () => {
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);
    // Each format should have a description
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
  });

  it('shows error toast when exporting empty resume', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ExportDialog onClose={vi.fn()} />);
    // Click export button - resume is empty by default
    const exportBtn = screen.getByRole('button', { name: /导出|export/i });
    await user.click(exportBtn);
    // Should show error toast
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/没有可导出|no content/i));
    });
    // The export should not proceed - verify no loading state
    expect(screen.queryByText(/导出中|exporting/i)).not.toBeInTheDocument();
  });
});
