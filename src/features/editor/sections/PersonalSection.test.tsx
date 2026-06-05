import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test-utils';
import PersonalSection from './PersonalSection';
import { useResumeStore } from '../../../store/resumeStore';

describe('PersonalSection', () => {
  it('renders form fields with labels', () => {
    renderWithProviders(<PersonalSection />);
    // Labels appear as label elements
    expect(screen.getAllByText(/姓名/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/职位/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/邮箱/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/电话/i)).toBeInTheDocument();
    expect(screen.getByText(/所在地/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/网站/i)).toBeInTheDocument();
    expect(screen.getAllByText(/个人简介/i).length).toBeGreaterThanOrEqual(1);
  });

  it('allows typing in the first input field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PersonalSection />);
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Zhang San');
    expect(useResumeStore.getState().resume.personal.name).toBe('Zhang San');
  });

  it('shows helper hints', () => {
    renderWithProviders(<PersonalSection />);
    expect(screen.getByText(/使用您简历上希望显示的真实姓名/i)).toBeInTheDocument();
    expect(screen.getByText(/您正在申请的职位/i)).toBeInTheDocument();
  });

  it('has a summary textarea', () => {
    renderWithProviders(<PersonalSection />);
    const textareas = screen.getAllByRole('textbox');
    // Last textbox should be the summary textarea
    expect(textareas.length).toBeGreaterThanOrEqual(8);
  });
});
