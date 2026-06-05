import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from './test-utils';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Proof')).toBeInTheDocument();
  });

  it('renders auto-save indicator', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/自动保存中/i)).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
