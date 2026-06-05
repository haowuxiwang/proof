import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import HighlightList from './HighlightList';

describe('HighlightList', () => {
  it('renders label', () => {
    renderWithProviders(<HighlightList highlights={[]} onChange={vi.fn()} />);
    expect(screen.getByText(/核心成就/i)).toBeInTheDocument();
  });

  it('renders existing highlights', () => {
    renderWithProviders(<HighlightList highlights={['Achievement 1', 'Achievement 2']} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Achievement 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Achievement 2')).toBeInTheDocument();
  });

  it('adds a highlight when clicking add button', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={[]} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /添加成就/i }));
    expect(onChange).toHaveBeenCalledWith(['']);
  });

  it('removes a highlight when clicking X', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={['A', 'B']} onChange={onChange} />);
    const removeButtons = screen.getAllByRole('button');
    await user.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(['B']);
  });

  it('updates highlight value on typing', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={['Old value']} onChange={onChange} />);
    const input = screen.getByDisplayValue('Old value');
    await user.clear(input);
    await user.type(input, 'New value');
    expect(onChange).toHaveBeenCalled();
  });

  it('does not add empty highlight when last item is empty', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={['']} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /添加成就/i }));
    // Should not be called again because last item is empty
    expect(onChange).not.toHaveBeenCalled();
  });

  it('adds highlight when last item is not empty', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={['Existing']} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /添加成就/i }));
    expect(onChange).toHaveBeenCalledWith(['Existing', '']);
  });

  it('removes correct highlight from middle', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<HighlightList highlights={['A', 'B', 'C']} onChange={onChange} />);
    // Second remove button (index 1) removes 'B'
    const removeButtons = screen.getAllByRole('button').filter(b => b.getAttribute('aria-label')?.includes('删除') || b.getAttribute('aria-label')?.includes('Delete'));
    await user.click(removeButtons[1]);
    expect(onChange).toHaveBeenCalledWith(['A', 'C']);
  });
});
