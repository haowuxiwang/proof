import { render, screen } from '@testing-library/react';
import ResumeSection from './ResumeSection';

describe('ResumeSection', () => {
  it('renders title and children', () => {
    render(
      <ResumeSection title="Skills" color="#000" fontFamily="sans-serif">
        <p>Child content</p>
      </ResumeSection>
    );
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders classic variant by default', () => {
    render(
      <ResumeSection title="Test" color="#000" fontFamily="sans-serif">
        <p>Content</p>
      </ResumeSection>
    );
    const heading = screen.getByText('Test');
    expect(heading).toBeInTheDocument();
  });

  it('renders minimal variant', () => {
    render(
      <ResumeSection title="Test" color="#000" fontFamily="sans-serif" variant="minimal">
        <p>Content</p>
      </ResumeSection>
    );
    const heading = screen.getByText('Test');
    expect(heading).toBeInTheDocument();
  });

  it('renders modern variant', () => {
    render(
      <ResumeSection title="Test" color="#000" fontFamily="sans-serif" variant="modern">
        <p>Content</p>
      </ResumeSection>
    );
    const heading = screen.getByText('Test');
    expect(heading).toBeInTheDocument();
  });

  it('applies custom color to heading', () => {
    render(
      <ResumeSection title="Test" color="rgb(255, 0, 0)" fontFamily="sans-serif">
        <p>Content</p>
      </ResumeSection>
    );
    const heading = screen.getByText('Test');
    expect(heading.style.color).toBe('rgb(255, 0, 0)');
  });

  it('applies custom fontFamily to heading', () => {
    render(
      <ResumeSection title="Test" color="#000" fontFamily="Georgia, serif">
        <p>Content</p>
      </ResumeSection>
    );
    const heading = screen.getByText('Test');
    expect(heading.style.fontFamily).toBe('Georgia, serif');
  });
});
