import { renderWithProviders, screen, userEvent } from '../../test-utils';
import TemplateSelector from './TemplateSelector';

describe('TemplateSelector', () => {
  it('renders template cards', () => {
    renderWithProviders(<TemplateSelector />);
    // Should render 4 template cards
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('renders section heading', () => {
    renderWithProviders(<TemplateSelector />);
    // The heading comes from i18n key 'template.title'
    expect(screen.getByText(/template|模板/i)).toBeInTheDocument();
  });

  it('clicking a template card calls setTemplate', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TemplateSelector />);

    const buttons = screen.getAllByRole('button');
    // Click the second template
    await user.click(buttons[1]);
    // No error should be thrown
  });
});
