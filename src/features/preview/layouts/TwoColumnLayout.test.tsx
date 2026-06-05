import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test-utils';
import TwoColumnLayout from './TwoColumnLayout';
import { templates } from '../../templates/templateRegistry';

const mockResume = {
  personal: { name: 'Li Si', title: 'Designer', email: '', phone: '', github: '', website: '', location: '', summary: '' },
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

describe('TwoColumnLayout', () => {
  it('renders name', () => {
    renderWithProviders(<TwoColumnLayout resume={mockResume} template={templates[2]} />);
    expect(screen.getByText('Li Si')).toBeInTheDocument();
  });
});
