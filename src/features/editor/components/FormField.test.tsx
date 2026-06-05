import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import FormField from './FormField';

describe('FormField', () => {
  it('renders label', () => {
    renderWithProviders(<FormField label="Name" value="" onChange={vi.fn()} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    renderWithProviders(<FormField label="Email" required value="" onChange={vi.fn()} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders input with value', () => {
    renderWithProviders(<FormField label="Name" value="Zhang" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Zhang')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<FormField label="Name" value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('renders textarea when multiline', () => {
    renderWithProviders(<FormField label="Summary" value="text" onChange={vi.fn()} multiline />);
    expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('renders with placeholder', () => {
    renderWithProviders(<FormField label="Name" value="" onChange={vi.fn()} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });
});
