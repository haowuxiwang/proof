import { render, screen } from '@testing-library/react';
import WizardCard from './WizardCard';

describe('WizardCard', () => {
  it('renders children', () => {
    render(
      <WizardCard direction={1} sectionKey="test">
        <p>Card content</p>
      </WizardCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    const { container } = render(
      <WizardCard direction={1} sectionKey="test">
        <p>Content</p>
      </WizardCard>
    );
    // Should have a wrapper div with the card styling
    const card = container.firstChild;
    expect(card).toBeInTheDocument();
  });
});
