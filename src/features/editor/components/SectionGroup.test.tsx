import { render, screen } from '@testing-library/react';
import SectionGroup from './SectionGroup';

describe('SectionGroup', () => {
  it('renders title', () => {
    render(
      <SectionGroup title="Personal Info">
        <p>Child</p>
      </SectionGroup>
    );
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <SectionGroup title="Test">
        <p>Child content</p>
      </SectionGroup>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders divider by default', () => {
    const { container } = render(
      <SectionGroup title="Test">
        <p>Child</p>
      </SectionGroup>
    );
    const divider = container.querySelector('[style*="linear-gradient"]');
    expect(divider).toBeInTheDocument();
  });

  it('does not render divider when showDivider is false', () => {
    const { container } = render(
      <SectionGroup title="Test" showDivider={false}>
        <p>Child</p>
      </SectionGroup>
    );
    const divider = container.querySelector('[style*="linear-gradient"]');
    expect(divider).not.toBeInTheDocument();
  });
});
