import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import TagInput from './TagInput';

describe('TagInput', () => {
  it('renders existing tags', () => {
    renderWithProviders(<TagInput tags={['React', 'TypeScript']} onChange={vi.fn()} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('adds tag on Enter', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<TagInput tags={[]} onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Vue{Enter}');
    expect(onChange).toHaveBeenCalledWith(['Vue']);
  });

  it('does not add empty tag', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<TagInput tags={[]} onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), '{Enter}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes tag when clicking X', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<TagInput tags={['React', 'Vue']} onChange={onChange} />);
    const removeButtons = screen.getAllByRole('button');
    await user.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(['Vue']);
  });
});
